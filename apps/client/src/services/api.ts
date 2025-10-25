type TPath = string | URL | Request

type TOptions = Pick<RequestInit, 'body' | 'headers' | 'signal'>

class ApiClient {
  constructor(private baseUrl: string = import.meta.env.VITE_API_URL) {
    if (!this.baseUrl) {
      throw new Error('VITE_API_URL environment variable is not defined')
    }
  }
  async get<TResponse>(path: TPath, options?: TOptions): Promise<TResponse> {
    return this.callApi<TResponse>(this.configUrl(path), {
      method: 'GET',
      ...options,
    })
  }

  async post<TResponse, TBody = never>(
    path: TPath,
    body?: TBody,
    options?: Omit<TOptions, 'body'>,
  ): Promise<TResponse> {
    return this.callApi<TResponse>(this.configUrl(path), {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    })
  }

  async patch<TResponse, TBody = never>(
    path: TPath,
    body?: TBody,
    options?: Omit<TOptions, 'body'>,
  ): Promise<TResponse> {
    return this.callApi<TResponse>(this.configUrl(path), {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    })
  }

  async delete<TResponse>(path: TPath, options?: TOptions): Promise<TResponse> {
    return this.callApi<TResponse>(this.configUrl(path), {
      method: 'DELETE',
      ...options,
    })
  }

  private async callApi<TResponse>(
    path: TPath,
    options?: RequestInit,
  ): Promise<TResponse> {
    const abortController = new AbortController()

    const mergedOptions: RequestInit = {
      ...options,
      signal: options?.signal ?? abortController.signal,
      credentials: 'include',
    }

    const response = await fetch(path, mergedOptions)

    if (!response.ok) {
      const error = await this.safeParseError(response)
      throw new Error(error || 'Something went wrong')
    }

    if (response.status === 204) {
      return {} as TResponse
    }

    return (await response.json()) as TResponse
  }

  private async safeParseError(response: Response): Promise<string | null> {
    try {
      const res = await response.json()

      return res?.message || JSON.stringify(res)
    } catch (error) {
      return response.statusText
    }
  }

  private configUrl(path: TPath): string {
    if (path instanceof URL) return path.href

    if (path instanceof Request) return path.url

    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    return `${this.baseUrl}/api/v1${normalizedPath}`
  }
}

export const apiClient = new ApiClient(import.meta.env.VITE_API_URL)
