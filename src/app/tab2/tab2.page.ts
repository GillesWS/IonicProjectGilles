import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  photos: { image: string, caption: string }[] = [];

  constructor(private dataService: DataService, private navCtrl: NavController) {}
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
    this.photos = this.dataService.getPhotos();
  }

  // make photos empty
  clearGallery() {
    this.photos = [];
  }

  deletePhoto(photoIndex: number) {
    this.dataService.deletePhoto(photoIndex);
  }

  updatePhoto(photo: { image: string, caption: string }) {
    const photoIndex = this.photos.findIndex(p => p === photo);
    if (photoIndex !== -1) {
      this.navCtrl.navigateForward(['/tabs/tab2/update-photo'], {
        queryParams: {
          image: photo.image,
          caption: photo.caption
        }
      });
    }
  }
  
}
