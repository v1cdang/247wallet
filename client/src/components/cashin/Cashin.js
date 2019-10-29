import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
  } from 'reactstrap';
  

class Cashin extends Component {
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
                    <Form className="form" method="POST" action="/api/transactions/cashin">
                        <Col>
                            <FormGroup>
                            <Label for="cashInAmount">Cash In Amount</Label>
                            <Input
                                type="text"
                                name="cashInAmount"
                                id="cashInAmount"
                                placeholder="Cash In Amount"
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
                            <Label for="examplePassword">Select Cash in Channel</Label>
                            <select
                                style={{
                                    display: "block"
                                }}
                                name="cashInChannel"
                                id="cashInChannel"
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
                        <Button>Submit</Button>
                        </Form>
                    </Container>
                </div>
            </div>
        );
    }
}

Cashin.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth
  });

export default connect(
    mapStateToProps,
    { logoutUser }
  )(Cashin);