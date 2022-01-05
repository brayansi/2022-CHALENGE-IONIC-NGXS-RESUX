import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplicationService } from './application.service';

@Injectable({
  providedIn: 'root',
})
export class GenericHttpService {
  constructor(private http: HttpClient) {}

  public findOne<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${environment.api}/${endpoint}`);
  }

  public findAll<T>(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${environment.api}/${endpoint}`);
  }

  public create<T>(endpoint: string, data: T): Observable<T> {
    return this.http.post<T>(`${environment.api}/${endpoint}`, data);
  }

  public update<T>(endpoint: string, data: T): Observable<T> {
    return this.http.put<T>(`${environment.api}/${endpoint}`, data);
  }

  public delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${environment.api}/${endpoint}`);
  }
}

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor(private applicationService: ApplicationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.applicationService.getToken();

    const authReq = req.clone({
      headers: req.headers
        .set('Authorization', `Bearer ${token}`)
        .append('Access-Control-Allow-Origin', '*'),
    });

    return next.handle(authReq);
  }
}
