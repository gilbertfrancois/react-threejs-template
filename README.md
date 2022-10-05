# Three.js template
_Gilbert François Duivesteijn_



## About

This template is a minimum starting point for a React - Three.js web project. 
Some features of the template:
- Shows how to pass React state variables to the THREE.js sketch.
- Has a constructor and destructor of the WebGL renderer, avoiding potential
memory leaks.
- Proper window resize handling.
- Boiler plate code for a GUI panel for testing.

The THREE.js sample sketch is inspired from the great work of _Yuri Artiukh_.

![screenshot](./assets/images/screenshot.png)

## Usage

At first time, install the dependencies with:

```sh
npm install
```

Then for development, run:

```sh
npm run dev
```

and to build for deployment, run:

```sh
npm run prod
npm run cp
```

To clean the installed packages and cache, run:

```sh
npm run clean
```

To copy the assets (images, etc) to the dist folder, run:

```sh
npm run cp
```

To format all source files, run:

```sh
npm run format
```

