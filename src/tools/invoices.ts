/**
 * Invoice tools
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ToolInputError } from "../lib/redact";
import type { ZandaReader } from "../zanda/client";
import type { components } from "../zanda/types";
import { errorResult, jsonResult, runTool } from "./output";
import { dateRangeError, idShape, invoiceListShape } from "./schemas";

type Invoice = components["schemas"]["InvoiceResponseNoLinks"];

function money(value: number | string | null | undefined): number | null {
  if (value === null || value === undefined) {
    return null;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

/** Compact the list to just dates, ids, etc */
function summariseInvoice(invoice: Invoice) {
  const totalCharges = money(invoice.totalCharges);
  const totalPayments = money(invoice.totalPayments);
  return {
    id: invoice.id,
    invoiceNumber: invoice.invoiceNumber,
    invoiceDate: invoice.invoiceDate,
    invoiceDueDate: invoice.invoiceDueDate,
    totalCharges,
    totalPayments,
    amountOutstanding:
      totalCharges !== null && totalPayments !== null ? totalCharges - totalPayments : null,
    clientId: invoice.providedTo?.id ?? null,
    practitionerId: invoice.providedBy?.id ?? null,
    isActive: invoice.isActive,
  };
}

export function registerInvoiceTools(server: McpServer, getClient: () => ZandaReader): void {
  server.registerTool(
    "list_invoices",
    {
      title: "List invoices",
      description:
        "Lists invoices issued by the health practice, paginated. Use it to find invoices " +
        "for a client or practitioner, unpaid/outstanding invoices (isPaid: false), or " +
        "invoices in a date range (invoiceDateFrom/To for when issued, dueDateFrom/To for " +
        "when due; all inclusive, format YYYY-MM-DD). Returns JSON with: summary, items " +
        "(id, invoiceNumber, invoiceDate, invoiceDueDate, totalCharges, totalPayments, " +
        "amountOutstanding, clientId, practitionerId, isActive), page, pageSize, " +
        "hasNextPage. Amounts are in the practice's currency. Resolve IDs with " +
        "get_client/get_practitioner.",
      inputSchema: invoiceListShape,
    },
    async ({
      page,
      pageSize,
      clientId,
      practitionerId,
      locationId,
      isPaid,
      isActive,
      invoiceDateFrom,
      invoiceDateTo,
      dueDateFrom,
      dueDateTo,
    }) =>
      runTool("list_invoices", async () => {
        const rangeProblem =
          dateRangeError(invoiceDateFrom, invoiceDateTo, "invoiceDateFrom", "invoiceDateTo") ??
          dateRangeError(dueDateFrom, dueDateTo, "dueDateFrom", "dueDateTo");
        if (rangeProblem !== null) {
          return errorResult(new ToolInputError(rangeProblem));
        }

        const result = await getClient().listResource<Invoice>("/api/v1/invoices", {
          page,
          pageSize,
          clientId,
          practitionerId,
          locationId,
          isPaid,
          isActive,
          invoiceDateFrom,
          invoiceDateTo,
          dueDateFrom,
          dueDateTo,
        });

        return jsonResult({
          summary: `Found ${result.items.length} invoice(s) on page ${result.page}${
            result.hasNextPage ? "; more pages available" : "; no more pages"
          }.`,
          items: result.items.map(summariseInvoice),
          page: result.page,
          pageSize: result.pageSize,
          hasNextPage: result.hasNextPage,
        });
      }),
  );

  server.registerTool(
    "get_invoice",
    {
      title: "Get an invoice by ID",
      description:
        "Fetches one invoice by its numeric Zanda ID (find IDs with list_invoices or in an " +
        "appointment's invoiceIds). Returns JSON with: summary and invoice (the list fields " +
        "plus totalTax, payableBy, emailedAt, appointmentId, itemCount, paymentCount). Line " +
        "items themselves are not included in v1.",
      inputSchema: idShape,
    },
    async ({ id }) =>
      runTool("get_invoice", async () => {
        const invoice = await getClient().getResource<Invoice>(`/api/v1/invoices/${id}`);
        const compact = summariseInvoice(invoice);

        return jsonResult({
          summary: `Invoice ${invoice.invoiceNumber ?? `#${invoice.id}`} dated ${
            invoice.invoiceDate
          }: ${
            compact.amountOutstanding === 0
              ? "fully paid"
              : `${compact.amountOutstanding ?? "unknown"} outstanding`
          }.`,
          invoice: {
            ...compact,
            totalTax: money(invoice.totalTax),
            payableBy: invoice.payableBy ?? null,
            emailedAt: invoice.emailedAt ?? null,
            appointmentId: invoice.appointment?.id ?? null,
            itemCount: invoice.invoiceItems?.length ?? 0,
            paymentCount: invoice.invoicePayments?.length ?? 0,
          },
        });
      }),
  );
}
