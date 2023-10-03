const { app, BrowserWindow } = require('electron');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const FormData = require('form-data'); 
const config = require('./Settings');
// 
 TOKEN = config.TOKEN;
const CHAT_ID = config.CHAT_ID;
const URL_API = `https://api.telegram.org/bot${TOKEN}/sendPhoto`;
const INTERVAL = config.INTERVAL;
const desktopPath = config.desktopPath;
destinationFolderPath = config.destinationFolderPath;
const folderPath = desktopPath;
const imageArray = [];

 const fileArray = () => {
  
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Ошибка чтения папки:', err);
    return;
  } else {
    imageArray.push(...files);
  }
  console.log(imageArray);
});
};
fileArray()
function sendPhotoToChannel(filePath) {
  const form = new FormData();
  form.append('chat_id', CHAT_ID);
  form.append('photo', fs.createReadStream(filePath));

  axios
    .post(URL_API, form, {
      headers: {
        ...form.getHeaders(),
      },
    })
    .then((response) => {
      if (response.data.ok) {
        console.log('Фотография успешно отправлена в канал!');

        // Перемещаем фотографию в другую папку после отправки
        const sourceFilePath = filePath;
        const destinationFolderPath = 'C:\\Users\\aleks\\OneDrive\\Рабочий стол\\loadMem' 
        const fileName = path.basename(sourceFilePath);
        const destinationFilePath = path.join(destinationFolderPath, fileName);

        fs.rename(sourceFilePath, destinationFilePath, (err) => {
          if (err) {
            console.error('Произошла ошибка при перемещении файла:', err);
          } else {
            console.log('Файл успешно перемещен в целевую папку.');
          }
        });
      } else {
        console.error('Произошла ошибка при отправке фотографии:', response.data);
      }
    })
    .catch((error) => {
      console.error('Произошла ошибка:', error);
    });
}

const expressApp = express();
const port = 3000;

expressApp.use(cors());
expressApp.use(express.json());

expressApp.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Что-то пошло не так!');
});

// Определяем интервал для отправки фотографий каждые 20 секунд
let currentIndex = 0; 
const interval = setInterval(() => {
  if (currentIndex < imageArray.length) {
    const photoPath = path.join(desktopPath, imageArray[currentIndex]);
    sendPhotoToChannel(photoPath);
    currentIndex++;
    console.log(`Отправлена фотография ${currentIndex}`);
  } else {
    console.log('Все фотографии отправлены');
    currentIndex = 0 
    console.log('Порядок обновлен');
    fileArray()
    console.log('Массив обновлен');
  }
}, INTERVAL); // Каждые 20 секунд отправляем следующую фотографию и перемещаем ее

expressApp.post('/runFunction', (req, res) => {
  try {
    const result = { message: 'Функция выполнена успешно' };
    res.json(result);
  } catch (error) {
    next(error);
  }
});

expressApp.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
