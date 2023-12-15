import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listAllUsers, updateUser } from '../actions/userAction';
import { Modal, Button, Form } from 'react-bootstrap'; 


class EditUserPage extends Component {

    roleMapping = {
        '6577b3cf6215a40ba4d9b46b': 'User',
        '6577b3cf6215a40ba4d9b46c': 'CEO',
        '6577b3cf6215a40ba4d9b46d': 'Manager',
        '6577b3cf6215a40ba4d9b46e': 'Admin',
        '6577b3cf6215a40ba4d9b46f': 'Production',
        '6577b3cf6215a40ba4d9b470': 'QC'
    };

    getRoleNames(roleIds) {
        return roleIds.map(id => this.roleMapping[id] || 'Unknown').join(', ');
    }
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            selectedUser: null,
            editUsername: '',
            editEmail: '',
            editPassword: '',
            editAddress: '',
        };
    }

    componentDidMount() {
        this.props.dispatch(listAllUsers());
        const storedUserData = JSON.parse(localStorage.getItem("user"));
        const currentUserId = storedUserData ? storedUserData.myid : null;
    }

    refreshUsers = () => {
        this.props.dispatch(listAllUsers());
    };

    handleEditUser = (user) => {
        this.setState({ 
            selectedUser: user, 
            showModal: true,
            editUsername: user.username,
            editEmail: user.email,
            editPassword: '', // Password is typically not pre-filled
            editAddress: user.address,
        });
    };

    handleChangeUserDetails = () => {
        const { selectedUser, editUsername, editEmail, editPassword, editAddress } = this.state;
        const userId = selectedUser.id;
    
        // Check if the password has been changed
        if (editPassword) {
            // If password is changed, update all fields including password
            this.props.dispatch(updateUser(userId, editUsername, editEmail, editPassword, editAddress))
                .then(() => {
                    this.setState({ showModal: false });
                    this.refreshUsers();
                })
                .catch(error => console.error('Error updating user:', error));
        } else {
            // If password is not changed, update all fields except password
            this.props.dispatch(updateUser(userId, editUsername, editEmail, selectedUser.password, editAddress))
                .then(() => {
                    this.setState({ showModal: false });
                    this.refreshUsers();
                })
                .catch(error => console.error('Error updating user:', error));
        }
    };    

    renderUserModal = () => {

        const { showModal, editUsername, editEmail, editPassword, editAddress } = this.state;
        if (!this.state.selectedUser) return null;

        return (
            <Modal show={showModal} onHide={() => this.setState({ showModal: false })}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Form fields for editing user details */}
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={editUsername} 
                                onChange={(e) => this.setState({ editUsername: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                value={editEmail} 
                                onChange={(e) => this.setState({ editEmail: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                value={editPassword} 
                                onChange={(e) => this.setState({ editPassword: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={editAddress} 
                                onChange={(e) => this.setState({ editAddress: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.setState({ showModal: false })}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleChangeUserDetails}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    render() {
        const { users } = this.props;
        
        const storedUserData = JSON.parse(localStorage.getItem("user"));
        const currentUserId = storedUserData ? storedUserData.myid : null;
        
        // Filter to get only the current user's data
        const currentUserData = users.filter(user => user.id === currentUserId);
    
        return (
            <div>
                <div className="d-flex justify-content-between align-items-center">
                    <h2>Manage User</h2> {/* Changed to singular */}
                    <Button variant="primary" onClick={this.refreshUsers}>Refresh User</Button>
                </div>
    
                <div className="row">
                    {/* Map over currentUserData instead of users */}
                    {currentUserData.map(user => (
                        <div key={user.id} className="col-lg-4 col-md-6 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{user.username}</h5>
                                    <p>User ID: {user.id}</p>
                                    <p>Email: {user.email}</p>
                                    <p>Address: {user.address}</p>
                                    <p>Roles: {this.getRoleNames(user.roles)}</p>
                                    <Button variant="primary" onClick={() => this.handleEditUser(user)}>
                                        Edit User
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
    
                {this.renderUserModal()}
            </div>
        );
    }
    
    
    
    
}


function mapStateToProps(state) {
    return {
      users: state.user.users,
    };
  }
  
  export default connect(mapStateToProps)(EditUserPage);