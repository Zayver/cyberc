import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FrameComponent } from '@components/shared/frame/frame.component';
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'cybercomplaint-home',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
