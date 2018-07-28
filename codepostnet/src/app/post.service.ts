import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
// Allows us to change api feedback into JSON data
import 'rxjs/add/operator/map';
import { Post } from './post';

@Injectable()
export class PostService {

  result: any;

  // Dependency injection!
  constructor(private _http: Http) { }

  getPosts() {
    // This takes advantage of the backend routing that we did with server.js in concert with api.js
    return this._http.get('/api/posts')
      .map(result => this.result = result.json());
  }

  getPost(id) {
    // This takes advantage of the backend routing that we did with server.js in concert with api.js
    return this._http.get('/api/details/' + id)
      .map(result => this.result = result.json());
  }

  insertPost(post: Post) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });

    return this._http.post('/api/posts', JSON.stringify(post), options)
    .map(result => this.result = result.json());
  }

}
