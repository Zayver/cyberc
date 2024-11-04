import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateComplaintRequest } from '@model/request/create-complaint';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ComplaintResponse } from '@model/response/complaint-response';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private readonly ENDPOINT = "complaint"

  constructor(private http: HttpClient) { }

  createComplaint(request: CreateComplaintRequest): Observable<any>{
    return this.http.post(`${environment.apiUrl}/${this.ENDPOINT}`, request)
  }

  //Admin functions

  getAllComplaints(options?: {page: number, pageSize: number}): Observable<ComplaintResponse[]>{
    let params = new HttpParams()
    if(options){
      params.append('page', options.page).append('pageSize', options.pageSize)
    }
    return this.http.get<ComplaintResponse[]>(`${environment.apiUrl}/${this.ENDPOINT}`, {params})
  }

}
