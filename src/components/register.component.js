import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { connect } from "react-redux";
import { register } from "../actions/auth";

// Validation functions
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeId = this.onChangeId.bind(this);
    this.onRoleChange = this.onRoleChange.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.resetForm = this.resetForm.bind(this);

    this.state = {
      id: "",
      username: "",
      email: "",
      password: "",
      roles: [],
      address: "",
      successful: false,
    };
  }

  onChangeId(e) {
    this.setState({
      id: e.target.value,
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onRoleChange(e) {
    const role = e.target.value;
    let roles = [...this.state.roles];
    if (roles.includes(role)) {
      roles = roles.filter(r => r !== role);
    } else {
      roles.push(role);
    }
    this.setState({ roles });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          register(this.state.id, this.state.username, this.state.email, this.state.password, this.state.roles, this.state.address)
        )
        .then(() => {
          this.setState({
            successful: true,
          });
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
        });
    }
  }

  resetForm() {
    this.setState({
      id: "",
      username: "",
      email: "",
      password: "",
      roles: [],
      address: "",
      successful: false,
    });
  }

  render() {
    const { message } = this.props;

    return (
      <div className="col-md-12">
        <h1>Register</h1>
        <div className="">

          {this.state.successful ? (
            <div>
              <div className="alert alert-success" role="alert">
                Registration successful!
              </div>
              <button
                className="btn btn-primary btn-block"
                onClick={this.resetForm}
              >
                Register Another User
              </button>
            </div>
          ) : (
            <Form
              onSubmit={this.handleRegister}
              ref={(c) => {
                this.form = c;
              }}
            >
              <div className="form-group">
                <label htmlFor="id">ID</label>
                <Input
                  type="text"
                  className="form-control"
                  name="id"
                  value={this.state.id}
                  onChange={this.onChangeId}
                  validations={[required]}
                />
              </div>
                
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
              <label htmlFor="address">Address</label>
              <Input
                type="text"
                className="form-control"
                name="address"
                value={this.state.address}
                onChange={this.onChangeAddress}
                validations={[required]}  // Add your validation function if necessary
              />
            </div>
            
                <div className="form-group">
                <label>Roles</label>
                <div>
                  {["user", "ceo", "manager", "admin", "production", "qc"].map((role, index) => (
                    <div className="form-check" key={index}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`role-${index}`}
                        value={role}
                        checked={this.state.roles.includes(role)}
                        onChange={this.onRoleChange}
                      />
                      <label className="form-check-label" htmlFor={`role-${index}`}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>

              {message && (
                <div className="form-group">
                  <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                    {typeof message === 'object' ? message.message : message}
                  </div>
                </div>
              )}
              <CheckButton
                style={{ display: "none" }}
                ref={(c) => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(Register);