import { AsyncPipe, NgClass } from '@angular/common';
import { HttpStatusCode } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { complainStatus, complainTypes } from '@model/constants/complaint-types';
import { ComplaintResponse } from '@model/response/complaint-response';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFileUser, lucideLandPlot, lucideUsersRound, lucideChartArea, lucideComputer, lucideAmbulance, lucideLandmark, lucideBadgePlus, lucideBookmarkCheck, lucideNotebookPen } from '@ng-icons/lucide';
import { ComplaintService } from '@services/complaint.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { catchError, finalize, Observable, throwError } from 'rxjs';

@Component({
  selector: 'cybercomplaint-consult-complaint',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputMaskModule, AsyncPipe, NgIcon, NgClass, ProgressSpinnerModule],
  templateUrl: './consult-complaint.component.html',
  styleUrl: './consult-complaint.component.scss',
  providers: [provideIcons({
    lucideFileUser, lucideLandPlot, lucideUsersRound, lucideChartArea, lucideComputer, lucideAmbulance,
    lucideLandmark, lucideBadgePlus, lucideNotebookPen, lucideBookmarkCheck,
  })]
})
export class ConsultComplaintComponent {
  searchForm = new FormGroup({
    search: new FormControl('', {validators: [Validators.required]})
  })
  loading = signal(false)
  complaint$!: Observable<ComplaintResponse>

  constructor(private complaintS: ComplaintService, private message: MessageService) { }

  searchComplaint() {
    this.loading.set(true)
    this.complaint$ = this.complaintS.searchComplaintById(this.searchForm.get("search")?.value as string).pipe(
      finalize(() => this.loading.set(false)),
      catchError((err) => {
        if (err.status === HttpStatusCode.NotFound || err.status === HttpStatusCode.BadRequest) {
          this.message.add({
            severity: 'warn',
            summary: 'No se ha encontrado denuncia con el identificador'
          })
        }
        return throwError(() => err)
      }))
  }

  getComplaintInfo(type: number) {
    return Object.values(complainTypes)[type]
  }

  getComplaintStatus(status: number){
    return Object.values(complainStatus)[status]
  }
}
