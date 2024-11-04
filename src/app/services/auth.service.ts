import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoginRequest } from '@model/request/login-request';
import { BehaviorSubject, finalize, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserDetails } from '@model/response/user-details';
import { isPlatformBrowser } from '@angular/common';
import { LoginResponse } from '@model/response/login-response';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly LOCAL_STORAGE_KEY = "CYBERC_USER"
  private userDetailsSubject: BehaviorSubject<UserDetails | null> = new BehaviorSubject<UserDetails | null>(null)

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) platformId: string) {
    if (!isPlatformBrowser(platformId)){
      return
    }
    let user = localStorage.getItem(this.LOCAL_STORAGE_KEY)
    if (user !== null){
      this.userDetailsSubject.next(JSON.parse(user))
    }
  }

  login(request: LoginRequest): Observable<any>{
    return this.http.post<LoginResponse>(`${environment.apiUrl}/login`, request).pipe(
      tap((res: LoginResponse)=>{
        this.decodeJWT(res.token)
      })
    )
  }

  get userDetails(): UserDetails{
    return this.userDetailsSubject.value as UserDetails
  }

  get isLogged (){
    return this.userDetailsSubject.value !== null
  }

  private decodeJWT(token: string){
    const decoded = jwtDecode(token)
    const userDetails: UserDetails = {
      token: token,
      username: decoded.sub as string
    }
    this.storeUserDetails(userDetails)
    this.userDetailsSubject.next(userDetails)
  }

  logout(): Observable<any>{
    return of({}).pipe(finalize(()=>{
      this.removeToken()
      this.userDetailsSubject.next(null)
    }))
  }

  private removeToken(){
    localStorage.removeItem(this.LOCAL_STORAGE_KEY)
  }
  private storeUserDetails(userD: UserDetails){
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(userD))
  }
}
