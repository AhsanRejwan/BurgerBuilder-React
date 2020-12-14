import React, { Component } from 'react';
import classes from './ContactData.css';
import { axiosOrders } from '../../../axios-orders';
import { Spinner } from '../../../Components/UI/Spinner/Spinner';
import { Input } from '../../../Components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true,
        },
        touched: false,
        valid: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street',
        },
        value: '',
        validation: {
          required: true,
        },
        touched: false,
        valid: false,
      },
      city: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your City',
        },
        value: '',
        validation: {
          required: true,
        },
        touched: false,
        valid: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country',
        },
        value: '',
        validation: {
          required: true,
        },
        touched: false,
        valid: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email',
        },
        value: '',
        validation: {
          required: true,
        },
        touched: false,
        valid: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayName: 'Fastest' },
            { value: 'cheapest', displayName: 'Cheapest' },
            { value: 'normal', displayName: 'Normal' },
          ],
        },
        validation: {
          required: true,
        },
        value: 'normal',
        valid: true,
      },
    },
    loading: false,
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formIdentifier in this.state.orderForm) {
      formData[formIdentifier] = this.state.orderForm[formIdentifier].value;
    }
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };
    axiosOrders
      .post('/orders.json?auth=' + this.props.token, order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch((error) => {
        alert(error.response.data.error);
        console.log(error.response);
        this.setState({ loading: false, error: error });
        this.props.history.push('/');
      });
  };

  checkValidity = (value, rules) => {
    let isValid = false;
    if (rules && rules.required) isValid = value.trim() !== '';
    return isValid;
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let isFormValid = true;
    for (let element in updatedOrderForm) {
      isFormValid = updatedOrderForm[element].valid && isFormValid;
    }
    console.log(isFormValid);
    this.setState({ orderForm: updatedOrderForm, formIsValid: isFormValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({ id: key, config: this.state.orderForm[key] });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((element) => (
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
        ))}
        <button onClick={this.orderHandler} disabled={!this.state.formIsValid}>
          Order
        </button>
      </form>
    );
    if (this.state.loading) form = <Spinner />;
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
