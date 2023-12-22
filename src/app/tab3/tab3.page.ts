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
  receivedFeedback: { userName: string; userFeedback: string } | null = null;
  
  constructor() {}

  ngOnInit() {
    window.api.ipcReceiveFeedback((feedbackData) => {
      this.receivedFeedback = feedbackData;
    });
  }

  submitFeedback() {
    this.submitted = true;
    window.api.submitFeedback({
      userName: this.userName,
      userFeedback: this.userFeedback
    });
  }
}
