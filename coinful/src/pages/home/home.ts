import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';
import { LoadingController } from 'ionic-angular';
import { SearchPage } from '../search/search';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  detailToggle = [];
  objectKeys = Object.keys;
  coins: Object;
  details: Object;
  likedCoins = [];
  chart = [];

  constructor(public navCtrl: NavController, private _data: DataProvider, private storage: Storage, public loading: LoadingController) {

  }

  // Currently just a little short-term catch... basically goes "if/when this component/thingy loads..." Also something about a "life-cycle hook"...?
  ionViewDidLoad() {
    // We're gonna check storage for preferences for the passed-in variable, and if no such preference exists, just default to some common/popular coins
    // Thus we're gonna install storage for Ionic! Whaaat! I dunno what that even means... yet.
  }

  // Another Ionic life-cycle hook! Uh, hit the docs for this, I guess...?
  ionViewWillEnter() {
    this.refreshCoins();
  }

  refreshCoins() {

    let loader = this.loading.create({
      content: 'Refreshing...',
      spinner: 'bubbles'
    });

    loader.present().then(() => {
      this.storage.get('likedCoins').then((val) => {
        // If the value is not set, then:
        if (!val) {
          this.likedCoins.push('BTC','ETH','IOT');
          // So oddly THIS THING BELOW, when commented out, takes out the egregious errors... HMMMM
          // Uh nm it works now. Changed "this" to "this.likedCoins"... did I miss it in the tut??
          this.storage.set('likedCoins', this.likedCoins);

          this._data.getCoins(this.likedCoins)
            .subscribe(res => {
              this.coins = res;
              loader.dismiss();
            });
        // Otherwise, value IS set, sooooo:
        } else {
          this.likedCoins = val;

          this._data.getCoins(this.likedCoins)
            .subscribe(res => {
              this.coins = res;
              loader.dismiss();
            });
        }
      })
    });

  }

  coinDetails(coin, index) {
    if (this.detailToggle[index]) {
      // If the toggle for the given index is true, clicking it again will make it false, thus un-displaying it in the ionic HTML
      this.detailToggle[index] = false;
    } else {
      // Otherwise, it sets ALL of the toggles to false, only to later set the current one to true again after fetching the relevant data from the public crypto API
      this.detailToggle.fill(false);

      this._data.getCoin(coin)
        .subscribe(res => {
          // The response is an object from the crypto API, and this series of keys gets the particular details we want from it
          this.details = res['DISPLAY'][coin]['USD'];

          // Sets the toggle for the given index to true so that it will display via the ionic HTML
          this.detailToggle[index] = true;

          this._data.getChart(coin)
            .subscribe(res => {
              let coinHistory = res['Data'].map((a) => (a.close));

              setTimeout(() => {
                this.chart[index] = new Chart('canvas' + index, {
                  type: 'line',
                  data: {
                    labels: coinHistory,
                    datasets: [{
                      data: coinHistory,
                      borderColor: '#3CBA9F',
                      fill: false
                      }
                    ]
                  },
                    options: {
                      tooltips: {
                        callbacks: {
                          label: function(tooltipItems, data) {
                            return "$" + tooltipItems.yLabel.toString();
                          }
                        }
                      }, 
                      responsive: true,
                      legend: {
                        display: false
                      },
                      scales: {
                        xAxes: [{
                          display: false
                        }],
                        yAxes: [{
                          display: false
                        }]
                      }
                    }
                });
              }, 250);
            })
        })
    }
  }

  swiped(index) {
    this.detailToggle[index] = false;
  }

  removeCoin(coin) {
    this.detailToggle.fill(false);

    this.likedCoins = this.likedCoins.filter(function(item) {
      return item !== coin;
    });

    this.storage.set('likedCoins', this.likedCoins);

    setTimeout(() => {
      this.refreshCoins();
    }, 300);
  }

  // Apparently this will slip us over to the search page!
  showSearch() {
    this.navCtrl.push(SearchPage);
  }

}
