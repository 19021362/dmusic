# Requirement 
- Node: >= 16
# Setup
``` npm install ```
or
``` yarn install ```

# Deploy Contract
``` npx hardhat compile ``` to compile the contract

``` npx hardhat node ``` to start localhost network

``` npx hardhat run scripts/deploy.js --network localhost ``` to deploy contract to localhost
Then terminal will show the contract address like:
`Dmusic deployed to <address>`.

Copy the address to the `.env` file
`REACT_APP_CONTRACT_ADDRESS=<address>`

Now in the folder `artifacts/contract/Dmusic.sol` has 2 file `.json`. Copy those files to the `src/abis`.

# Config .evn file
```
REACT_APP_PINATA_API_KEY=<your_api_key>
REACT_APP_PINATA_SECRET_API_KEY=<your_secret_api_key>

REACT_APP_CONTRACT_ADDRESS=<address_deployed_contract>
```
You can create get the **pinata api key** and **secret key** [HERE](https://app.pinata.cloud/pinmanager) 

# Start the app
`npm start`
