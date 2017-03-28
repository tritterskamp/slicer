import { setValue, editNode } from '../helpers/reducer-utilities'
export function app(state = {}, action) {
    switch (action.type) {

        case "SET_APP_VALUE":
            return setValue(state, action.payload.changes);

        case "SET_APP_SLICE_VALUE":
            return {
                ...state,
                slices: editNode(state.slices, action.payload.key, action.payload.changes)
            };

        default:
            return state;
    }
}