import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrameComponent } from '@components/shared/frame/frame.component';

@Component({
  selector: 'cybercomplaint-admin',
  standalone: true,
  imports: [FrameComponent, RouterOutlet],
  template: `
    <cybercomplaint-frame>
      <div class="wrapper">
        <router-outlet/>
      </div>
    </cybercomplaint-frame>
  `,
})
export class UserComponent {

}
