import { app, BrowserWindow, Menu } from 'electron' // eslint-disable-line

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

// require ipcMain event
require('./mockAction');
require('./apiAction');

let mainWindow;
let mainMenu;
let splash;

const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;
const splashURL = process.env.NODE_ENV === 'development'
  ? `file://${__static}/splash.html`
  : `file://${__dirname}/static/splash.html`;

function createWindow() {
  /**
   * Initial menu options
   */
  const template = [
    {
      role: 'editMenu',
    },
    {
      label: 'Window',
      submenu: [
        {
          role: 'minimize',
        },
        {
          role: 'close',
        },
        {
          type: 'separator',
        },
        {
          label: 'Mockman',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            app.emit('activate');
          },
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    });
  }

  mainMenu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(mainMenu);

  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 800,
    useContentSize: true,
    width: 1200,
    backgroundColor: '#464646',
    show: false,
  });

  splash = new BrowserWindow({
    width: 1200,
    height: 800,
    alwaysOnTop: true,
    title: 'Mockman',
  });
  splash.loadURL(splashURL);
  mainWindow.loadURL(winURL);

  mainWindow.once('ready-to-show', () => {
    splash.destroy();
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
