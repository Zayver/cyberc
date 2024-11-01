import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateComplaintRequest } from '@model/request/create-complaint';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private http: HttpClient) { }

  createComplaint(request: CreateComplaintRequest): Observable<any>{
    return this.http.post(`${environment.apiUrl}/complaint`, request)
  }
}
