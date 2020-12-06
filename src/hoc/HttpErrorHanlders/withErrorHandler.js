import React, { Component } from 'react';

import Modal from '../../Components/UI/Modal/Modal';
import Auxiliary from '../../hoc/Auxiliary';

export const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    reqInterceptor;
    resInterceptor;

    constructor(props) {
      super(props);
      this.reqInterceptor = axios.interceptors.request.use((request) => {
        this.setState({ error: null });
        return request;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Auxiliary>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />;
        </Auxiliary>
      );
    }
  };
};