import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import {listAllOrders } from "../actions/orderAction"

class ViewFinancePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          totalCostDelivered: 0,
          averageCostDelivered: 0,
          deliveredOrdersCount: 0,
        };
      }
    
    componentDidMount() {
      this.props.dispatch(listAllOrders());
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.orders !== this.props.orders) {
          this.calculateMetrics();
        }
    }

    refreshOrders = () => {
        this.props.dispatch(listAllOrders());
    };

    calculateMetrics = () => {
        const deliveredOrders = this.props.orders.filter(order => order.status === "delivered");
        const totalCost = deliveredOrders.reduce((sum, order) => sum + order.totalCost, 0);
        const averageCost = deliveredOrders.length > 0 ? totalCost / deliveredOrders.length : 0;
  
        this.setState({
          totalCostDelivered: totalCost,
          averageCostDelivered: averageCost,
          deliveredOrdersCount: deliveredOrders.length,
        });
      };

    render() {
        return (
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <h2>Finance</h2>
              <div>
                <Button variant="primary" onClick={this.refreshOrders}>Refresh Orders</Button>
              </div>
            </div>

            <div className="mt-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Delivered Orders Metrics</h5>
                  <p className="card-text">Total Cost of Delivered Orders: ${this.state.totalCostDelivered.toFixed(2)}</p>
                  <p className="card-text">Average Cost per Delivered Order: ${this.state.averageCostDelivered.toFixed(2)}</p>
                  <p className="card-text">Number of Delivered Orders: {this.state.deliveredOrdersCount}</p>
                </div>
              </div>
            </div>
          </div>
        );
      }
  }


function mapStateToProps(state) {
    return {
      orders: state.order.orders,
    };
  }
  
  export default connect(mapStateToProps)(ViewFinancePage);