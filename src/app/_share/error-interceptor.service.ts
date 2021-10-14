import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Entra al interceptor');

    return next.handle(req).pipe(retry(environment.REINTENTOS)).pipe(tap(event => {
      if (event instanceof HttpResponse) {
        if (event.body && event.body.error === true && event.body.errorMessage){
          throw new Error(event.body.errorMessage);
        }
      }
    })).pipe(catchError((err) => {
      const str = err.error.message;

      const statusCode = err.error.status.toString();

      if (statusCode.charAt(0) === '4'){
        this.openSnackBar(str.slice(4, str.length));
      } else if (statusCode.charAt(0) === '5'){
        this.router.navigate(['/error500']);
      }
      return EMPTY;
    }));
  }

  openSnackBar(error: string): void {
    this._snackBar.open(error, 'OK', {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }
}