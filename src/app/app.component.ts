import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'cybercomplaint-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet/>`,
})
export class AppComponent {}
