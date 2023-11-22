import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatePhotoPage } from './update-photo.page';

describe('UpdatePhotoPage', () => {
  let component: UpdatePhotoPage;
  let fixture: ComponentFixture<UpdatePhotoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdatePhotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
