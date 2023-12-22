import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  selectedImage: string = '';
  caption: string = '';

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    window.api.ipcReceivePhotoCaptured((imagePath: string) => {
      this.selectedImage = imagePath;
      // Trigger change detection after updating selectedImage
      this.changeDetectorRef.detectChanges();
    });
  }

  // Function to handle capturing a photo (if applicable in Electron)
  capturePhoto() {
    // Use Electron-specific logic to capture a photo if applicable
    // For example:
    window.api.capturePhoto();
    // Update selectedImage once the photo is captured (from the event callback)
    // this.selectedImage = ...;
   
  }

  // Function to add the captured photo to the gallery (if applicable in Electron)
  addToGallery() {
    if (this.selectedImage && this.caption) {
      window.api.addToGallery(this.selectedImage, this.caption);
      this.caption = '';
      this.selectedImage = '';
    }
  }
}
