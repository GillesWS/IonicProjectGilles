import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-update-photo',
  templateUrl: 'update-photo.page.html',
  styleUrls: ['update-photo.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpdatePhotoPage {
  updatedImage: string = '';
  updatedCaption: string = '';
  currentIndex: number = -1;

  constructor() {}

}
