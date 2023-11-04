# MyToken DApp README

## Overview
This repository contains the source code for a decentralized application (DApp) built using React. The DApp includes the creation of an ERC20 token called MyToken, a pre-sale mechanism, token purchase functionality, and a token stacking feature.

## Getting Started
To get started with this DApp, follow these steps:

1. Clone this repository to your local machine.
2. Install the necessary dependencies using `npm install`.
3. Make sure you have a development environment set up, such as Node.js and MetaMask.
4. Configure your MetaMask wallet for the Sepolia Testnet.

## Smart Contracts
The DApp includes three smart contracts:

1. MyToken.sol: The ERC20 token contract for MyToken.
2. PreSale.sol: Manages the pre-sale of MyToken.
3. Stacking.sol: Handles the token stacking and reward mechanism.

## Features

### MyToken (ERC20 Token)
- MyToken is an ERC20 token with the following features:
  - Name: MyToken
  - Symbol: MTK
  - Decimals: 3
  - Total Supply: Initially set to 10,000,000 tokens
  - Owner Address: The owner address will receive the initial token supply.

### Pre-sale
- MyToken has a pre-sale mechanism with the following conditions:
  - Pre-sale Price: 0.00001 ETH per token.
  - When 10,000,000 tokens are sold in the pre-sale, the price increases to 0.00005 ETH per token.
  
### Stacking
- Users can stack their MyToken to earn a 5% daily reward in additional tokens.
- Once the total supply reaches 80,000,000 tokens, stacking is no longer allowed.
  
### Owner's Control
- The owner of the contract can change the token's price at any time.
  
## Deployment
- The DApp is initially deployed on the Sepolia Testnet.
- After development, you can deploy the application to Netlify or the hosting service of your choice.

## Important Notes
- This is a simplified example for demonstration purposes. Make sure to handle security and safety measures in a real-world application.
- Ensure that you keep your private keys and contracts secure.
- Test thoroughly before deploying to a live network.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## PRs
If you have any suggestions or want to contribute to this project feel free to send me a pull request

Happy coding ;)

## `Status : project not completed yet`
