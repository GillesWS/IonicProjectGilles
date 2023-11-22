import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePhotoPage } from './update-photo.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePhotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePhotoPageRoutingModule {}
