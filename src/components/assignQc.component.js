import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap'; 

import { listAllProducts } from '../actions/productActions';
import {listAllOrders, updateOrderQuality, updateOrderStatus } from "../actions/orderAction"

class AssignQCPage extends Component {

    constructor(props) {
      super(props);
      this.state = {
        showModal: false,
        selectedOrder: null,
        quality: ''
      };
    }
    
    componentDidMount() {
      this.props.dispatch(listAllOrders());
      this.props.dispatch(listAllProducts());
    }
  
    handleViewOrder = (order) => {
      this.setState({ selectedOrder: order, showModal: true });
    }
    
    refreshOrders = () => {
        this.props.dispatch(listAllOrders());
    };
    
    handleUpdateOrder = (orderId) => {
        const { quality } = this.state;

        // Update the quality of the order
        this.props.dispatch(updateOrderQuality(orderId, quality));

        // Update the status of the order to 'QC complete'
        this.props.dispatch(updateOrderStatus(orderId, 'QC complete'));

        // Close the modal after updating
        this.setState({ showModal: false });
    };
      

    renderOrderModal = () => {
        const { selectedOrder, quality } = this.state;
        const { products } = this.props; // Use products from props
      
        if (!selectedOrder) return null;
      
        return (
          <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
            <Modal.Header closeButton>
              <Modal.Title>Order Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedOrder.cart.map((item, index) => {
                const product = products.find(p => p.id === item.productId); // Find the product details using productId
                return product ? (
                  <div key={index} className="card mb-3">
                    <div className="row no-gutters align-items-center">
                      <div className="col-auto">
                        <img src={product.image} className="img-fluid" alt="Product" style={{ width: '100px', height: '100px' }} /> {/* Product image */}
                      </div>
                      <div className="col">
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5> {/* Product name */}
                          <p>Product ID: {item.productId}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Item Cost: ${product.cost}</p>
                          <p>Total Cost: ${product.cost * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null;
              })}
              <p className="text-right">Order Total Cost: ${selectedOrder.totalCost}</p>
              <Form.Group>
            <Form.Label>Quality:</Form.Label>
            <Form.Control 
              type="number" 
              value={quality}
              onChange={(e) => this.setState({ quality: e.target.value })}
              placeholder="Enter quality value" 
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.setState({ showModal: false })}>
            Close
          </Button>
          <Button variant="primary" onClick={() => this.handleUpdateOrder(selectedOrder.id)}>
            Update quality
          </Button>
        </Modal.Footer>
      </Modal>
        );
      };      
  
    render() {
        const { orders } = this.props;
    
        return (
          <div>

        <div className="d-flex justify-content-between align-items-center">
          <h2>Quality control</h2>
          <div>
          <Button variant="primary" onClick={this.refreshOrders}>Refresh Orders</Button>
          </div>
        </div>

        <div className="row">
        {orders.filter(order => order.status === 'in production').map(order => (
            <div key={order.id} className="col-lg-4 col-md-6">
            <div className="card mb-3">
                <div className="card-body">
                <h5 className="card-title">Order #{order.id}</h5>
                {/* Other order details */}
                <Button variant="primary" onClick={() => this.handleViewOrder(order)}>
                    View Order
                </Button>
                </div>
            </div>
            </div>
        ))}
        </div>
            {this.renderOrderModal()}
          </div>
        );
      }
  }


function mapStateToProps(state) {
    return {
      products: state.product.products,
      orders: state.order.orders,
    };
  }
  
  export default connect(mapStateToProps)(AssignQCPage);