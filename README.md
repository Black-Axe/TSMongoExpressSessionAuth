### MongoDB TypeScript Passport-Session backend with React front-end client

####Features:
<ul>
<li>Typescript</li>
<li>Validation/Middleware</li>
<li>SudoRoutes</li>
<li>Protected Routes</li>
<li>Front-end client interface</li>
<li>User access levels</li>
<li>Session storage</li>
<li>MongoDb</li>
<li>Passport</li>
</ul>



# Prerequisites

- Install dependencies

```
cd <project_name>
npm install
```

- Build and run the project with auto reload (nodemon)

```
npm run server
```

- Build and run the project

```
npm run start
```

Finally, navigate to `http://localhost:11000/` and you should see the API running!


## MongoDB
Put the MongoURI string into the default.json file located in ```/config```

The app uses a function called ```initAndPopulateDB()``` located in the server file, that populates the database with user data types only once. (Checks if the database already has data and wont update on subsequent runs)

## Models
```User``` 
```typescript 
//Interface to model the user Schema for TypeScript.
@param email:string
@param password:string
@param avatar:string
@param userType:ref=> UserType._id

 ```
 
```UserType``` 
```typescript
//Interface to model the user type Schema for TypeScript.
@param accessRights:string
 ```

```Post``` 
```typescript
//Interface to model the Post Type schema for TypeScript.
 * @param title:string
 * @param content:string
 * @param author: ref => User._id
 * @param createdAt:Date
 * @param updatedAt:Date
 ```

```AccessToken``` 
```typescript
//Interface to model the access token schema for TypeScript.
 * @param token:string
 * @param user: ref => User._id
 * @param expiration:Date 
 * @param createdAt:Date
 * @param updatedAt:Date
 * @param refreshToken: ref => RefreshToken._id
 * @param history: string[]
 ```
```Refresh Token``` 
```typescript
//Interface to model the RefreshToken Schema for TypeScript.
 * @param token:string
 * @param user: ref => User._id
 * @param expiration:Date 
 * @param createdAt:Date
 * @param updatedAt:Date
 * @param valid: boolean
 ```



## Routes

#### Register
###### **Requires email and password and passwordConfirm
###### ***Middleware handles validation
###### ****Controller also sets cookies
| Route | Description|
| -----|-----|
| **POST /register**| Create new user from email and password|

`POST localhost:5000/register`
```json

{
  "email": "sample@gmail.com",
  "password": "123456",
  "passwordConfirm":"123456",
}
```

`Response`
```json
{
    "user": "61a69c3975d6e0cd34b23f4f",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxYTY5YzM5NzVkNmUwY2QzNGIyM2Y0ZiJ9LCJpYXQiOjE2MzgzMDg5MjIsImV4cCI6MTYzODkxMzcyMn0.0tRxp_Fc_BSrjmBydMgdQuocLVwD0Q0Rpx6qdPY75XA",
    "refreshToken": "@@rt-a558f8b1-ea6a-4d43-903b-9407866a7bb6-db9337ec61-af6b90cd-c123-4f71-9605-9a315341d3f8@@",
    "accessTokenExpiration": "12/7/2021, 4:48:42 PM",
    "refreshTokenExpiration": "1/29/2022, 4:48:42 PM"
}
```

#### Posts
###### ***Middleware handles validation
| Route | Description|
| -----|-----|
| **POST /posts**| Create new post from middlewares token|
| **GET /posts**| Get personal users posts from access token in middleware|
| **GET /posts/{id}**| Get post with id|
`POST localhost:5000/posts`
```json
{
    "title":"title",
    "content":"jajamaru"
}
```
`Response`
```json
{
    "_id": "61a6ab3ba7278cd1a08149b4",
    "title": "title",
    "content": "jajamaru",
    "author": "61a69c3975d6e0cd34b23f4f",
    "createdAt": "2021-11-30T22:52:43.412Z",
    "updatedAt": "2021-11-30T22:52:43.412Z",
    "__v": 0
}
```
#### Tokens
###### ***Middleware handles validation
###### ***Middleware also checks for and sets cookies
| Route | Description|
| -----|-----|
| **POST /token**| Grants new tokens from email and password|
| **POST /refresh**| Grants new tokens from refresh token|
`POST localhost:5000/token/refresh`

`
***Middleware searches headers/params/cookies for token***
`

`Response`
```json
{
    "grandToken": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxYTY5YzM5NzVkNmUwY2QzNGIyM2Y0ZiJ9LCJpYXQiOjE2MzgzMTI5NDQsImV4cCI6MTYzODkxNzc0NH0.RixKAD-RslyRriTxvrbbAWHxbJAly7RcGHiclgMn8fA",
        "refreshToken": "@@rt-279659df-f8ca-41bf-a631-e3517455ba04-3ba8411b18-fa5b1b92-96c9-48a1-915e-591279ef0165@@",
        "user": "61a69c3975d6e0cd34b23f4f",
        "accessTokenExpiration": "12/7/2021, 5:55:44 PM",
        "refreshTokenExpiration": "1/29/2022, 5:59:31 PM"
    }
}
```



## Project Structure

The most obvious difference in a TypeScript + Node project is the folder structure. In a TypeScript project, it's best to have separate _source_ and _distributable_ files. TypeScript (`.ts`) files live in your `src` folder and after compilation are output as JavaScript (`.js`) in the `dist` folder.

The full folder structure of this app is explained below:

> **Note!** Make sure you have already built the app using `npm run start`

| Name               | Description                                                                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **config**         | Contains config environment to be used by the config package, such as MongoDB URI, jwtSecret, and etc.                                                        |
| **dist**           | Contains the distributable (or output) from your TypeScript build                                                                                             |
| **node_modules**   | Contains all your npm dependencies                                                                                                                            |
| **src**            | Contains your source code that will be compiled to the dist dir                                                                                               |
| **src/database** | Contains the initial data population for database and database connection                                                                                                                |
| **src/helpers** | Contains the helpers for validating Mongo ID's and user as well as finding token location and setting cookies and generating hashed password                                                                                    |
| **src/middleware** | Contains middleware for login, registration and authentication. Checks for validation of values and for locations of tokens and validity of bearer tokens                                                                     |
| **src/models**     | Models defined are User, UserType, Post, AccessToken, RefreshToken                                          |
| **src/routes**     | Endpoints are /register, /auth, /posts, /token                                                           |
| **src/services**     | Contains token service to handle logic pertaining to accessing tokens from database, creating new tokens and storing in database, and altering validity of tokens in database                                        |
| **src/utils**     | Contains utility functions designed to help with generating an avatar for the user as well as converting the user to a payload object for signing a new access token                                       |
| **src/server.ts**  | Entry point to your express app                                                                                                                               |
| package.json       | File that contains npm dependencies as well as build scripts                                                  |
| tsconfig.json      | Config settings for compiling server code written in TypeScript                                                                                               |
| tslint.json        | Config settings for TSLint code style checking                                                                                                                |

### Configuring TypeScript compilation

TypeScript uses the file `tsconfig.json` to adjust project compile options.
Let's dissect this project's `tsconfig.json`, starting with the `compilerOptions` which details how your project is compiled.

```json
    "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "noImplicitAny": true,
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist",
    "baseUrl": ".",
    "paths": {
      "*": ["node_modules/*", "src/types/*"]
    }
  }
```

| `compilerOptions`            | Description                                                                                                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"module": "commonjs"`       | The **output** module type (in your `.js` files). Node uses commonjs, so that is what we use                                                               |
| `"esModuleInterop": true,`   | Allows usage of an alternate module import syntax: `import foo from 'foo';`                                                                                |
| `"target": "es6"`            | The output language level. Node supports ES6, so we can target that here                                                                                   |
| `"noImplicitAny": true`      | Enables a stricter setting which throws errors when something has a default `any` value                                                                    |
| `"moduleResolution": "node"` | TypeScript attempts to mimic Node's module resolution strategy. Read more [here](https://www.typescriptlang.org/docs/handbook/module-resolution.html#node) |
| `"sourceMap": true`          | We want source maps to be output along side our JavaScript. See the [debugging](#debugging) section                                                        |
| `"outDir": "dist"`           | Location to output `.js` files after compilation                                                                                                           |
| `"baseUrl": "."`             | Part of configuring module resolution. See [path mapping section](#installing-dts-files-from-definitelytyped)                                              |
| `paths: {...}`               | Part of configuring module resolution. See [path mapping section](#installing-dts-files-from-definitelytyped)                                              |

The rest of the file define the TypeScript project context.
The project context is basically a set of options that determine which files are compiled when the compiler is invoked with a specific `tsconfig.json`.
In this case, we use the following to define our project context:

```json
    "include": [
        "src/**/*"
    ]
```

`include` takes an array of glob patterns of files to include in the compilation. This project is fairly simple and all of our .ts files are under the `src` folder.

### Running the build

All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.
This is nice because most JavaScript tools have easy to use command line utilities allowing us to not need grunt or gulp to manage our builds.
If you open `package.json`, you will see a `scripts` section with all the different scripts you can call.
To call a script, simply run `npm run <script-name>` from the command line.
You'll notice that npm scripts can call each other which makes it easy to compose complex builds out of simple individual build scripts.
Below is a list of all the scripts this template has available:

| Npm Script     | Description                                                                                   |
| -------------- | --------------------------------------------------------------------------------------------- |
| `tsc`          | Transpiles TypeScript codes to JavaScript.                                                    |
| `watch-tsc`    | Transpiles TypeScript codes to JavaScript, with auto reload.                                  |
| `deploy`       | Runs node on `dist/server.js` which is the app's entry point.                                 |
| `watch-deploy` | Runs node on `dist/server.js` which is the app's entry point, with auto reload.               |
| `server`       | Transpiles TypeScript codes to JavaScript then run node on `dist/server.js` with auto reload. |
| `start`        | Transpiles TypeScript codes to JavaScript then run node on `dist/server.js`.                  |

Since we're developing with TypeScript, it is important for the codes to be transpiled first to JavaScript before running the node server. It is best to deploy the app using: `npm run server` or `npm run start` command.

