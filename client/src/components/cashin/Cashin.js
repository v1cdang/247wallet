import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Cashin extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;

        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="landing-copy col s12 center-align">
                        <h4>
                        <b>Cash In,</b> {user.name.split(" ")[0]}
                        </h4>
                        <form action="/cashin" method="post">
                            <select name="transactionType">
                                <option value="cashin">Cash In</option>
                                <option value="cashout">Cash Out</option>
                            </select>
                        </form>
                        <button
                        style={{
                            width: "140px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                        }}
                        onClick={this.onLogoutClick}
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                        Logout
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
  });

export default connect(
    mapStateToProps,
    { logoutUser }
  )(Cashin);