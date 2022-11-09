import { createRoot } from 'react-dom/client';
import App from './App';
// import 'react-app-polyfill/stable';
import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4649FF',
      light: '#7978FF',
    },
    secondary: {
      main: '#9da5b1',
    },
    success: {
      main: '#2eb85c',
    },
    error: {
      main: '#e55353',
    },
    warning: {
      main: '#f9b115',
    },
    info: {
      main: '#3399ff',
    },
  },
});
const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
