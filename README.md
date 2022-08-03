# OBSCURO NETWORK UNISWAP

## Pre-requisites

* Install the following:
  * [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
  * [Yarn](https://yarnpkg.com/getting-started/install)
  * [ncc](https://github.com/vercel/ncc)
  * [Hardhat](https://hardhat.org/)

* Install ncc:

  ```
  yarn add @vercel/ncc
  ```

* From the `testnet/` folder of the `go-obscuro` repo, build the required Docker images:

  ```
  ./testnet-local-build_images.sh
  ```

## Instructions

1. From the root of the `go-obscuro` repo, run the following commands to start the Geth network, deploy the management 
   contracts and start the Obscuro node:

   ```
   cd testnet/ \
   && ./testnet-local-gethnetwork.sh --pkaddresses=0x13E23Ca74DE0206C56ebaE8D51b5622EFF1E9944,0x0654D8B60033144D567f25bF41baC1FB0D60F23B \
   && ./testnet-deploy-contracts.sh --l1host=gethnetwork --pkstring=f52e5418e349dccdda29b6ac8b0abe6576bb7713886aa85abea6181ba731f9bb \
   && ./start-obscuro-node.sh --sgx_enabled=false --host_id=0x0000000000000000000000000000000000000001 --l1host=gethnetwork --mgmtcontractaddr=0xeDa66Cc53bd2f26896f6Ba6b736B1Ca325DE04eF --obxerc20addr=0xC0370e0b5C1A41D447BDdA655079A1B977C71aA9 --etherc20addr=0x51D43a3Ca257584E770B6188232b199E76B022A2 --is_genesis=true \
   ; cd ..
   ```

2. From the root of the `go-obscuro` repo, build and run the wallet extension:

   ```
   cd tools/walletextension/main \
   && go build -o wallet_extension \
   && ./wallet_extension -nodeHost 127.0.0.1 -nodePortHTTP 13000 -nodePortWS 13001 -port 3001 \
   ; cd ../../..
   ```

3. From the root of the `uniswap-fork` repo, deploy the token contracts:

   ```
   cd erc20deployer/ && npx hardhat test; cd ..
   ```
   
   The token contracts will be available at the following addresses:

   ```
   Owner Address of tokens: 
   0x13E23Ca74DE0206C56ebaE8D51b5622EFF1E9944
   WETH
   weth address: 
   0xeDa66Cc53bd2f26896f6Ba6b736B1Ca325DE04eF
   PedroToken address: 
   0xC0370e0b5C1A41D447BDdA655079A1B977C71aA9
   obxTokenContract address: 
   0x51D43a3Ca257584E770B6188232b199E76B022A2
   USDCTokenContract address: 
   0x6d2994ACb911CFceaeE6C36D881cbDFE2F9553B0
   ```

4. From the `deploy-v3/` folder of the `uniswap-fork` repo, deploy Uniswap contracts with WETH:

   ```
   rm state.json; yarn start -pk 0xf52e5418e349dccdda29b6ac8b0abe6576bb7713886aa85abea6181ba731f9bb -j http://127.0.0.1:9000/ -w9 0xeDa66Cc53bd2f26896f6Ba6b736B1Ca325DE04eF -ncl ETH -o 0x13E23Ca74DE0206C56ebaE8D51b5622EFF1E9944
   export const GETH_NETWORK_V3_CORE_FACTORY_ADDRESSES = '0x5b8b9160C4C2084cd8dDA7B4E2428C231cf29E7d'
   export const GETH_NETWORK_V3_ROUTER_ADDRESS = '0x1c43BC172e9021BB90C36C26A0c46868B26f5708'
   export const GETH_NETWORK_V3_MIGRATOR_ADDRESSES = '0x5F9626e345718582fF1F33B23A80B712F77C0829'
   export const GETH_NETWORK_MULTICALL_ADDRESS = '0x0a0b7fdB9B79D7c838675Aca65ec7293b6Cb0846'
   export const GETH_NETWORK_SWAP_ROUTER_ADDRESSES = '0x1c43BC172e9021BB90C36C26A0c46868B26f5708'
   export const GETH_NETWORK_QUOTER_ADDRESSES = '0x126312b4620793989655B2b214f98cE1A7EC2AB5'
   export const GETH_NETWORK_NONFUNGIBLE_POSITION_MANAGER_ADDRESSES = '0xeDFD5157b075f423795F5406527014A80B72C40F'
   export const GETH_NETWORK_TICK_LENS_ADDRESSES = '0x6cB9CE7d5db04E9Cb27E4Ca39fE1cB7095cDD3c1'
   export const GETH_NETWORK_DAI_ADDRESS = '0x6d2994ACb911CFceaeE6C36D881cbDFE2F9553B0'
   export const GETH_NETWORK_USDC_ADDRESS = '0xC2b0dEa419f6596B259c5bEbEE43aC044Bbb2EA1'
   export const GETH_NETWORK_WETH_ADDRESS = '0x51D43a3Ca257584E770B6188232b199E76B022A2'
   ```

5. Update the constants in the following files:

   * `interface/src/geth_network.ts`
   * `smart-order-router/src/geth_network.ts`

7. `cd smart-order-router && npm run build && npm pack @ smart-router; cd ..`

8. `cd interface && yarn && yarn start; cd ..`
