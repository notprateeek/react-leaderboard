import React from 'react';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { connect } from 'react-redux';
import { compose } from 'redux';
import reducer from './reducer';
import { updatePoints } from './actions';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectData } from './selectors';
import { createStructuredSelector } from 'reselect';

const useStyles = makeStyles({
  item: {},
});

const Leader = props => {
  useInjectReducer({ key: 'leaderboard', reducer });

  const classes = useStyles();

  return (
    <div className={classes.item}>
      <div>{props.item.name}</div>
      <div>
        <div>{props.item.points}</div>
        <IconButton
          onClick={() => props.dispatch(updatePoints('add', props.item.id))}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          onClick={() =>
            props.dispatch(updatePoints('subtract', props.item.id))
          }
        >
          <RemoveIcon />
        </IconButton>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Leader);
