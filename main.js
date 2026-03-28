const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const axios = require('axios');
const { exec } = require('child_process');
const os = require('os');

let mainWindow;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
  mainWindow = new BrowserWindow({
    width: Math.min(1200, width - 100),
    height: Math.min(800, height - 100),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    frame: false,
    titleBarStyle: 'hidden',
    transparent: true,
    backgroundColor: '#00000000',
    icon: path.join(__dirname, 'icon.png'),
    vibrancy: 'dark',
    visualEffectState: 'active'
  });

  mainWindow.loadFile('index.html');
  
  // Эффект свечения для окна
  mainWindow.setBackgroundColor('#00000000');
  
  // Раскомментировать для DevTools
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Поиск в интернете через DuckDuckGo с улучшенной обработкой
ipcMain.handle('search-web', async (event, query) => {
  try {
    const response = await axios.get(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`);
    
    let answer = '';
    
    if (response.data.AbstractText) {
      answer = response.data.AbstractText;
    } else if (response.data.Definition) {
      answer = response.data.Definition;
    } else if (response.data.RelatedTopics && response.data.RelatedTopics.length > 0) {
      const topic = response.data.RelatedTopics.find(t => t.Text);
      if (topic && topic.Text) {
        answer = topic.Text;
      } else {
        answer = `🔍 По запросу "${query}" найдена информация. Попробуйте уточнить вопрос для более точного ответа.`;
      }
    } else {
      answer = `🌐 Я нашел результаты по запросу "${query}". Рекомендую уточнить вопрос или проверить интернет-соединение.`;
    }
    
    return { success: true, answer, query };
  } catch (error) {
    console.error('Search error:', error);
    return { success: false, error: '❌ Ошибка подключения к интернету' };
  }
});

// Выполнение системных команд
ipcMain.handle('execute-command', async (event, command) => {
  const lowerCommand = command.toLowerCase();
  
  try {
    if (lowerCommand.includes('калькулятор') || lowerCommand.includes('calculator')) {
      if (os.platform() === 'win32') {
        exec('calc');
      } else if (os.platform() === 'darwin') {
        exec('open -a Calculator');
      } else {
        exec('gnome-calculator');
      }
      return { success: true, message: '🧮 Открываю калькулятор' };
    }
    else if (lowerCommand.includes('блокнот') || lowerCommand.includes('notepad')) {
      if (os.platform() === 'win32') {
        exec('notepad');
      } else if (os.platform() === 'darwin') {
        exec('open -a TextEdit');
      } else {
        exec('gedit');
      }
      return { success: true, message: '📝 Открываю текстовый редактор' };
    }
    else if (lowerCommand.includes('браузер') || lowerCommand.includes('browser') || lowerCommand.includes('интернет')) {
      if (os.platform() === 'win32') {
        exec('start chrome');
      } else if (os.platform() === 'darwin') {
        exec('open -a Safari');
      } else {
        exec('firefox');
      }
      return { success: true, message: '🌐 Открываю браузер' };
    }
    else if (lowerCommand.includes('проводник') || lowerCommand.includes('explorer') || lowerCommand.includes('файлы')) {
      if (os.platform() === 'win32') {
        exec('explorer');
      } else if (os.platform() === 'darwin') {
        exec('open .');
      } else {
        exec('nautilus');
      }
      return { success: true, message: '📁 Открываю проводник' };
    }
    else if (lowerCommand.includes('музыка') || lowerCommand.includes('music') || lowerCommand.includes('плеер')) {
      if (os.platform() === 'win32') {
        exec('start wmplayer');
      } else if (os.platform() === 'darwin') {
        exec('open -a Music');
      } else {
        exec('rhythmbox');
      }
      return { success: true, message: '🎵 Открываю музыкальный плеер' };
    }
    else {
      return { success: false, message: '❓ Команда не распознана. Попробуйте: калькулятор, блокнот, браузер, проводник или музыка' };
    }
  } catch (error) {
    return { success: false, error: '⚠️ Ошибка при выполнении команды' };
  }
});

// Получение системной информации
ipcMain.handle('system-info', async () => {
  return {
    platform: os.platform(),
    hostname: os.hostname(),
    cpus: os.cpus().length,
    memory: (os.totalmem() / 1024 / 1024 / 1024).toFixed(1),
    freemem: (os.freemem() / 1024 / 1024 / 1024).toFixed(1)
  };
});
