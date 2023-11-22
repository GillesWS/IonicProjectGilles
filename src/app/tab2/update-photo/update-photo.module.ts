import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePhotoPageRoutingModule } from './update-photo-routing.module';

import { UpdatePhotoPage } from './update-photo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePhotoPageRoutingModule
  ],
  declarations: [UpdatePhotoPage]
})
export class UpdatePhotoPageModule {}
