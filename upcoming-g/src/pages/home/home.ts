import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, Content } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { GenresPage } from '../genres/genres';
import { DetailsPage } from '../details/details';
import { Keyboard } from '@ionic-native/keyboard'

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Content) content: Content;

  games: any;
  genre: any;
  genreName: string = 'Upcoming Games';
  favorites = [];
  showSearch: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataProvider, private storage: Storage, public loading: LoadingController, public modalCtrl: ModalController, public keyboard: Keyboard) {

    let loader = this.loading.create({
      content: "Grabbing Games...",
    });

    loader.present().then(() => {

      this.storage.get('genre').then((val) => {
        if (val) {
          this.genre = val.id;
          this.genreName = val.name;
        } else {
          this.genre = '2';
          this.genreName = 'Shooter';
          this.storage.set('genre', this.genre);
        }
        
        this._data.getGames(this.genre, 0)
          .subscribe(res => this.games = res);

      });

      this.storage.get('favorites').then((val) => {
        if (!val) {
          this.storage.set('favorites', this.favorites);
        } else {
          this.favorites = val;
        }
      });

      loader.dismiss();

    })

  }

  favorite(game) {
    this.favorites.push(game);
    // Does something to avoid duplicating?
    this.favorites = this.favorites.filter(function(item, i, ar) { return ar.indexOf(item) === i; });
    this.storage.set('favorites', this.favorites);
    console.log(this.favorites);
  }

  removeFavorite(game) {
    this.favorites = this.favorites.filter((item) => item !== game);
    this.storage.set('favorites', this.favorites);
  }

  openFavorites() {
    this.storage.get('favorites').then((val) => {
      this.genreName = 'Favorites';

      if (val.length != 0) {
        this._data.getFavorites(val)
          .subscribe(res => this.games = res);
      } else {
        this.games.length = 0;
      }
    })
  }

  openGenres() {
    let myModal = this.modalCtrl.create(GenresPage);

    myModal.onDidDismiss(genre => {
      let loader = this.loading.create({
        content: "Getting Genres...",
      });

      if (genre) {
        loader.present().then(() => {
          this.storage.get('genre').then((val) => {
            this.genre = val.id;
            this.genreName = val.name;

            this._data.getGames(this.genre, 0)
              .subscribe(res => this.games = res);
          });
        });
      }
      loader.dismiss();
    });

    myModal.present();
  }

  showSearchBox() {
    this.showSearch = !this.showSearch;
    this.content.scrollToTop();
  }

  search(eventful) {
    let search_term = eventful.target.value;
    let keyblade = eventful.keyCode;
    // For when you want the keyboard to go away when you're done typing!
    // this.keyboard.close();
    if (keyblade == 13) {
      this.genreName = search_term;
      // this.showSearch = false; ... hides the thingy, but assumes a single search, rather than a pestering search that I set up for this :P
      this._data.searchGames(search_term)
        .subscribe(res => this.games = res);
    }
  }

  detailsPage(game) {
    this.navCtrl.push(DetailsPage, {
      game: game
    });
  }

  ionViewDidLoad() {
  }

}
