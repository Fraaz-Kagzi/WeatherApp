# Weather App


**1. Clone the repo with the link ^^**


**2. Install the dependencies :**

```sh
npm install
```

## Development Workflow


** Start a live-reload development server (should update on change - use this during development):**

```sh
npm run dev
```

> This is a full web server for your project. Any time you make changes within the `src` directory, it will rebuild and even refresh your browser.


**Generate a production build in `./build` :**

```sh
npm run build
```

**Start local production server with [serve](https://github.com/zeit/serve):**

```sh
npm start
```

> This simply serves up the contents of `./build`. Bear in mind, if you use this, the localhost port your server is running on will refresh, and you'll also need to restart it to see any changes you've made to the code in `src`.


## Quick Boilerplate Overview

- The initial run will display the iPhone version (iPhone 6/7 Plus screen size); however, if you modify the path on the url bar by adding "/ipad", you can view the tablet version (iPad Air screen size).

- The CSS pre-processor in use is Less. You don't have to worry about the syntax and just write in normal CSS as there are helper modules to assist you (located in `style/helpers`).

- There are many weather APIs out there; this boilerplate uses OpenWeatherMap. Sign up, is free and you can find out more about it here : https://openweathermap.org/api 

- Most importantly, have fun with it ! 👌


## Extra Info

1. Handling URLS

:information_source: You can use URL Routing as defined [here](http://git.io/preact-router).

Pages are just regular components that get mounted when you navigate to a certain URL. Any URL parameters get passed to the component as `props`.

Defining what component(s) to load for a given URL is easy and declarative. You can even mix-and-match URL parameters and normal props.

```js
<Router>
  <A path="/" />
  <B path="/b" id="42" />
  <C path="/c/:id" />
</Router>
```
