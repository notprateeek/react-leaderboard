import { createSelector } from 'reselect';
import { initialState } from './reducer';

const homepageDomain = state => state.leaderoard || initialState;

const makeSelectValue = () =>
  createSelector(
    homepageDomain,
    substate => {
      substate.value;
      console.log(substate.value);
    },
  );

export { makeSelectValue };
