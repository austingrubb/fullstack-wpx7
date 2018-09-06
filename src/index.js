import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
// import store from './ducks/store';
import { BrowserRouter as Route} from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import store from './redux/store'


const render = () => {
    ReactDOM.render(
      <Provider store={store}>
        <Route>
          <AppContainer>
            <App />
          </AppContainer>
        </Route>
      </Provider>,
      document.getElementById('root')
    );
  };

render();

if (module.hot) {
    module.hot.accept('./App', () => {
      render();
    });
  }