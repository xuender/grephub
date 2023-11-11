import { EventEmitter, Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { informationCircle } from 'ionicons/icons';
import { NextObserver, map, share } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

import { pb } from 'src/pb';
const loadSize = 100;
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  onOpen$: NextObserver<Event> = {
    next: () => {
      console.log('onOpen');
      this.send({ type: pb.Type.config });
    },
  };
  onClose$: NextObserver<CloseEvent> = {
    next: () => {
      console.log('onClose');
    },
  };
  onStop$ = new EventEmitter<void>();
  private ws: WebSocketSubject<ArrayBuffer> = webSocket({
    url: `ws://${location.host}/ws`,
    openObserver: this.onOpen$,
    closeObserver: this.onClose$,
    binaryType: 'arraybuffer',
    serializer: (v) => v as ArrayBuffer,
    deserializer: (v) => v.data,
  });
  private onMsg$ = this.ws.pipe(
    map((msg) => {
      const buf = new Uint8Array(msg as ArrayBuffer);

      return pb.Msg.decode(buf);
    }),
    share()
  );
  private funcs = new Map<pb.Type, any>([
    [pb.Type.alert, this.onAlert],
    [pb.Type.config, this.onConfig],
    [pb.Type.query, this.onQuery],
    [pb.Type.ack, this.onAck],
    [pb.Type.open, this.onIgnore],
    [pb.Type.addDirs, this.onIgnore],
    [pb.Type.stop, this.onStop],
  ]);
  dirs: string[] = [];
  isRun = false;
  query: pb.IQuery = {
    maxCount: 1,
    pattern: '',
    agTypes: [],
    rgTypes: [],
    grepType: '',
  };
  private _acks: pb.IAck[] = [];
  private size = loadSize;
  pro = '';
  time = '';
  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    addIcons({ informationCircle });
    this.onMsg$.subscribe((msg) => {
      console.log('onMsg', msg);

      const func = this.funcs.get(msg.type);
      func.apply(this, [msg]);
    });
  }

  get types() {
    if (!this.query) {
      return [];
    }

    switch (this.query.searcher) {
      case pb.Searcher.ag:
        return this.query.agTypes ? this.query.agTypes : [];
      case pb.Searcher.rg:
        return this.query.rgTypes ? this.query.rgTypes : [];
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

  get acks(): pb.IAck[] {
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

  async delDir(dir: string) {
    this.send({ type: pb.Type.delDir, value: dir });
    const toast = await this.toastCtrl.create({
      message: `config remove ${dir}.`,
      duration: 1000,
    });
    await toast.present();
  }

  private async onAlert(msg: pb.IMsg) {
    if (!msg.value) {
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'The Silver Searcher',
      subHeader: 'missing dependency library.',
      inputs: [
        {
          type: 'text',
          value: msg.value,
        },
      ],
      buttons: ['OK'],
    });

    await alert.present();
  }

  private onConfig(msg: pb.IMsg) {
    if (msg.dirs) {
      this.dirs = msg.dirs;
    }

    if (msg.query) {
      this.query = msg.query;
    }

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

  private onQuery(msg: pb.IMsg) {
    if (!msg.query) {
      return;
    }

    this.query = msg.query;
    this._acks = [];
    this.time = '';
    this.size = loadSize;
  }

  private onAck(msg: pb.IMsg) {
    if (!msg.ack) {
      return;
    }

    this._acks.push(...msg.ack);
  }

  private onIgnore(_: pb.IMsg) {}

  private onStop(msg: pb.IMsg) {
    console.log('stop', msg);
    this.isRun = false;
    this.time = msg.value ? msg.value : '';
    this.onStop$.emit();
  }

  doQuery() {
    this.isRun = true;
    this.send({ query: this.query, type: pb.Type.query });
  }

  private send(data: pb.IMsg) {
    const msg = pb.Msg.create(data);
    this.ws.next(pb.Msg.encode(msg).finish());
  }

  async doOpen(file: string) {
    this.send({ value: file, type: pb.Type.open });
    const toast = await this.toastCtrl.create({
      message: `Open ${open}.`,
      duration: 1000,
    });
    await toast.present();
  }

  doAddDirs() {
    this.send({ type: pb.Type.addDirs });
  }
}
