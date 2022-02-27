/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/customer": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.customer.id"];
          created_at?: parameters["rowFilter.customer.created_at"];
          name?: parameters["rowFilter.customer.name"];
          email?: parameters["rowFilter.customer.email"];
          company?: parameters["rowFilter.customer.company"];
          address?: parameters["rowFilter.customer.address"];
          zip?: parameters["rowFilter.customer.zip"];
          city?: parameters["rowFilter.customer.city"];
          country?: parameters["rowFilter.customer.country"];
          created_by?: parameters["rowFilter.customer.created_by"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["customer"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** customer */
          customer?: definitions["customer"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.customer.id"];
          created_at?: parameters["rowFilter.customer.created_at"];
          name?: parameters["rowFilter.customer.name"];
          email?: parameters["rowFilter.customer.email"];
          company?: parameters["rowFilter.customer.company"];
          address?: parameters["rowFilter.customer.address"];
          zip?: parameters["rowFilter.customer.zip"];
          city?: parameters["rowFilter.customer.city"];
          country?: parameters["rowFilter.customer.country"];
          created_by?: parameters["rowFilter.customer.created_by"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.customer.id"];
          created_at?: parameters["rowFilter.customer.created_at"];
          name?: parameters["rowFilter.customer.name"];
          email?: parameters["rowFilter.customer.email"];
          company?: parameters["rowFilter.customer.company"];
          address?: parameters["rowFilter.customer.address"];
          zip?: parameters["rowFilter.customer.zip"];
          city?: parameters["rowFilter.customer.city"];
          country?: parameters["rowFilter.customer.country"];
          created_by?: parameters["rowFilter.customer.created_by"];
        };
        body: {
          /** customer */
          customer?: definitions["customer"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/project": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.project.id"];
          created_at?: parameters["rowFilter.project.created_at"];
          customer_id?: parameters["rowFilter.project.customer_id"];
          name?: parameters["rowFilter.project.name"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["project"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** project */
          project?: definitions["project"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.project.id"];
          created_at?: parameters["rowFilter.project.created_at"];
          customer_id?: parameters["rowFilter.project.customer_id"];
          name?: parameters["rowFilter.project.name"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.project.id"];
          created_at?: parameters["rowFilter.project.created_at"];
          customer_id?: parameters["rowFilter.project.customer_id"];
          name?: parameters["rowFilter.project.name"];
        };
        body: {
          /** project */
          project?: definitions["project"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
}

export interface definitions {
  customer: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: text */
    name?: string;
    /** Format: text */
    email?: string;
    /** Format: text */
    company?: string;
    /** Format: text */
    address?: string;
    /** Format: text */
    zip?: string;
    /** Format: text */
    city?: string;
    /** Format: text */
    country?: string;
    /**
     * Format: uuid
     * @default auth.uid()
     */
    created_by: string;
  };
  project: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `customer.id`.<fk table='customer' column='id'/>
     */
    customer_id: number;
    /** Format: text */
    name: string;
  };
}

export interface parameters {
  /** @description Preference */
  preferParams: "params=single-object";
  /** @description Preference */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /** @description Preference */
  preferCount: "count=none";
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description customer */
  "body.customer": definitions["customer"];
  /** Format: bigint */
  "rowFilter.customer.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.customer.created_at": string;
  /** Format: text */
  "rowFilter.customer.name": string;
  /** Format: text */
  "rowFilter.customer.email": string;
  /** Format: text */
  "rowFilter.customer.company": string;
  /** Format: text */
  "rowFilter.customer.address": string;
  /** Format: text */
  "rowFilter.customer.zip": string;
  /** Format: text */
  "rowFilter.customer.city": string;
  /** Format: text */
  "rowFilter.customer.country": string;
  /** Format: uuid */
  "rowFilter.customer.created_by": string;
  /** @description project */
  "body.project": definitions["project"];
  /** Format: bigint */
  "rowFilter.project.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.project.created_at": string;
  /** Format: bigint */
  "rowFilter.project.customer_id": string;
  /** Format: text */
  "rowFilter.project.name": string;
}

export interface operations {}

export interface external {}
