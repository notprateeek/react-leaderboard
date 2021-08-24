/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState } from 'react';
import { Container, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import reducer from './reducer';
import { addLeader } from './actions';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectData } from './selectors';
import { createStructuredSelector } from 'reselect';
import Leader from './leader';

const useStyles = makeStyles({
  container: { display: 'grid', placeItems: 'center', gap: '2em' },
  input: { display: 'flex', gap: '2em' },
  wrapper: { padding: '2em' },
  list: { display: 'flex', flexDirection: 'column', gap: '1em' },
});

function HomePage(props) {
  const [display, setDisplay] = useState(false);
  const [name, setName] = useState('');
  const [points, setPoints] = useState('');

  useInjectReducer({ key: 'leaderboard', reducer });

  const handleSubmit = () => {
    let value = {
      id: Math.random(Math.floor() * 9999),
      name: name,
      points: points,
    };

    setDisplay(false);
    props.dispatch(addLeader(value));
    setName('');
    setPoints('');
  };

  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <h1>Leaderboard App</h1>

      <div className={classes.input}>
        {!display ? (
          <Button
            onClick={() => {
              setDisplay(true);
            }}
          >
            Add Leader
          </Button>
        ) : (
          <>
            <TextField
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <TextField
              type="number"
              value={points}
              onChange={e => setPoints(e.target.value)}
            />

            <Button
              onClick={() => {
                handleSubmit();
              }}
            >
              Add Leader
            </Button>
          </>
        )}
      </div>

      <div className={classes.wrapper}>
        <div className={classes.list}>
          {props.data.map((item, index) => (
            <Leader key={index} item={item} />
          ))}
        </div>
      </div>
    </Container>
  );
}

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

export default compose(withConnect)(HomePage);
