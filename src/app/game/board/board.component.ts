import { Component, OnInit } from '@angular/core';
import {BoardService} from '../board.service';
import {Board} from '../model';

@Component({
  selector: 'tac-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public board: Board;

  constructor(private boardService: BoardService) { }

  ngOnInit() {
    const names = ['1', '2', '3', '4'];
    this.board = this.boardService.createBoard(names);
  }

}
