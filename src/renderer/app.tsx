import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import Application from './components/Application';
import {store} from './store';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
// @ts-ignore
import style from "./App.scss"

// Create main element
const mainElement = document.createElement('div');
mainElement.classList.add("root");
document.body.appendChild(mainElement);

const theme = createMuiTheme({
	palette: {
		type: "dark",
		primary: {
			main: style.primary
		},
		secondary: {
			main: style.secondary
		},
		background: {
			default: style.background,
			paper: style.background
		}
	}
})


ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<Provider store={store}>
			<Application/>
		</Provider>
	</MuiThemeProvider>,
	mainElement
);

