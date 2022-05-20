// import { useRef, useState, useEffect } from 'react';

import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput(value => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset, resetEmailInput
  } = useInput(value => value.includes('@'));

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = event => {
    event.preventDefault();

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    resetNameInput();
    resetEmailInput();
  }

  const nameInputClasses = nameInputHasError
    ? 'form-control invalid'
    : 'form-control';
  
  const emailInputClasses = emailInputHasError
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && <p className='error-text'>Name must not be empty.</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your Name</label>
        <input
          type='text'
          id='email'
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && <p className='error-text'>Please entere a valid email.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );

  // const nameInputRef = useRef();

  // const [enteredName, setEnteredName] = useState('');
  // // const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);
  // const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  // // const [formIsValid, setFormIsValid] = useState(false);

  // const enteredNameIsValid = enteredName.trim() !== '';
  // const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  // let formIsValid = false;

  // if (enteredNameIsValid) {
  //   formIsValid = true;
  // }

  // // useEffect(() => {
  // //   if (enteredNameIsValid) {
  // //     setFormIsValid(true);
  // //   } else {
  // //     setFormIsValid(false);
  // //   }
  // // }, [enteredNameIsValid]);


  // // useEffect(() => {
  // //   if (enteredNameIsValid) {
  // //     console.log('Name input is valid');
  // //   }
  // // }, [enteredNameIsValid]);

  // const nameInputChangeHandler = event => {
  //   setEnteredName(event.target.value);

  //   // if (event.target.value.trim() !== '') {
  //   //   setEnteredNameIsValid(true);
  //   // }
  // }

  // const nameInputBlurHandler = event => {
  //   setEnteredNameTouched(true);

  //   // if (enteredName.trim() === '') {
  //   //   setEnteredNameIsValid(false);

  //   //   return;
  //   // }

  //   // setEnteredNameIsValid(true);
  // }

  // const formSubmissionHandler = event => {
  //   event.preventDefault();

  //   setEnteredNameTouched(true);

  //   // if (enteredName.trim() === '') {
  //   //   setEnteredNameIsValid(false);

  //   //   return;
  //   // }

  //   if (!enteredNameIsValid) {
  //     return;
  //   }

  //   // setEnteredNameIsValid(true);

  //   console.log(enteredName);

  //   // const enteredValue = nameInputRef.current.value;
  //   // console.log(enteredValue);

  //   // nameInputRef.current.value = ''; => NOT IDEAL
  //   setEnteredName('');
  //   setEnteredNameTouched(false);
  // }
  

  // const nameInputClasses = nameInputIsInvalid
  //   ? 'form-control invalid'
  //   : 'form-control';

  // return (
  //   <form onSubmit={formSubmissionHandler}>
  //     <div className={nameInputClasses}>
  //       <label htmlFor='name'>Your Name</label>
  //       <input
  //         ref={nameInputRef}
  //         type='text'
  //         id='name'
  //         onChange={nameInputChangeHandler}
  //         onBlur={nameInputBlurHandler}
  //         value={enteredName}
  //       />
  //       {nameInputIsInvalid && <p className='error-text'>Name must not be empty.</p>}
  //     </div>
  //     <div className="form-actions">
  //       <button disabled={!formIsValid}>Submit</button>
  //     </div>
  //   </form>
  // );
};

export default SimpleInput;
