import produce from 'immer';
import { DISPLAY, ADD } from './constants';

export const initialState = {
  // display: false,
  value: {},
};

const homepageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      // case DISPLAY:
      //   draft.display = false;
      //   break;
      case ADD:
        draft.value = action.value;
        // console.log(draft.value, action.value);
        break;

      default:
        return draft;
    }
  });

export default homepageReducer;
