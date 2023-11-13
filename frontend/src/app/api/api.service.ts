import { EventEmitter, Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { informationCircle } from 'ionicons/icons';

import { AddDirs, Config, DelDir, Open, Query } from 'wailsjs/go/app/App';
import { pb } from 'wailsjs/go/models';
import { EventsOn } from 'wailsjs/runtime/runtime';
const loadSize = 100;
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  onStop$ = new EventEmitter<void>();
  dirs: string[] = [];
  isRun = false;
  query: pb.Query = {
    maxCount: 1,
    searcher: 0,
    pattern: '',
    agTypes: [],
    rgTypes: [],
    grepType: '',
  };
  private _acks: pb.Ack[] = [];
  private size = loadSize;
  pro = '';
  time = '';
  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    addIcons({ informationCircle });

    this.config();

    EventsOn('alert', (msg) => {
      this.isRun = false;
      this.onAlert(msg);
    });
    EventsOn('stop', (dur) => {
      this.isRun = false;
      this.time = `${dur}`;
    });
    EventsOn('ack', (acks: pb.Ack[]) => {
      this._acks.push(...acks);
    });
  }

  async addDirs() {
    await AddDirs();

    await this.config();
  }

  async delDir(dir: string) {
    await DelDir(dir);

    await this.config();

    const toast = await this.toastCtrl.create({
      message: `config remove ${dir}.`,
      duration: 1000,
    });
    await toast.present();
  }

  private async config() {
    const msg = await Config();
    if (msg.dirs) {
      this.dirs = msg.dirs;
    }

    if (msg.query) {
      if (!msg.query.searcher) {
        msg.query.searcher = 0;
      }

      this.query = msg.query;
    }

    console.log(msg);

    if (msg.value) {
      const list: string[] = [];

      for (const kv of msg.value.split('\n')) {
        if (!kv) {
          continue;
        }

        const val = kv.split(': ');
        list.push(`<tr><th>${val[0]}</th><td>${val[1]}</td></tr>`);
      }

      this.pro = `<table>${list.join('\n')}</table>`;
    }
  }

  get types() {
    if (!this.query) {
      return [];
    }

    switch (this.query.searcher) {
      case 2:
        return this.query.agTypes ? this.query.agTypes : [];
      case 0:
        return this.query.rgTypes ? this.query.rgTypes : [];
      case 1:
        return this.query.ugTypes ? this.query.ugTypes : [];
      default:
        return [];
    }
  }

  get length() {
    return this._acks.length;
  }

  load() {
    this.size += loadSize;

    return this.size > this._acks.length;
  }

  get acks(): pb.Ack[] {
    if (this.size < this._acks.length) {
      return this._acks.slice(0, this.size);
    }

    return this._acks;
  }

  hasDir(dir: string) {
    if (!this.query.paths) {
      return false;
    }

    return this.query.paths.includes(dir);
  }

  get count() {
    let count = 0;
    for (const ack of this._acks) {
      if (!ack.mates) {
        continue;
      }

      for (const mate of ack.mates) {
        if (!mate.hits) {
          continue;
        }

        count += mate.hits.length;
      }
    }

    return count;
  }

  addDir(dir: string) {
    if (!this.query.paths) {
      this.query.paths = [dir];

      return;
    }

    if (this.query.paths.includes(dir)) {
      this.query.paths = this.query.paths.filter((p) => p !== dir);

      return;
    }

    this.query.paths.push(dir);
  }

  async doQuery() {
    this.isRun = true;
    const query = await Query(this.query);
    if (!query) {
      return;
    }

    this.query = query;
    this._acks = [];
    this.time = '';
    this.size = loadSize;
  }

  private async onAlert(value: string) {
    if (!value) {
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'The Silver Searcher',
      subHeader: 'missing dependency library.',
      inputs: [
        {
          type: 'text',
          value,
        },
      ],
      buttons: ['OK'],
    });

    await alert.present();
  }

  async open(file: string) {
    await Open(file);

    const toast = await this.toastCtrl.create({
      message: `Open ${file}.`,
      duration: 1000,
    });
    await toast.present();
  }
}
