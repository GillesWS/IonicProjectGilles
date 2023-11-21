import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;
  private ctx!: CanvasRenderingContext2D;
  private image: HTMLImageElement | null = null;
  desiredFileName: string = '';
  selectedColor: string = 'black';
  constructor() {}

  ionViewDidEnter() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }
  
  loadPhoto(event: any) {
    // Handle loading a photo from the file input
    const file = event?.target?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = new Image();
        this.image.src = e.target?.result as string;
        this.image.onload = () => {
          if (this.image) {
            // Update the canvas dimensions to match the image dimensions
            this.canvas.nativeElement.width = this.image.width;
            this.canvas.nativeElement.height = this.image.height;
  
            // Draw the image at its original size
            this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height);
          }
        };
      };
      reader.readAsDataURL(file);
    }
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }
  


  editPhoto() {
    if (this.image) {
      let drawing = false;
  
      // Mouse events for desktop browsers
      this.canvas.nativeElement.addEventListener('mousedown', (e: MouseEvent) => {
        drawing = true;
        this.ctx.beginPath();
        this.ctx.moveTo(e.clientX - this.canvas.nativeElement.offsetLeft, e.clientY - this.canvas.nativeElement.offsetTop);
        this.ctx.strokeStyle = this.selectedColor;
      });
  
      this.canvas.nativeElement.addEventListener('mousemove', (e: MouseEvent) => {
        if (drawing) {
          this.ctx.lineTo(e.clientX - this.canvas.nativeElement.offsetLeft, e.clientY - this.canvas.nativeElement.offsetTop);
          this.ctx.stroke();
        }
      });
  
      this.canvas.nativeElement.addEventListener('mouseup', () => {
        drawing = false;
        this.ctx.closePath();
      });
  
      this.canvas.nativeElement.addEventListener('mouseleave', () => {
        drawing = false;
        this.ctx.closePath();
      });
  
      // Touch events for touch-based devices (emulators, mobile)
      this.canvas.nativeElement.addEventListener('touchstart', (e: TouchEvent) => {
        const touch = e.touches[0];
        drawing = true;
        this.ctx.beginPath();
        this.ctx.moveTo(touch.clientX - this.canvas.nativeElement.offsetLeft, touch.clientY - this.canvas.nativeElement.offsetTop);
        this.ctx.strokeStyle = this.selectedColor;
      });
  
      this.canvas.nativeElement.addEventListener('touchmove', (e: TouchEvent) => {
        if (drawing) {
          const touch = e.touches[0];
          this.ctx.lineTo(touch.clientX - this.canvas.nativeElement.offsetLeft, touch.clientY - this.canvas.nativeElement.offsetTop);
          this.ctx.stroke();
        }
      });
  
      this.canvas.nativeElement.addEventListener('touchend', () => {
        drawing = false;
        this.ctx.closePath();
      });
  
      this.canvas.nativeElement.addEventListener('touchcancel', () => {
        drawing = false;
        this.ctx.closePath();
      });
    }
  }
  

  setColor(color: string) {
    this.selectedColor = color;
  }
  
  savePhoto() {
    if (this.image) {
      const editedImage = this.canvas.nativeElement.toDataURL(); // Convert canvas to data URL
      const a = document.createElement('a');
      a.href = editedImage;
  
      // Use the desiredFileName entered by the user or a default name
      a.download = this.desiredFileName || 'edited_image.png';
  
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
}
