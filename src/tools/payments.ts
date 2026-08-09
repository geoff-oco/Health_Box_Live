/**
 * Our tools for looking up payment Hx
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ToolInputError } from "../lib/redact";
import type { ZandaReader } from "../zanda/client";
import type { components } from "../zanda/types";
import { errorResult, jsonResult, runTool } from "./output";
import { dateRangeError, idShape, paymentListShape } from "./schemas";

type Payment = components["schemas"]["PaymentResponseNoLinks"];

function money(value: number | string | null | undefined): number | null {
  if (value === null || value === undefined) {
    return null;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function summarisePayment(payment: Payment) {
  return {
    id: payment.id,
    receivedAt: payment.receivedAt,
    total: money(payment.total),
    method: payment.method?.name ?? null,
    clientId: payment.client?.id ?? null,
    locationId: payment.location?.id ?? null,
    isActive: payment.isActive,
  };
}

export function registerPaymentTools(server: McpServer, getClient: () => ZandaReader): void {
  server.registerTool(
    "list_payments",
    {
      title: "List payments",
      description:
        "Lists payments received by the health practice, paginated. Use it to see money " +
        "received in a date range (receivedAfter/receivedBefore, inclusive, YYYY-MM-DD), " +
        "payments by one client (clientId), by payment method (methodId), or within an " +
        "amount range (minAmount/maxAmount). Returns JSON with: summary, items (id, " +
        "receivedAt, total, method e.g. 'Cash'/'Credit Card', clientId, locationId, " +
        "isActive), page, pageSize, hasNextPage. Amounts are in the practice's currency. " +
        "Resolve clientId with get_client and locationId with get_location.",
      inputSchema: paymentListShape,
    },
    async ({
      page,
      pageSize,
      clientId,
      methodId,
      receivedAfter,
      receivedBefore,
      minAmount,
      maxAmount,
      isActive,
    }) =>
      runTool("list_payments", async () => {
        const rangeProblem = dateRangeError(
          receivedAfter,
          receivedBefore,
          "receivedAfter",
          "receivedBefore",
        );
        if (rangeProblem !== null) {
          return errorResult(new ToolInputError(rangeProblem));
        }
        if (minAmount !== undefined && maxAmount !== undefined && minAmount > maxAmount) {
          return errorResult(
            new ToolInputError(
              `minAmount (${minAmount}) must not be greater than maxAmount (${maxAmount}).`,
            ),
          );
        }

        const result = await getClient().listResource<Payment>("/api/v1/payments", {
          page,
          pageSize,
          clientId,
          methodId,
          receivedAfter,
          receivedBefore,
          minAmount,
          maxAmount,
          isActive,
        });

        return jsonResult({
          summary: `Found ${result.items.length} payment(s) on page ${result.page}${
            result.hasNextPage ? "; more pages available" : "; no more pages"
          }.`,
          items: result.items.map(summarisePayment),
          page: result.page,
          pageSize: result.pageSize,
          hasNextPage: result.hasNextPage,
        });
      }),
  );

  server.registerTool(
    "get_payment",
    {
      title: "Get a payment by ID",
      description:
        "Fetches one payment by its numeric Zanda ID (find IDs with list_payments). Returns " +
        "JSON with: summary and payment (the list fields plus paidBy - who physically paid, " +
        "notes, clientNumber, methodId, and the location name). Contains personal data " +
        "(payer name) - fetch only when the task requires it.",
      inputSchema: idShape,
    },
    async ({ id }) =>
      runTool("get_payment", async () => {
        const payment = await getClient().getResource<Payment>(`/api/v1/payments/${id}`);
        const compact = summarisePayment(payment);

        return jsonResult({
          summary: `Payment of ${compact.total ?? "unknown amount"} received ${
            payment.receivedAt
          } via ${compact.method ?? "unknown method"}.`,
          payment: {
            ...compact,
            paidBy: payment.paidBy ?? null,
            notes: payment.notes ?? null,
            clientNumber: payment.client?.clientNumber ?? null,
            methodId: payment.method?.id ?? null,
            locationName: payment.location?.name ?? null,
          },
        });
      }),
  );
}
