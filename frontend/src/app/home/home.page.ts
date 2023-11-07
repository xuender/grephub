import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  IonBadge,
  IonButton,
  IonButtons,
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
  IonModal,
  IonProgressBar,
  IonSearchbar,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircle, cog, searchCircle } from 'ionicons/icons';

import { FormsModule } from '@angular/forms';
import { AckComponent } from '../ack/ack.component';
import { ApiService } from '../api/api.service';
import { TypesComponent } from '../types/types.component';

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
    TypesComponent,
  ],
})
export class HomePage {
  @ViewChild('modal', { static: true }) modal!: IonModal;
  constructor(public api: ApiService) {
    addIcons({ cog, searchCircle, addCircle });
  }

  selectionChanged(types: string[]) {
    this.api.query.types = types;
    this.modal.dismiss();
  }
}
