import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card } from 'react-bootstrap';

import { listAllOrders } from "../actions/orderAction";
import { listAllProducts } from '../actions/productActions';
import { listAllUsers } from '../actions/userAction';

class ViewBackupPage extends Component {

    componentDidMount() {
      this.props.dispatch(listAllOrders());
      this.props.dispatch(listAllProducts());
      this.props.dispatch(listAllUsers());
    }

    refreshData = () => {
        this.props.dispatch(listAllOrders());
        this.props.dispatch(listAllProducts());
        this.props.dispatch(listAllUsers());
    };

    downloadData = (data, fileName) => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", fileName);
        document.body.appendChild(downloadAnchorNode); // required for Firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    downloadAllData = () => {
        const { orders, products, users } = this.props;
        const allData = { orders, products, users };
        this.downloadData(allData, "all_backup_data.json");
    }

    downloadIndividualData = (collectionName) => {
        const data = this.props[collectionName];
        this.downloadData(data, `${collectionName}_backup_data.json`);
    }

    render() {
        return (
            <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <h2>Save Data</h2>
                <div>
                  <Button variant="primary" onClick={this.refreshData}>Refresh Data</Button>
                </div>
              </div>
              <p>Save data from the Orders, Products, and Users collections.</p>
          
              <div className="d-flex flex-column align-items-center">
                <Button variant="secondary" className="mb-3" onClick={this.downloadAllData}>Download All Data</Button>
                <Button variant="info" className="mb-3" onClick={() => this.downloadIndividualData('orders')}>Download Orders</Button>
                <Button variant="info" className="mb-3" onClick={() => this.downloadIndividualData('products')}>Download Products</Button>
                <Button variant="info" className="mb-3" onClick={() => this.downloadIndividualData('users')}>Download Users</Button>
              </div>
              
            </Card.Body>
          </Card>
          
        );
    }
}

function mapStateToProps(state) {
  return {
    orders: state.order.orders,
    products: state.product.products,
    users: state.user.users
  };
}

export default connect(mapStateToProps)(ViewBackupPage);
