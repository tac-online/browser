import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Card} from '../../core/model.card';
import {Board} from '../../core/model.game';

import {
  BasePosition,
  BASES,
  CARDSTACK,
  Coordinates,
  FieldPosition,
  HomePosition,
  HOMES,
  TRACK
} from '../../core/model.positions';
import {ScaleService} from '../../core/scale.service';

@Component({
  selector: 'tac-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @ViewChild('image', { static: true })
  private image: ElementRef;

  @Input() public currentCard: Card;
  @Input() private board: Board;
  /*set board(board: Board) {
    this._board = board;
  }
  get board(): Board {
    return this._board;
  }
  private _board: Board;*/


  public track: FieldPosition[];
  public homes: HomePosition[];
  public bases: BasePosition[];
  public cardstack: Coordinates;

  constructor(private scaleService: ScaleService) { }

  ngOnInit(): void {
  }

  public init() {
    const image: HTMLImageElement = this.image.nativeElement;
    this.scaleService.updateScale(image.clientHeight);
    this.track = TRACK;
    this.bases = BASES;
    this.homes = HOMES;
    this.cardstack = CARDSTACK;
  }

}
