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
      
      if(err.error.status == 400) {
        this.openSnackBar(str.slice(4, str.length));
      } else if(err.status == "401") {  
        if (str === 'No Autorizado Para Esta Página')
        {
          this.openSnackBar(str);
          this.router.navigate(['/nopermiso']);
        } else {
          this.openSnackBar(str.slice(4, str.length));
        }
      }else if (err.status === 404) {
        this.openSnackBar(str.slice(4, str.length));
        this.openSnackBar(err.error.message);
      } else if (err.error.status === 405){
        this.openSnackBar(str.slice(4, str.length));
        this.openSnackBar(err.error.message);
      } else if (err.error.status === 415) {
        this.openSnackBar(str.slice(4, str.length));
        this.openSnackBar(err.error.message);
      } else if (err.error.status === 500) {
        this.router.navigate(['/error500']);
      }
      return EMPTY;
}));
}

private openSnackBar(mensaje: string) {
  this._snackBar.open(mensaje, 'OK', {
    duration: 2000,
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
});
}
}