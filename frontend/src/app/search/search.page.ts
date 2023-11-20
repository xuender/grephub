import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
  NavController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircle, searchCircle, toggle, trash } from 'ionicons/icons';

import { ApiService } from '../api/api.service';
import { Searchers } from '../api/searcher';
import { TypesComponent } from '../types/types.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonInput,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonButton,
    IonIcon,
    IonSearchbar,
    IonLabel,
    IonListHeader,
    IonToggle,
    IonButtons,
    IonFooter,
    IonSelect,
    IonItemGroup,
    IonSelectOption,
    IonModal,
    TypesComponent,
  ],
})
export class SearchPage implements OnInit {
  @ViewChild('modal', { static: true })
  typesModal!: IonModal;
  isDel = false;
  searchers = Searchers;
  constructor(public api: ApiService, private navCtrl: NavController) {
    addIcons({ searchCircle, addCircle, trash, toggle });
  }

  ngOnInit() {}

  query() {
    this.navCtrl.navigateForward('/result');
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
}
