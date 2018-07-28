import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';



@IonicPage()
@Component({
  selector: 'page-genres',
  templateUrl: 'genres.html',
})
export class GenresPage {

  genres: any;
  currentGenre: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public viewCtrl: ViewController, private _data: DataProvider) {
  
    this._data.getGenres()
      .subscribe(res => this.genres = res);
  
  }

  ionViewDidEnter() {
    this.storage.get('genre').then((val) => {
      if (val) {
        this.currentGenre = val.id;
      } else {
        this.currentGenre = '2';
      }
    })
  }

  genreSelected(genre) {
    this.storage.set('genre', genre);
    this.viewCtrl.dismiss(genre);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenresPage');
  }

}
