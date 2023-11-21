import { Component } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  photos: { image: string, caption: string }[] = [];

  constructor(private dataService: DataService) {}
  selectedPhoto: string | null = null;

  displayPhoto(photoUrl: string) {
    this.selectedPhoto = photoUrl;
  }

  clearSelectedPhoto() {
    this.selectedPhoto = null;
  }
  ngOnInit() {
    this.populateGallery();
  }

  populateGallery() {
    // Fetch photos from the data service
    this.photos = this.dataService.getPhotos();
  }

  // Example function to clear the gallery (you can customize this)
  clearGallery() {
    this.photos = [];
  }

  deletePhoto(photoIndex: number) {
    this.dataService.deletePhoto(photoIndex);
  }
  
}
