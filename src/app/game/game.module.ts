import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { FieldComponent } from './field/field.component';
import { BoardService } from './board.service';
import {MdGridListModule} from '@angular/material';
import { BaseComponent } from './base/base.component';
import { StoneComponent } from './stone/stone.component';

@NgModule({
  imports: [
    CommonModule,
    MdGridListModule
  ],
  declarations: [BoardComponent, FieldComponent, BaseComponent, StoneComponent],
  providers: [
    BoardService
  ],
  exports: [
    BoardComponent,
    FieldComponent,
    BaseComponent,
    StoneComponent
  ]
})
export class GameModule { }
