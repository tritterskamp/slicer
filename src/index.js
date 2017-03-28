import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import store from './init/store';
import { Provider } from 'react-redux'

/* Absolute root of the app */
class RootComponent extends React.Component {
  render() {
    return (
      <Provider store={ this.props.store }>
        <App />
      </Provider>
    )
  }
}

ReactDOM.render(
  <RootComponent store={store} />,
  document.getElementById('root')
);
