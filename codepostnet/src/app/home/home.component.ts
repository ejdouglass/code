import { Component, OnInit } from '@angular/core';
// Import the Post SERVICE!
import { PostService } from '../post.service';
// Import the Post CLASS! Which is totes different.
import { Post } from '../post';
import { routerTransition } from '../animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routerTransition],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'[@routerTransition]': ''}
})
export class HomeComponent implements OnInit {

  // Variable 'posts' is an array of type Post (as in the class, defined and imported at the top of the file)
  posts: Array<Post>;

  constructor(private _postService: PostService) { }

  ngOnInit() {
    this._postService.getPosts()
      .subscribe(res => this.posts = res);
  }

}
