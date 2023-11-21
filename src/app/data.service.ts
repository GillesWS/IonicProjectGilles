import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private photos: { image: string, caption: string }[] = [];

  addPhoto(image: string, caption: string) {
    this.photos.push({ image, caption });
  }

  getPhotos() {
    return this.photos;
  }

  deletePhoto(photoIndex: number) {
    // Prompt a confirmation dialog before deleting
    const confirmDelete = confirm('Are you sure you want to delete this photo?');
    if (confirmDelete) {
      // Remove the selected photo from the array
      this.photos.splice(photoIndex, 1);
      // Update the data service or storage accordingly
      this.getPhotos();
    }
  }
  
}
