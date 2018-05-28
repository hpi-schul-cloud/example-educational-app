# Example Schul-Cloud educational app
This app written with [ExpressJS], [Redux] and [ReactJS] makes use of the integration mechanisms into the Schul-Cloud. It's based on [tahnik/react-expressjs](https://github.com/tahnik/react-expressjs).

## Functionalities
1. Unauthenticated integration with pseudonym transfer: /welcome/{user-id}
2. OAuth2 authentication: /
3. LTI authentication (WIP)
4. Rostering
    * meta data about course
    * needs OAuth2
5. Depseudonymization
    * Iframe
    * postMessage and script
6. LRS feedback (WIP)

# Installation

Node Version: v9.0.0^

Just clone this repo or download the zip file. `cd` into the directory and run

    npm install

## Developing App with [Hot Reload]
To develop the react application, you can take advantage of React Hot Loader and Webpack Dev Server. To develop app with hot reload:

    npm run dev

Now you can access the react application on http://localhost:8080

## Production build and Deploy
To make a production build of the project, run the following commands

    npm run build
  
This will create create two files: `index.js` in `server/public/js` and `server.js` in `server/bin`.

`server.js` will be used for serving the application on port 3000 and `index.js` is the actual react app itself.

Finally run

    npm start

The you will be able to access this app from http://localhost:3000.

To get a distributable tarball of your application, run this command

    npm pack

Remember that you have to run `npm run build` before doing this. This will create a tar.gz file in your root folder. The contents in this file is deployable. All you need to do is copy the contents inside package folder inside this tar.gz file to your server and run the app with something like [pm2].


[ReactJS]: <https://facebook.github.io/react/>
[Babel]: <https://babeljs.io/>
[Webpack]: <https://webpack.github.io/>
[React Router v4]: <https://reacttraining.com/react-router/>
[Hot Reload]: <https://stackoverflow.com/questions/41428954>
[ExpressJS]: <http://expressjs.com/>
[Redux]: <http://redux.js.org/>
[pm2]: <https://github.com/Unitech/pm2>
[article]: <https://medium.com/@tahnik.mstsn/reactjs-expressjs-with-hot-reloading-and-server-side-rendering-901a01ea2711>
