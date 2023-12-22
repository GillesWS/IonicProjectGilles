// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog, session, shell } = require('electron')
const path = require('path')
const os = require('os')
const fs = require('fs');
const { URL } = require('url')

let mainWindow;

const createWindow = () => {
mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        // 2. Do not enable Node.js integration for remote content
        preload: path.join(__dirname, 'preload.js'), 
        // 3. Enable context isolation
        contextIsolation: true, 
        // 4. Enable sandbox
        sandbox: true, 
        // 6.  Do not disable webSecurity
        webSecurity: true,
        // 8.  Do not enable allowRunningInsecureContent
        allowRunningInsecureContent: false,
        // 9.  Do not enable experimental features
        experimentalFeatures: false,
        // 10. Do not use enableBlinkFeatures
        enableBlinkFeatures: false
        // 11. Do not use allowpopups for WebViews -> I don't use webview tags
    }
})
// 14. Disable or limit creation of new windows
  app.on('web-contents-created', (event, contents) => {
    contents.setWindowOpenHandler(({ url }) => {
      // In this example, we'll ask the operating system
      // to open this event's url in the default browser.
      //
      // See the following item for considerations regarding what
      // URLs should be allowed through to shell.openExternal.
      if (isSafeForExternalOpen(url)) {
        setImmediate(() => {
          shell.openExternal(url)
        })
      }
  
      return { action: 'deny' }
    })
  })

// Disable navigation
mainWindow.webContents.on('will-navigate', (event, url) => {
    event.preventDefault();
  });

mainWindow.loadFile('./www/index.html')

}
app.enableSandbox() //Enable sandbox
app.whenReady().then(() => {
createWindow()

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
})

app.on('window-all-closed', () => {
if (process.platform !== 'darwin') app.quit()
})

// 5. Handle session permission requests from remote content
/*session
  .fromPartition('some-partition')
  .setPermissionRequestHandler((webContents, permission, callback) => {
    const parsedUrl = new URL(webContents.getURL())

    if (permission === 'notifications') {
      // Approves the permissions request
      callback(true)
    }

    // Verify URL
    if (parsedUrl.protocol !== 'https:' || parsedUrl.host !== 'localhost:8010') {
      // Denies the permissions request
      return callback(false)
    }
  });
*/
ipcMain.on('capture-photo', async (event) => {
    try {
        const result = await dialog.showOpenDialog({ properties: ['openFile'] });
        const imagePath = result.filePaths[0]; // Path to the captured image
        // Send the captured image path back to the renderer process
        event.reply('photo-captured', imagePath);
    } catch (error) {
        console.error('Error capturing photo: ', error);
    }
});

ipcMain.on('add-to-gallery', (event, imagePath, caption) => {
    const galleryData = { image: imagePath, caption };
    console.log(imagePath);
    mainWindow.webContents.send('update-gallery', galleryData);
  });

  ipcMain.on('open-update-photo', (event, data) => {
    mainWindow.loadFile(path.join(__dirname, '../src/app/tab2/update-photo/update-photo.page.html'));
  });
  
ipcMain.on('delete-photo', (event, id) => {
    const options = {
      type: 'question',
      buttons: ['Yes', 'No'],
      defaultId: 1,
      title: 'Confirmation',
      message: 'Are you sure you want to delete this image?',
      detail: 'This action cannot be undone.'
    };
  
    dialog.showMessageBox(null, options).then((response) => {
      if (response.response === 0) {
        mainWindow.webContents.send('perform-delete', id);
      }
    });
});

ipcMain.on('perform-delete', (event, id) => {
    console.log(`Photo with ID ${id} will be deleted.`);
  });

ipcMain.on('submit-feedback', (event, user, feedbackData) => {
    mainWindow.webContents.send('display-feedback', user, feedbackData);
});