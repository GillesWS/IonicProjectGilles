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
  // Array to store photos with captions
  gallery: { image: string, caption: string }[] = [];
  constructor(private dataService: DataService) {}

  capturePhoto() {
    Camera.getPhoto({
      resultType: CameraResultType.Uri
    }).then(image => {
      this.selectedImage = image?.webPath || ''; // Use optional chaining and a default value
    }).catch(error => {
      console.error('Error capturing photo: ', error);
    });
  }
 
  addToGallery() {
    if (this.selectedImage && this.caption) {
      this.dataService.addPhoto(this.selectedImage, this.caption);
  
      // Clear the input field and selected image
      this.caption = '';
      this.selectedImage = '';
    }
  }

  // Function to add a photo to the gallery with a caption
  addPhotoToGallery(image: string, caption: string) {
    // Push the data to the gallery array
    this.gallery.push({ image, caption });
  }
}
