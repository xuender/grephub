import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonRow,
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
import { sleep } from '../api/time';

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
    IonGrid,
    IonRow,
    IonCol,
    TypesComponent,
  ],
})
export class SearchPage implements OnInit {
  @ViewChild('modal', { static: true })
  typesModal!: IonModal;
  @ViewChild('search', { static: true })
  search!: IonSearchbar;
  isDel = false;
  searchers = Searchers;
  constructor(public api: ApiService, private navCtrl: NavController) {
    addIcons({ searchCircle, addCircle, trash, toggle });
  }

  async ngOnInit() {
    await sleep(500);
    await this.search.setFocus();
  }

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
