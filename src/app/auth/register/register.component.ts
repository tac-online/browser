import { Component } from '@angular/core';
import { NbRegisterComponent } from '@nebular/auth';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent extends NbRegisterComponent {
  repass: string;
}
