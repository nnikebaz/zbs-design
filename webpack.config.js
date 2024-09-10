const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const loader = require("sass-loader");
const { sources } = require("webpack");
const { name } = require("browser-sync");

module.exports = {
  entry: "./src/index.js", // Основная точка входа для JavaScript

  output: {
    filename: "bundle.js", // Имя выходного файла сборки
    path: path.resolve(__dirname, "dist"), // Путь для выходного файла сборки
    clean: true, // Очищает папку dist перед новой сборкой
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]", 
        },
      },
      {
        test: /\.webmanifest$/, // Указываем расширение файла
        type: "asset/resource", // Обрабатываем файл как ресурс (то есть он просто копируется в выходную папку)
        generator: {
          filename: "[name][ext]", // Имя файла в выходной папке (dist)
        },
      },
      {
        test: /\.css$/, // Регулярное выражение для обработки файлов с расширением .css
        use: [MiniCssExtractPlugin.loader, "css-loader"], // Лоадеры для обработки CSS
      },
      {
        test: /\.s[ac]ss$/i, // Обработка файлов .sass и .scss
        use: [
          MiniCssExtractPlugin.loader, // Извлекает CSS в отдельные файлы
          "css-loader", // Обрабатывает CSS
          "sass-loader", // Обрабатывает SASS/SCSS
        ],
      },
      {
        test: /\.(js|jsx)$/, // Регулярное выражение для обработки JavaScript и JSX
        exclude: /node_modules/, // Игнорировать файлы из папки node_modules
        use: {
          loader: "babel-loader", // Лоадер для трансформации JavaScript с помощью Babel
          options: {
            presets: ["@babel/preset-env"], // Пресет Babel для работы с современным JavaScript
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|webp)$/i, // Регулярное выражение для обработки изображений
        type: "asset/resource", // Используем встроенный механизм Webpack для обработки изображений
        generator: {
          filename: "img/[name][ext]", // Путь и имя файла для изображений в выходной папке dist
        },
      },
      {
        test: /\.(|svg|ico)$/i, // Регулярное выражение для обработки изображений
        type: "asset/resource", // Используем встроенный механизм Webpack для обработки изображений
        generator: {
          filename: "icons/[name][ext]", // Путь и имя файла для изображений в выходной папке dist
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html", // Шаблон для генерации index.html
      minify: {
        html5                          : true,
        // collapseWhitespace             : true,
        minifyCSS                      : true,
        minifyJS                       : true,
        // minifyURLs                     : false,
        removeAttributeQuotes          : true,
        removeComments                 : true, // false for Vue SSR to find app placeholder
        removeEmptyAttributes          : true,
        removeOptionalTags             : true,
        removeRedundantAttributes      : true,
        // useShortDoctype                : true
      }
    }),
    new MiniCssExtractPlugin({
      filename: "css/style.css", // Путь и имя файла для CSS
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/manifest.webmanifest"), // Копируем манифест
          to: path.resolve(__dirname, "dist/manifest.webmanifest"), // Путь в dist манифест
        },
        // {
        //   from: path.resolve(__dirname, "src/img"), // Копируем изображения
        //   to: path.resolve(__dirname, "src/img"), // Путь в dist изображения
        // },
        // {
        //   from: path.resolve(__dirname, "src/img"), // Копируем изображения
        //   to: path.resolve(__dirname, "dist/img"), // Путь в dist изображения
        // },
        {
          from: path.resolve(__dirname, "src/icons"), // копируем иконки
          to: path.resolve(__dirname, "dist/icons"), // Путь в dist иконки
        },
      ],
    }),
    // new ImageMinimizerPlugin({
    //   minimizer: {
    //     implementation: ImageMinimizerPlugin.imageminGenerate,
    //     options: {
    //       plugins: [
    //         ["imagemin-webp", { quality: 100 }], // Настройка качества для WebP
    //       ],
    //     },
    //   },
    //   generator: [
    //     {
    //       // Генерация WebP файлов
    //       preset: "webp",
    //       implementation: ImageMinimizerPlugin.imageminGenerate,
    //       options: {
    //         plugins: [["imagemin-webp", { quality: 100 }]],
    //       },
    //       filename: "img/[name].webp", // Имя файла для WebP в выходной папке
    //     },
    //   ],
    // }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, "src"), // Каталог для статики
    },
    open: true, // Автоматически открывать браузер
    port: 9000, // Задаем порт для devServer
    watchFiles: ["src/**/*"],
  },

  mode: "development", // Режим сборки
};