import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { DataService } from '../data.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  selectedImage: string = '';
  caption: string = '';
  gallery: { image: string, caption: string }[] = [];
  constructor(private dataService: DataService) {}

  capturePhoto() {
    Camera.getPhoto({
      resultType: CameraResultType.Uri
    }).then(image => {
      this.selectedImage = image?.webPath || '';
    }).catch(error => {
      console.error('Error capturing photo: ', error);
    });
  }
 
  addToGallery() {
    if (this.selectedImage && this.caption) {
      this.dataService.addPhoto(this.selectedImage, this.caption);
      this.caption = '';
      this.selectedImage = '';
    }
  }

  addPhotoToGallery(image: string, caption: string) {
    this.gallery.push({ image, caption });
  }
}
