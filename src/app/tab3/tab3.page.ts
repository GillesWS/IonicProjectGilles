import { Component, ViewChild, ElementRef } from '@angular/core';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { FilesystemDirectory } from '@capacitor/filesystem';
import { Plugins } from '@capacitor/core';

const { Camera, Filesystem } = Plugins;
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  userName: string = '';
  userFeedback: string = '';
  submitted: boolean = false;

  constructor() {}

  submitFeedback() {
    // Perform actions with the feedback, e.g., send to server, store locally, etc.
    // For now, let's just mark it as submitted and display the entered data.
    this.submitted = true;
  }
}
