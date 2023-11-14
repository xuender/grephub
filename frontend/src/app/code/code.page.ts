import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import {
  MonacoEditorComponent,
  MonacoEditorModule,
  MonacoStandaloneCodeEditor,
} from '@materia-ui/ngx-monaco-editor';
import { addIcons } from 'ionicons';
import { folder, open } from 'ionicons/icons';

import { Dir, File, Open } from 'wailsjs/go/app/Service';
import { sleep } from '../api/time';
import { ApiService } from '../api/api.service';

interface Langauge {
  ext?: string[];
  code: string;
}
const LANGUAGES: Langauge[] = [
  { code: 'text/plain', ext: ['txt', 'log'] },
  { code: 'cpp', ext: ['cc', 'hpp'] },
  { code: 'html', ext: ['htm', 'htma', 'xhtml', 'jsp'] },
  { code: 'ini', ext: ['toml', 'url'] },
  { code: 'javascript', ext: ['js'] },
  { code: 'markdown', ext: ['md'] },
  { code: 'objective-c', ext: ['c', 'h'] },
  { code: 'python', ext: ['py'] },
  { code: 'shell', ext: ['sh'] },
  { code: 'typescript', ext: ['ts'] },
  { code: 'xml', ext: ['svg'] },
  { code: 'powershell', ext: ['ps'] },
];

@Component({
  selector: 'app-code',
  templateUrl: './code.page.html',
  styleUrls: ['./code.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    MonacoEditorModule,
  ],
})
export class CodePage implements OnInit {
  code = '';
  options = {
    theme: 'vs-dark',
    language: 'javascript',
    fontSize: 20,
    readOnly: true,
    mouseWheelZoom: true,
  };
  file = '';
  editor?: MonacoStandaloneCodeEditor;
  constructor(private api: ApiService) {
    addIcons({ open, folder });
  }

  async ngOnInit() {
    if (!this.api.mate || !this.api.file) {
      return;
    }

    this.file = this.api.file;
    this.setLanguage(this.file);
    this.code = await File(this.file);

    await sleep(500);

    if (!this.editor) {
      return;
    }

    if (!this.api.mate.row) {
      this.api.mate.row = 0;
    }

    const row = this.api.mate.row;

    this.editor.setPosition({ lineNumber: row, column: 1 });
    this.editor.focus();
    this.editor.revealLine(row);

    if (!this.api.mate.hits || !this.api.mate.hits.length) {
      return;
    }

    const selections = [];
    for (const hit of this.api.mate.hits) {
      if (!hit.len) {
        continue;
      }

      if (!hit.col) {
        hit.col = 0;
      }

      const col = hit.col + 1;
      selections.push({
        selectionStartLineNumber: row,
        selectionStartColumn: col,
        positionLineNumber: row,
        positionColumn: col + hit.len,
      });
    }

    this.editor.setSelections(selections);
  }

  async open() {
    await Open(this.file);
  }
  async dir() {
    await Dir(this.file);
  }

  private setLanguage(file: string) {
    const name = file.toLocaleLowerCase();
    const ext = name.substring(name.lastIndexOf('.') + 1);

    for (const lang of LANGUAGES) {
      if (ext == lang.code) {
        this.options.language = lang.code;

        return;
      }

      if (lang.ext) {
        for (const ex of lang.ext) {
          if (ext == ex) {
            this.options.language = lang.code;

            return;
          }
        }
      }
    }

    this.options.language = ext;
  }

  editorInit(editor: MonacoStandaloneCodeEditor) {
    this.editor = editor;
  }
}
