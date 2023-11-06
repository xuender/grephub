import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircle, cog, searchCircle } from 'ionicons/icons';

import { FormsModule } from '@angular/forms';
import { pb } from 'src/pb';
import { AckComponent } from '../ack/ack.component';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonButtons,
    IonButton,
    IonIcon,
    IonSearchbar,
    IonFooter,
    IonLabel,
    AckComponent,
    IonItem,
    IonBadge,
    IonMenu,
    IonMenuButton,
    IonCheckbox,
    FormsModule,
    IonInput,
  ],
})
export class HomePage {
  acks: pb.IAck[] = [];
  query: pb.IQuery = { maxCount: 1 };
  txt = '';
  constructor(private api: ApiService) {
    addIcons({ cog, searchCircle, addCircle });
    this.api.onMsg$.subscribe((msg) => {
      if (msg.query) {
        this.query = msg.query;
        this.acks = [];
        console.log(this.query);
        this.txt = '';
      }

      if (msg.acks && msg.acks.length) {
        this.acks.push(...msg.acks);
      }
    });
  }

  change(event: any) {
    this.txt = event.target.value;
  }

  search() {
    console.log('search', this.txt);
    this.query.pattern = this.txt;
    this.api.send({ query: this.query });
  }
}
