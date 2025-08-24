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
    addOptions,
  }: {
    baseUrl?: string;
    addOptions?: Partial<IRequestInit>;
  }) {
    this.baseUrl = baseUrl;
    if (addOptions) {
      this.defaultOptions = this.mergeOptions({ method: "GET", ...addOptions });
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
  ): Promise<ApiResponse<T> | ApiErrorResponse> {
    try {
      const res = await fetch(path, this.mergeOptions(options));

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        return new ApiErrorResponse(
          res.status,
          data?.message || data?.error,
          data?.error || res.statusText,
        );
      }

      return new ApiResponse(res.status, data?.data as T, data?.message);
    } catch (err: any) {
      return new ApiErrorResponse(500, err.message, err.message);
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

  protected healthCheck<T>() {
    return this.request<T>(this.buildUrl("/health"), { method: "GET" });
  }
}
