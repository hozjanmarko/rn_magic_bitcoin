import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { magicBitcoin } from "./magicProvider";
import Root from "./Root";

export default function App() {
  return (
    <SafeAreaProvider>
      <magicBitcoin.Relayer />
      <Root />
    </SafeAreaProvider>
  );
}
