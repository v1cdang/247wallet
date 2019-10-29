import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
  } from 'reactstrap';
  

class Moneyxfer extends Component {
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
                    <Form className="form" method="POST" action="/api/transactions/moneytransfer">
                        <Col>
                            <FormGroup>
                            <Label for="receiverName">Receiver's Name</Label>
                            <Input
                                type="text"
                                name="receiverName"
                                id="receiverName"
                                placeholder="Receiver's Name"
                            />
                            <Input
                            type="hidden"
                            name="userId"
                            id="userId"
                            value={user.id}
                            />
                            </FormGroup>
                            <FormGroup>
                            <Label for="receiverAddress">Receiver's Address</Label>
                            <Input
                                type="text"
                                name="receiverAddress"
                                id="receiverAddress"
                                placeholder="Complete Address"
                            />
                            </FormGroup>
                            <FormGroup>
                            <Label for="receiverPhone">Receiver's Contact Number</Label>
                            <Input
                                type="text"
                                name="receiverPhone"
                                id="receiverPhone"
                                placeholder="Complete Address"
                            />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                            <Label for="senderName">Sender's Name</Label>
                            <Input
                                type="text"
                                name="senderName"
                                id="senderName"
                                placeholder="Sender's Name"
                            />
                            </FormGroup>
                            <FormGroup>
                            <Label for="senderAddress">Sender's Address</Label>
                            <Input
                                type="text"
                                name="senderAddress"
                                id="senderAddress"
                                placeholder="Complete Address"
                            />
                            </FormGroup>
                            <FormGroup>
                            <Label for="senderPhone">Sender's Contact Number</Label>
                            <Input
                                type="text"
                                name="senderPhone"
                                id="senderPhone"
                                placeholder="Phone number"
                            />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                            <Label for="examplePassword">Select Form of payment</Label>
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
                        <Col>
                            <FormGroup>
                            <Label for="amountSent">Amount to Send</Label>
                            <Input
                                type="text"
                                name="amountSent"
                                id="amountSent"
                                placeholder="0.00"
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

Moneyxfer.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth
  });

export default connect(
    mapStateToProps,
    { logoutUser }
  )(Moneyxfer);