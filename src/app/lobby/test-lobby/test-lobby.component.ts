import { Component, OnInit } from '@angular/core';
import {RestGameService} from '../../core/rest-game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'tac-test-lobby',
  templateUrl: './test-lobby.component.html',
  styleUrls: ['./test-lobby.component.css']
})
export class TestLobbyComponent implements OnInit {

  games: number[] = [];

  constructor(private restGameService: RestGameService, private router: Router) { }

  ngOnInit() {
    this.restGameService.getGames(list => this.games = list, () => this.ngOnInit());
  }

  createGame() {
    this.restGameService.createGame(id => this.games.push(id), () => this.createGame());
  }

  joinGame(gameid: number) {
    this.router.navigate(['/game', {game: gameid}]);
  }

  deleteGame(gameid: number) {
    this.restGameService.deleteGame(gameid,() => this.games = this.games.filter(id => id !== gameid), () => this.deleteGame(gameid));
  }

}
