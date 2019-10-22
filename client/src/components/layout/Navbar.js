import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
            <div className="nav-wrapper white">
                <Link
                to="/cashin"
                style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginright: "15px"
                }}
                onClick={this.onCashInClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                Cash In
                </Link>
                &nbsp;
                <Link
                to="/withdrawal"
                style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                Withdrawal
                </Link>
                &nbsp;
                <Link
                to="/paybills"
                style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                Pay Bills
                </Link>
                &nbsp;
                <Link
                to="/eload"
                style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                e Load
                </Link>
                &nbsp;
                <Link
                to="/pcoinsconversion"
                style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                P Coins Conversion
                </Link>
                &nbsp;
                <Link
                to="/moneytransfer"
                style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                Money Transfer
                </Link>
            </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
