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
          created_at?: parameters["rowFilter.customer.created_at"];
          name?: parameters["rowFilter.customer.name"];
          email?: parameters["rowFilter.customer.email"];
          company?: parameters["rowFilter.customer.company"];
          address?: parameters["rowFilter.customer.address"];
          zip?: parameters["rowFilter.customer.zip"];
          city?: parameters["rowFilter.customer.city"];
          country?: parameters["rowFilter.customer.country"];
          created_by?: parameters["rowFilter.customer.created_by"];
          id?: parameters["rowFilter.customer.id"];
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
          created_at?: parameters["rowFilter.customer.created_at"];
          name?: parameters["rowFilter.customer.name"];
          email?: parameters["rowFilter.customer.email"];
          company?: parameters["rowFilter.customer.company"];
          address?: parameters["rowFilter.customer.address"];
          zip?: parameters["rowFilter.customer.zip"];
          city?: parameters["rowFilter.customer.city"];
          country?: parameters["rowFilter.customer.country"];
          created_by?: parameters["rowFilter.customer.created_by"];
          id?: parameters["rowFilter.customer.id"];
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
          created_at?: parameters["rowFilter.customer.created_at"];
          name?: parameters["rowFilter.customer.name"];
          email?: parameters["rowFilter.customer.email"];
          company?: parameters["rowFilter.customer.company"];
          address?: parameters["rowFilter.customer.address"];
          zip?: parameters["rowFilter.customer.zip"];
          city?: parameters["rowFilter.customer.city"];
          country?: parameters["rowFilter.customer.country"];
          created_by?: parameters["rowFilter.customer.created_by"];
          id?: parameters["rowFilter.customer.id"];
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
          created_at?: parameters["rowFilter.project.created_at"];
          created_by?: parameters["rowFilter.project.created_by"];
          customer?: parameters["rowFilter.project.customer"];
          name?: parameters["rowFilter.project.name"];
          id?: parameters["rowFilter.project.id"];
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
          created_at?: parameters["rowFilter.project.created_at"];
          created_by?: parameters["rowFilter.project.created_by"];
          customer?: parameters["rowFilter.project.customer"];
          name?: parameters["rowFilter.project.name"];
          id?: parameters["rowFilter.project.id"];
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
          created_at?: parameters["rowFilter.project.created_at"];
          created_by?: parameters["rowFilter.project.created_by"];
          customer?: parameters["rowFilter.project.customer"];
          name?: parameters["rowFilter.project.name"];
          id?: parameters["rowFilter.project.id"];
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
  "/task": {
    get: {
      parameters: {
        query: {
          created_at?: parameters["rowFilter.task.created_at"];
          project?: parameters["rowFilter.task.project"];
          title?: parameters["rowFilter.task.title"];
          description?: parameters["rowFilter.task.description"];
          state?: parameters["rowFilter.task.state"];
          created_by?: parameters["rowFilter.task.created_by"];
          id?: parameters["rowFilter.task.id"];
          index?: parameters["rowFilter.task.index"];
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
          schema: definitions["task"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** task */
          task?: definitions["task"];
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
          created_at?: parameters["rowFilter.task.created_at"];
          project?: parameters["rowFilter.task.project"];
          title?: parameters["rowFilter.task.title"];
          description?: parameters["rowFilter.task.description"];
          state?: parameters["rowFilter.task.state"];
          created_by?: parameters["rowFilter.task.created_by"];
          id?: parameters["rowFilter.task.id"];
          index?: parameters["rowFilter.task.index"];
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
          created_at?: parameters["rowFilter.task.created_at"];
          project?: parameters["rowFilter.task.project"];
          title?: parameters["rowFilter.task.title"];
          description?: parameters["rowFilter.task.description"];
          state?: parameters["rowFilter.task.state"];
          created_by?: parameters["rowFilter.task.created_by"];
          id?: parameters["rowFilter.task.id"];
          index?: parameters["rowFilter.task.index"];
        };
        body: {
          /** task */
          task?: definitions["task"];
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
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: text */
    name: string;
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
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * @default extensions.uuid_generate_v4()
     */
    id: string;
  };
  project: {
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at: string;
    /**
     * Format: uuid
     * @default auth.uid()
     */
    created_by: string;
    /**
     * Format: uuid
     * @description Note:
     * This is a Foreign Key to `customer.id`.<fk table='customer' column='id'/>
     */
    customer?: string;
    /** Format: text */
    name: string;
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * @default extensions.uuid_generate_v4()
     */
    id: string;
  };
  task: {
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /**
     * Format: uuid
     * @description Note:
     * This is a Foreign Key to `project.id`.<fk table='project' column='id'/>
     */
    project: string;
    /** Format: text */
    title: string;
    /** Format: text */
    description?: string;
    /**
     * Format: public.task_state
     * @default todo
     * @enum {string}
     */
    state: "todo" | "in_progress" | "done";
    /**
     * Format: uuid
     * @default auth.uid()
     */
    created_by: string;
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * @default extensions.uuid_generate_v4()
     */
    id: string;
    /** Format: bigint */
    index: number;
  };
}

export interface parameters {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: "params=single-object";
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /**
   * @description Preference
   * @enum {string}
   */
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
  /** Format: uuid */
  "rowFilter.customer.id": string;
  /** @description project */
  "body.project": definitions["project"];
  /** Format: timestamp with time zone */
  "rowFilter.project.created_at": string;
  /** Format: uuid */
  "rowFilter.project.created_by": string;
  /** Format: uuid */
  "rowFilter.project.customer": string;
  /** Format: text */
  "rowFilter.project.name": string;
  /** Format: uuid */
  "rowFilter.project.id": string;
  /** @description task */
  "body.task": definitions["task"];
  /** Format: timestamp with time zone */
  "rowFilter.task.created_at": string;
  /** Format: uuid */
  "rowFilter.task.project": string;
  /** Format: text */
  "rowFilter.task.title": string;
  /** Format: text */
  "rowFilter.task.description": string;
  /** Format: public.task_state */
  "rowFilter.task.state": string;
  /** Format: uuid */
  "rowFilter.task.created_by": string;
  /** Format: uuid */
  "rowFilter.task.id": string;
  /** Format: bigint */
  "rowFilter.task.index": string;
}

export interface operations {}

export interface external {}
