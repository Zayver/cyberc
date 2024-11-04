import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'cybercomplaint-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private auth: AuthService){}

  get isLogged(){
    return this.auth.isLogged
  }
}
