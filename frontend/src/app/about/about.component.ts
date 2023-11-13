import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';

import { About } from 'wailsjs/go/app/Service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonButtons,
    IonIcon,
    IonContent,
  ],
})
export class AboutComponent implements OnInit {
  text = '';
  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss();
  }

  async ngOnInit() {
    const msg = await About();
    if (!msg) {
      return;
    }

    const list: string[] = [];

    for (const kv of msg.split('\n')) {
      if (!kv) {
        continue;
      }

      const val = kv.split(': ');
      list.push(`<tr><th>${val[0]}</th><td>${val[1]}</td></tr>`);
    }

    this.text = `<table>${list.join('\n')}</table>`;
  }
}
