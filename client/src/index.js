import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { createStore , applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers'


const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


