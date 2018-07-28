import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


const igdbAPIKey = '8d201b87c57bdec1931a63a77043fd24';
// const igdbURL = 'https://api-endpoint.igbd.com'; // production use
const igdbURL = '/proxyURL'; // development use ... this proxyURL is defined in another file lurking in the main thread
const headers = new HttpHeaders().set("user-key", igdbAPIKey).set("Accept", "application/json");

@Injectable()
export class DataProvider {

  // Note: this appears to be the 'old way,' may be deprecated, and the fancy hot newness is seen above ^
  headers = new Headers({'X-Mashape-Key': '8d201b87c57bdec1931a63a77043fd24'});
  options = new RequestOptions({ headers : this.headers });
  limit: number = 50;

  constructor(public http: HttpClient) {  }

  getGames(genre, offset_num) {

    let genre_id = genre;
    let offset = offset_num;

    return this.http.get(igdbURL + '/games/?fields=name,release_dates,screenshots&limit='
    + this.limit + '&offset=' + offset + '&order=release_dates.date:desc&filter[genres][eq]='
    + genre_id + '&filter[screenshots][exists]=1', { headers });
  }

  getFavorites(favs) {
    let favorites = favs;
    favorites = favorites.join();

    return this.http.get(igdbURL + '/games/' + favorites + '?fields=name,release_dates,screenshots&order=release_dates.date:desc&filter[screenshots][exists]=1', { headers });
  }

  getGenres() {
    return this.http.get(igdbURL + '/genres/?fields=*', { headers });
  }

  getGame(game) {
    let game_id = game;

    return this.http.get(igdbURL + '/games/' + game_id + '?fields=*', { headers });
  }

  getPerspective(perspective) {
    let persp_id = perspective;

    return this.http.get(igdbURL + '/player_perspectives/' + persp_id + '?fields=*', { headers });
  }

  searchGames(kw) {
    let keyword = kw;
    return this.http.get(igdbURL + '/games/?fields=name,release_dates,screenshots&limit=' + this.limit + '&offset=0&order=release_dates.date:desc&search=' + keyword, { headers });
  }



}
