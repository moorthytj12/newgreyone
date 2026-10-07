# GREY ONE – Immersive 3D Construction Website

**Forged in Concrete. Built for Generations.**

A dark, interactive, WebGL construction website with a 3D engineer guide ("Rex").
Live: https://greyone.vercel.app

## Features
- Preloader counter and animated hero headline
- Interactive 3D hero: concrete/steel blocks react to your cursor; click to scatter them
- Scroll-driven build: the blocks assemble into a 7-floor tower as you scroll
- Rex, a 3D site guide who follows your cursor, talks at every section and has a "Next stop" button
- Smooth scrolling, custom cursor, full-screen menu, hover-preview project list
- Contact form that opens the visitor's email app (no backend needed)
- Responsive, keyboard-focus visible, respects reduced motion

## Built with
HTML5, CSS3, vanilla JavaScript (ES6), Three.js r128 (self-hosted in `assets/js/vendor`).

## Structure
```
greyone/
├── index.html
├── README.md
├── LICENSE
├── .gitignore
└── assets/
    ├── css/style.css
    ├── js/main.js
    ├── js/vendor/three.min.js
    └── images/
```

## Run locally
Open `index.html`, or serve the folder (recommended):
```
npx serve .
```

## Customise
- **Email:** change the `EMAIL` constant at the top of `assets/js/main.js`.
- **Projects:** edit the `PJ` array in `assets/js/main.js`.
- **Guide lines:** edit the `LINES` object in `assets/js/main.js`.
- **Address and copy:** edit `index.html`.

## Deploy
Static site. Push to GitHub and import the repo in Vercel (no build step, root directory).

## Roadmap
- [ ] Real project photos and detail pages
- [ ] Construction sound effects
- [ ] Custom GLB model for Rex
- [ ] CMS integration

## License
MIT
