import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ComplaintResponse } from '@model/response/complaint-response';
import { ComplaintService } from '@services/complaint.service';
import {TableModule} from 'primeng/table'
import { Observable } from 'rxjs';

@Component({
  selector: 'cybercomplaint-list-complaints',
  standalone: true,
  imports: [TableModule, AsyncPipe],
  templateUrl: './list-complaints.component.html',
  styleUrl: './list-complaints.component.scss'
})

export class ListComplaintsComponent implements OnInit{
  complaints$!: Observable<ComplaintResponse[]>

  constructor(private complaintS: ComplaintService){}

  ngOnInit(): void {
    this.complaints$ = this.complaintS.getAllComplaints()
  }
}
