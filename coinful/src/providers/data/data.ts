import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  // Here is where we will make the various methods that will fetch the data we need from the public API!

  result: any;

  // Nonsense variable, remove later before continuing the tutorial
  testguy: any;

  constructor(public _http: HttpClient) {
    
  }

  // First up, we're gonna make a method that communicates with the API
  // Ultimately the goal is to get the user's preferences as to what to see and go from there!
  getCoins(coins) {
    
    let coinlist = '';

    coinlist = coins.join();

    /* Successful link string looks like this and works fine when console logged through the home.ts page
    return this._http.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR")
      .map(result => this.result = result);
    */

    // CRITICAL POINT: This setup REQUIRES multiple items in the coinlist. Else, you'll need to use the format above.
    return this._http.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + coinlist + "&tsyms=USD")
      .map(result => this.result = result);
  }

  getCoin(coin) {
    return this._http.get("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + coin + "&tsyms=USD")
      .map(result => this.result = result);
  }

  getChart(coin) {
    return this._http.get("https://min-api.cryptocompare.com/data/histoday?fsym=" + coin + "&tsym=USD&limit=30&aggregate=1")
      .map(result => this.result = result);
  }

  allCoins() {
    let headers = new HttpHeaders()
      .set("Access-Control-Allow-Origin", "*");

    // Tutorial used headers above, but that didn't work and threw errors, so just going in raw... for success!
    return this._http.get("https://min-api.cryptocompare.com/data/all/coinlist")
      .map(result => this.result = result);
  }

}
