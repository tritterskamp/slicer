import {createStore, combineReducers} from 'redux'
import * as appReducer from '../redux-reducers/app-reducer'


export default function (data) {
  var reducer = combineReducers({
    ...appReducer,
    //...anotherReducer,
  });


  var store;
  if (typeof window === "object") {
    store = createStore(reducer, data,
      window.devToolsExtension ? window.devToolsExtension() : undefined
    );
  } else {
    store = createStore(reducer, data);
  }

  return store
}