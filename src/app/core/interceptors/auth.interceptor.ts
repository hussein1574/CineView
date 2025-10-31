import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { environment } from '../../environments/environment';
export function apiKeysInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const tmdbApiKey = environment.tmdbAPIKey;
  const tmdbApiUrl = environment.tmdbAPIUrl;
  const geminiApiUrl = environment.geminiAPIUrl;
  const geminiApiKey = environment.geminiAPIKey;
  if (req.url.startsWith(tmdbApiUrl)) {
    const tmdbReq = req.clone({
      setParams: { api_key: tmdbApiKey },
    });
    return next(tmdbReq);
  }
  if (req.url.startsWith(geminiApiUrl)) {
    const geminiReq = req.clone({
      setParams: { key: geminiApiKey },
    });
    return next(geminiReq);
  }
  return next(req);
}
