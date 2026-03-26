/**
 * Standard API envelope for all JSON responses.
 */
export type ApiSuccess<T> = {
  status: 'success'
  data: T
  meta: {
    timestamp: string
  }
}

export type ApiErrorBody = {
  status: 'error'
  data: {
    message: string
    issues?: unknown
  }
  meta: {
    timestamp: string
  }
}

export function success<T>(data: T): ApiSuccess<T> {
  return {
    status: 'success',
    data,
    meta: {
      timestamp: new Date().toISOString(),
    },
  }
}

export function error(message: string, issues?: unknown): ApiErrorBody {
  return {
    status: 'error',
    data: {
      message,
      ...(issues !== undefined ? { issues } : {}),
    },
    meta: {
      timestamp: new Date().toISOString(),
    },
  }
}
