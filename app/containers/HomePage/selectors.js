import { createSelector } from 'reselect';
import { initialState } from './reducer';

const homepageDomain = state => state.leaderboard || initialState;

function compare(a, b) {
  if (a.points < b.points) {
    return 1;
  }
  if (a.points > b.points) {
    return -1;
  }
  return 0;
}

const makeSelectData = () =>
  createSelector(
    homepageDomain,
    substate => {
      const sorted = substate.data;
      return sorted.slice().sort(compare);
    },
  );

export { makeSelectData };
