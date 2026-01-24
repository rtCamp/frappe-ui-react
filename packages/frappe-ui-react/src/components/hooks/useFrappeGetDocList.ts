import { useEffect } from "react";
import { useResource, type ResourceOutput } from "./useResource";

export interface FrappeGetDocListParams {
  doctype: string;
  fields?: string[];
  filters?: Record<string, unknown>;
  orderBy?: string;
  limit?: number;
  offset?: number;
  pageLength?: number;
  pageSize?: number;
  [key: string]: unknown;
}

export interface FrappeDocListResponse {
  data: Array<Record<string, unknown>>;
  total_count?: number;
  keys?: string[];
}

/**
 * Hook to fetch a list of Frappe documents
 * This hook uses the useFrappeGetDocList API from Frappe backend
 *
 * @param params - Parameters for fetching the document list
 * @param auto - Whether to automatically fetch on mount (default: true)
 * @returns Object containing data, loading, error states and fetch method
 *
 * @example
 * const { data, loading, error, fetch } = useFrappeGetDocList({
 *   doctype: 'User',
 *   fields: ['name', 'email', 'user_type'],
 *   filters: { enabled: 1 },
 *   limit: 20
 * });
 */
export function useFrappeGetDocList(
  params: FrappeGetDocListParams,
  auto: boolean = true
): ResourceOutput<FrappeDocListResponse, Error> {
  // Build query parameters for the API call
  const buildParams = () => {
    const queryParams = new URLSearchParams();

    if (params.fields) {
      queryParams.append("fields", JSON.stringify(params.fields));
    }

    if (params.filters) {
      queryParams.append("filters", JSON.stringify(params.filters));
    }

    if (params.orderBy) {
      queryParams.append("order_by", params.orderBy);
    }

    // Use limit as pageLength if not specified
    const limit = params.limit || params.pageLength || params.pageSize || 20;
    queryParams.append("limit_page_length", String(limit));

    if (params.offset) {
      queryParams.append("limit_page_length_offset", String(params.offset));
    }

    // Add any additional parameters
    Object.keys(params).forEach((key) => {
      if (
        ![
          "doctype",
          "fields",
          "filters",
          "orderBy",
          "limit",
          "offset",
          "pageLength",
          "pageSize",
        ].includes(key)
      ) {
        queryParams.append(key, String((params as Record<string, unknown>)[key]));
      }
    });

    return queryParams.toString();
  };

  // Create the fetch function
  const fetchDocList = async (): Promise<FrappeDocListResponse> => {
    const queryString = buildParams();
    const doctype = params.doctype;

    if (!/^[A-Za-z0-9_]+$/.test(doctype)) {
      throw new Error("Invalid doctype parameter");
    }

    const url = `/api/resource/${doctype}?${queryString}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Frappe-CSRF-Token": (window as Window & { csrf_token?: string }).csrf_token || "",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${params.doctype} list: ${response.statusText}`
      );
    }

    const responseData = await response.json();

    // Format the response to match our interface
    return {
      data: responseData.data || [],
      total_count: responseData.total_count,
      keys: responseData.keys,
    };
  };

  const resource = useResource<FrappeDocListResponse>(fetchDocList);

  // Auto-fetch on mount if auto is true
  useEffect(() => {
    if (auto) {
      resource.fetch().catch(() => {
        // Error is handled in the resource state
      });
    }
  }, [auto, params.doctype, resource]);

  return resource;
}
