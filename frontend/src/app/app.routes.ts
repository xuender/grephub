import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'code',
    loadComponent: () => import('./code/code.page').then((m) => m.CodePage),
  },
  {
    path: '',
    loadComponent: () =>
      import('./search/search.page').then((m) => m.SearchPage),
  },
  {
    path: 'result',
    loadComponent: () =>
      import('./result/result.page').then((m) => m.ResultPage),
  },
];
