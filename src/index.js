import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
// import store from './ducks/store';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';


const render = () => {
    ReactDOM.render(
      <AppContainer>
            <App />
      </AppContainer>,
      document.getElementById('root')
    );
  };

ReactDOM.render(<App />, document.getElementById('root'));

render();

if (module.hot) {
    module.hot.accept('./App', () => {
      render();
    });
  }