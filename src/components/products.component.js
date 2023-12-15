import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listAllProducts, addProduct, updateProduct, deleteProduct } from '../actions/productActions';
import { Modal, Button, Form } from 'react-bootstrap'; // Assuming you're using React Bootstrap

class ProductManager extends Component {
  state = {
    showAddModal: false,
    showUpdateModal: false,
    newProductId: '',
    newProductName: '',
    newProductImage: '',
    newProductDescription: '',
    updateProductId: '',
    updateProductName: '',
    updateProductImage: '',
    updateProductDescription: '',
    newProductCost: '',
    newProductQuantity: '',
    updateProductCost: '',
    updateProductQuantity: '',
  };

  componentDidMount() {
    this.handleRefreshProducts();
  }

  handleRefreshProducts = () => {
    this.props.dispatch(listAllProducts());
  };

  toggleAddModal = () => {
    this.setState({ showAddModal: !this.state.showAddModal });
  };

  toggleUpdateModal = () => {
    this.setState({ showUpdateModal: !this.state.showUpdateModal });
  };

  handleDeleteProduct = (productId) => {
    this.props.dispatch(deleteProduct(productId))
      .then(() => {
        this.handleRefreshProducts(); // Refresh the products list after deletion
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  handleAddProduct = () => {
    const { newProductId, newProductName, newProductImage, newProductDescription, newProductCost, newProductQuantity } = this.state;
    this.props.dispatch(addProduct(newProductId, newProductName, newProductImage, newProductDescription, newProductCost, newProductQuantity))
      .then(() => {
        this.toggleAddModal();
        this.handleRefreshProducts();
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };

  handleUpdateClick = (product) => {
    this.setState({
      updateProductId: product.id,
      updateProductName: product.name,
      updateProductImage: product.image,
      updateProductDescription: product.description,
      updateProductCost: product.cost,
      updateProductQuantity: product.quantity,
      showUpdateModal: true
    });
  };

  
  handleUpdateProduct = () => {
    const { updateProductId, updateProductName, updateProductImage, updateProductDescription, updateProductCost, updateProductQuantity } = this.state;
    this.props.dispatch(updateProduct(updateProductId, updateProductName, updateProductImage, updateProductDescription, updateProductCost, updateProductQuantity))
      .then(() => {
        this.toggleUpdateModal();
        this.handleRefreshProducts();
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  render() {
    const { products } = this.props;
    const { showAddModal, newProductId, newProductName, newProductImage,newProductDescription, showUpdateModal, updateProductId, updateProductName, updateProductImage, updateProductDescription } = this.state;

    return (
      <div>
          <div className="d-flex justify-content-between align-items-center">
          <h2>Products</h2>
          <div>
            <button className="btn btn-primary"  style={{ marginRight: '12px' }} onClick={this.handleRefreshProducts}>Refresh Products</button>
            <button className="btn btn-success" onClick={this.toggleAddModal}>Add Product</button>
          </div>
        </div>
        
        {/* Product Cards */}
        <div className="row">
        {products && products.map(product => (
          <div className="col-sm-6 col-lg-4 mb-2" key={product.id}>
            <div className="card align-items-center">
              <img src={product.image} className="card-img-top img-fluid" alt="Product" style={{ width: '250px', height: '250px' }}/> {/* Added img-fluid */}
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><small className="text-muted">ID: {product.id}</small></p>
                
                <div className="row justify-content-between mb-3">
                  <div className="col">
                    <p className="card-text">Cost: {product.cost}</p>
                  </div>
                  <div className="col">
                    <p className="card-text">Quantity: {product.quantity}</p>
                  </div>
                </div>

                <div className="row"> {/* Added row for buttons */}
                  <div className="col-6 d-flex justify-content-start"> {/* Added col and flex justify */}
                    <button className="btn btn-warning" onClick={() => this.handleUpdateClick(product)}>Update</button>
                  </div>
                  <div className="col-6 d-flex justify-content-end"> {/* Added col and flex justify */}
                    <button className="btn btn-danger" onClick={() => this.handleDeleteProduct(product.id)}>Delete</button>
                  </div>
                </div>

                
              </div>
            </div>
          </div>
        ))}
      </div>


        {/* Add Product Modal */}
        <Modal show={showAddModal} onHide={this.toggleAddModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add a New Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" value={newProductId} onChange={(e) => this.setState({ newProductId: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={newProductName} onChange={(e) => this.setState({ newProductName: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="text" value={newProductImage} onChange={(e) => this.setState({ newProductImage: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={newProductDescription} onChange={(e) => this.setState({ newProductDescription: e.target.value })} />
              </Form.Group>
              <Form.Group>
                  <Form.Label>Cost</Form.Label>
                  <Form.Control type="text" value={this.state.newProductCost} onChange={(e) => this.setState({ newProductCost: e.target.value })} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="number" value={this.state.newProductQuantity} onChange={(e) => this.setState({ newProductQuantity: e.target.value })} />
                </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.toggleAddModal}>Close</Button>
            <Button variant="primary" onClick={this.handleAddProduct}>Add Product</Button>
          </Modal.Footer>
        </Modal>

        {/* Update Product Modal */}
        <Modal show={showUpdateModal} onHide={this.toggleUpdateModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* ID Field is not editable in Update */}
              <Form.Group>
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" value={updateProductId} readOnly />
              </Form.Group>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={updateProductName} onChange={(e) => this.setState({ updateProductName: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="text" value={updateProductImage} onChange={(e) => this.setState({ updateProductImage: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={updateProductDescription} onChange={(e) => this.setState({ updateProductDescription: e.target.value })} />
              </Form.Group>
              <Form.Group>
                  <Form.Label>Cost</Form.Label>
                  <Form.Control type="text" value={this.state.updateProductCost} onChange={(e) => this.setState({ updateProductCost: e.target.value })} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="number" value={this.state.updateProductQuantity} onChange={(e) => this.setState({ updateProductQuantity: e.target.value })} />
                </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.toggleUpdateModal}>Close</Button>
            <Button variant="primary" onClick={this.handleUpdateProduct}>Update Product</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.product.products
  };
}

export default connect(mapStateToProps)(ProductManager);