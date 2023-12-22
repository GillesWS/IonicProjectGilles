const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
'api',
{
    capturePhoto: () => {
        ipcRenderer.send('capture-photo');
      },
      
      // Function to add the captured photo to the gallery
      addToGallery: (imagePath, caption) => {
        ipcRenderer.send('add-to-gallery', imagePath, caption);
      },
    
      ipcReceivePhotoCaptured: (listener) => {
        ipcRenderer.on('photo-captured', (event, imagePath) => {
          listener(imagePath);
        });
      },
      ipcReceiveGalleryUpdate: (listener) => {
        ipcRenderer.on('update-gallery', (event, galleryData) => {
            listener(galleryData);
        });
      },

      openUpdatePhoto: (data) => {
        ipcRenderer.send('open-update-photo', data);
      },

      ipcReceivePhotoUpdate: (listener) => {
        ipcRenderer.on('perform-update', (event, index, imagePath, caption) => {
          listener(index, imagePath, caption);
        });
      },
    
      deletePhotoFromGallery: (index) => {
        ipcRenderer.send('delete-photo', index);
      },
      
      ipcReceivePhotoDeleted: (listener) => {
        ipcRenderer.on('perform-delete', (event, index) => {
          listener(index);
        });
      },

      submitFeedback: (data) => {
        ipcRenderer.send('submit-feedback', data);
      },

      ipcReceiveFeedback: (listener) => {
        ipcRenderer.on('display-feedback', (event, user, feedbackData) => {
          listener(user, feedbackData);
        });
      }
}
);

console.log('preload.js loaded');