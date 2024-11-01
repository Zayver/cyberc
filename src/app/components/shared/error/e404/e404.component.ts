import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'cybercomplaint-e404',
  standalone: true,
  imports: [RouterLink, ButtonModule],
  templateUrl: './e404.component.html',
  styleUrl: './e404.component.scss'
})
export class E404Component {

}
