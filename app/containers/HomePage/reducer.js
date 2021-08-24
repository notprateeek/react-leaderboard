import produce from 'immer';
import { ADD, UPDATE } from './constants';

export const initialState = {
  data: [],
};

const homepageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD:
        draft.data = [...draft.data, action.value];
        break;

      case UPDATE:
        const leaders = draft.data;
        const index = leaders.findIndex(leader => leader.id === action.id);
        if (action.operation == 'add') {
          leaders[index].points = Number(leaders[index].points) + 1;
        } else {
          leaders[index].points = Number(leaders[index].points) - 1;
        }

        draft.data = leaders;

        console.log(index);
        break;

      default:
        return draft;
    }
  });

export default homepageReducer;
