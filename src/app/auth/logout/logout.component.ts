import { Component, OnInit } from '@angular/core';
import {NbTokenService} from '@nebular/auth';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private tokenService: NbTokenService) { }

  ngOnInit() {
    this.tokenService.clear();
  }

}
