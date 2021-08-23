/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState } from 'react';
import { Container, TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import reducer from './reducer';
import { show, addLeader } from './actions';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectValue } from './selectors';
import { createStructuredSelector } from 'reselect';

function HomePage(props) {
  const [display, setDisplay] = useState(false);
  const [name, setName] = useState('');
  const [points, setPoints] = useState('');

  useInjectReducer({ key: 'leaderboard', reducer });

  const handleSubmit = () => {
    let value = {
      name: name,
      points: points,
    };

    setDisplay(false);
    props.dispatch(addLeader(value));
    setName('');
    setPoints('');
  };

  // console.log(props);

  return (
    <Container>
      <h1>Leaderboard App</h1>

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
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  value: makeSelectValue(),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
