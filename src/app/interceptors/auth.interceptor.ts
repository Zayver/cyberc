import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService)
  if(auth.isLogged){
    req = req.clone({
      setHeaders:{
        Authorization: `Bearer ${auth.userDetails.token}`
      }
    })
  }
  return next(req);
};
