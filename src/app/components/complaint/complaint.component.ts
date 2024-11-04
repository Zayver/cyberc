import { Component, signal } from '@angular/core';
import { FrameComponent } from '@components/shared/frame/frame.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CreateComplaintRequest } from '@model/request/create-complaint';
import { ComplaintService } from '@services/complaint.service';
import { MessageService } from 'primeng/api';
import { finalize, timer } from 'rxjs';
import { KeyFilterModule } from 'primeng/keyfilter';
import { StepperModule } from 'primeng/stepper';
import { ComplaintType, complainTypes } from '@model/constants/complaint-types';
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideAmbulance, lucideChartArea, lucideComputer, lucideFileUser, lucideLandmark, lucideLandPlot, lucideUsersRound } from '@ng-icons/lucide'
import { Router } from '@angular/router';

@Component({
  selector: 'cybercomplaint-complaint',
  standalone: true,
  imports: [
    FrameComponent, ReactiveFormsModule, InputTextModule, InputMaskModule, InputNumberModule,
    InputTextareaModule, ButtonModule, KeyFilterModule, StepperModule, NgIcon
  ],
  templateUrl: './complaint.component.html',
  styleUrl: './complaint.component.scss',
  providers: [provideIcons({
    lucideFileUser,
    lucideLandPlot,
    lucideUsersRound,
    lucideChartArea,
    lucideComputer,
    lucideAmbulance,
    lucideLandmark,
  })]
})
export class ComplaintComponent{
  complaintForm: FormGroup
  loading = signal(false)

  constructor(private formBuilder: FormBuilder, private complaintS: ComplaintService, 
    private messageService: MessageService, private router: Router
  ){
    this.complaintForm = this.formBuilder.group({
      name: ['', Validators.required],
      secondName: ['', Validators.required],
      surName: ['', Validators.required],
      secondSurName: ['', Validators.required],
      cellphone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cc: ['', [Validators.required]],
      description: ['', Validators.required],
      type: ['', Validators.required]
    })
  }

  sendComplaint(){
    this.loading.set(true)
    const request: CreateComplaintRequest = this.complaintForm.value
    this.complaintS.createComplaint(request).pipe(finalize(()=> this.loading.set(false))).subscribe({
      next:()=>{
        this.messageService.add({
          severity: 'success',
          summary: 'Se ha creado tu denuncia con éxito'
        })
        timer(1500).subscribe(()=> this.router.navigate(['/']))
      },
      error:(err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ha ocurrido un error al enviar la denuncia',
          detail: `Error: ${err.status}`
        })
      },
    })
  }

  selectType(callback: any, type: ComplaintType){
    this.complaintForm.get('type')?.setValue(type)
    callback.emit()
  }

  getComplaintTypes(){
    return complainTypes
  }
}
