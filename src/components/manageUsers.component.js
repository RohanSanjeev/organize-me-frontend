import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listAllUsers, updateUser, deleteUser } from '../actions/userAction';
import { Modal, Button, Form } from 'react-bootstrap'; 


class ManageUsersPage extends Component {

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
            searchTerm: '',
        };
    }

    componentDidMount() {
        this.props.dispatch(listAllUsers());
    }

    refreshUsers = () => {
        this.props.dispatch(listAllUsers());
    };

    handleSearchChange = (e) => {
        this.setState({ searchTerm: e.target.value });
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

    handleDeleteUser = (userId) => {
        this.props.dispatch(deleteUser(userId))
            .then(() => {
                this.refreshUsers();
            })
            .catch(error => console.error('Error deleting user:', error));
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
        const { searchTerm } = this.state;

        const filteredUsers = this.props.users.filter(user =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h2>Manage Users</h2>
                    <Button variant="primary" onClick={this.refreshUsers}>Refresh Users</Button>
                </div>

                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search by username..." 
                        value={this.state.searchTerm}
                        onChange={this.handleSearchChange} 
                    />
                </div>

                <div className="row"> {/* Wrap cards in a row */}
                    {filteredUsers.map(user => (
                        <div key={user.id} className="col-lg-4 col-md-6 mb-3"> {/* Define the grid columns */}
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{user.username}</h5>
                                    <p>User ID: {user.id}</p>
                                    <p>Email: {user.email}</p>
                                    <p>Address: {user.address}</p>
                                    <p>Roles: {this.getRoleNames(user.roles)}</p>

                                    <div className="row"> {/* Added row for buttons */}
                                    <div className="col-6 d-flex justify-content-start"> {/* Added col and flex justify */}
                                        <button className="btn btn-warning" onClick={() => this.handleEditUser(user)}>Edit</button>
                                    </div>
                                    <div className="col-6 d-flex justify-content-end"> {/* Added col and flex justify */}
                                        <button className="btn btn-danger" onClick={() => this.handleDeleteUser(user.id)}>Delete</button>
                                    </div>
                                    </div>

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
  
  export default connect(mapStateToProps)(ManageUsersPage);