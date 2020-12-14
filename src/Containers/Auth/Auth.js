import React, { Component } from 'react';
import { Input } from '../../Components/UI/Input/Input';
import classes from './Auth.css';
import Axios from 'axios';
import { Spinner } from '../../Components/UI/Spinner/Spinner';

export class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Enter your email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        touched: false,
        valid: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Enter your password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        touched: false,
        valid: false,
      },
    },
    authInfo: {
      token: null,
      userId: null,
      error: null,
      loading: false,
    },
    isSignUp: false,
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  logInHandler = (event) => {
    event.preventDefault();
    let updatedAuthInfo = { ...this.state.authInfo };
    updatedAuthInfo.loading = true;
    updatedAuthInfo.error = null;
    this.setState({ authInfo: updatedAuthInfo });
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.email.value,
      returnSecureToken: true,
    };
    let Url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9iz9c291S6P5riWr9ffUwki-zEjIYDII';
    if (this.state.isSignUp) {
      Url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD9iz9c291S6P5riWr9ffUwki-zEjIYDII';
    }
    console.log('post going to ' + Url);
    Axios.post(Url, authData)
      .then((response) => {
        console.log(response);
        updatedAuthInfo.userId = response.data.localId;
        updatedAuthInfo.token = response.data.idToken;
        updatedAuthInfo.loading = false;
        updatedAuthInfo.error = null;
        this.setState({ authInfo: updatedAuthInfo });
        this.checkAuthTimeOut(response.data.expiresIn);
        this.props.setToken(this.state.authInfo.token);
      })
      .catch((error) => {
        //console.log(error.response);
        updatedAuthInfo.loading = false;
        updatedAuthInfo.error = error.response.data.error.message;
        this.setState({ authInfo: updatedAuthInfo });
        console.log(updatedAuthInfo.error);
        this.props.setToken(this.state.authInfo.token);
      });
  };

  logOutHandler = () => {
    let updatedAuthInfo = { ...this.state.authInfo };
    updatedAuthInfo.userId = null;
    updatedAuthInfo.token = null;
    //updatedAuthInfo.loading = false;
    updatedAuthInfo.error = null;
    this.setState({ authInfo: updatedAuthInfo });
    this.props.setToken(this.state.authInfo.token);
  };

  checkAuthTimeOut = (expirationTime) => {
    setTimeout(() => {
      this.logOutHandler();
    }, expirationTime * 1000);
  };

  switchAuthModeHandler = (event) => {
    event.preventDefault();
    //debugger;
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({ id: key, config: this.state.controls[key] });
    }

    let form = formElementsArray.map((element) => (
      <Input
        key={element.id}
        elementType={element.config.elementType}
        elementConfig={element.config.elementConfig}
        value={element.config.value}
        shouldValidate={element.config.validation}
        invalid={!element.config.valid}
        changed={(event) => this.inputChangedHandler(event, element.id)}
        touched={element.config.touched}
      />
    ));

    let loginDisplay = (
      <form>
        {form}
        <button onClick={this.logInHandler}>Submit</button>
        <button onClick={this.switchAuthModeHandler}>
          Switch to {this.state.isSignUp ? 'SignUp' : 'SignIn'}
        </button>
      </form>
    );
    if (this.state.authInfo.error)
      loginDisplay = <p>{this.state.authInfo.error + ' Please refresh'}</p>;
    if (this.state.authInfo.loading) loginDisplay = <Spinner />;
    return <div className={classes.Auth}>{loginDisplay}</div>;
  }
}
