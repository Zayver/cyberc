import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { ButtonModule } from 'primeng/button';
import { timer } from 'rxjs';

@Component({
  selector: 'cybercomplaint-header',
  standalone: true,
  imports: [RouterLink, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private auth: AuthService, private router: Router){}

  get isLogged(){
    return this.auth.isLogged
  }

  logout(){
    this.auth.logout().subscribe(()=>{
      timer(1200).subscribe(()=> this.router.navigate(['/']))
    })
  }
}
