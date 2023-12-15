import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listAllProducts } from '../actions/productActions';
import {listAllOrders} from "../actions/orderAction"
import { listAllUsers } from '../actions/userAction';
import { Modal, Button, Form } from 'react-bootstrap'; 


class GenerateInvoicePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showModal: false,
          selectedOrder: null,
          selectedUser: null, // Add this line
        };
      }

      componentDidMount() {
        this.props.dispatch(listAllOrders());
        this.props.dispatch(listAllProducts());
        this.props.dispatch(listAllUsers());
      }

      handleViewInvoice = (order) => {
        const user = this.props.users.find(user => user.id === order.customerId);
        this.setState({ selectedOrder: order, selectedUser: user, showModal: true });
    };
      
      refreshOrders = () => {
          this.props.dispatch(listAllOrders());
      };

      printInvoice = () => {
        const printableArea = document.getElementById("printableInvoice");
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print Invoice</title>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(printableArea.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
      };


      renderOrderModal = () => {
        const { selectedOrder,  selectedUser} = this.state;
        const { products } = this.props;
      
        if (!selectedOrder || !selectedUser) return null;
      
        return (
          <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
            <Modal.Header closeButton>
              <Modal.Title>Invoice Details</Modal.Title>
            </Modal.Header>
            <Modal.Body id="printableInvoice">
            <h3>Customer Name: {selectedUser.username}</h3>
            <h3>Customer ID: {selectedUser.id}</h3>
            <h3>Customer Address: {selectedUser.address}</h3> {/* Display user's address */}
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
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => this.setState({ showModal: false })}>
                Close
              </Button>
              <Button variant="primary" onClick={this.printInvoice}>
                Print Invoice
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
          <h2>Generate Invoice</h2>
          <div>
          <Button variant="primary" onClick={this.refreshOrders}>Refresh Orders</Button>
          </div>
        </div>

        <div className="row">
        {orders.filter(order => order.status !== 'placed').map(order => (
            <div key={order.id} className="col-lg-4 col-md-6">
            <div className="card mb-3">
                <div className="card-body">
                <h5 className="card-title">Order #{order.id}</h5>
                {/* Other order details */}
                <Button variant="primary" onClick={() => this.handleViewInvoice(order)}>
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
      users: state.user.users,
    };
  }
  
  export default connect(mapStateToProps)(GenerateInvoicePage);