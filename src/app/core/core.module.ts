import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RestHelperService} from './rest-helper.service';
import {RestGameService} from './rest-game.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    RestHelperService,
    RestGameService
  ]
})
export class CoreModule { }
