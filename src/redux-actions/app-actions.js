import store from '../init/store'

export function setAppValue(changes = {}) {
  store.dispatch({
    type: "SET_APP_VALUE",
    payload: {
      changes: {...changes}
    }
  });
}



export function setSliceValue(key = "", changes = {}) {
  store.dispatch({
    type: "SET_APP_SLICE_VALUE",
    payload: {
      key: key,
      changes: {...changes}
    }
  });
}

