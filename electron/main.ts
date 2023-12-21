import cors from 'cors';
import { app, BrowserWindow } from 'electron';
import express from 'express';
import path from 'path';

import resolveModulePath from './utils/resolveModulePath';
import resolveModulesMetadata from './utils/resolveModulesMetadata';

const expressApp = express();
const port = 3000;

expressApp.use(cors());

expressApp.get('/modules', (req, res) => {
  res.sendFile(
    path.resolve(
      app.getPath('documents'),
      'octopost',
      'plugins',
      'facebook-plugin',
      'dist',
      'facebook-plugin.js'
    )
  );
});

expressApp.get('/metadata', async (req, res) => {
  const { packagePath } = req.query;
  if (!packagePath) {
    res.status(404).json('caminho para o os plugins não-encontrado');
    // Required for TypeScript to understand that the packagePath will never be undefined
    return;
  }

  try {
    const mainContent = await resolveModulesMetadata(packagePath.toString());
    res.json(mainContent);
  } catch (error) {
    res.status(404).json('conteúdo dentro do package.json não-encontrado');
  }
});

expressApp.get('/package', async (req, res) => {
  const { packagePath } = req.query;
  if (!packagePath) {
    res.status(404).json('caminho para o package.json não-encontrado');
    return;
  }

  try {
    const mainContent = await resolveModulePath(packagePath.toString());
    res.json(mainContent);
  } catch (error) {
    res.status(404).json('conteúdo dentro do package.json não-encontrado');
  }
});

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

process.env.DIST = path.join(__dirname, '../dist');
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, '../public');

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null;

function createWindow() {
  expressApp.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening on port ${port}`);
  });

  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'logo.svg'),
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'));
  }
}

app.on('window-all-closed', () => {
  app.quit();
  win = null;
});

app.whenReady().then(createWindow);
