import React from "react";
import Web3 from "web3";

// Define the MetaMask provider
const provider = new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws");

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Set the initial state to not connected
      isConnected: false
    };
  }

  // The function that is called when the user clicks the "Connect with MetaMask" button
  handleConnect = async () => {
    // Connect to the MetaMask provider
    const web3 = new Web3(provider);

    // Request access to the user's accounts
    await window.ethereum.enable();

    // Get the user's accounts
    const accounts = await web3.eth.getAccounts();

    // Update the component's state to indicate a successful connection
    this.setState({
      isConnected: true,
      account: accounts[0]
    });
  }

  render() {
    return (
      <div>
        {
          !this.state.isConnected ?
            // If the user is not connected, show the "Connect with MetaMask" button
            <button onClick={this.handleConnect}>Connect with MetaMask</button>
            :
            // If the user is connected, show their account address
            <p>Connected with account: {this.state.account}</p>
        }
      </div>
    );
  }
}
