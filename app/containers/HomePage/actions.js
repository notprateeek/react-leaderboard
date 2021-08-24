import { ADD, UPDATE } from './constants';

export const addLeader = value => ({
  type: ADD,
  value,
});

export const updatePoints = (operation, id) => ({
  type: UPDATE,
  operation,
  id,
});
