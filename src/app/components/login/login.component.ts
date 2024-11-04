import { HttpErrorResponse } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FrameComponent } from '@components/shared/frame/frame.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideKeyRound } from '@ng-icons/lucide';
import { AuthService } from '@services/auth.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { finalize } from 'rxjs';

@Component({
  selector: 'cybercomplaint-login',
  standalone: true,
  imports: [FrameComponent, NgIcon, InputTextModule, PasswordModule, ReactiveFormsModule,
    ButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [provideIcons({lucideKeyRound})]
})
export class LoginComponent {
  loginForm: FormGroup
  loading = signal(false)

  constructor(private formBuilder: FormBuilder, private router: Router,
    private auth: AuthService, private message: MessageService
  ){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(){
    this.loading.set(true)
    const request= this.loginForm.value
    this.auth.login(request).pipe(finalize(()=> this.loading.set(false))).subscribe({
      next:()=>{
        this.router.navigate(['/admin'])
      },
      error:(err: HttpErrorResponse)=>{
        this.message.add({
          severity: 'error',
          summary: 'Usuario o contraseña incorrectos'
        })
      }
    })
  }
}
