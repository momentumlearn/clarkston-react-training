# Day 1

## Reviewing modern ES6 syntax

* `const` and `let`
* arrow functions
* template literals (string interpolation and multi-line strings)
* classes
* destructuring
* implicit name/value objects
* default params
* rest params
* splat operator

## Creating a React application using create-react-app

1. Make sure node and npm is installed
2. Install `create-react-app`: `npm install create-react-app --global`
3. Create an app: `create-react-app <appname>`

Walk through the clicker app, making sure to show ES6 constructs.

## JSX syntax

Explain JSX through the clicker app.

## React developer tools

- Install the [React Developer Tools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) or the [React Dev Tools for Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

## Exercise

- Add a subtract button to clicker app

## Class-based React components and state

- Walk through a monolithic version of the TweetShrink app
- Make sure to talk about
  - `setState` is asynchronous
  - immutability is important
    - https://github.com/kolodny/immutability-helper

## Forms and React

- https://learnreact.design/2020/03/31/react-mental-models-working-with-input

## Composing React components

- Break TweetShrink into multiple components
- How do you pass information between components?
  - Props pass down
  - Functions pass up
  - Updating state from child components using prop drilling
     - https://kentcdodds.com/blog/prop-drilling
- Using prop-types 
  - https://www.npmjs.com/package/prop-types
  - https://blog.logrocket.com/validating-react-component-props-with-prop-types-ef14b29963fc/

## Function-based React components

- Take TweetShrink simple components and turn them into function-based components

## The React component lifecycle

Using the patterns app

- show how to use `componentDidMount` to retrieve data via Ajax
- show how to use `componentDidUpdate` to redraw canvas

## Exercise

- Add price calculation to patterns app
