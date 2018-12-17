import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import { catchError,timeout } from 'rxjs/operators';


@Injectable()
export class errorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      timeout(3000),
      catchError (this.handleError)
      
    );
  }

  private handleError(error : Response){

      return throwError(error);
      
      
  }
}

