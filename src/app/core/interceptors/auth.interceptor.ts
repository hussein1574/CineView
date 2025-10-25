import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { environment } from '../../environments/environment';
export function appendAPITokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const apiKey = environment.apiKey;
  const apiUrl = environment.apiUrl;
  if (req.url.startsWith(apiUrl)) {
    const reqWithKey = req.clone({
      setParams: { api_key: apiKey },
    });
    return next(reqWithKey);
  }
  return next(req);
}
