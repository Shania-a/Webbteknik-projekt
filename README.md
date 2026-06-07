# Spacefullness

## Description
    Spacefullness is a webbased game based on the classic game "Where's Waldo" exept in space.
    Players are shown space images with hidden elements that they need to fine.
    NASAs APOD API is used to fetch daily images and hidden elements are placed ontop the image. 

## Prerequisites
    Vite
    Git
    Node.js

# Installation
    **1. Clone the repository**
    ```
    Clone: https://github.com/Shania-a/Webbteknik-projekt
    ```

    **2. Install**
    Navigate to the project directory and run the commands
    ```
    cd my-react-app
    npm install
    ```

    **3. API Key**
    Create .env file in root folder "/my-react-app"
    Inside the .env file add:
    ```
    VITE_NASA_API_KEY=the_api_key
    ```

    **4. Run the program**
    Run the program through Node
    ```
    npm run dev
    ```
    Open the link from terminal.

## Tools, Libraries and Frameworks
    React
    Vite
    React Bootstrap
    React Router
    React Timer Hook

## Authors
    Gustav Helgesson Liljedahl
    Alma Rangström
    Shania Amin


---------------------------------------------------------------------------------

## Installations
    mkdir tests + mkdir dist

    npm install react-router-dom

    npm install react-bootstrap bootstrap

    npm install react-confetti

    npm install --save react-timer-hook

## The NASA API has risk of freezing or lag on Google Chrome!

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.