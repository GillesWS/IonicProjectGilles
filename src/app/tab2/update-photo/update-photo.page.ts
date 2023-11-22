import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-update-photo',
  templateUrl: 'update-photo.page.html',
  styleUrls: ['update-photo.page.scss']
})
export class UpdatePhotoPage {
  updatedImage: string = '';
  updatedCaption: string = '';
  currentIndex: number = -1; // Add a variable to store the index

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {}

  ionViewWillEnter() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.updatedImage = params['image'];
      this.updatedCaption = params['caption'];
    });
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    if (image && image.webPath) {
      this.updatedImage = image.webPath;
    }
  }

  updatePhoto() {
    if (this.updatedImage && this.updatedCaption) {
      const updatedPhoto = { image: this.updatedImage, caption: this.updatedCaption };
      const originalPhoto = { image: this.updatedImage, caption: this.updatedCaption }; // Update with actual original data
  
      this.dataService.updatePhoto(originalPhoto, updatedPhoto);
      this.router.navigate(['/tabs/tab2']);
    }
  }
}
