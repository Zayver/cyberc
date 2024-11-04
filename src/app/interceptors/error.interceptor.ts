import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { MessageService } from 'primeng/api';
import { catchError, switchMap, throwError, timer } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  const auth = inject(AuthService)
  const message = inject(MessageService)
  return next(req).pipe(
    catchError((error: HttpErrorResponse)=>{
      switch(error.status){
        case 0: {
          message.add({
            severity: 'error',
            summary: 'Error al conectar con el servidor, comprueba tu conexión'
          })
          break
        }
        case HttpStatusCode.Unauthorized:{
          if(req.url.includes("/login")){
            return throwError(()=> error)
          }
          message.add({
            severity: 'error',
            summary: 'No autorizado, intenta loguearte otra vez'
          })
          auth.logout().pipe(
            switchMap(()=> timer(1200))
          ).subscribe(()=> router.navigate(['/login']))
          break
        }
        case HttpStatusCode.InternalServerError:{
          message.add({
            severity: 'error',
            summary: 'Error en el servidor, inténtalo luego'
          })
          break
        }
        default:{
          return throwError(()=> error)
        }
      }
      return next(req)
    })
  )
};
