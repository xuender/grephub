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
  IonMenu,
  IonMenuButton,
  IonModal,
  IonProgressBar,
  IonRow,
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
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCol,
    IonRow,
    IonCardContent,
    TypesComponent,
  ],
})
export class HomePage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: IonModal;
  @ViewChild('menu', { static: true }) menu!: IonMenu;
  constructor(public api: ApiService) {
    addIcons({ cog, searchCircle, addCircle });
  }

  ngOnInit() {
    if (this.menu) {
      this.menu.open();
    }
  }

  selectionChanged(types: string[]) {
    this.api.query.types = types;
    this.modal.dismiss();
  }
}
