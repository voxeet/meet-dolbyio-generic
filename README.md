# Dolby.io Generic Meeting App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Cloning the Repository

Run the following:
```sh
git clone https://github.com/dolbyio-samples/meet-dolbyio-generic.git
cd meet-dolbyio-generic
```

## Setting Credentials

Before using the SDK in your project, find your **Consumer Key** and **Consumer Secret** by following these steps:

1. Select the `SIGN IN` link located in the upper right corner of the Dolby.io page. Log in using your email and password.
2. Click the `DASHBOARD` link visible in the upper right corner of the website.
3. Select your application from the `APPLICATIONS` category located on the left side menu.
4. Select the `API Keys` category from the drop-down menu visible under your application.
5. In the `Interactivity APIs` section, you can access your `Consumer Key` and `Consumer Secret`.

Ensure that you enter in your Dolby.io Credentials in `/src/utils/voxeetUtils.js`. That is, replace the placeholder text in:
```js
const consumerKey = '<DOLBYIO_COMMUNICATIONS_API>';
const consumerSecret = '<DOLBYIO_COMMUNICATIONS_SECRET>';
```
with the credentials from your application, found here: https://dolby.io/dashboard/applications/summary

## Running the Application

After all credentials are set, you can run with:
```js
npm install
npm run start
```
