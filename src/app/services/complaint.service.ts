import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateComplaintRequest } from '@model/request/create-complaint';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ComplaintResponse } from '@model/response/complaint-response';
import { ComplaintsResponse } from '@model/response/complaints-response';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private readonly ENDPOINT = "complaint"

  constructor(private http: HttpClient) { }

  createComplaint(request: CreateComplaintRequest): Observable<any>{
    return this.http.post(`${environment.apiUrl}/${this.ENDPOINT}`, request)
  }
  searchComplaintById(id: string){
    return this.http.get<ComplaintResponse>(`${environment.apiUrl}/${this.ENDPOINT}/${id}`)
  }
  
  //Admin functions

  getAllComplaints(options?: {page: number, pageSize: number}): Observable<ComplaintsResponse>{
    let params
    if(options){
      params = new HttpParams().append('page', options.page).append('pageSize', options.pageSize)
    }
    return this.http.get<ComplaintsResponse>(`${environment.apiUrl}/${this.ENDPOINT}`, {params})
  }

  searchComplaintByCC(cc: string){
    const params = new HttpParams().set("cc", cc)
    return this.http.get<ComplaintsResponse>(`${environment.apiUrl}/${this.ENDPOINT}/filter`, {params})
  }

  progressComplaint(id: string){
    return this.http.put(`${environment.apiUrl}/${this.ENDPOINT}/${id}/progress`, {})
  }
}
