const path = require('path');
const settings = {

    TOKEN: '6634996010:AAH-pkByZ-1bqh8TcMH0an08cbSu7tyy5b4', // Токен для бота в ТГ
    CHAT_ID: '-1001963620272', // ID чата или канала 
    INTERVAL: 1200000, // Интервал отправки фото
    desktopPath: path.join('C:', 'Users', 'aleks', 'OneDrive', 'Рабочий стол', 'mem'),// Путь откуда брать файлы
    destinationFolderPath: 'C:\\Users\\aleks\\OneDrive\\Рабочий стол\\loadMem', // Пусть куда пересылать файлы после отправки в ТГ 
  };
  
  module.exports = settings;