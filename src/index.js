import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './store/store'; // store'u import et
import { Provider } from 'react-redux'; // Provider'ı import et

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* App bileşenini Provider ile sarmala ve store'u prop olarak ver */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
