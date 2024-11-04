import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'cybercomplaint-frame',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ToastModule],
  templateUrl: './frame.component.html',
  styleUrl: './frame.component.scss'
})
export class FrameComponent {

}
