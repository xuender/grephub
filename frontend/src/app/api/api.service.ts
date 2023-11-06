import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular/standalone';
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
  onMsg$ = this.ws.pipe(
    map((msg) => {
      const buf = new Uint8Array(msg as ArrayBuffer);

      return pb.Msg.decode(buf);
    }),
    share()
  );
  constructor(private http: HttpClient, private toastCtrl: ToastController) {}

  send(data: pb.IMsg) {
    const m = pb.Msg.create(data);
    this.ws.next(pb.Msg.encode(m).finish());
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
