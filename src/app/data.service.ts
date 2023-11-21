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
}
