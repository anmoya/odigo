declare module 'express-serve-static-core' {
    interface Response<T> {
      apiJson(data?: T, message?: string, success?: boolean, error?: string): Response<T>;
    }
  }