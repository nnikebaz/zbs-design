const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js', // Основная точка входа для JavaScript

  output: {
    filename: 'bundle.js', // Имя выходного файла сборки
    path: path.resolve(__dirname, 'dist'), // Путь для выходного файла сборки
    clean: true, // Очищает папку dist перед новой сборкой
  },

  module: {
    rules: [
      {
        test: /\.webmanifest$/,  // Указываем расширение файла
        type: 'asset/resource',  // Обрабатываем файл как ресурс (то есть он просто копируется в выходную папку)
        generator: {
          filename: '[name][ext]',  // Имя файла в выходной папке (dist)
        },
      },
      {
        test: /\.css$/, // Регулярное выражение для обработки файлов с расширением .css
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // Лоадеры для обработки CSS
      },
      {
        test: /\.s[ac]ss$/i, // Обработка файлов .sass и .scss
        use: [
          MiniCssExtractPlugin.loader, // Извлекает CSS в отдельные файлы
          'css-loader', // Обрабатывает CSS
          'sass-loader' // Обрабатывает SASS/SCSS
        ],
      },
      {
        test: /\.(js|jsx)$/, // Регулярное выражение для обработки JavaScript и JSX
        exclude: /node_modules/, // Игнорировать файлы из папки node_modules
        use: {
          loader: 'babel-loader', // Лоадер для трансформации JavaScript с помощью Babel
          options: {
            presets: ['@babel/preset-env'], // Пресет Babel для работы с современным JavaScript
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Регулярное выражение для обработки изображений
        type: 'asset/resource', // Используем встроенный механизм Webpack для обработки изображений
        generator: {
          filename: 'assets/images/[name][ext]', // Путь и имя файла для изображений в выходной папке dist
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Шаблон для генерации index.html в папке dist
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css', // Путь и имя файла для CSS
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'static/img'), // Копируем изображения
          to: path.resolve(__dirname, 'dist/img'), // Путь в dist, куда будут копироваться изображения
        },
        {
          from: path.resolve(__dirname, 'static/icons'), // Копируем иконки
          to: path.resolve(__dirname, 'dist/icons'), // Путь в dist, куда будут копироваться иконки
        },
        {
          from: path.resolve(__dirname, 'src/manifest.webmanifest'), // Копируем манифест
          to: path.resolve(__dirname, 'dist/manifest.webmanifest'), // Путь в dist манифест
        },
      ],
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'static'), // Каталог для статики
    },
    open: true, // Автоматически открывать браузер
    port: 9000, // Задаем порт для devServer
    watchFiles: ['src/**/*', 'static/**/*'],
  },

  mode: 'development', // Режим сборки
};
