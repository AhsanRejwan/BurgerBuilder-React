import React, { Component } from 'react';
import { Order } from '../../Components/Order/Order';
import { axiosOrders } from '../../axios-orders';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axiosOrders
      .get('/orders.json?auth=' + this.props.token)
      .then((res) => {
        const fetchedOrders = [];
        for (let item in res.data) {
          fetchedOrders.push({
            ...res.data[item],
            id: item,
          });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((err) => this.setState({ loading: false }));
  }

  render() {
    return (
      <div>
        {this.state.orders.map((item) => (
          <Order
            key={item.id}
            ingredients={item.ingredients}
            price={item.price}
          />
        ))}
      </div>
    );
  }
}

export default Orders;
