import { Injectable } from '@angular/core';
import { Subject, Observer, Observable } from 'rxjs/Rx';
import { filter } from 'rxjs/operators';
import {TokenService} from './token.service';
import {ClientMessage} from './model';

@Injectable()
export class WebsocketService {

  private messages: Subject<MessageEvent>;
  private initialized = false;

  constructor(private tokenService: TokenService) { }

  private initWebsocket() {
    const socket = new WebSocket('wss://messaging-service.tac.johannes-wirth.de/websocket');
    socket.onopen = () => socket.send(this.tokenService.getToken());
    const observable = Observable.create(
      (eventObserver: Observer<MessageEvent>) => {
        socket.onmessage = eventObserver.next.bind(eventObserver);
        socket.onerror = eventObserver.error.bind(eventObserver);
        socket.onclose = eventObserver.complete.bind(eventObserver);
        return socket.close.bind(socket);
      }
    );
    const observer = {
      next: (data: Object) => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(data));
        }
      }
    };
    this.messages =  Subject.create(observer, observable);
  }

  public subscribe(service: string, resource: string): Observable<ClientMessage> {
    if (!this.initialized) { this.initWebsocket(); }
    return this.messages.map(ev => JSON.parse(ev.data)).pipe(filter(ev => ev.service === service && ev.resource === resource));
  }

}
