import { Component } from '@angular/core';
import { routerTransition } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'[@routerTransition]': ''}
})
export class AppComponent {
  title = 'app';
}
