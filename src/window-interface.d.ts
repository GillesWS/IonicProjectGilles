interface Window {
    api: {
        // Function to capture a photo
        capturePhoto: () => void;
        // Function to add the captured photo to the gallery
        addToGallery: (imagePath: string, caption: string) => void;
        // Listen for the 'photo-captured' event from the main process
        ipcReceivePhotoCaptured: (listener: (imagePath: string) => void) => void;
        // Listen for the 'update-gallery' event from Electron
        ipcReceiveGalleryUpdate: (listener: (galleryData: { image: string, caption: string }) => void) => void;
        openUpdatePhoto: (data: { image: string; caption: string }) => void;
        deletePhotoFromGallery: (id: number) => void;
        navigateToUpdatePhoto: () => void;
        ipcReceivePhotoDeleted: (listener: (deletedIndex: number) => void) => void;
        ipcReceivePhotoUpdate: (listener: (index: number, imagePath: string, caption: string) => void) => void;
        submitFeedback: (data: { userName: string; userFeedback: string }) => void;
        ipcReceiveFeedback: (listener: (feedbackData: { userName: string; userFeedback: string }) => void) => void;
    };
}