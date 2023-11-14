import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  InfiniteScrollCustomEvent,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuButton,
  IonModal,
  IonNote,
  IonProgressBar,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addCircle,
  closeCircle,
  cog,
  searchCircle,
  toggle,
  trash,
} from 'ionicons/icons';

import { EventsOff, EventsOn, WindowShow } from 'wailsjs/runtime/runtime';
import { AboutComponent } from '../about/about.component';
import { AckComponent } from '../ack/ack.component';
import { ApiService } from '../api/api.service';
import { Searchers } from '../api/searcher';
import { TypesComponent } from '../types/types.component';

const sleep = (msec: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), msec));

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
    IonProgressBar,
    IonFooter,
    IonLabel,
    AckComponent,
    IonItem,
    IonBadge,
    IonMenu,
    IonMenuButton,
    IonToggle,
    FormsModule,
    IonModal,
    IonRadio,
    IonRadioGroup,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonInput,
    IonCol,
    IonRow,
    IonText,
    IonCardContent,
    IonListHeader,
    IonSelect,
    IonSelectOption,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    TypesComponent,
    AboutComponent,
    IonNote,
  ],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild('modal', { static: true })
  typesModal!: IonModal;
  @ViewChild('menu', { static: true })
  menu!: IonMenu;
  @ViewChild('search', { static: true })
  search!: IonSearchbar;
  isDel = false;
  searchers = Searchers;
  constructor(public api: ApiService, private modalCtrl: ModalController) {
    addIcons({ cog, searchCircle, addCircle, trash, toggle, closeCircle });
    this.api.onStop$.subscribe((_) => this.onClose());
    EventsOn('about', () => {
      this.about();
    });
  }

  ngOnDestroy() {
    EventsOff('about');
  }

  async about() {
    const modal = await this.modalCtrl.create({
      component: AboutComponent,
    });

    await modal.present();
  }

  async ngOnInit() {
    if (this.menu) {
      await this.menu.open();
    }
  }

  async onClose() {
    await sleep(500);
    await this.search.setFocus();
  }

  selectionChanged(types: string[]) {
    switch (this.api.query.searcher) {
      case 1:
        this.api.query.rgTypes = types;

        break;
      case 2:
        this.api.query.ugTypes = types;

        break;
      case 3:
        this.api.query.agTypes = types;

        break;
    }

    this.typesModal.dismiss();
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    if (this.api.load()) {
      event.target.disabled = true;
    }

    event.target.complete();
  }
}
