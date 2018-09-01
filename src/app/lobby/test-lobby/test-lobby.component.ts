import { Component, OnInit } from '@angular/core';
import {RestGameService} from '../../core/rest-game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'tac-test-lobby',
  templateUrl: './test-lobby.component.html',
  styleUrls: ['./test-lobby.component.css']
})
export class TestLobbyComponent implements OnInit {

  public game = '';

  constructor(private restGameService: RestGameService, private router: Router) { }

  ngOnInit() {
  }

  createGame() {
    if (this.game.length > 0)
    this.restGameService.startGame(this.game, () => this.joinGame(), () => this.createGame());
  }

  joinGame() {
    if (this.game.length > 0)
    this.router.navigate(['/game', {game: this.game}]);
  }

}
