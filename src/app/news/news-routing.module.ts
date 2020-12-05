import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewComponent } from './add-new/add-new.component';
import { TodayComponent } from './today/today.component';

const routes: Routes = [
  { path: 'today', component: TodayComponent },
  { path: ':newId', component: AddNewComponent },
  { path: '**', redirectTo: 'today' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
