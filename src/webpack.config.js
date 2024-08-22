const path = require('path');

module.exports = {
  entry: './src/index.js', // Точка входа в ваш код
  output: {
    filename: 'bundle.js', // Название собранного файла
    path: path.resolve(__dirname, 'dist') // Путь для сборки
  },
  mode: 'development' // Режим сборки (development или production)
};