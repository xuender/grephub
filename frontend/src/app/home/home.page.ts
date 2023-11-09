import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuButton,
  IonModal,
  IonProgressBar,
  IonRow,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
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

import { FormsModule } from '@angular/forms';
import { AckComponent } from '../ack/ack.component';
import { ApiService } from '../api/api.service';
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
    IonInput,
    IonModal,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCol,
    IonRow,
    IonText,
    IonCardContent,
    IonListHeader,
    TypesComponent,
  ],
})
export class HomePage implements OnInit {
  @ViewChild('modal', { static: true })
  modal!: IonModal;
  @ViewChild('menu', { static: true })
  menu!: IonMenu;
  @ViewChild('search', { static: true })
  search!: IonSearchbar;
  isDel = false;
  constructor(public api: ApiService) {
    addIcons({ cog, searchCircle, addCircle, trash, toggle, closeCircle });
    this.api.onStop$.subscribe((_) => this.onClose());
  }

  async ngOnInit() {
    if (this.menu) {
      this.menu.open();
    }
  }

  async onClose() {
    console.log('close');
    await sleep(500);
    await this.search.setFocus();
  }

  selectionChanged(types: string[]) {
    this.api.query.types = types;
    this.modal.dismiss();
  }
}
