import { BitcoinExtension } from "@magic-ext/bitcoin";
import { Magic } from "@magic-sdk/react-native";

export const magicBitcoin = new Magic("pk_test_BF72C108E753C626", {
  extensions: [
    new BitcoinExtension({
      rpcUrl: "BTC_RPC_NODE_URL", // Node provider service you’re using
      network: "testnet", // Magic creates a testnet or mainnet API keys for you
    }),
  ],
});
