import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  InfiniteScrollCustomEvent,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonProgressBar,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
  LoadingController,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { searchCircle } from 'ionicons/icons';
import { AckComponent } from '../ack/ack.component';
import { ApiService } from '../api/api.service';
import { sleep } from '../api/time';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons,
    IonSearchbar,
    IonProgressBar,
    IonIcon,
    IonButton,
    IonList,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonLoading,
    IonFooter,
    IonItem,
    IonLabel,
    IonText,
    AckComponent,
  ],
})
export class ResultPage implements OnInit {
  @ViewChild('search', { static: true })
  search!: IonSearchbar;
  constructor(public api: ApiService, private loadingCtrl: LoadingController) {
    this.api.onStop$.subscribe((_) => this.onClose());
    addIcons({ searchCircle });
  }

  async onClose() {
    await sleep(500);
    await this.search.setFocus();
    console.log('focus');
  }

  async query() {
    const loading = await this.loadingCtrl.create({ message: 'search...' });
    await loading.present();
    await this.api.doQuery();
    await loading.dismiss();
  }

  ngOnInit() {
    this.query();
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    if (this.api.load()) {
      event.target.disabled = true;
    }

    event.target.complete();
  }
}
