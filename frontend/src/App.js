import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Table
} from "reactstrap";

import { Container, Row, Col } from "reactstrap";
import Web3 from "web3";

// Import contract
import NFToken from "./contracts/NFToken.json";

import logo from "./logo.svg";
// import './App.css';
import { setInterval } from "timers";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: null,
      web3: null,
      errorMsg: "",
      transferForm: {
        amount: 0,
        address: ""
      },
      tokenList: [
        // {id:0, title:'Token Name', type: 2}
      ]
    };
  }

  componentDidMount = async () => {
    setInterval(async () => {
      try {
        if (typeof window.web3 !== undefined) {
          const web3 = new Web3(Web3.givenProvider);

          const accounts = await web3.eth.getAccounts();

          if (accounts.length < 1) {
            this.setState({
              errorMsg:
                "Could not connect to Metamask. Please unlock your metamask"
            });
          } else {
            this.setState({ account: accounts[0], web3: web3 });
            this.getTokens(web3);
          }
        } else {
          this.setState({ errorMsg: "web3 not detected" });
        }
      } catch (error) {
        this.setState({ errorMsg: "Could not detect web3" });
      }
    }, 3000);
  };

  getTokens = async web3 => {
    const accounts = await web3.eth.getAccounts();

    //***TODO: Grab deployed contract address from commandline */
    const tutorialInstance = new web3.eth.Contract(
      NFToken.abi,
      "0xE1764A90BC82DdDC5aF86D97d8c657AF672AAc57"
      // "0xC9BC7bFdA71E39807bbA554628e4342A23554030"
    );
    console.log(tutorialInstance);

    let token_array = [];

    this.setState({ contractInstance: tutorialInstance });

    tutorialInstance.methods
      .myTokens()
      .call({ from: accounts[0] })
      .then(result => {
        for (var i = 0; i < result.length; i++) {
          tutorialInstance.methods
            .getToken(result[i])
            .call({ from: accounts[0] })
            .then(result => {
              console.log(result);
              token_array.push({
                id: result[0],
                title: result.tokenTitle_,
                type: result.tokenType_
              });
              // console.log(token_array)

              this.setState({ tokenList: token_array });
            });
        }
      });
  };

  purchaseToken = async (id, title) => {
    const { contractInstance, web3, account } = this.state;

    //TODO: Complete this function
    // await contractInstance.methods.buyToken(id, title).send({ value:web3.utils.toWei('0.003'), from: account, gas: 1000000 })
    await contractInstance.methods
      .buyToken(title)
      .send({ value: web3.utils.toWei("0.003"), from: account, gas: 1000000 })
      .then(result => {
        console.log(result);
        this.getTokens(web3);
      });
  };

  render() {
    const { account, balance, errorMsg, tokenList } = this.state;

    const tokenTable = tokenList.map(function(item) {
      console.log(item);
      // map the new array to list items
      return (
        <tr>
          <td>{item.id}</td>
          <td>{item.title}</td>
          <td>{item.type}</td>
        </tr>
      );
    });

    return (
      <div className="App">
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">NFT Tutorial</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#">{account}</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">{balance}</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        {errorMsg.length > 0 ? (
          <p>{errorMsg}</p>
        ) : (
          <div style={{ textAlign: "left" }}>
            <h2>Available Tokens</h2>

            <Container>
              <Row>
                <Col>
                  <Button
                    color="primary"
                    onClick={() => this.purchaseToken(1, "Cryptokitty")}
                  >
                    Buy Token 1
                  </Button>
                </Col>
                <Col>
                  <Button
                    color="info"
                    onClick={() => this.purchaseToken(2, "Cryptopuppy")}
                  >
                    Buy Token 2
                  </Button>
                </Col>
              </Row>
            </Container>

            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>{tokenTable}</tbody>
            </Table>
          </div>
        )}
      </div>
    );
  }
}

export default App;
