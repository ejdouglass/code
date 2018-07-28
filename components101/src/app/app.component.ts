import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  template: `

  <p>{{ someProperty }}</p>

  <h1 [class]="titleClass">Proto App is Operational</h1>

  <button (mouseenter)="myEvent($event)">BOOP ME</button>

  `,
  styles: [`
  .red-title {
  	color: red;
  }
  `]
})
export class AppComponent {

	constructor(private dataService:DataService) {

	}

	myEvent(event) {
		console.log(event);
	}

	titleClass="red-title";

	someProperty:string = '';

	ngOnInit() {
		// Anything in this method will run as soon as the component loads
		console.log(this.dataService.cars);

		this.someProperty = this.dataService.myData();
	}



}


// templateUrl: './app.component.html',