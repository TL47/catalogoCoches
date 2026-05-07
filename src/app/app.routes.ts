import { Routes } from '@angular/router';
import { Cataloge } from './cataloge/cataloge';
import { Add } from './add/add';
import { Delete } from './delete/delete';
import { Modify } from './modify/modify';

export const routes: Routes = [
  { path: 'cataloge', component:  Cataloge},
  { path: 'add', component: Add },
  { path: 'delete', component: Delete },
  { path: 'modify', component: Modify },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
