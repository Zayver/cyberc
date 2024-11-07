import { AsyncPipe, NgClass } from '@angular/common';
import { HttpContext, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { complainTypes, complainStatus, ComplaintStatus } from '@model/constants/complaint-types';
import { ComplaintResponse } from '@model/response/complaint-response';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFileUser, lucideLandPlot, lucideUsersRound, lucideChartArea, lucideComputer, lucideAmbulance, lucideLandmark, lucideBadgePlus, lucideNotebookPen, lucideBookmarkCheck } from '@ng-icons/lucide';
import { ComplaintService } from '@services/complaint.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { catchError, finalize, Observable, throwError, timer } from 'rxjs';

@Component({
  selector: 'cybercomplaint-complaint-id',
  standalone: true,
  imports: [NgIcon, NgClass, AsyncPipe, ProgressSpinnerModule, ButtonModule],
  templateUrl: './complaint-id.component.html',
  styleUrl: './complaint-id.component.scss',
  providers: [provideIcons({
    lucideFileUser, lucideLandPlot, lucideUsersRound, lucideChartArea, lucideComputer, lucideAmbulance,
    lucideLandmark, lucideBadgePlus, lucideNotebookPen, lucideBookmarkCheck,
  })]
})
export class ComplaintIdComponent implements OnInit {
  uuid: string | null = null
  complaint$!: Observable<ComplaintResponse>
  loading = signal(false)
  constructor(private router: Router, private route: ActivatedRoute, private complaintS: ComplaintService,
    private message: MessageService
  ) { }

  ngOnInit(): void {
    this.uuid = this.route.snapshot.paramMap.get('id')
    if (this.uuid !== null) {
      this.complaint$ = this.complaintS.searchComplaintById(this.uuid).pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === HttpStatusCode.NotFound || err.status === HttpStatusCode.BadRequest) {
          this.router.navigate(['/e404'])
        }
        return throwError(() => err)
      }))
    }
  }

  progressComplaint() {
    this.loading.set(false)
    this.complaintS.progressComplaint(this.uuid as string).pipe(finalize(()=> this.loading.set(false))).subscribe({
      next: () => {
        this.message.add({
          severity: 'info',
          summary: `Se ha procedido con la demanda`
        })
        timer(1000).subscribe(()=> this.router.navigate(['/admin']))
      }
    })
  }

  getComplaintInfo(type: number) {
    return Object.values(complainTypes)[type]
  }

  getComplaintStatus(status: number) {
    return Object.values(complainStatus)[status]
  }

  getEndStatus() {
    return ComplaintStatus.FINALIZED
  }
}
