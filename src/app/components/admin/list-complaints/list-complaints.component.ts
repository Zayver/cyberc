import { AsyncPipe, NgClass } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { complainStatus, ComplaintStatus, ComplaintType, complainTypes } from '@model/constants/complaint-types';
import { ComplaintsResponse } from '@model/response/complaints-response';
import { ComplaintService } from '@services/complaint.service';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableLazyLoadEvent, TableModule} from 'primeng/table'
import { debounceTime, distinctUntilChanged, Observable, startWith, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'cybercomplaint-list-complaints',
  standalone: true,
  imports: [
    TableModule, AsyncPipe, InputTextModule, KeyFilterModule, ReactiveFormsModule,
    NgClass, ProgressSpinnerModule, RouterLink
  ],
  templateUrl: './list-complaints.component.html',
  styleUrl: './list-complaints.component.scss'
})

export class ListComplaintsComponent implements OnInit{
  private complaintSubject = new Subject<ComplaintsResponse>
  complaints$: Observable<ComplaintsResponse> = this.complaintSubject.asObservable()
  search = new FormControl('')
  loading = signal(false)
  rows = signal(10)
  first = signal(0)

  constructor(private complaintS: ComplaintService){}

  ngOnInit(): void {
    const init$ = this.complaintS.getAllComplaints()
    const search$ = this.search.valueChanges.pipe(
      startWith(''),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((s)=> {
        return s === '' ? init$ : this.complaintS.searchComplaintByCC(s as string)
      })
    ).subscribe((res)=> this.complaintSubject.next(res))
  }

  getDisplay(type: ComplaintType){
    return Object.values(complainTypes)[type].display
  }

  lazyTable(event: TableLazyLoadEvent){
    this.search.setValue('', {emitEvent: false})
    const first: number = event.first as number
    const rows: number = event.rows as number
    const page = first/rows + 1
    this.complaintS.getAllComplaints({page: page, pageSize: rows}).pipe(tap(()=>{
      this.first.set(first)
      this.rows.set(rows)
    })).subscribe((res)=> this.complaintSubject.next(res))
  }

  getComplaintStatus(status: ComplaintStatus){
    return Object.values(complainStatus)[status]
  }

}
