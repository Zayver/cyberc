import { Component } from '@angular/core';
import { FrameComponent } from '@components/shared/frame/frame.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CreateComplaintRequest } from '@model/request/create-complaint';
import { ComplaintService } from '@services/complaint.service';

@Component({
  selector: 'cybercomplaint-complaint',
  standalone: true,
  imports: [
    FrameComponent, ReactiveFormsModule, InputTextModule, InputMaskModule, InputNumberModule,
    InputTextareaModule, ButtonModule
  ],
  templateUrl: './complaint.component.html',
  styleUrl: './complaint.component.scss'
})
export class ComplaintComponent{
  complaintForm: FormGroup

  constructor(private formBuilder: FormBuilder, private complaintS: ComplaintService){
    this.complaintForm = this.formBuilder.group({
      name: ['', Validators.required],
      secondName: ['', Validators.required],
      surName: ['', Validators.required],
      secondSurName: ['', Validators.required],
      cellphone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cc: ['', [Validators.required, Validators.pattern('^\\d*$')]],
      description: ['', Validators.required]
    })
  }

  sendComplaint(){
    const request: CreateComplaintRequest = this.complaintForm.value
    this.complaintS.createComplaint(request).subscribe({
      next:()=>{
        console.log("GOOOD")
      }
    })
  }
}
