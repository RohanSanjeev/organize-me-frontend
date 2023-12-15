import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listAllProducts, updateProduct } from '../actions/productActions';
import {addOrder, listAllOrders} from "../actions/orderAction"
import { Modal, Button, Form } from 'react-bootstrap'; // Assuming you're using React Bootstrap

class PlaceOrderPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            showModal: false,
            totalCost: 0,
            searchTerm: '',
        };

    // Binding methods
    this.handleRefreshProducts = this.handleRefreshProducts.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.updateCart = this.updateCart.bind(this);
  }
    
  componentDidMount() {
    this.handleRefreshProducts();
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartArray = JSON.parse(savedCart);
        this.setState({ cart: cartArray });
      } catch (e) {
        console.error('Error parsing cart data:', e);
      }
    }
  }
   

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleRefreshProducts = () => {
    this.props.dispatch(listAllProducts());
  };

  handleCheckout() {
    const cartItems = this.state.cart.filter(item => item.quantity > 0);
    const totalCost = cartItems.reduce((sum, item) => sum + (item.cost * item.quantity), 0);
    console.log('Checkout Clicked, Cart:', cartItems);
    this.setState({ showModal: true, totalCost });
  }

  placeOrder = () => {
    const { cart, totalCost } = this.state;
    const user = JSON.parse(localStorage.getItem("user"));
    const customerId = user ? user.myid : null;
  
    this.props.dispatch(listAllOrders()).then(() => {
      const { orders, products } = this.props; // Assuming products are available in props
      const orderId = orders.length + 1;
      // const acceptance = "pending";
      const status = "placed";
      const feedback = "None";

      this.props.dispatch(addOrder(orderId, customerId, cart, totalCost, status, 0, 0, 0, 0, feedback))
        .then(() => {
          // Update each product in the cart
          cart.forEach(cartItem => {
            const product = products.find(p => p.id === cartItem.productId);
            if (product) {
              const newQuantity = product.quantity - cartItem.quantity;
              this.props.dispatch(updateProduct(product.id, product.name, product.image, product.description, product.cost, newQuantity));
            }
          });
          this.setState({ cart: this.state.cart.map(item => ({ ...item, quantity: 0 })), showModal: false });
        //   this.setState({ showModal: false }); // Close modal after placing the order and updating products
        })
        .catch(error => console.error('Order Placement Error:', error));
    }).catch(error => {
      console.error('Order Placement Error:', error);
    });
  };
  
  updateCart = (productId, quantity, cost) => {
    this.setState(prevState => {
      let cart = [...prevState.cart];
      let existingItem = cart.find(item => item.productId === productId);
      if (existingItem) {
        existingItem.quantity = quantity;
      } else {
        cart.push({ productId, quantity, cost });
      }
      return { cart };
    }, () => localStorage.setItem('cart', JSON.stringify(this.state.cart))); // Update localStorage after state is set
  };  

  renderCartModal = () => {
    const { cart, totalCost } = this.state;
    const { products } = this.props; // Use products from props

    return (
      <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
        <Modal.Header closeButton>
          <Modal.Title>Cart Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.map((item, index) => {
            const product = products.find(p => p.id === item.productId); // Find the product details using productId
            return product ? (
                <div key={index} className="card w-100"> {/* Full-width card */}
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <img src={product.image} className="img-fluid" alt="Product" style={{ width: '150px', height: '150px' }} /> {/* Product image */}
                    </div>
                    <div className="col">
                      <div className="card-body">
                        <p>Product ID: {item.productId}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Item Cost: ${item.cost}</p>
                        <p>Cost: ${item.cost * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null;             
          })}
          <p className="text-right">Total Cost: ${totalCost}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.setState({ showModal: false })}>
            Close
          </Button>
          <Button variant="primary" onClick={this.placeOrder}>
            Place Order
          </Button>
        </Modal.Footer>
      </Modal>
    );
};


  render() {
    const { products } = this.props;
    const { searchTerm } = this.state;

    const filteredProducts = this.props.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2>Shop</h2>
          <div>
            <button className="btn btn-primary" style={{ marginRight: '12px' }} onClick={this.handleRefreshProducts}>Refresh Products</button>
            <button className="btn btn-success" onClick={this.handleCheckout}>Checkout</button>
          </div>
        </div>
        
        <div className="input-group mb-2">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search by name..." 
                        value={this.state.searchTerm}
                        onChange={this.handleSearchChange} 
                    />
          </div>

        <div className="row">
          {filteredProducts && filteredProducts.map(product => (
            <div className="col-sm-6 col-lg-4 mb-2" key={product.id}>
              <div className="card align-items-center">
                <img src={product.image} className="card-img-top img-fluid" alt="Product" style={{ width: '250px', height: '250px' }}/>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text"><small className="text-muted">ID: {product.id}</small></p>
                  
                  <div className="row justify-content-between mb-3">
                    <div className="col">
                      <p className="card-text">Cost: {product.cost}</p>
                    </div>
                    <div className="col">
                      <p className="card-text">In Stock: {product.quantity}</p>
                    </div>
                  </div>
  
                  <Form.Group>
                    <Form.Label>Quantity to Purchase</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Enter quantity" 
                        value={this.state.cart.find(item => item.productId === product.id)?.quantity || 0}
                        onChange={(e) => this.updateCart(product.id, parseInt(e.target.value), product.cost)}
                        disabled={product.quantity <= 0}
                      />

                    </Form.Group>

                </div>
              </div>
            </div>
          ))}
        </div>
  
        {this.renderCartModal()}
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

export default connect(mapStateToProps)(PlaceOrderPage);