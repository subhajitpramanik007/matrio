import { ApiResponse, ApiErrorResponse } from "@/lib/response";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface IRequestInit extends RequestInit {
  method: Method;
}

export abstract class ApiClient {
  static DEFAULT_OPTIONS: IRequestInit = {
    method: "GET",
    credentials: "include", // for cookies (refresh token, sessions)
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: null,
  };

  protected defaultOptions = ApiClient.DEFAULT_OPTIONS;
  private baseUrl: string;

  constructor({
    baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
    options,
  }: {
    baseUrl?: string;
    options?: Partial<IRequestInit>;
  }) {
    this.baseUrl = baseUrl;
    if (options) {
      this.defaultOptions = this.mergeOptions({ method: "GET", ...options });
    }
  }

  private mergeOptions(options?: IRequestInit) {
    return {
      ...this.defaultOptions,
      ...options,
      headers: { ...this.defaultOptions.headers, ...options?.headers },
    };
  }

  private buildUrl(path: string, params?: Record<string, string | number>) {
    const url = new URL(this.baseUrl + path);
    if (params) {
      Object.entries(params).forEach(([key, value]) =>
        url.searchParams.append(key, String(value)),
      );
    }
    return url.toString();
  }

  private setBody(body: any) {
    return body instanceof FormData || body instanceof Blob
      ? body
      : JSON.stringify(body);
  }

  private async request<T>(
    path: string,
    options?: IRequestInit,
  ): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(path, this.mergeOptions(options));

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new ApiErrorResponse(
          res.status,
          data?.message || data?.error,
          data?.error || res.statusText,
          data?.cause,
        );
      }

      return new ApiResponse(res.status, data?.data as T, data?.message);
    } catch (err: any) {
      throw new ApiErrorResponse(500, err.message, err.message, err?.cause);
    }
  }

  protected get<T>(
    url: string,
    params?: Record<string, string | number>,
    options?: RequestInit,
  ) {
    return this.request<T>(this.buildUrl(url, params), {
      ...options,
      method: "GET",
    });
  }

  protected post<T>(url: string, body?: any, options?: RequestInit) {
    return this.request<T>(this.buildUrl(url), {
      ...options,
      method: "POST",
      body: this.setBody(body),
    });
  }

  protected put<T>(url: string, body?: any, options?: RequestInit) {
    return this.request<T>(this.buildUrl(url), {
      ...options,
      method: "PUT",
      body: this.setBody(body),
    });
  }

  protected patch<T>(url: string, body?: any, options?: RequestInit) {
    return this.request<T>(this.buildUrl(url), {
      ...options,
      method: "PATCH",
      body: this.setBody(body),
    });
  }

  protected delete<T>(url: string, options?: RequestInit) {
    return this.request<T>(this.buildUrl(url), {
      ...options,
      method: "DELETE",
    });
  }

  healthCheck<T>() {
    return this.request<T>(this.buildUrl("/health"), { method: "GET" });
  }
}

class BaseApi extends ApiClient {
  constructor() {
    super({ baseUrl: process.env.NEXT_PUBLIC_API_URL });
  }
}

export const api = new BaseApi();
