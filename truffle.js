/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

const HDWalletProvider = require("truffle-hdwallet-provider");
const infuraKey = "67b68355917d4def8c18743b9ed382e5";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider(
          "census enact air time view resource resource same romance sheriff ten section",
          `https://ropsten.infura.io/v3/${infuraKey}`
        ),
      network_id: 3, // Ropsten's id
      gas: 5500000, // Ropsten has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true // Skip dry run before migrations? (default: false for public nets )
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(
          "census enact air time view resource resource same romance sheriff ten section",
          "https://kovan.infura.io/v3/67b68355917d4def8c18743b9ed382e5"
        );
      },
      network_id: 42,
      gas: 4500000,
      gasPrice: 10000000000
    }
  }
};
