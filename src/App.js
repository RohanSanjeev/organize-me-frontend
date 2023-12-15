import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";

import ProductManager from "./components/products.component";
import PlaceOrderPage from "./components/placeorder.component"
import ManageOrdersPage from "./components/incomingOrders.componet";
import ManageUsersPage from "./components/manageUsers.component"
import GenerateInvoicePage from "./components/generateInvoice.component"
import AssignProductionPage from "./components/assignProduction.component"
import AssignQCPage from "./components/assignQc.component"
import AssignPackagingPage from "./components/assignPackingdetails.component"
import ManageDeliveryPage from "./components/delivery.componet"
import EditUserPage from "./components/edit_user.component"
import AssignReviewPage from "./components/assignReview.component"
import AllOrdersPage from "./components/allOrders.component"
import MyOrdersPage from "./components/my_orders.component"
import ViewFeedbackPage from "./components/view_reviews.component"
import ViewFinancePage from "./components/finance.component"
import ViewBackupPage from "./components/backup.component"

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showCustomerBoard: false,
      showManagerBoard: false,
      showAdminBoard: false,
      showQcBoard: false,
      showCeoBoard:false,
      showProductionBoard:false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showCustomerBoard: user.roles.includes("ROLE_USER"),
        showCeoBoard: user.roles.includes("ROLE_CEO"),
        showProductionBoard: user.roles.includes("ROLE_PRODUCTION"),
        showManagerBoard: user.roles.includes("ROLE_MANAGER"), // Add this line
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showQcBoard: user.roles.includes("ROLE_QC")
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      showCustomerBoard: false,
      showManagerBoard: false,
      showAdminBoard: false,
      showQcBoard: false,
      showCeoBoard:false,
      showProductionBoard:false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showCustomerBoard,  showManagerBoard,  showAdminBoard, showQcBoard, showCeoBoard, showProductionBoard  } = this.state;

    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              OrganizeMe
            </Link>
            <div className="navbar-nav mr-auto">
              
            { !currentUser && (
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>) }
{/* Admin */}
              {( showAdminBoard || showCeoBoard ) && (
                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Register
                  </Link>
                </li>
              )}

              {(showAdminBoard || showCeoBoard ) && (
                <li className="nav-item">
                <Link to={"/manage-users"} className="nav-link">
                    manage users
                </Link>
                </li>
              )}
              
              {(showAdminBoard || showCeoBoard ) && (
                <li className="nav-item">
                <Link to={"/view-backup"} className="nav-link">
                   backup
                </Link>
              </li>
              )}

{/* Manager */}
              {(showManagerBoard || showCeoBoard || showProductionBoard ) && (
                <li className="nav-item">
                  <Link to={"/product-manager"} className="nav-link">
                    Products
                  </Link>
                </li>
              )}

              {(showManagerBoard || showCeoBoard ) && (
                <li className="nav-item">
                <Link to={"/manage-orders"} className="nav-link">
                incoming orders
                  </Link>
                </li>
              )}
              
              {(showManagerBoard || showCeoBoard ) && (
                <li className="nav-item">
                <Link to={"/gen-invoice"} className="nav-link">
               Gen invoice
                </Link>
              </li>
              )}

{/* Production */}
              
              {(showProductionBoard || showCeoBoard ) && (
                 <li className="nav-item">
                 <Link to={"/assign-production"} className="nav-link">
                Assign Production
                 </Link>
               </li>
              )}

              {(showProductionBoard || showCeoBoard ) && (
                 <li className="nav-item">
                 <Link to={"/delivery"} className="nav-link">
                delivery
                 </Link>
               </li>
              )}
              
{/* QC */}
              
              {(showQcBoard || showCeoBoard ) && (
                 <li className="nav-item">
                 <Link to={"/assign-qc"} className="nav-link">
                QC
                 </Link>
               </li>
              )}

              {(showQcBoard || showCeoBoard ) && (
                  <li className="nav-item">
                  <Link to={"/assign-packing"} className="nav-link">
                 pack
                  </Link>
                </li>
              )}

{/* customer */}

              {(showCustomerBoard ) && (
                <li className="nav-item">
                <Link to={"/place-order"} className="nav-link">
                place order
                </Link>

              </li>
              )}

              {( showCustomerBoard ) && (
                <li className="nav-item">
                <Link to={"/my-orders"} className="nav-link">
               my orders
                </Link>
              </li>
              )}
              
              {( showCustomerBoard ) && (
                <li className="nav-item">
                <Link to={"/review"} className="nav-link">
               review
                </Link>
              </li>
              )} 

{/* ceo */}
              {( showCeoBoard ) && (
                <li className="nav-item">
                  <Link to={"/all-orders"} className="nav-link">
                    all orders
                  </Link>
                </li>
              )}
        

              {( showCeoBoard ) && (
                 <li className="nav-item">
                 <Link to={"/view-feedback"} className="nav-link">
                feedback
                 </Link>
               </li>
              )}

              {( showCeoBoard ) && (
                 <li className="nav-item">
                 <Link to={"/view-finance"} className="nav-link">
                finance
                 </Link>
               </li>
              )}

              
              {
                currentUser ? (
                  <li className="nav-item">
                <Link to={"/edit-me"} className="nav-link">
               edit me
                </Link>
              </li>
                ) : ( <> </> )
              }
              

            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile" component={Profile} />

              {(showAdminBoard || showCeoBoard ) && (<Route exact path="/register" component={Register} />)}
              {(showAdminBoard || showCeoBoard ) && (<Route path="/manage-users" component={ManageUsersPage} />)}
              {(showAdminBoard || showCeoBoard ) && (<Route path="/view-backup" component={ViewBackupPage} />)}

              {(showManagerBoard || showProductionBoard ||showCeoBoard ) && <Route path="/product-manager" component={ProductManager} />}
              {(showManagerBoard || showCeoBoard ) && <Route path="/manage-orders" component={ManageOrdersPage}/> } {/* incoming orders for acceptance */}
              {(showManagerBoard || showCeoBoard ) && <Route path="/gen-invoice" component={GenerateInvoicePage} /> }

              {(showProductionBoard || showCeoBoard ) && <Route path="/assign-production" component={AssignProductionPage} /> }
              {(showProductionBoard || showCeoBoard ) && <Route path="/delivery" component={ManageDeliveryPage} /> }
              
              {(showQcBoard || showCeoBoard ) && <Route path="/assign-qc" component={AssignQCPage} /> }
              {(showQcBoard || showCeoBoard ) && <Route path="/assign-packing" component={AssignPackagingPage} /> }

              {(showCustomerBoard ) && (<Route exact path="/place-order" component={PlaceOrderPage}/>)}
              { showCustomerBoard &&  <Route path="/my-orders" component={MyOrdersPage} /> }
              { showCustomerBoard &&  <Route path="/review" component={AssignReviewPage} /> }

              { showCeoBoard &&  <Route path="/all-orders" component={AllOrdersPage} /> }
              { showCeoBoard &&  <Route path="/view-feedback" component={ViewFeedbackPage} /> }
              { showCeoBoard &&  <Route path="/view-finance" component={ViewFinancePage} /> }

              { (showAdminBoard || showCeoBoard || showManagerBoard || showProductionBoard || showQcBoard || showCustomerBoard )  && <Route path="/edit-me" component={EditUserPage} />}  

            </Switch>
          </div>

        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
