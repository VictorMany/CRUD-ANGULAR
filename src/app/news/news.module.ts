import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { TodayComponent } from './today/today.component';
import { AddNewComponent } from './add-new/add-new.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [TodayComponent, AddNewComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [TodayComponent, AddNewComponent]
})
export class NewsModule { }
