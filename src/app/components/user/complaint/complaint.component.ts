import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CreateComplaintRequest } from '@model/request/create-complaint';
import { ComplaintService } from '@services/complaint.service';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { KeyFilterModule } from 'primeng/keyfilter';
import { StepperModule } from 'primeng/stepper';
import { ComplaintType, complainTypes } from '@model/constants/complaint-types';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAmbulance, lucideChartArea, lucideComputer, lucideFileUser, lucideLandmark, lucideLandPlot, lucideUsersRound } from '@ng-icons/lucide'
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'cybercomplaint-complaint',
  standalone: true,
  imports: [
    ReactiveFormsModule, InputTextModule, InputMaskModule, InputNumberModule,
    InputTextareaModule, ButtonModule, KeyFilterModule, StepperModule, NgIcon, RouterLink
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
  id: string | undefined = "17bbc53f-b516-47ea-bf49-7997fcf11cbd"

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

  sendComplaint(callback: any){
    this.loading.set(true)
    const request: CreateComplaintRequest = this.complaintForm.value
    request.type = +request.type
    this.complaintS.createComplaint(request).pipe(finalize(()=> this.loading.set(false))).subscribe({
      next:(res)=>{
        this.messageService.add({
          severity: 'success',
          summary: 'Se ha creado tu denuncia con éxito'
        })
        //timer(1500).subscribe(()=> this.router.navigate(['/']))
        callback.emit()
        this.id = res.id
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
    return Object.entries(complainTypes) as unknown as [ComplaintType, {display: string, icon: string}][]
  }
}
