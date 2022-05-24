const redux = require('redux');

const defaultState = {
  counter: 0
}

const counterReducer = (state = defaultState, action) => {
  if (action.type === 'INCREMENT') {
    return {
      counter: state.counter + 1
    };
  }

  if (action.type === 'DECREMENT') {
    return {
      counter: state.counter - 1
    };
  }

  return state;
};

const store = redux.createStore(counterReducer);

const counterSubscriber = () => {
  const latestState = store.getState();

  console.log(latestState);
};

store.subscribe(counterSubscriber);

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
