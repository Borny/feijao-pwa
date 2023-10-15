# Feijao App (feijao-pwa)

PWA with comments on pictures, placing bets and booking presents

- [Install](#install)
- [Run the app](#run-the-app)
- [Icons](#icons)

## Install

Install the dependencies

```bash
yarn
# or
npm install
```

### Run the app

Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
# or
quasar -m pwa
```

## Icons

Generate all the necessary icons

```bash
icongenie generate -m pwa -i /path/to/source/icon.png # needs to be a .png file
# Add --theme-color to generate a background color for the icons
icongenie generate -m pwa -i /path/to/source/icon.png --theme-color 000 # background color will be black
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```


### Build the app for production

```bash
quasar build
# or
quasar build -m pwa
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
