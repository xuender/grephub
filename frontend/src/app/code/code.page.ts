import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { addIcons } from 'ionicons';
import { folder, open } from 'ionicons/icons';

import { Dir, File, Open } from 'wailsjs/go/app/Service';

interface Langauge {
  ext?: string[];
  code: string;
}
const LANGUAGES: Langauge[] = [
  { code: 'text/plain', ext: ['txt', 'log'] },
  { code: 'cpp', ext: ['cc', 'hpp'] },
  { code: 'css' },
  { code: 'go' },
  { code: 'html', ext: ['htm', 'htma', 'xhtml', 'jsp'] },
  { code: 'ini', ext: ['toml', 'url'] },
  { code: 'java' },
  { code: 'javascript', ext: ['js'] },
  { code: 'json' },
  { code: 'markdown', ext: ['md'] },
  { code: 'mysql' },
  { code: 'objective-c', ext: ['c', 'h'] },
  { code: 'perl' },
  { code: 'pgsql' },
  { code: 'php' },
  { code: 'python', ext: ['py'] },
  { code: 'shell', ext: ['sh'] },
  { code: 'sql' },
  { code: 'typescript', ext: ['ts'] },
  { code: 'xml', ext: ['svg'] },
  { code: 'yaml' },
  { code: 'abap' },
  { code: 'apex' },
  { code: 'azcli' },
  { code: 'bat' },
  { code: 'bicep' },
  { code: 'cameligo' },
  { code: 'clojure' },
  { code: 'coffee' },
  { code: 'csharp' },
  { code: 'csp' },
  { code: 'dart' },
  { code: 'dockerfile' },
  { code: 'ecl' },
  { code: 'elixir' },
  { code: 'fsharp' },
  { code: 'graphql' },
  { code: 'handlebars' },
  { code: 'hcl' },
  { code: 'julia' },
  { code: 'kotlin' },
  { code: 'less' },
  { code: 'lexon' },
  { code: 'liquid' },
  { code: 'lua' },
  { code: 'm3' },
  { code: 'mips' },
  { code: 'msdax' },
  { code: 'pascal' },
  { code: 'pascaligo' },
  { code: 'postiats' },
  { code: 'powerquery' },
  { code: 'powershell', ext: ['ps'] },
  { code: 'pug' },
  { code: 'r' },
  { code: 'razor' },
  { code: 'redis' },
  { code: 'redshift' },
  { code: 'restructuredtext' },
  { code: 'ruby' },
  { code: 'rust' },
  { code: 'sb' },
  { code: 'scala' },
  { code: 'scheme' },
  { code: 'scss' },
  { code: 'solidity' },
  { code: 'sophia' },
  { code: 'st' },
  { code: 'swift' },
  { code: 'systemverilog' },
  { code: 'tcl' },
  { code: 'twig' },
  { code: 'vb' },
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
  constructor(route: ActivatedRoute) {
    addIcons({ open, folder });
    route.paramMap.subscribe(async (params) => {
      const file = params.get('file');
      if (!file) {
        return;
      }

      this.setLanguage(file);

      this.code = await File(file);
      this.file = file;
    });
  }

  async open() {
    await Open(this.file);
  }
  async dir() {
    await Dir(this.file);
  }

  private setLanguage(file: string) {
    const fileExt = file.toLocaleLowerCase();
    for (const lang of LANGUAGES) {
      if (fileExt.endsWith(lang.code)) {
        this.options.language = lang.code;
        console.log('code', lang.code);

        return;
      }

      if (lang.ext) {
        for (const ext of lang.ext) {
          if (fileExt.endsWith(ext)) {
            this.options.language = lang.code;
            console.log('ext', ext);

            return;
          }
        }
      }
    }
  }

  editorInit(editor: any) {
    console.log('editor', editor);
  }

  ngOnInit() {
    console.log('init');
  }
}
