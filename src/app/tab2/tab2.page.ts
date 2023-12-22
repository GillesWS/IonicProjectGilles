import { ChangeDetectorRef, Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  photos: { image: string; caption: string }[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    window.api.ipcReceiveGalleryUpdate((galleryData) => {
      // Push the new image to the photos array
      this.photos.push(galleryData);
      });

      // Receive the deleted photo index and update your gallery
      window.api.ipcReceivePhotoDeleted((deletedIndex) => {
      // Remove the deleted photo from the gallery based on its index
      this.photos.splice(deletedIndex, 1);
      // Refresh your gallery view or perform necessary updates
      this.changeDetectorRef.detectChanges();
      });
  }
  
  updatePhoto(photo: { image: string, caption: string }) {
    // Pass the photo details to the Electron process to open the update-photo page
    if (window.api) {
      window.api.openUpdatePhoto({
        image: photo.image,
        caption: photo.caption
      });
    }
  }
  
  // Function to delete a photo from the gallery based on its index
  deletePhoto(index: number) {
    window.api.deletePhotoFromGallery(index);
  }  
}
