import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
  } from 'reactstrap';


class Withdrawal extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;

        return (
            <div>
                <div style={{
                width: "30%"
            }}
            >

                </div>
                <div style={{
                    width: "70%"
                }}>
                    <Container className="formContainer">
                    <Form className="form" method="POST" action="/withdrawal">
                        <Col>
                            <FormGroup>
                            <Label for="withdrawalAmount">Withdrawal Amount</Label>
                            <Input
                                type="text"
                                name="withdrawalAmount"
                                id="withdrawalAmount"
                                placeholder="Withdrawal Amount"
                            />
                            <Input
                            type="hidden"
                            name="userId"
                            id="userId"
                            value={user.id}
                            />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                            <Label for="withdrawFrom">Withdrawal from</Label>
                            <select
                                style={{
                                    display: "block"
                                }}
                                name="withdrawFrom"
                                id="withdrawFrom"
                            >
                                <option value="BANK">Bank Deposit</option>
                                <option value="PAYMAYA">Paymaya</option>
                                <option value="GCASH">GCash</option>
                                <option value="COINSPH">Coins.PH</option>
                                <option value="CREDITCARD">Credit Card</option>
                            </select>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                            <Label for="memberCode">Member Code</Label>
                            <Input
                                type="text"
                                name="memberCode"
                                id="memberCode"
                                placeholder="Member Code"
                            />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                            <Label for="fullName">Full Name</Label>
                            <Input
                                type="text"
                                name="fullName"
                                id="fullName"
                                placeholder="Full Name"
                            />
                            </FormGroup>
                        </Col>
                        <Button>Submit</Button>
                        </Form>
                    </Container>
                </div>
            </div>
        );
    }
}

Withdrawal.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth
  });

export default connect(
    mapStateToProps,
    { logoutUser }
  )(Withdrawal);