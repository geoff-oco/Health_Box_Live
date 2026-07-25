

export interface paths {
    "/api/v1/practitioners": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List of practitioners
         * @description Retrieves a list of practitioners
         */
        get: operations["GetPractitioners"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/practitioners/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get practitioner
         * @description Retrieves a specific practitioner by its unique identifier
         */
        get: operations["GetPractitionerById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/invoices": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List of invoices
         * @description Retrieves a list of invoices
         */
        get: operations["GetInvoices"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/invoices/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get invoice
         * @description Retrieves a specific invoice by its unique identifier
         */
        get: operations["GetInvoiceById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Update invoice
         * @description Updates a specific invoice by its unique identifier.
         */
        patch: operations["UpdateInvoice"];
        trace?: never;
    };
    "/api/v1/locations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List of locations
         * @description Retrieves a list of locations
         */
        get: operations["GetLocations"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/locations/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get location
         * @description Retrieves a specific location by its unique identifier
         */
        get: operations["GetLocationById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/client-profiles": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List of client profiles
         * @description Retrieves a list of client profiles
         */
        get: operations["GetClientProfiles"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/client-profiles/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get client profile
         * @description Retrieves a specific client profile by its unique identifier
         */
        get: operations["GetClientProfileById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/client-profiles/{id}/primary-practitioner": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get primary practitioner for client
         * @description Retrieves the primary practitioner for a specific client profile by the client's unique identifier
         */
        get: operations["GetPrimaryPractitioner"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/client-profiles/clients": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create client profile
         * @description Creates a new client profile. Returns 409 Conflict when a potential duplicate is detected.
         */
        post: operations["CreateClientProfileClient"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/client-profiles/clients/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Update client profile
         * @description Updates a specific client profile by its unique identifier. Only the fields provided in the request body are modified.
         */
        patch: operations["UpdateClientProfile"];
        trace?: never;
    };
    "/api/v1/client-classifications": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List of client classifications
         * @description Retrieves a list of client classifications
         */
        get: operations["GetClientClassifications"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/client-classifications/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get client classification
         * @description Retrieves a specific client classification by its unique identifier
         */
        get: operations["GetClientClassificationById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/payments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List of payments
         * @description Retrieves a list of payments
         */
        get: operations["GetPayments"];
        put?: never;
        /**
         * Create payment
         * @description Creates a manual payment, optionally allocating it across one or more invoices
         */
        post: operations["CreatePayment"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/payments/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get payment
         * @description Retrieves a specific payment by its unique identifier
         */
        get: operations["GetPaymentById"];
        put?: never;
        post?: never;
        /**
         * Delete payment
         * @description Deletes a specific payment by its unique identifier
         */
        delete: operations["DeletePayment"];
        options?: never;
        head?: never;
        /**
         * Update payment
         * @description Updates a specific payment by its unique identifier
         */
        patch: operations["UpdatePayment"];
        trace?: never;
    };
    "/api/v1/appointments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List of appointments
         * @description Retrieves a list of appointments
         */
        get: operations["GetAppointments"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/appointments/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get appointment
         * @description Retrieves a specific appointment by its unique identifier
         */
        get: operations["GetAppointmentById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/billable-items": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List of billable items
         * @description Retrieves a list of billable items
         */
        get: operations["GetBillableItems"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/billable-items/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get billable item
         * @description Retrieves a specific billable item (product or service) by its unique identifier
         */
        get: operations["GetBillableItemById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/referrals": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List of referrals
         * @description Retrieves a list of referrals
         */
        get: operations["GetReferrals"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/referrals/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get referral
         * @description Retrieves a specific referral by its unique identifier
         */
        get: operations["GetReferralById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/insurers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List of insurers
         * @description Retrieves a list of insurers
         */
        get: operations["GetInsurers"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/insurers/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get insurer
         * @description Retrieves a specific insurer by its unique identifier
         */
        get: operations["GetInsurerById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/custom-categories": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List of custom categories
         * @description Retrieves a list of custom categories
         */
        get: operations["GetCustomCategories"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/custom-categories/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get custom category
         * @description Retrieves a specific custom category by its unique identifier
         */
        get: operations["GetCustomCategoryById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/custom-statuses": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List of custom statuses
         * @description Retrieves a list of custom statuses
         */
        get: operations["GetCustomStatuses"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/custom-statuses/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get custom status
         * @description Retrieves a specific custom status by its unique identifier
         */
        get: operations["GetCustomStatusById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/marketing-sources": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List of marketing sources
         * @description Retrieves a list of marketing sources
         */
        get: operations["GetMarketingSources"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/marketing-sources/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get marketing source
         * @description Retrieves a specific marketing source by its unique identifier
         */
        get: operations["GetMarketingSourceById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/payment-methods": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List of payment methods
         * @description Retrieves a list of payment methods
         */
        get: operations["GetPaymentMethods"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/payment-methods/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get payment method
         * @description Retrieves a specific payment method by its unique identifier
         */
        get: operations["GetPaymentMethodById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/sexes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List of sexes
         * @description Retrieves a list of sexes
         */
        get: operations["GetSexes"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/sexes/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get sex
         * @description Retrieves a specific sex by its unique identifier
         */
        get: operations["GetSexById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/genders": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List of genders
         * @description Retrieves a list of genders
         */
        get: operations["GetGenders"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/genders/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get gender
         * @description Retrieves a specific gender by its unique identifier
         */
        get: operations["GetGenderById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/gender-identities": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List of gender identities
         * @description Retrieves a list of gender identities
         */
        get: operations["GetGenderIdentities"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/gender-identities/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get gender identity
         * @description Retrieves a specific gender identity by its unique identifier
         */
        get: operations["GetGenderIdentityById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/pronouns": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List of pronouns
         * @description Retrieves a list of pronouns
         */
        get: operations["GetPronouns"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/pronouns/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get pronoun
         * @description Retrieves a specific pronoun by its unique identifier
         */
        get: operations["GetPronounById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/custom-profile-fields": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List of custom profile fields
         * @description Retrieves a list of custom profile fields
         */
        get: operations["GetCustomProfileFields"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/custom-profile-fields/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get custom profile field
         * @description Retrieves a specific custom profile field by its unique identifier
         */
        get: operations["GetCustomProfileFieldById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        AppointmentClientResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            links: components["schemas"]["ZandaApiLink"][];
        };
        AppointmentClientResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
        };
        AppointmentInvoiceResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            links: components["schemas"]["ZandaApiLink"][];
        };
        AppointmentInvoiceResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
        };
        AppointmentLocationResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the location where the appointment takes place */
            name: string;
            links: components["schemas"]["ZandaApiLink"][];
        };
        AppointmentLocationResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the location where the appointment takes place */
            name: string;
        };
        AppointmentPractitionerResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the practitioner assigned to this appointment */
            name: string;
            links: components["schemas"]["ZandaApiLink"][];
        };
        AppointmentPractitionerResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the practitioner assigned to this appointment */
            name: string;
        };
        AppointmentResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            attendanceState: components["schemas"]["AttendanceState"];
            clientCapacity: components["schemas"]["ClientCapacity"];
            /**
             * Format: date
             * @description The date of the appointment
             */
            date: string;
            /**
             * Format: time
             * @description The end time of the appointment in the business time zone
             */
            endAt: string;
            /** @description Optional flag or label assigned to the appointment */
            flag?: null | string;
            /** @description The name of the group (applicable for group appointments only) */
            groupName?: null | string;
            /** @description True if the appointment is currently active in the system */
            isActive: boolean;
            /**
             * Format: date-time
             * @description The date and time when the record was last modified
             */
            lastModified?: unknown;
            /**
             * Format: time
             * @description The start time of the appointment in the business time zone
             */
            startAt: string;
            /** @description The location where the appointment takes place */
            location: components["schemas"]["AppointmentLocationResponse"];
            /** @description The practitioner assigned to this appointment */
            practitioner: components["schemas"]["AppointmentPractitionerResponse"];
            /** @description List of clients associated with this appointment */
            clients?: null | components["schemas"]["AppointmentClientResponse"][];
            /** @description List of invoices associated with this appointment */
            invoices?: null | components["schemas"]["AppointmentInvoiceResponse"][];
            /** @description List of resources (e.g., equipment, rooms) allocated to this appointment */
            resources?: null | string[];
            /** @description Links for navigating related resources */
            links?: components["schemas"]["ZandaApiLink"][];
        };
        AppointmentResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            attendanceState: components["schemas"]["AttendanceState"];
            clientCapacity: components["schemas"]["ClientCapacity"];
            /**
             * Format: date
             * @description The date of the appointment
             */
            date: string;
            /**
             * Format: time
             * @description The end time of the appointment in the business time zone
             */
            endAt: string;
            /** @description Optional flag or label assigned to the appointment */
            flag?: null | string;
            /** @description The name of the group (applicable for group appointments only) */
            groupName?: null | string;
            /** @description True if the appointment is currently active in the system */
            isActive: boolean;
            /**
             * Format: date-time
             * @description The date and time when the record was last modified
             */
            lastModified?: unknown;
            /**
             * Format: time
             * @description The start time of the appointment in the business time zone
             */
            startAt: string;
            /** @description The location where the appointment takes place */
            location: components["schemas"]["AppointmentLocationResponseNoLinks"];
            /** @description The practitioner assigned to this appointment */
            practitioner: components["schemas"]["AppointmentPractitionerResponseNoLinks"];
            /** @description List of clients associated with this appointment */
            clients?: null | components["schemas"]["AppointmentClientResponseNoLinks"][];
            /** @description List of invoices associated with this appointment */
            invoices?: null | components["schemas"]["AppointmentInvoiceResponseNoLinks"][];
            /** @description List of resources (e.g., equipment, rooms) allocated to this appointment */
            resources?: null | string[];
        };
        /** @enum {string} */
        AttendanceState: "Pending" | "Rescheduled" | "No Show" | "Confirmed" | "Cancelled" | "Reserved" | "Group" | "Late Cancellation" | "Arrived" | "Completed" | "Undetermined";
        BillableItemLocationResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the location where this item is available */
            name: string;
            links: components["schemas"]["ZandaApiLink"][];
        };
        BillableItemLocationResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the location where this item is available */
            name: string;
        };
        BillableItemResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The category this item belongs to */
            category?: null | string;
            /** @description The item code or SKU */
            code?: null | string;
            /**
             * Format: double
             * @description The cost to provide this item
             */
            cost?: null | number | string;
            /**
             * Format: double
             * @description Required deposit amount (for services only, null for products)
             */
            deposit?: null | number | string;
            /** @description Description of the item (for services only, null for products) */
            description?: null | string;
            /**
             * Format: int32
             * @description Duration in minutes (for services only, null for products)
             */
            duration?: null | number | string;
            /** @description True if this item is currently active and available */
            isActive: boolean;
            /** @description True if this item is available at all locations */
            isAvailableAllLocations: boolean;
            /** @description True if tax is applied to this item */
            isTaxable: boolean;
            /**
             * Format: date-time
             * @description The date and time when the record was last modified
             */
            lastModified?: unknown;
            /** @description The name of the billable item */
            name: string;
            /**
             * Format: double
             * @description The price charged for this item
             */
            price?: null | number | string;
            /** @description List of specific locations where this item is available (if not available at all locations) */
            locations?: null | components["schemas"]["BillableItemLocationResponse"][];
            /** @description Billing modifiers (for services only, null for products) */
            modifiers?: null | string[];
            /** @description Links for navigating related resources */
            links?: components["schemas"]["ZandaApiLink"][];
        };
        BillableItemResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The category this item belongs to */
            category?: null | string;
            /** @description The item code or SKU */
            code?: null | string;
            /**
             * Format: double
             * @description The cost to provide this item
             */
            cost?: null | number | string;
            /**
             * Format: double
             * @description Required deposit amount (for services only, null for products)
             */
            deposit?: null | number | string;
            /** @description Description of the item (for services only, null for products) */
            description?: null | string;
            /**
             * Format: int32
             * @description Duration in minutes (for services only, null for products)
             */
            duration?: null | number | string;
            /** @description True if this item is currently active and available */
            isActive: boolean;
            /** @description True if this item is available at all locations */
            isAvailableAllLocations: boolean;
            /** @description True if tax is applied to this item */
            isTaxable: boolean;
            /**
             * Format: date-time
             * @description The date and time when the record was last modified
             */
            lastModified?: unknown;
            /** @description The name of the billable item */
            name: string;
            /**
             * Format: double
             * @description The price charged for this item
             */
            price?: null | number | string;
            /** @description List of specific locations where this item is available (if not available at all locations) */
            locations?: null | components["schemas"]["BillableItemLocationResponseNoLinks"][];
            /** @description Billing modifiers (for services only, null for products) */
            modifiers?: null | string[];
        };
        /** @enum {string} */
        ClientCapacity: "Client Appointment" | "Personal Appointment" | "Group Appointment";
        ClientClassificationResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description True if the client classification is currently active in the system */
            isActive: boolean;
            /** @description The name of the client classification */
            name: string;
            /** @description Links for navigating related resources */
            links?: components["schemas"]["ZandaApiLink"][];
        };
        ClientClassificationResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description True if the client classification is currently active in the system */
            isActive: boolean;
            /** @description The name of the client classification */
            name: string;
        };
        ClientProfileClientClassificationResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the client classification */
            name: string;
            links: components["schemas"]["ZandaApiLink"][];
        };
        ClientProfileClientClassificationResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the client classification */
            name: string;
        };
        ClientProfileCustomCategoryResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the custom category (e.g., "Individual", "Corporate") */
            name: string;
            links: components["schemas"]["ZandaApiLink"][];
        };
        ClientProfileCustomCategoryResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the custom category (e.g., "Individual", "Corporate") */
            name: string;
        };
        ClientProfileCustomFieldResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the custom profile field */
            name: string;
            /**
             * @description The client's value. Choice fields return the selected option label(s) (comma-joined for
             *     multi-select); dates are ISO YYYY-MM-DD; toggles are always "Yes"/"No" ("No" when unset).
             *     Null for non-toggle fields when no value is set.
             */
            value?: null | string;
            links: components["schemas"]["ZandaApiLink"][];
        };
        ClientProfileCustomFieldResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the custom profile field */
            name: string;
            /**
             * @description The client's value. Choice fields return the selected option label(s) (comma-joined for
             *     multi-select); dates are ISO YYYY-MM-DD; toggles are always "Yes"/"No" ("No" when unset).
             *     Null for non-toggle fields when no value is set.
             */
            value?: null | string;
        };
        ClientProfileCustomStatusResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the custom status */
            name: string;
            links: components["schemas"]["ZandaApiLink"][];
        };
        ClientProfileCustomStatusResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the custom status */
            name: string;
        };
        ClientProfileInsurerResponse: {
            /**
             * Format: int32
             * @description The client insurer identifier
             */
            id: number | string;
            /** @description The name of the insurer */
            insurerName: string;
            /** @description The client's policy name with this insurer. May be null or empty. */
            policyName?: null | string;
        };
        ClientProfileMarketingSourceResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the marketing source (how the client found out about the practice) */
            name: string;
            links: components["schemas"]["ZandaApiLink"][];
        };
        ClientProfileMarketingSourceResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the marketing source (how the client found out about the practice) */
            name: string;
        };
        ClientProfilePronounResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The client's preferred pronouns (e.g., "she/her", "he/him", "they/them") */
            name: string;
            links: components["schemas"]["ZandaApiLink"][];
        };
        ClientProfilePronounResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The client's preferred pronouns (e.g., "she/her", "he/him", "they/them") */
            name: string;
        };
        ClientProfileResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description Important alert or note to display when creating new appointments for this client */
            alertNote?: null | string;
            /** @description The client's city or suburb */
            city?: null | string;
            /**
             * Format: int32
             * @description The client's assigned identification number
             */
            clientNumber: number | string;
            /** @description The client's country as an ISO 3166-1 alpha-2 code (e.g. "AU") */
            country?: null | string;
            /**
             * Format: date-time
             * @description The date and time when the client was added to the system
             */
            dateAdded: unknown;
            /**
             * Format: date
             * @description The client's date of birth
             */
            dateOfBirth?: null | string;
            /** @description The client's email address */
            emailAddress?: null | string;
            /** @description The name under which the client's records should be filed */
            fileUnder?: null | string;
            /** @description The client's first name */
            firstName?: null | string;
            /** @description The client's gender identity (e.g., "Agender", "Bigender", "Female", "Male", "Non-binary", "Unspecified") */
            genderIdentity?: null | string;
            /** @description The client's home or landline telephone number */
            homeTelephone?: null | string;
            /** @description The client's identity note (additional information on the clients identity) */
            identity?: null | string;
            /** @description False if client has been deleted; true otherwise */
            isActive: boolean;
            /** @description True if client has been archived; false otherwise */
            isArchived: boolean;
            /**
             * Format: date-time
             * @description The date and time when the record was last modified
             */
            lastModified?: unknown;
            /** @description The client's last name */
            lastName?: null | string;
            /** @description True if the client has opted in to receive marketing communications */
            marketingOptIn: boolean;
            /** @description The client's middle name */
            middleName?: null | string;
            /** @description The client's mobile phone number */
            mobileTelephone?: null | string;
            /** @description The client's occupation */
            occupation?: null | string;
            /** @description The client's postal or ZIP code */
            postalCode?: null | string;
            /** @description The client's preferred name to use in communications */
            preferredName?: null | string;
            /** @description The client's salutation or title (e.g., "Mr", "Mrs", "Dr") */
            salutation?: null | string;
            /** @description The client's biological sex */
            sex?: null | string;
            /** @description The client's state or county */
            state?: null | string;
            /** @description The client's street address */
            streetAddress?: null | string;
            /** @description The client's time zone as an IANA time zone identifier (e.g. "Australia/Sydney") */
            timeZone?: null | string;
            /** @description The client's work telephone number */
            workTelephone?: null | string;
            /** @description The client's custom category */
            customCategory?: null | components["schemas"]["ClientProfileCustomCategoryResponse"];
            /** @description User defined custom status for the client profile, can be used to track internal workflow or categorization */
            customStatus?: null | components["schemas"]["ClientProfileCustomStatusResponse"];
            /** @description How the client found out about the practice (marketing source) */
            marketingSource?: null | components["schemas"]["ClientProfileMarketingSourceResponse"];
            /** @description The client's primary practitioner information */
            primaryPractitioner?: null | components["schemas"]["PrimaryPractitionerResponse"];
            /** @description The client's preferred pronouns (e.g., "she/her", "he/him", "they/them") */
            pronouns?: null | components["schemas"]["ClientProfilePronounResponse"];
            /**
             * @description The client classifications assigned to the client. Empty array when the client has no
             *     classifications.
             */
            clientClassifications: components["schemas"]["ClientProfileClientClassificationResponse"][];
            /**
             * @description The client's active insurance policies. Empty array when the client has no
             *     active insurers.
             */
            clientInsurers: components["schemas"]["ClientProfileInsurerResponse"][];
            /**
             * @description Every active custom profile field configured for the client's profile role(s), in display
             *     order. Each field's Value is the client's entered value (choice fields resolved to their
             *     option label(s)) or null when no value has been entered. Empty array only when no custom
             *     profile fields are configured for the client's role(s).
             */
            customProfileFields: components["schemas"]["ClientProfileCustomFieldResponse"][];
            /** @description Roles assigned to the profile (e.g. "Client", "Contact", "Shared", "Third Party", "Referrer"). A profile can have multiple roles. */
            profileRoles: ("Client" | "Referrer" | "Contact" | "Third Party" | "Shared")[];
            /** @description Links for navigating related resources */
            links?: components["schemas"]["ZandaApiLink"][];
        };
        ClientProfileResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description Important alert or note to display when creating new appointments for this client */
            alertNote?: null | string;
            /** @description The client's city or suburb */
            city?: null | string;
            /**
             * Format: int32
             * @description The client's assigned identification number
             */
            clientNumber: number | string;
            /** @description The client's country as an ISO 3166-1 alpha-2 code (e.g. "AU") */
            country?: null | string;
            /**
             * Format: date-time
             * @description The date and time when the client was added to the system
             */
            dateAdded: unknown;
            /**
             * Format: date
             * @description The client's date of birth
             */
            dateOfBirth?: null | string;
            /** @description The client's email address */
            emailAddress?: null | string;
            /** @description The name under which the client's records should be filed */
            fileUnder?: null | string;
            /** @description The client's first name */
            firstName?: null | string;
            /** @description The client's gender identity (e.g., "Agender", "Bigender", "Female", "Male", "Non-binary", "Unspecified") */
            genderIdentity?: null | string;
            /** @description The client's home or landline telephone number */
            homeTelephone?: null | string;
            /** @description The client's identity note (additional information on the clients identity) */
            identity?: null | string;
            /** @description False if client has been deleted; true otherwise */
            isActive: boolean;
            /** @description True if client has been archived; false otherwise */
            isArchived: boolean;
            /**
             * Format: date-time
             * @description The date and time when the record was last modified
             */
            lastModified?: unknown;
            /** @description The client's last name */
            lastName?: null | string;
            /** @description True if the client has opted in to receive marketing communications */
            marketingOptIn: boolean;
            /** @description The client's middle name */
            middleName?: null | string;
            /** @description The client's mobile phone number */
            mobileTelephone?: null | string;
            /** @description The client's occupation */
            occupation?: null | string;
            /** @description The client's postal or ZIP code */
            postalCode?: null | string;
            /** @description The client's preferred name to use in communications */
            preferredName?: null | string;
            /** @description The client's salutation or title (e.g., "Mr", "Mrs", "Dr") */
            salutation?: null | string;
            /** @description The client's biological sex */
            sex?: null | string;
            /** @description The client's state or county */
            state?: null | string;
            /** @description The client's street address */
            streetAddress?: null | string;
            /** @description The client's time zone as an IANA time zone identifier (e.g. "Australia/Sydney") */
            timeZone?: null | string;
            /** @description The client's work telephone number */
            workTelephone?: null | string;
            /** @description The client's custom category */
            customCategory?: null | components["schemas"]["ClientProfileCustomCategoryResponseNoLinks"];
            /** @description User defined custom status for the client profile, can be used to track internal workflow or categorization */
            customStatus?: null | components["schemas"]["ClientProfileCustomStatusResponseNoLinks"];
            /** @description How the client found out about the practice (marketing source) */
            marketingSource?: null | components["schemas"]["ClientProfileMarketingSourceResponseNoLinks"];
            /** @description The client's primary practitioner information */
            primaryPractitioner?: null | components["schemas"]["PrimaryPractitionerResponseNoLinks"];
            /** @description The client's preferred pronouns (e.g., "she/her", "he/him", "they/them") */
            pronouns?: null | components["schemas"]["ClientProfilePronounResponseNoLinks"];
            /**
             * @description The client classifications assigned to the client. Empty array when the client has no
             *     classifications.
             */
            clientClassifications: components["schemas"]["ClientProfileClientClassificationResponseNoLinks"][];
            /**
             * @description The client's active insurance policies. Empty array when the client has no
             *     active insurers.
             */
            clientInsurers: components["schemas"]["ClientProfileInsurerResponse"][];
            /**
             * @description Every active custom profile field configured for the client's profile role(s), in display
             *     order. Each field's Value is the client's entered value (choice fields resolved to their
             *     option label(s)) or null when no value has been entered. Empty array only when no custom
             *     profile fields are configured for the client's role(s).
             */
            customProfileFields: components["schemas"]["ClientProfileCustomFieldResponseNoLinks"][];
            /** @description Roles assigned to the profile (e.g. "Client", "Contact", "Shared", "Third Party", "Referrer"). A profile can have multiple roles. */
            profileRoles: ("Client" | "Referrer" | "Contact" | "Third Party" | "Shared")[];
        };
        /** @enum {string} */
        ClientSalutation: "Mr" | "Ms" | "Mrs" | "Miss" | "Mx" | "Master" | "Dr" | "Prof";
        /** @description Request body for creating a client profile. */
        CreateClientProfileClientRequest: {
            /** @description The client's salutation or title. */
            salutation?: null | components["schemas"]["ClientSalutation"];
            /** @description The client's first name. Required. Max 100 characters. */
            firstName?: null | string;
            /** @description The client's middle name. Max 80 characters. */
            middleName?: null | string;
            /** @description The client's last name. Max 80 characters. */
            lastName?: null | string;
            /** @description The client's preferred name. Max 200 characters. */
            preferredName?: null | string;
            /**
             * Format: date
             * @description The client's date of birth (YYYY-MM-DD). Must not be in the future.
             */
            dateOfBirth?: null | string;
            /**
             * Format: int32
             * @description Identifier of the sex lookup.
             */
            sexId?: null | number | string;
            /**
             * Format: int32
             * @description Identifier of the gender identity lookup.
             */
            genderIdentityId?: null | number | string;
            /**
             * Format: int32
             * @description Identifier of the pronoun lookup.
             */
            pronounId?: null | number | string;
            /** @description Additional free-text identity note. Max 50 characters. */
            identity?: null | string;
            /** @description The client's mobile phone number. Max 25 characters. */
            mobileTelephone?: null | string;
            /** @description The client's work telephone number. Max 25 characters. */
            workTelephone?: null | string;
            /** @description The client's home telephone number. Max 25 characters. */
            homeTelephone?: null | string;
            /** @description The client's email address. Max 150 characters. */
            emailAddress?: null | string;
            /** @description The client's street address. Max 255 characters. */
            streetAddress?: null | string;
            /** @description The client's city/suburb. Max 50 characters. */
            city?: null | string;
            /** @description The client's state/region. Max 50 characters. Validated against US states when country is "US". */
            state?: null | string;
            /** @description The client's postal/ZIP code. Max 20 characters. */
            postalCode?: null | string;
            /** @description The client's country as an ISO 3166-1 alpha-2 code (e.g. "AU"). Unrecognized codes are rejected. See the [ISO 3166-1 alpha-2 country codes](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements). */
            country?: null | string;
            /** @description The client's time zone as a case-sensitive IANA time zone identifier (e.g. "Australia/Sydney"). Unrecognized or unsupported identifiers are rejected. See the [IANA time zone list](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List). */
            timeZone?: null | string;
            /** @description The name under which the client's records should be filed. Max 80 characters. */
            fileUnder?: null | string;
            /** @description The client's occupation. Max 100 characters. */
            occupation?: null | string;
            /** @description The client's company name. Max 100 characters. */
            companyName?: null | string;
            /** @description Free-form notes about the client. Max 60000 characters. */
            clientNotes?: null | string;
            /** @description The client's US Social Security number (9 digits, optionally formatted as ###-##-####). Max 11 characters. Encrypted at rest. */
            usSocialSecurityNo?: null | string;
            /**
             * Format: int32
             * @description Identifier of the marketing source ("How did you hear about us?").
             */
            marketingSourceId?: null | number | string;
            /**
             * Format: int32
             * @description Identifier of the custom status to assign to the client profile.
             */
            customStatusId?: null | number | string;
            /**
             * Format: int32
             * @description Identifier of the custom category to assign to the client profile.
             */
            customCategoryId?: null | number | string;
            /**
             * Format: int32
             * @description Identifier of the primary practitioner for the client. Defaults to the supplier group's default practitioner when omitted.
             */
            primaryPractitionerId?: null | number | string;
            /** @description When true (the default), the request is rejected with 409 Conflict if potential duplicate client profiles are found. Set to false to create the profile regardless of duplicates. */
            checkDuplicates?: boolean;
        };
        /** @description A single invoice allocation within a create-payment request. */
        CreatePaymentInvoiceAllocationRequest: {
            /**
             * Format: int32
             * @description The identifier of the invoice to allocate the payment to
             */
            invoiceId?: number | string;
            /**
             * Format: double
             * @description The amount of the payment to allocate to this invoice. Must have at most 2 decimal places
             *     and be greater than zero.
             */
            amount?: number | string;
            /**
             * Format: date
             * @description The date the allocation is applied. Defaults to the payment received date when omitted.
             */
            dateApplied?: null | string;
        };
        /** @description Request to create a manual payment, optionally allocating it to one or more invoices. */
        CreatePaymentRequest: {
            /**
             * Format: int32
             * @description The identifier of the client the payment belongs to
             */
            clientId?: number | string;
            /**
             * Format: double
             * @description The payment amount. Must have at most 2 decimal places and not exceed 99999999.99
             */
            amount?: number | string;
            /**
             * Format: int32
             * @description The identifier of the payment method
             */
            paymentMethodId?: number | string;
            /**
             * Format: date
             * @description The date the payment was received
             */
            receivedAt?: string;
            /**
             * Format: int32
             * @description The identifier of the location associated with the payment
             */
            locationId?: number | string;
            /** @description Notes or comments about the payment */
            notes?: null | string;
            /** @description The person who made the payment */
            paidBy?: null | components["schemas"]["PaymentPayer"];
            /**
             * @description Invoices to allocate the payment to. The sum of allocation amounts must not exceed the
             *     payment amount, and every invoice must belong to the same client. Leave empty (or null) to
             *     record an unallocated payment.
             */
            invoiceAllocations?: components["schemas"]["CreatePaymentInvoiceAllocationRequest"][];
        };
        CustomCategoryResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description True if the custom category is currently active in the system */
            isActive: boolean;
            /** @description The name of the custom category */
            name: string;
            /** @description Links for navigating related resources */
            links?: components["schemas"]["ZandaApiLink"][];
        };
        CustomCategoryResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description True if the custom category is currently active in the system */
            isActive: boolean;
            /** @description The name of the custom category */
            name: string;
        };
        /** @enum {string} */
        CustomFieldType: "Input" | "TextArea" | "Select" | "MultiSelect" | "Toggle" | "Numeric" | "Date";
        CustomProfileFieldOptionResponse: {
            /** @description The value of the option */
            value: string;
            /** @description True if the option is shown when filling in the field for a client. */
            isVisible: boolean;
        };
        CustomProfileFieldResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description True if the custom profile field is currently active. */
            isActive: boolean;
            /** @description The name of the custom profile field. */
            name: string;
            /** @description The input type of the field. */
            type: components["schemas"]["CustomFieldType"];
            /**
             * @description The options defined for choice-based field types.
             *     The collection is empty for field types that do not use options.
             */
            options: components["schemas"]["CustomProfileFieldOptionResponse"][];
            /** @description The profile roles this field applies to. */
            profileRoles: ("Client" | "Referrer" | "Contact" | "Third Party" | "Shared")[];
            /** @description Links for navigating related resources */
            links?: components["schemas"]["ZandaApiLink"][];
        };
        CustomProfileFieldResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description True if the custom profile field is currently active. */
            isActive: boolean;
            /** @description The name of the custom profile field. */
            name: string;
            /** @description The input type of the field. */
            type: components["schemas"]["CustomFieldType"];
            /**
             * @description The options defined for choice-based field types.
             *     The collection is empty for field types that do not use options.
             */
            options: components["schemas"]["CustomProfileFieldOptionResponse"][];
            /** @description The profile roles this field applies to. */
            profileRoles: ("Client" | "Referrer" | "Contact" | "Third Party" | "Shared")[];
        };
        CustomStatusResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description True if the custom status is currently active in the system */
            isActive: boolean;
            /** @description The name of the custom status */
            name: string;
            /** @description Links for navigating related resources */
            links?: components["schemas"]["ZandaApiLink"][];
        };
        CustomStatusResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description True if the custom status is currently active in the system */
            isActive: boolean;
            /** @description The name of the custom status */
            name: string;
        };
        EditClientProfileRequest: {
            /**
             * @description The client's salutation or title. Send null to clear.
             * @enum {null|string}
             */
            salutation?: "Mr" | "Ms" | "Mrs" | "Miss" | "Mx" | "Master" | "Dr" | "Prof" | null;
            /** @description The client's first name. Required, cannot be null or empty. Max 100 characters. */
            firstName?: null | string;
            /** @description The client's middle name. Max 80 characters. */
            middleName?: null | string;
            /** @description The client's last name. Max 80 characters. */
            lastName?: null | string;
            /** @description The client's preferred name. Max 200 characters. */
            preferredName?: null | string;
            /**
             * Format: date
             * @description The client's date of birth (YYYY-MM-DD). Must not be in the future.
             */
            dateOfBirth?: string;
            /**
             * Format: int32
             * @description Identifier of the sex lookup.
             */
            sexId?: number;
            /**
             * Format: int32
             * @description Identifier of the gender identity lookup.
             */
            genderIdentityId?: number;
            /**
             * Format: int32
             * @description Identifier of the pronoun lookup.
             */
            pronounId?: number;
            /** @description Additional free-text identity note. Max 50 characters. */
            identity?: null | string;
            /** @description The client's mobile phone number. Max 25 characters. */
            mobileTelephone?: null | string;
            /** @description The client's work telephone number. Max 25 characters. */
            workTelephone?: null | string;
            /** @description The client's home telephone number. Max 25 characters. */
            homeTelephone?: null | string;
            /** @description The client's email address. Max 150 characters. */
            emailAddress?: null | string;
            /** @description The client's street address. Max 255 characters. */
            streetAddress?: null | string;
            /** @description The client's city/suburb. Max 50 characters. */
            city?: null | string;
            /** @description The client's state/region. Max 50 characters. Validated against US states when country is "US". */
            state?: null | string;
            /** @description The client's postal/ZIP code. Max 20 characters. */
            postalCode?: null | string;
            /** @description The client's country as an ISO 3166-1 alpha-2 code (e.g. "AU"). Unrecognized codes are rejected. See the [ISO 3166-1 alpha-2 country codes](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements). */
            country?: null | string;
            /** @description The client's time zone as a case-sensitive IANA time zone identifier (e.g. "Australia/Sydney"). Unrecognized or unsupported identifiers are rejected. See the [IANA time zone list](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List). */
            timeZone?: null | string;
            /** @description The name under which the client's records should be filed. Max 80 characters. */
            fileUnder?: null | string;
            /** @description The client's occupation. Max 100 characters. */
            occupation?: null | string;
            /** @description The client's company name. Max 100 characters. */
            companyName?: null | string;
            /** @description Free-form notes about the client. Max 60000 characters. */
            clientNotes?: null | string;
            /** @description The client's US Social Security number (9 digits, optionally formatted as ###-##-####). Max 11 characters. Encrypted at rest. */
            usSocialSecurityNo?: null | string;
            /**
             * Format: int32
             * @description Identifier of the marketing source ("How did you hear about us?").
             */
            marketingSourceId?: number;
            /**
             * Format: int32
             * @description Identifier of the custom status to assign to the client profile.
             */
            customStatusId?: number;
            /**
             * Format: int32
             * @description Identifier of the custom category to assign to the client profile.
             */
            customCategoryId?: number;
            /**
             * Format: int32
             * @description Identifier of the primary practitioner for the client.
             */
            primaryPractitionerId?: number;
        };
        GenderIdentityResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description True if the gender identity is currently active in the system */
            isActive: boolean;
            /** @description The name of the gender identity */
            name: string;
            /** @description Links for navigating related resources */
            links?: components["schemas"]["ZandaApiLink"][];
        };
        GenderIdentityResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description True if the gender identity is currently active in the system */
            isActive: boolean;
            /** @description The name of the gender identity */
            name: string;
        };
        GenderResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description True if the gender is currently active in the system */
            isActive: boolean;
            /** @description The name of the gender */
            name: string;
            /** @description Links for navigating related resources */
            links?: components["schemas"]["ZandaApiLink"][];
        };
        GenderResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description True if the gender is currently active in the system */
            isActive: boolean;
            /** @description The name of the gender */
            name: string;
        };
        HttpValidationProblemDetails: {
            type?: null | string;
            title?: null | string;
            /** Format: int32 */
            status?: null | number | string;
            detail?: null | string;
            instance?: null | string;
            errors?: {
                [key: string]: string[];
            };
        };
        InsurerResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description True if the insurer is currently active in the system */
            isActive: boolean;
            /**
             * Format: date-time
             * @description The date and time when the record was last modified
             */
            lastModified?: unknown;
            /** @description The name of the insurance company or provider */
            name: string;
            scheme?: components["schemas"]["Scheme"];
            /** @description Links for navigating related resources */
            links?: components["schemas"]["ZandaApiLink"][];
        };
        InsurerResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description True if the insurer is currently active in the system */
            isActive: boolean;
            /**
             * Format: date-time
             * @description The date and time when the record was last modified
             */
            lastModified?: unknown;
            /** @description The name of the insurance company or provider */
            name: string;
            scheme?: components["schemas"]["Scheme"];
        };
        InvoiceAppointmentResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /**
             * Format: date-time
             * @description The date and time when the appointment occurred
             */
            appointmentStart?: unknown;
            links: components["schemas"]["ZandaApiLink"][];
        };
        InvoiceAppointmentResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /**
             * Format: date-time
             * @description The date and time when the appointment occurred
             */
            appointmentStart?: unknown;
        };
        InvoiceClientResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the client associated with this invoice */
            name: string;
            links: components["schemas"]["ZandaApiLink"][];
        };
        InvoiceClientResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the client associated with this invoice */
            name: string;
        };
        InvoiceInsurerResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the insurance company or provider */
            name: string;
            links: components["schemas"]["ZandaApiLink"][];
        };
        InvoiceInsurerResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the insurance company or provider */
            name: string;
        };
        /** @description Represents billable item on the invoice */
        InvoiceItemResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /**
             * Format: double
             * @description The amount charged per unit for this invoice item, after any discount is applied
             */
            amountCharged: number | string;
            /** @description The name of the billable item included in this invoice */
            name: string;
            links: components["schemas"]["ZandaApiLink"][];
        };
        /** @description Represents billable item on the invoice */
        InvoiceItemResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /**
             * Format: double
             * @description The amount charged per unit for this invoice item, after any discount is applied
             */
            amountCharged: number | string;
            /** @description The name of the billable item included in this invoice */
            name: string;
        };
        InvoiceLocationResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the location where services were provided */
            name: string;
            links: components["schemas"]["ZandaApiLink"][];
        };
        InvoiceLocationResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the location where services were provided */
            name: string;
        };
        InvoicePaymentResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /**
             * Format: double
             * @description The amount of this payment allocated to the invoice
             */
            amount?: number | string;
            links: components["schemas"]["ZandaApiLink"][];
        };
        InvoicePaymentResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /**
             * Format: double
             * @description The amount of this payment allocated to the invoice
             */
            amount?: number | string;
        };
        InvoicePractitionerResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the practitioner who provided the service */
            name: string;
            links: components["schemas"]["ZandaApiLink"][];
        };
        InvoicePractitionerResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the practitioner who provided the service */
            name: string;
        };
        InvoiceReferralResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the referring party or source */
            name: string;
            links: components["schemas"]["ZandaApiLink"][];
        };
        InvoiceReferralResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the referring party or source */
            name: string;
        };
        InvoiceResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /**
             * Format: date-time
             * @description The date and time when the invoice was emailed to the client (if applicable)
             */
            emailedAt?: unknown;
            /**
             * Format: date-time
             * @description The date the invoice was issued
             */
            invoiceDate: unknown;
            /**
             * Format: date-time
             * @description The date by which payment is due (if applicable)
             */
            invoiceDueDate?: unknown;
            /**
             * Format: int32
             * @description The invoice number
             */
            invoiceNumber: number | string;
            /** @description False if invoice has been deleted; true otherwise */
            isActive: boolean;
            /**
             * Format: date-time
             * @description The date and time when the record was last modified
             */
            lastModified?: unknown;
            /** @description The name of the entity responsible for payment (if different from the primary client) */
            payableBy?: null | string;
            /**
             * Format: double
             * @description The total amount charged on this invoice before payments
             */
            totalCharges: number | string;
            /**
             * Format: double
             * @description The total amount of payments received for this invoice
             */
            totalPayments: number | string;
            /**
             * Format: double
             * @description The total amount of tax charged on this invoice
             */
            totalTax: number | string;
            /** @description The appointment related to this invoice (if applicable) */
            appointment?: null | components["schemas"]["InvoiceAppointmentResponse"];
            /** @description The location where services were provided */
            location: components["schemas"]["InvoiceLocationResponse"];
            /** @description The practitioner that provided the service */
            providedBy: components["schemas"]["InvoicePractitionerResponse"];
            /** @description The client associated with this invoice */
            providedTo: components["schemas"]["InvoiceClientResponse"];
            /** @description The referral information associated with this invoice (if applicable) */
            referral?: null | components["schemas"]["InvoiceReferralResponse"];
            /** @description List of insurers involved with this invoice */
            insurers?: null | components["schemas"]["InvoiceInsurerResponse"][];
            /** @description List of billable items (products and services) included in this invoice */
            invoiceItems?: null | components["schemas"]["InvoiceItemResponse"][];
            /** @description List of payments made against this invoice */
            invoicePayments?: null | components["schemas"]["InvoicePaymentResponse"][];
            /** @description Links for navigating related resources */
            links?: components["schemas"]["ZandaApiLink"][];
        };
        InvoiceResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /**
             * Format: date-time
             * @description The date and time when the invoice was emailed to the client (if applicable)
             */
            emailedAt?: unknown;
            /**
             * Format: date-time
             * @description The date the invoice was issued
             */
            invoiceDate: unknown;
            /**
             * Format: date-time
             * @description The date by which payment is due (if applicable)
             */
            invoiceDueDate?: unknown;
            /**
             * Format: int32
             * @description The invoice number
             */
            invoiceNumber: number | string;
            /** @description False if invoice has been deleted; true otherwise */
            isActive: boolean;
            /**
             * Format: date-time
             * @description The date and time when the record was last modified
             */
            lastModified?: unknown;
            /** @description The name of the entity responsible for payment (if different from the primary client) */
            payableBy?: null | string;
            /**
             * Format: double
             * @description The total amount charged on this invoice before payments
             */
            totalCharges: number | string;
            /**
             * Format: double
             * @description The total amount of payments received for this invoice
             */
            totalPayments: number | string;
            /**
             * Format: double
             * @description The total amount of tax charged on this invoice
             */
            totalTax: number | string;
            /** @description The appointment related to this invoice (if applicable) */
            appointment?: null | components["schemas"]["InvoiceAppointmentResponseNoLinks"];
            /** @description The location where services were provided */
            location: components["schemas"]["InvoiceLocationResponseNoLinks"];
            /** @description The practitioner that provided the service */
            providedBy: components["schemas"]["InvoicePractitionerResponseNoLinks"];
            /** @description The client associated with this invoice */
            providedTo: components["schemas"]["InvoiceClientResponseNoLinks"];
            /** @description The referral information associated with this invoice (if applicable) */
            referral?: null | components["schemas"]["InvoiceReferralResponseNoLinks"];
            /** @description List of insurers involved with this invoice */
            insurers?: null | components["schemas"]["InvoiceInsurerResponseNoLinks"][];
            /** @description List of billable items (products and services) included in this invoice */
            invoiceItems?: null | components["schemas"]["InvoiceItemResponseNoLinks"][];
            /** @description List of payments made against this invoice */
            invoicePayments?: null | components["schemas"]["InvoicePaymentResponseNoLinks"][];
        };
        LocationResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The city or suburb where the location is situated */
            city?: null | string;
            /** @description True if the location is currently active and available for appointments */
            isActive: boolean;
            /**
             * Format: date-time
             * @description The date and time when the record was last modified
             */
            lastModified?: unknown;
            /** @description The name of the location */
            name: string;
            /** @description The postal code or ZIP code of the location */
            postalCode?: null | string;
            serviceModality: components["schemas"]["ServiceModality"];
            /** @description The state or province of the location */
            state?: null | string;
            /** @description The street address of the location */
            streetAddress?: null | string;
            /** @description Links for navigating related resources */
            links?: components["schemas"]["ZandaApiLink"][];
        };
        LocationResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The city or suburb where the location is situated */
            city?: null | string;
            /** @description True if the location is currently active and available for appointments */
            isActive: boolean;
            /**
             * Format: date-time
             * @description The date and time when the record was last modified
             */
            lastModified?: unknown;
            /** @description The name of the location */
            name: string;
            /** @description The postal code or ZIP code of the location */
            postalCode?: null | string;
            serviceModality: components["schemas"]["ServiceModality"];
            /** @description The state or province of the location */
            state?: null | string;
            /** @description The street address of the location */
            streetAddress?: null | string;
        };
        MarketingSourceResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description True if the marketing source is currently active in the system */
            isActive: boolean;
            /** @description The name of the marketing source */
            name: string;
            /** @description Links for navigating related resources */
            links?: components["schemas"]["ZandaApiLink"][];
        };
        MarketingSourceResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description True if the marketing source is currently active in the system */
            isActive: boolean;
            /** @description The name of the marketing source */
            name: string;
        };
        PagedZandaApiResponseOfAppointmentResponse: {
            items: components["schemas"]["ZandaApiResponseOfAppointmentResponse"][];
            links: components["schemas"]["ZandaApiLink"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfAppointmentResponseNoLinks: {
            items: components["schemas"]["ZandaApiResponseOfAppointmentResponseNoLinks"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfBillableItemResponse: {
            items: components["schemas"]["ZandaApiResponseOfBillableItemResponse"][];
            links: components["schemas"]["ZandaApiLink"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfBillableItemResponseNoLinks: {
            items: components["schemas"]["ZandaApiResponseOfBillableItemResponseNoLinks"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfClientClassificationResponse: {
            items: components["schemas"]["ZandaApiResponseOfClientClassificationResponse"][];
            links: components["schemas"]["ZandaApiLink"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfClientClassificationResponseNoLinks: {
            items: components["schemas"]["ZandaApiResponseOfClientClassificationResponseNoLinks"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfClientProfileResponse: {
            items: components["schemas"]["ZandaApiResponseOfClientProfileResponse"][];
            links: components["schemas"]["ZandaApiLink"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfClientProfileResponseNoLinks: {
            items: components["schemas"]["ZandaApiResponseOfClientProfileResponseNoLinks"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfCustomCategoryResponse: {
            items: components["schemas"]["ZandaApiResponseOfCustomCategoryResponse"][];
            links: components["schemas"]["ZandaApiLink"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfCustomCategoryResponseNoLinks: {
            items: components["schemas"]["ZandaApiResponseOfCustomCategoryResponseNoLinks"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfCustomProfileFieldResponse: {
            items: components["schemas"]["ZandaApiResponseOfCustomProfileFieldResponse"][];
            links: components["schemas"]["ZandaApiLink"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfCustomProfileFieldResponseNoLinks: {
            items: components["schemas"]["ZandaApiResponseOfCustomProfileFieldResponseNoLinks"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfCustomStatusResponse: {
            items: components["schemas"]["ZandaApiResponseOfCustomStatusResponse"][];
            links: components["schemas"]["ZandaApiLink"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfCustomStatusResponseNoLinks: {
            items: components["schemas"]["ZandaApiResponseOfCustomStatusResponseNoLinks"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfGenderIdentityResponse: {
            items: components["schemas"]["ZandaApiResponseOfGenderIdentityResponse"][];
            links: components["schemas"]["ZandaApiLink"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfGenderIdentityResponseNoLinks: {
            items: components["schemas"]["ZandaApiResponseOfGenderIdentityResponseNoLinks"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfGenderResponse: {
            items: components["schemas"]["ZandaApiResponseOfGenderResponse"][];
            links: components["schemas"]["ZandaApiLink"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfGenderResponseNoLinks: {
            items: components["schemas"]["ZandaApiResponseOfGenderResponseNoLinks"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfInsurerResponse: {
            items: components["schemas"]["ZandaApiResponseOfInsurerResponse"][];
            links: components["schemas"]["ZandaApiLink"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfInsurerResponseNoLinks: {
            items: components["schemas"]["ZandaApiResponseOfInsurerResponseNoLinks"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfInvoiceResponse: {
            items: components["schemas"]["ZandaApiResponseOfInvoiceResponse"][];
            links: components["schemas"]["ZandaApiLink"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfInvoiceResponseNoLinks: {
            items: components["schemas"]["ZandaApiResponseOfInvoiceResponseNoLinks"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfLocationResponse: {
            items: components["schemas"]["ZandaApiResponseOfLocationResponse"][];
            links: components["schemas"]["ZandaApiLink"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfLocationResponseNoLinks: {
            items: components["schemas"]["ZandaApiResponseOfLocationResponseNoLinks"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfMarketingSourceResponse: {
            items: components["schemas"]["ZandaApiResponseOfMarketingSourceResponse"][];
            links: components["schemas"]["ZandaApiLink"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfMarketingSourceResponseNoLinks: {
            items: components["schemas"]["ZandaApiResponseOfMarketingSourceResponseNoLinks"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfPaymentMethodResponse: {
            items: components["schemas"]["ZandaApiResponseOfPaymentMethodResponse"][];
            links: components["schemas"]["ZandaApiLink"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfPaymentMethodResponseNoLinks: {
            items: components["schemas"]["ZandaApiResponseOfPaymentMethodResponseNoLinks"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfPaymentResponse: {
            items: components["schemas"]["ZandaApiResponseOfPaymentResponse"][];
            links: components["schemas"]["ZandaApiLink"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfPaymentResponseNoLinks: {
            items: components["schemas"]["ZandaApiResponseOfPaymentResponseNoLinks"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfPractitionerResponse: {
            items: components["schemas"]["ZandaApiResponseOfPractitionerResponse"][];
            links: components["schemas"]["ZandaApiLink"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfPractitionerResponseNoLinks: {
            items: components["schemas"]["ZandaApiResponseOfPractitionerResponseNoLinks"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfPronounResponse: {
            items: components["schemas"]["ZandaApiResponseOfPronounResponse"][];
            links: components["schemas"]["ZandaApiLink"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfPronounResponseNoLinks: {
            items: components["schemas"]["ZandaApiResponseOfPronounResponseNoLinks"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfReferralResponse: {
            items: components["schemas"]["ZandaApiResponseOfReferralResponse"][];
            links: components["schemas"]["ZandaApiLink"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfReferralResponseNoLinks: {
            items: components["schemas"]["ZandaApiResponseOfReferralResponseNoLinks"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfSexResponse: {
            items: components["schemas"]["ZandaApiResponseOfSexResponse"][];
            links: components["schemas"]["ZandaApiLink"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PagedZandaApiResponseOfSexResponseNoLinks: {
            items: components["schemas"]["ZandaApiResponseOfSexResponseNoLinks"][];
            /** Format: int32 */
            page: number | string;
            /** Format: int32 */
            pageSize: number | string;
            hasNextPage: boolean;
        };
        PaymentClientResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /**
             * Format: int32
             * @description The unique client number identifying the client who made the payment
             */
            clientNumber: number | string;
            links: components["schemas"]["ZandaApiLink"][];
        };
        PaymentClientResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /**
             * Format: int32
             * @description The unique client number identifying the client who made the payment
             */
            clientNumber: number | string;
        };
        PaymentLocationEmbeddedResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the location where the payment was made */
            name: string;
            links: components["schemas"]["ZandaApiLink"][];
        };
        PaymentLocationEmbeddedResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the location where the payment was made */
            name: string;
        };
        PaymentMethodEmbeddedResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the payment method (e.g., "Credit Card", "Cash", "Check") */
            name: string;
            links: components["schemas"]["ZandaApiLink"][];
        };
        PaymentMethodEmbeddedResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The name of the payment method (e.g., "Credit Card", "Cash", "Check") */
            name: string;
        };
        PaymentMethodResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description True if the payment method is currently active in the system */
            isActive: boolean;
            /**
             * @description Indicates whether the payment method is processed through an integrated
             *     payment provider (e.g. Tyro, Stripe) or is a manual payment method
             *     (e.g. Cash, Bank Transfer) where the transaction is recorded without
             *     automated processing.
             */
            isIntegrated: boolean;
            /** @description The name of the payment method */
            name: string;
            /** @description Links for navigating related resources */
            links?: components["schemas"]["ZandaApiLink"][];
        };
        PaymentMethodResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description True if the payment method is currently active in the system */
            isActive: boolean;
            /**
             * @description Indicates whether the payment method is processed through an integrated
             *     payment provider (e.g. Tyro, Stripe) or is a manual payment method
             *     (e.g. Cash, Bank Transfer) where the transaction is recorded without
             *     automated processing.
             */
            isIntegrated: boolean;
            /** @description The name of the payment method */
            name: string;
        };
        /** @enum {string} */
        PaymentPayer: "Client" | "Insurer";
        PaymentResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description True if the payment is currently active in the system */
            isActive: boolean;
            /**
             * Format: date-time
             * @description The date and time when the record was last modified
             */
            lastModified?: unknown;
            /** @description Additional notes or comments about the payment */
            notes?: null | string;
            /** @description The person who made the payment */
            paidBy?: null | string;
            /**
             * Format: date
             * @description The date the payment was received
             */
            receivedAt: string;
            /**
             * Format: double
             * @description The total amount of the payment
             */
            total: number | string;
            /** @description The client who made this payment */
            client: components["schemas"]["PaymentClientResponse"];
            /** @description The location where the payment was made */
            location: components["schemas"]["PaymentLocationEmbeddedResponse"];
            /** @description The payment method used */
            method: components["schemas"]["PaymentMethodEmbeddedResponse"];
            /** @description Links for navigating related resources */
            links?: components["schemas"]["ZandaApiLink"][];
        };
        PaymentResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description True if the payment is currently active in the system */
            isActive: boolean;
            /**
             * Format: date-time
             * @description The date and time when the record was last modified
             */
            lastModified?: unknown;
            /** @description Additional notes or comments about the payment */
            notes?: null | string;
            /** @description The person who made the payment */
            paidBy?: null | string;
            /**
             * Format: date
             * @description The date the payment was received
             */
            receivedAt: string;
            /**
             * Format: double
             * @description The total amount of the payment
             */
            total: number | string;
            /** @description The client who made this payment */
            client: components["schemas"]["PaymentClientResponseNoLinks"];
            /** @description The location where the payment was made */
            location: components["schemas"]["PaymentLocationEmbeddedResponseNoLinks"];
            /** @description The payment method used */
            method: components["schemas"]["PaymentMethodEmbeddedResponseNoLinks"];
        };
        PractitionerResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The practitioner's display name */
            displayName: string;
            /** @description The practitioner's email address */
            emailAddress?: null | string;
            /** @description True if the practitioner is currently active in the system */
            isActive: boolean;
            /** @description The practitioner's professional job title */
            jobTitle?: null | string;
            /**
             * Format: date-time
             * @description The date and time when the record was last modified
             */
            lastModified?: unknown;
            /** @description The practitioner's legal name */
            legalName?: null | string;
            /** @description The practitioner's mobile phone number */
            mobileTelephone?: null | string;
            /** @description National Provider Identifier (NPI) used in US healthcare */
            npiNumber?: null | string;
            /** @description The healthcare provider's profession (e.g., "Physical Therapist", "Physician") */
            profession?: null | string;
            /** @description Tax identification number for billing purposes */
            taxId?: null | string;
            /** @description Healthcare Provider Taxonomy Code defining the practitioner's classification */
            taxonomyCode?: null | string;
            /** @description Links for navigating related resources */
            links?: components["schemas"]["ZandaApiLink"][];
        };
        PractitionerResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The practitioner's display name */
            displayName: string;
            /** @description The practitioner's email address */
            emailAddress?: null | string;
            /** @description True if the practitioner is currently active in the system */
            isActive: boolean;
            /** @description The practitioner's professional job title */
            jobTitle?: null | string;
            /**
             * Format: date-time
             * @description The date and time when the record was last modified
             */
            lastModified?: unknown;
            /** @description The practitioner's legal name */
            legalName?: null | string;
            /** @description The practitioner's mobile phone number */
            mobileTelephone?: null | string;
            /** @description National Provider Identifier (NPI) used in US healthcare */
            npiNumber?: null | string;
            /** @description The healthcare provider's profession (e.g., "Physical Therapist", "Physician") */
            profession?: null | string;
            /** @description Tax identification number for billing purposes */
            taxId?: null | string;
            /** @description Healthcare Provider Taxonomy Code defining the practitioner's classification */
            taxonomyCode?: null | string;
        };
        PrimaryPractitionerResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            links: components["schemas"]["ZandaApiLink"][];
        };
        PrimaryPractitionerResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
        };
        ProblemDetails: {
            type?: null | string;
            title?: null | string;
            /** Format: int32 */
            status?: null | number | string;
            detail?: null | string;
            instance?: null | string;
        };
        PronounResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The accusative (object) form (e.g., "her", "him", "them") */
            accusative?: null | string;
            /** @description True if the pronoun is currently active in the system */
            isActive: boolean;
            /** @description True if the pronoun is a system default (integrated); false if it was defined by the supplier */
            isIntegrated: boolean;
            /** @description The display name of the pronoun set (e.g., "she/her", "he/him", "they/them") */
            name: string;
            /** @description The nominative (subject) form (e.g., "she", "he", "they") */
            nominative?: null | string;
            /** @description The predicative possessive form (e.g., "hers", "his", "theirs") */
            predicativePossessive?: null | string;
            /** @description The pronominal possessive form (e.g., "her", "his", "their") */
            pronominalPossessive?: null | string;
            /** @description The reflexive form (e.g., "herself", "himself", "themself") */
            reflexive?: null | string;
            /** @description Links for navigating related resources */
            links?: components["schemas"]["ZandaApiLink"][];
        };
        PronounResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description The accusative (object) form (e.g., "her", "him", "them") */
            accusative?: null | string;
            /** @description True if the pronoun is currently active in the system */
            isActive: boolean;
            /** @description True if the pronoun is a system default (integrated); false if it was defined by the supplier */
            isIntegrated: boolean;
            /** @description The display name of the pronoun set (e.g., "she/her", "he/him", "they/them") */
            name: string;
            /** @description The nominative (subject) form (e.g., "she", "he", "they") */
            nominative?: null | string;
            /** @description The predicative possessive form (e.g., "hers", "his", "theirs") */
            predicativePossessive?: null | string;
            /** @description The pronominal possessive form (e.g., "her", "his", "their") */
            pronominalPossessive?: null | string;
            /** @description The reflexive form (e.g., "herself", "himself", "themself") */
            reflexive?: null | string;
        };
        ReferralClientResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            links: components["schemas"]["ZandaApiLink"][];
        };
        ReferralClientResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
        };
        ReferralResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /**
             * Format: date
             * @description The date when the referral expires
             */
            endDate: null | string;
            /** @description True if the referral is currently active in the system */
            isActive: boolean;
            /**
             * Format: date-time
             * @description The date and time when the record was last modified
             */
            lastModified?: unknown;
            /** @description The name of the referring party or source */
            name: string;
            /** @description The provider number of the referrer */
            providerNumber: string;
            /** @description The type of the referrer (e.g. General Practitioner, Specialist) */
            referrerType: null | string;
            /**
             * Format: date
             * @description The date when the referral becomes valid
             */
            startDate: null | string;
            client: components["schemas"]["ReferralClientResponse"];
            /** @description Links for navigating related resources */
            links?: components["schemas"]["ZandaApiLink"][];
        };
        ReferralResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /**
             * Format: date
             * @description The date when the referral expires
             */
            endDate: null | string;
            /** @description True if the referral is currently active in the system */
            isActive: boolean;
            /**
             * Format: date-time
             * @description The date and time when the record was last modified
             */
            lastModified?: unknown;
            /** @description The name of the referring party or source */
            name: string;
            /** @description The provider number of the referrer */
            providerNumber: string;
            /** @description The type of the referrer (e.g. General Practitioner, Specialist) */
            referrerType: null | string;
            /**
             * Format: date
             * @description The date when the referral becomes valid
             */
            startDate: null | string;
            client: components["schemas"]["ReferralClientResponseNoLinks"];
        };
        /** @enum {string} */
        Scheme: "Medicare (Aust)" | "NHI (NZ)" | "DVA" | "NDIS" | "Standard" | "Medicare (US)" | "Medicaid" | "TRICARE" | "CHAMPVA" | "Group Health Plan" | "FECA" | "Black Lung" | "Other";
        /** @enum {string} */
        ServiceModality: "In Person" | "Telehealth Video Call" | "Phone";
        SexResponse: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description True if the sex is currently active in the system */
            isActive: boolean;
            /** @description The name of the sex */
            name: string;
            /** @description Links for navigating related resources */
            links?: components["schemas"]["ZandaApiLink"][];
        };
        SexResponseNoLinks: {
            /**
             * Format: int32
             * @description Unique identifier
             */
            id?: number | string;
            /** @description True if the sex is currently active in the system */
            isActive: boolean;
            /** @description The name of the sex */
            name: string;
        };
        UpdateInvoiceRequest: {
            /**
             * Format: int32
             * @description Practitioner the invoice is billed under. Cannot be cleared. Cannot be modified on linked invoices.
             */
            practitionerId?: number;
            /**
             * Format: date-time
             * @description Invoice date. Cannot be cleared. Cannot be modified on linked invoices.
             */
            invoiceDate?: null | string;
            /**
             * Format: date-time
             * @description Invoice due date. Send `null` to clear.
             */
            invoiceDueDate?: null | string;
            /**
             * Format: int32
             * @description Appointment associated with the invoice. Cannot be cleared. Cannot be modified once linked.
             */
            appointmentId?: number;
            /**
             * Format: int32
             * @description Location of the invoice. Cannot be cleared. Cannot be modified on linked invoices.
             */
            locationId?: number;
            /**
             * Format: int32
             * @description Billing client. Send `null` to clear.
             */
            billingClientId?: number;
            /**
             * Format: int32
             * @description Referral associated with the invoice. Send `null` to clear.
             */
            referralId?: number;
            /** @description The set of client insurer identifiers to associate with the invoice. Replaces all existing client insurers on the invoice. Each identifier must be a positive number. */
            clientInsurerIds?: null | Record<string, never>;
            /**
             * @description Whether tax is included in or excluded from the invoice item amounts. Cannot be cleared — omit the field to leave unchanged.
             * @enum {string}
             */
            taxUsage?: "Including" | "Excluding" | "NoTax";
            /** @description Whether the client's identifying details should be hidden on the invoice. Cannot be cleared — omit the field to leave unchanged. */
            deIdentify?: boolean;
            /** @description Internal notes. Max 2000 characters; send `null` to clear. */
            invoiceNotes?: null | string;
        };
        UpdatePaymentRequest: {
            /**
             * Format: double
             * @description The payment amount. Must have at most 2 decimal places and not exceed 99999999.99
             */
            amount?: number;
            /**
             * Format: date
             * @description The date the payment was received
             */
            receivedAt?: string;
            /**
             * Format: int32
             * @description The identifier of the location associated with the payment
             */
            locationId?: number;
            /** @description Notes or comments about the payment */
            notes?: null | string;
            /**
             * @description The person who made the payment
             * @enum {null|string}
             */
            paidBy?: "Client" | "Insurer" | null;
            /**
             * Format: int32
             * @description The identifier of the client associated with the payment
             */
            clientId?: number;
        };
        ZandaApiLink: {
            href: string;
            rel: string;
            method: string;
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfAppointmentResponse: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["AppointmentResponse"];
            /** @description Hypermedia links associated with this resource (HATEOAS style). */
            links: components["schemas"]["ZandaApiLink"][];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfAppointmentResponseNoLinks: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["AppointmentResponseNoLinks"];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfBillableItemResponse: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["BillableItemResponse"];
            /** @description Hypermedia links associated with this resource (HATEOAS style). */
            links: components["schemas"]["ZandaApiLink"][];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfBillableItemResponseNoLinks: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["BillableItemResponseNoLinks"];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfClientClassificationResponse: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["ClientClassificationResponse"];
            /** @description Hypermedia links associated with this resource (HATEOAS style). */
            links: components["schemas"]["ZandaApiLink"][];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfClientClassificationResponseNoLinks: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["ClientClassificationResponseNoLinks"];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfClientProfileResponse: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["ClientProfileResponse"];
            /** @description Hypermedia links associated with this resource (HATEOAS style). */
            links: components["schemas"]["ZandaApiLink"][];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfClientProfileResponseNoLinks: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["ClientProfileResponseNoLinks"];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfCustomCategoryResponse: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["CustomCategoryResponse"];
            /** @description Hypermedia links associated with this resource (HATEOAS style). */
            links: components["schemas"]["ZandaApiLink"][];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfCustomCategoryResponseNoLinks: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["CustomCategoryResponseNoLinks"];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfCustomProfileFieldResponse: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["CustomProfileFieldResponse"];
            /** @description Hypermedia links associated with this resource (HATEOAS style). */
            links: components["schemas"]["ZandaApiLink"][];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfCustomProfileFieldResponseNoLinks: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["CustomProfileFieldResponseNoLinks"];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfCustomStatusResponse: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["CustomStatusResponse"];
            /** @description Hypermedia links associated with this resource (HATEOAS style). */
            links: components["schemas"]["ZandaApiLink"][];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfCustomStatusResponseNoLinks: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["CustomStatusResponseNoLinks"];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfGenderIdentityResponse: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["GenderIdentityResponse"];
            /** @description Hypermedia links associated with this resource (HATEOAS style). */
            links: components["schemas"]["ZandaApiLink"][];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfGenderIdentityResponseNoLinks: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["GenderIdentityResponseNoLinks"];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfGenderResponse: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["GenderResponse"];
            /** @description Hypermedia links associated with this resource (HATEOAS style). */
            links: components["schemas"]["ZandaApiLink"][];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfGenderResponseNoLinks: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["GenderResponseNoLinks"];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfInsurerResponse: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["InsurerResponse"];
            /** @description Hypermedia links associated with this resource (HATEOAS style). */
            links: components["schemas"]["ZandaApiLink"][];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfInsurerResponseNoLinks: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["InsurerResponseNoLinks"];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfInvoiceResponse: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["InvoiceResponse"];
            /** @description Hypermedia links associated with this resource (HATEOAS style). */
            links: components["schemas"]["ZandaApiLink"][];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfInvoiceResponseNoLinks: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["InvoiceResponseNoLinks"];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfLocationResponse: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["LocationResponse"];
            /** @description Hypermedia links associated with this resource (HATEOAS style). */
            links: components["schemas"]["ZandaApiLink"][];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfLocationResponseNoLinks: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["LocationResponseNoLinks"];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfMarketingSourceResponse: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["MarketingSourceResponse"];
            /** @description Hypermedia links associated with this resource (HATEOAS style). */
            links: components["schemas"]["ZandaApiLink"][];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfMarketingSourceResponseNoLinks: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["MarketingSourceResponseNoLinks"];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfPaymentMethodResponse: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["PaymentMethodResponse"];
            /** @description Hypermedia links associated with this resource (HATEOAS style). */
            links: components["schemas"]["ZandaApiLink"][];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfPaymentMethodResponseNoLinks: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["PaymentMethodResponseNoLinks"];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfPaymentResponse: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["PaymentResponse"];
            /** @description Hypermedia links associated with this resource (HATEOAS style). */
            links: components["schemas"]["ZandaApiLink"][];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfPaymentResponseNoLinks: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["PaymentResponseNoLinks"];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfPractitionerResponse: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["PractitionerResponse"];
            /** @description Hypermedia links associated with this resource (HATEOAS style). */
            links: components["schemas"]["ZandaApiLink"][];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfPractitionerResponseNoLinks: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["PractitionerResponseNoLinks"];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfPronounResponse: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["PronounResponse"];
            /** @description Hypermedia links associated with this resource (HATEOAS style). */
            links: components["schemas"]["ZandaApiLink"][];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfPronounResponseNoLinks: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["PronounResponseNoLinks"];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfReferralResponse: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["ReferralResponse"];
            /** @description Hypermedia links associated with this resource (HATEOAS style). */
            links: components["schemas"]["ZandaApiLink"][];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfReferralResponseNoLinks: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["ReferralResponseNoLinks"];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfSexResponse: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["SexResponse"];
            /** @description Hypermedia links associated with this resource (HATEOAS style). */
            links: components["schemas"]["ZandaApiLink"][];
        };
        /** @description Wrapper for API responses containing data and hypermedia links. */
        ZandaApiResponseOfSexResponseNoLinks: {
            /** @description The payload returned by the API. */
            data: components["schemas"]["SexResponseNoLinks"];
        };
    };
    responses: never;
    parameters: {
        /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
        XTimeZone: string;
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    GetPractitioners: {
        parameters: {
            query?: {
                /** @description Filter by active status */
                isActive?: boolean;
                /** @description Filter by profession (exact match) */
                profession?: string;
                /** @description Filter by job title (exact match) */
                jobTitle?: string;
                /** @description Filter by email address (exact match) */
                emailAddress?: string;
                /** @description Filter records modified on or after this datetime. Returns both newly created and updated records since the specified timestamp. Must be a naive datetime in the format `yyyy-MM-ddTHH:mm:ss` (no timezone suffix). The value is interpreted in the timezone supplied by the `X-Time-Zone` header (IANA name, e.g. `Australia/Sydney`) and converted to UTC before filtering. When no `X-Time-Zone` header is supplied, the value is treated as UTC. */
                modifiedSince?: unknown;
                /**
                 * @description Page number
                 * @example 1
                 */
                page?: number | string;
                /**
                 * @description Number of items per page
                 * @example 10
                 */
                pageSize?: number | string;
            };
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["PagedZandaApiResponseOfPractitionerResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["PagedZandaApiResponseOfPractitionerResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetPractitionerById: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["ZandaApiResponseOfPractitionerResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["ZandaApiResponseOfPractitionerResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetInvoices: {
        parameters: {
            query?: {
                /** @description Filter by active status */
                isActive?: boolean;
                /** @description Filter by client ID */
                clientId?: number | string;
                /** @description Filter invoices on or after this datetime. This is an inclusive filter compared against the invoice date. To retrieve all invoices for a given day, set this to the beginning of that day. */
                invoiceDateFrom?: unknown;
                /** @description Filter invoices on or before this datetime. This is an inclusive filter compared against the invoice date. To retrieve all invoices for a given day, set this to the end of that day. */
                invoiceDateTo?: unknown;
                /** @description Filter by practitioner ID */
                practitionerId?: number | string;
                /** @description Filter by location ID */
                locationId?: number | string;
                /** @description Filter by paid status (true = fully paid, false = outstanding) */
                isPaid?: boolean;
                /** @description Filter invoices on or after this datetime. This is an inclusive filter compared against the invoice due date. To retrieve all invoices for a given day, set this to the beginning of that day. */
                dueDateFrom?: unknown;
                /** @description Filter invoices on or before this datetime. This is an inclusive filter compared against the invoice due date. To retrieve all invoices for a given day, set this to the end of that day. */
                dueDateTo?: unknown;
                /** @description Filter records modified on or after this datetime. Returns both newly created and updated records since the specified timestamp. Must be a naive datetime in the format `yyyy-MM-ddTHH:mm:ss` (no timezone suffix). The value is interpreted in the timezone supplied by the `X-Time-Zone` header (IANA name, e.g. `Australia/Sydney`) and converted to UTC before filtering. When no `X-Time-Zone` header is supplied, the value is treated as UTC. */
                modifiedSince?: unknown;
                /**
                 * @description Sort order. Format: 'field:direction' (comma-separated). Direction is 'asc' or 'desc'. Available fields: `invoiceDate` — Invoice date, `invoiceDueDate` — Invoice due date, `totalCharges` — Total charges, `id` — Invoice ID.
                 * @example invoiceDate:desc
                 */
                sort?: string;
                /**
                 * @description Page number
                 * @example 1
                 */
                page?: number | string;
                /**
                 * @description Number of items per page
                 * @example 10
                 */
                pageSize?: number | string;
            };
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["PagedZandaApiResponseOfInvoiceResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["PagedZandaApiResponseOfInvoiceResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetInvoiceById: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["ZandaApiResponseOfInvoiceResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["ZandaApiResponseOfInvoiceResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    UpdateInvoice: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateInvoiceRequest"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["ZandaApiResponseOfInvoiceResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["ZandaApiResponseOfInvoiceResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Service Unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetLocations: {
        parameters: {
            query?: {
                /** @description Filter by active status */
                isActive?: boolean;
                /** @description Filter records modified on or after this datetime. Returns both newly created and updated records since the specified timestamp. Must be a naive datetime in the format `yyyy-MM-ddTHH:mm:ss` (no timezone suffix). The value is interpreted in the timezone supplied by the `X-Time-Zone` header (IANA name, e.g. `Australia/Sydney`) and converted to UTC before filtering. When no `X-Time-Zone` header is supplied, the value is treated as UTC. */
                modifiedSince?: unknown;
                /**
                 * @description Page number
                 * @example 1
                 */
                page?: number | string;
                /**
                 * @description Number of items per page
                 * @example 10
                 */
                pageSize?: number | string;
            };
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["PagedZandaApiResponseOfLocationResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["PagedZandaApiResponseOfLocationResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetLocationById: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["ZandaApiResponseOfLocationResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["ZandaApiResponseOfLocationResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetClientProfiles: {
        parameters: {
            query?: {
                /** @description Filter by active status */
                isActive?: boolean;
                /** @description Filter by archived status */
                isArchived?: boolean;
                /** @description Filter by minimum datetime added (inclusive). Pass a full datetime value to avoid missing records created after midnight. */
                dateAddedFrom?: unknown;
                /** @description Filter by maximum datetime added (inclusive). Pass a full datetime value to avoid missing records created after midnight. */
                dateAddedTo?: unknown;
                /** @description Filter by primary practitioner ID */
                primaryPractitionerId?: number | string;
                /** @description Filter by custom status ID */
                customStatusId?: number | string;
                /** @description Filter by custom category ID */
                customCategoryId?: number | string;
                /** @description Filter records modified on or after this datetime. Returns both newly created and updated records since the specified timestamp. Must be a naive datetime in the format `yyyy-MM-ddTHH:mm:ss` (no timezone suffix). The value is interpreted in the timezone supplied by the `X-Time-Zone` header (IANA name, e.g. `Australia/Sydney`) and converted to UTC before filtering. When no `X-Time-Zone` header is supplied, the value is treated as UTC. */
                modifiedSince?: unknown;
                /** @description Filter by profile roles. Supports multiple values, e.g. ?profileRoles=Client&profileRoles=Third Party */
                profileRoles?: ("Client" | "Referrer" | "Contact" | "Third Party" | "Shared")[];
                /**
                 * @description Sort order. Format: 'field:direction' (comma-separated). Direction is 'asc' or 'desc'. Available fields: `lastName` — Client last name, `name` — Client first name, `dateAdded` — Date the client was added, `clientNumber` — Client number, `id` — Client ID.
                 * @example lastName:desc
                 */
                sort?: string;
                /**
                 * @description Page number
                 * @example 1
                 */
                page?: number | string;
                /**
                 * @description Number of items per page
                 * @example 10
                 */
                pageSize?: number | string;
            };
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["PagedZandaApiResponseOfClientProfileResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["PagedZandaApiResponseOfClientProfileResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetClientProfileById: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["ZandaApiResponseOfClientProfileResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["ZandaApiResponseOfClientProfileResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetPrimaryPractitioner: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["ZandaApiResponseOfPractitionerResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["ZandaApiResponseOfPractitionerResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    CreateClientProfileClient: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateClientProfileClientRequest"];
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["ZandaApiResponseOfClientProfileResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["ZandaApiResponseOfClientProfileResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Unprocessable Entity */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Service Unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    UpdateClientProfile: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["EditClientProfileRequest"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["ZandaApiResponseOfClientProfileResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["ZandaApiResponseOfClientProfileResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Unprocessable Entity */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Service Unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetClientClassifications: {
        parameters: {
            query?: {
                /** @description Filter by active status */
                isActive?: boolean;
                /**
                 * @description Page number
                 * @example 1
                 */
                page?: number | string;
                /**
                 * @description Number of items per page
                 * @example 10
                 */
                pageSize?: number | string;
            };
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["PagedZandaApiResponseOfClientClassificationResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["PagedZandaApiResponseOfClientClassificationResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetClientClassificationById: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["ZandaApiResponseOfClientClassificationResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["ZandaApiResponseOfClientClassificationResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetPayments: {
        parameters: {
            query?: {
                isActive?: boolean;
                /** @description Filter by client number */
                clientNumber?: number | string;
                /** @description Filter by client ID */
                clientId?: number | string;
                /** @description Filter by payment method ID */
                methodId?: number | string;
                /** @description Filter payments received on or after this date (inclusive) */
                receivedAfter?: string;
                /** @description Filter payments received on or before this date (inclusive) */
                receivedBefore?: string;
                /** @description Filter payments with amount greater than or equal to this value */
                minAmount?: number | string;
                /** @description Filter payments with amount less than or equal to this value */
                maxAmount?: number | string;
                /** @description Filter records modified on or after this datetime. Returns both newly created and updated records since the specified timestamp. Must be a naive datetime in the format `yyyy-MM-ddTHH:mm:ss` (no timezone suffix). The value is interpreted in the timezone supplied by the `X-Time-Zone` header (IANA name, e.g. `Australia/Sydney`) and converted to UTC before filtering. When no `X-Time-Zone` header is supplied, the value is treated as UTC. */
                modifiedSince?: unknown;
                /**
                 * @description Sort order. Format: 'field:direction' (comma-separated). Direction is 'asc' or 'desc'. Available fields: `dateReceived` — Date received, `total` — Payment total, `id` — Payment ID.
                 * @example dateReceived:desc
                 */
                sort?: string;
                /**
                 * @description Page number
                 * @example 1
                 */
                page?: number | string;
                /**
                 * @description Number of items per page
                 * @example 10
                 */
                pageSize?: number | string;
            };
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["PagedZandaApiResponseOfPaymentResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["PagedZandaApiResponseOfPaymentResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    CreatePayment: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreatePaymentRequest"];
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["ZandaApiResponseOfPaymentResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["ZandaApiResponseOfPaymentResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Unprocessable Entity */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Service Unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetPaymentById: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["ZandaApiResponseOfPaymentResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["ZandaApiResponseOfPaymentResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    DeletePayment: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No Content */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Unprocessable Entity */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Service Unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    UpdatePayment: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdatePaymentRequest"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["ZandaApiResponseOfPaymentResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["ZandaApiResponseOfPaymentResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Unprocessable Entity */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Service Unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetAppointments: {
        parameters: {
            query?: {
                isActive?: boolean;
                /** @description Filter appointments starting on or after this datetime. This is an inclusive filter compared against the appointment's start time. To retrieve all appointments for a given day, set this to the beginning of that day. */
                dateFrom?: unknown;
                /** @description Filter appointments starting on or before this datetime. This is an inclusive filter compared against the appointment's start time. To retrieve all appointments for a given day, set this to the end of that day. */
                dateTo?: unknown;
                /** @description Filter by client ID (includes group appointment participants) */
                clientId?: number | string;
                /** @description Filter by practitioner ID */
                practitionerId?: number | string;
                /** @description Filter by location ID */
                locationId?: number | string;
                /** @description Filter records modified on or after this datetime. Returns both newly created and updated records since the specified timestamp. Must be a naive datetime in the format `yyyy-MM-ddTHH:mm:ss` (no timezone suffix). The value is interpreted in the timezone supplied by the `X-Time-Zone` header (IANA name, e.g. `Australia/Sydney`) and converted to UTC before filtering. When no `X-Time-Zone` header is supplied, the value is treated as UTC. */
                modifiedSince?: unknown;
                /**
                 * @description Sort order. Format: 'field:direction' (comma-separated). Direction is 'asc' or 'desc'. Available fields: `dateCreated` — Date the appointment was created, `dateFrom` — Appointment start time, `dateTo` — Appointment end time, `id` — Appointment ID, `flag` — Appointment flag.
                 * @example dateCreated:desc
                 */
                sort?: string;
                /**
                 * @description Page number
                 * @example 1
                 */
                page?: number | string;
                /**
                 * @description Number of items per page
                 * @example 10
                 */
                pageSize?: number | string;
            };
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["PagedZandaApiResponseOfAppointmentResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["PagedZandaApiResponseOfAppointmentResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetAppointmentById: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["ZandaApiResponseOfAppointmentResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["ZandaApiResponseOfAppointmentResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetBillableItems: {
        parameters: {
            query?: {
                /** @description Filter by active status */
                isActive?: boolean;
                /** @description Filter records modified on or after this datetime. Returns both newly created and updated records since the specified timestamp. Must be a naive datetime in the format `yyyy-MM-ddTHH:mm:ss` (no timezone suffix). The value is interpreted in the timezone supplied by the `X-Time-Zone` header (IANA name, e.g. `Australia/Sydney`) and converted to UTC before filtering. When no `X-Time-Zone` header is supplied, the value is treated as UTC. */
                modifiedSince?: unknown;
                /**
                 * @description Page number
                 * @example 1
                 */
                page?: number | string;
                /**
                 * @description Number of items per page
                 * @example 10
                 */
                pageSize?: number | string;
            };
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["PagedZandaApiResponseOfBillableItemResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["PagedZandaApiResponseOfBillableItemResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetBillableItemById: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["ZandaApiResponseOfBillableItemResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["ZandaApiResponseOfBillableItemResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetReferrals: {
        parameters: {
            query?: {
                isActive?: boolean;
                startDateFrom?: string;
                startDateTo?: string;
                endDateFrom?: string;
                endDateTo?: string;
                clientId?: number | string;
                /** @description Filter records modified on or after this datetime. Returns both newly created and updated records since the specified timestamp. Must be a naive datetime in the format `yyyy-MM-ddTHH:mm:ss` (no timezone suffix). The value is interpreted in the timezone supplied by the `X-Time-Zone` header (IANA name, e.g. `Australia/Sydney`) and converted to UTC before filtering. When no `X-Time-Zone` header is supplied, the value is treated as UTC. */
                modifiedSince?: unknown;
                /**
                 * @description Sort order. Format: 'field:direction' (comma-separated). Direction is 'asc' or 'desc'. Available fields: `dateFrom` — Referral start date, `dateTo` — Referral end date, `name` — Referrer name, `id` — Referral ID.
                 * @example dateFrom:desc
                 */
                sort?: string;
                /**
                 * @description Page number
                 * @example 1
                 */
                page?: number | string;
                /**
                 * @description Number of items per page
                 * @example 10
                 */
                pageSize?: number | string;
            };
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["PagedZandaApiResponseOfReferralResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["PagedZandaApiResponseOfReferralResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetReferralById: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["ZandaApiResponseOfReferralResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["ZandaApiResponseOfReferralResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetInsurers: {
        parameters: {
            query?: {
                /** @description Filter by active status */
                isActive?: boolean;
                /** @description Filter records modified on or after this datetime. Returns both newly created and updated records since the specified timestamp. Must be a naive datetime in the format `yyyy-MM-ddTHH:mm:ss` (no timezone suffix). The value is interpreted in the timezone supplied by the `X-Time-Zone` header (IANA name, e.g. `Australia/Sydney`) and converted to UTC before filtering. When no `X-Time-Zone` header is supplied, the value is treated as UTC. */
                modifiedSince?: unknown;
                /**
                 * @description Page number
                 * @example 1
                 */
                page?: number | string;
                /**
                 * @description Number of items per page
                 * @example 10
                 */
                pageSize?: number | string;
            };
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["PagedZandaApiResponseOfInsurerResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["PagedZandaApiResponseOfInsurerResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetInsurerById: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["ZandaApiResponseOfInsurerResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["ZandaApiResponseOfInsurerResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetCustomCategories: {
        parameters: {
            query?: {
                /** @description Filter by active status */
                isActive?: boolean;
                /**
                 * @description Page number
                 * @example 1
                 */
                page?: number | string;
                /**
                 * @description Number of items per page
                 * @example 10
                 */
                pageSize?: number | string;
            };
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["PagedZandaApiResponseOfCustomCategoryResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["PagedZandaApiResponseOfCustomCategoryResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetCustomCategoryById: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["ZandaApiResponseOfCustomCategoryResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["ZandaApiResponseOfCustomCategoryResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetCustomStatuses: {
        parameters: {
            query?: {
                /** @description Filter by active status */
                isActive?: boolean;
                /**
                 * @description Page number
                 * @example 1
                 */
                page?: number | string;
                /**
                 * @description Number of items per page
                 * @example 10
                 */
                pageSize?: number | string;
            };
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["PagedZandaApiResponseOfCustomStatusResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["PagedZandaApiResponseOfCustomStatusResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetCustomStatusById: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["ZandaApiResponseOfCustomStatusResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["ZandaApiResponseOfCustomStatusResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetMarketingSources: {
        parameters: {
            query?: {
                /** @description Filter by active status */
                isActive?: boolean;
                /**
                 * @description Page number
                 * @example 1
                 */
                page?: number | string;
                /**
                 * @description Number of items per page
                 * @example 10
                 */
                pageSize?: number | string;
            };
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["PagedZandaApiResponseOfMarketingSourceResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["PagedZandaApiResponseOfMarketingSourceResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetMarketingSourceById: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["ZandaApiResponseOfMarketingSourceResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["ZandaApiResponseOfMarketingSourceResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetPaymentMethods: {
        parameters: {
            query?: {
                /** @description Filter by active status */
                isActive?: boolean;
                /**
                 * @description Page number
                 * @example 1
                 */
                page?: number | string;
                /**
                 * @description Number of items per page
                 * @example 10
                 */
                pageSize?: number | string;
            };
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["PagedZandaApiResponseOfPaymentMethodResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["PagedZandaApiResponseOfPaymentMethodResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetPaymentMethodById: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["ZandaApiResponseOfPaymentMethodResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["ZandaApiResponseOfPaymentMethodResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetSexes: {
        parameters: {
            query?: {
                /** @description Filter by active status */
                isActive?: boolean;
                /**
                 * @description Page number
                 * @example 1
                 */
                page?: number | string;
                /**
                 * @description Number of items per page
                 * @example 10
                 */
                pageSize?: number | string;
            };
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["PagedZandaApiResponseOfSexResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["PagedZandaApiResponseOfSexResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetSexById: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["ZandaApiResponseOfSexResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["ZandaApiResponseOfSexResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetGenders: {
        parameters: {
            query?: {
                /** @description Filter by active status */
                isActive?: boolean;
                /**
                 * @description Page number
                 * @example 1
                 */
                page?: number | string;
                /**
                 * @description Number of items per page
                 * @example 10
                 */
                pageSize?: number | string;
            };
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["PagedZandaApiResponseOfGenderResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["PagedZandaApiResponseOfGenderResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetGenderById: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["ZandaApiResponseOfGenderResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["ZandaApiResponseOfGenderResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetGenderIdentities: {
        parameters: {
            query?: {
                /** @description Filter by active status */
                isActive?: boolean;
                /**
                 * @description Page number
                 * @example 1
                 */
                page?: number | string;
                /**
                 * @description Number of items per page
                 * @example 10
                 */
                pageSize?: number | string;
            };
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["PagedZandaApiResponseOfGenderIdentityResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["PagedZandaApiResponseOfGenderIdentityResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetGenderIdentityById: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["ZandaApiResponseOfGenderIdentityResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["ZandaApiResponseOfGenderIdentityResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetPronouns: {
        parameters: {
            query?: {
                /** @description Filter by active status */
                isActive?: boolean;
                /**
                 * @description Page number
                 * @example 1
                 */
                page?: number | string;
                /**
                 * @description Number of items per page
                 * @example 10
                 */
                pageSize?: number | string;
            };
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["PagedZandaApiResponseOfPronounResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["PagedZandaApiResponseOfPronounResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetPronounById: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["ZandaApiResponseOfPronounResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["ZandaApiResponseOfPronounResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetCustomProfileFields: {
        parameters: {
            query?: {
                /** @description Filter by active status */
                isActive?: boolean;
                /**
                 * @description Page number
                 * @example 1
                 */
                page?: number | string;
                /**
                 * @description Number of items per page
                 * @example 10
                 */
                pageSize?: number | string;
            };
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["PagedZandaApiResponseOfCustomProfileFieldResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["PagedZandaApiResponseOfCustomProfileFieldResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetCustomProfileFieldById: {
        parameters: {
            query?: never;
            header?: {
                /** @description IANA timezone identifier (e.g. `Australia/Sydney`) used to interpret inbound date-time query parameters and to format date-time values in responses. Defaults to `UTC` when omitted. An unknown identifier results in a 400 Bad Request. */
                "X-Time-Zone"?: components["parameters"]["XTimeZone"];
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.zandaapi.hateoas+json": components["schemas"]["ZandaApiResponseOfCustomProfileFieldResponse"];
                    "application/vnd.zandaapi+json": components["schemas"]["ZandaApiResponseOfCustomProfileFieldResponseNoLinks"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Acceptable */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
}
