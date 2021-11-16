# Exchange rates
The app shows current exchange rates loaded from API https://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt as wel as possibility to convert CZK currency into any of the loaded currencies.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Integrations
App integrates to a single API https://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt, however this API does not allows CORS request. Therefore the API call is routed through cors proxy deployed on URL https://cors-proxy-client.herokuapp.com.
