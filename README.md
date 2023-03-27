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

# Start the app
`npm start`
