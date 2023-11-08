import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AlertController,
  ToastController,
  ToastOptions,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { informationCircle } from 'ionicons/icons';
import { NextObserver, map, share } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

import { pb } from 'src/pb';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  onOpen$: NextObserver<Event> = {
    next: () => {
      console.log('连接开启');
      this.send({ type: pb.Type.config });
    },
  };
  onClose$: NextObserver<CloseEvent> = {
    next: () => {
      console.log('连接关闭');
    },
  };
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
    [pb.Type.open, this.onOpen],
    [pb.Type.select, this.onSelect],
    [pb.Type.stop, this.onStop],
  ]);
  dirs: string[] = [];
  isRun = false;
  query: pb.IQuery = { maxCount: 1, pattern: '', types: [] };
  acks: pb.IAck[] = [];
  constructor(
    private http: HttpClient,
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

  hasDir(dir: string) {
    if (!this.query.paths) {
      return false;
    }

    return this.query.paths.includes(dir);
  }

  count() {
    let count = 0;
    for (const ack of this.acks) {
      if (ack.mates) {
        count += ack.mates.length;
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

  private async onAlert(msg: pb.IMsg) {
    if (!msg.alert) {
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'The Silver Searcher',
      subHeader: 'missing dependency library.',
      inputs: [
        {
          type: 'text',
          value: msg.alert,
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
  }

  private onQuery(msg: pb.IMsg) {
    if (!msg.query) {
      return;
    }

    this.query = msg.query;
    this.acks = [];
  }

  private onAck(msg: pb.IMsg) {
    if (!msg.ack) {
      return;
    }

    this.acks.push(msg.ack);
  }

  private onOpen(msg: pb.IMsg) {
    console.log('open', msg);
  }

  private onSelect(msg: pb.IMsg) {
    if (!msg.select) {
      return;
    }

    if (!this.dirs) {
      this.dirs = [];
    }

    this.dirs.push(msg.select);
  }

  private onStop(msg: pb.IMsg) {
    console.log('stop', msg);
    this.isRun = false;
  }

  doQuery() {
    this.isRun = true;
    this.send({ query: this.query, type: pb.Type.query });
  }

  private send(data: pb.IMsg) {
    const msg = pb.Msg.create(data);
    this.ws.next(pb.Msg.encode(msg).finish());
  }

  async doOpen(open: string) {
    this.send({ open, type: pb.Type.open });
    const toast = await this.toastCtrl.create({
      message: `Open ${open}.`,
      duration: 1000,
    });
    await toast.present();
  }

  doSelect() {
    this.send({ type: pb.Type.select });
  }

  copy(text: string) {
    this.http.post<boolean>('/app/clipboard', text).subscribe(async (isOK) => {
      const opts: ToastOptions = { position: 'top' };
      if (isOK) {
        opts.message = `[ ${text} ] 已复制。`;
        opts.icon = 'information-circle';
        opts.duration = 1500;
      } else {
        opts.message = '复制错误';
        opts.icon = 'sad';
        opts.buttons = [{ text: '关闭', role: 'cancel' }];
      }

      const toast = await this.toastCtrl.create(opts);
      await toast.present();
    });
  }
}
