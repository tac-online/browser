import {Component, OnInit} from '@angular/core';
import {RestHelperService} from './core/rest-helper.service';
import {Version} from './core/model';
import {NbMenuItem, NbMenuService} from '@nebular/theme';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private restService: RestHelperService, private menuService: NbMenuService) { }

  public items = [{ title: 'Profile' }, { title: 'Log out' , url: 'auth/logout' }];

  public ngOnInit() {
    this.loadInterfaceVersion();
  }

  private loadInterfaceVersion() {
    // this.restService.getInterfaceVersion(version => this.acceptInterfaceVersion(version), () => this.loadInterfaceVersion());
  }

  private acceptInterfaceVersion(version: Version) {
    const majorVersion = 1;
    const minorVersion = 1;
    if (version.majorVersion !== majorVersion || version.minorVersion < minorVersion) {
      console.error('Interface-Version of Backend (' + version.majorVersion + '.' + version.minorVersion + ') does not work with supported Interface-Version (' + majorVersion + '.' + minorVersion + ')');
      // TODO
    } else if (version.minorVersion > minorVersion) {
      console.warn('Interface-Version of Backend (' + version.majorVersion + '.' + version.minorVersion + ') does not match supported Interface-Version (' + majorVersion + '.' + minorVersion + ')');
    }
  }
}
