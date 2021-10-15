import React, { useState, useEffect, useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, TextInput, View, TouchableOpacity, SafeAreaView } from "react-native";
import { magicBitcoin } from "./magicProvider";

const Root = () => {
  const [email, setEmail] = useState("");
  const [publicAddress, setPublicAddress] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginProgress, setLoginProgress] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const insets = useSafeAreaInsets();

  const login = useCallback(async () => {
    console.log("login", email);
    try {
      setLoginProgress(true);
      await magicBitcoin.auth.loginWithMagicLink({ email });
      setIsLoggedIn(true);
    } finally {
      setLoginProgress(false);
    }
  }, [setIsLoggedIn, setLoginProgress, email]);

  const logout = useCallback(async () => {
    try {
      console.log("logout");
      await magicBitcoin.user.logout();
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  }, [setIsLoggedIn]);

  const getUserMeta = useCallback(async () => {
    console.log("get user meta");
    const metadata = await magicBitcoin.user.getMetadata();
    setPublicAddress(metadata.publicAddress);
    setEmail(metadata.email);
  }, [setPublicAddress]);

  const bootstrap = useCallback(async () => {
    try {
      console.log("bootstrap");
      const isMagicLoggedIn = await magicBitcoin.user.isLoggedIn();
      console.log("bootstrap-end");
      if (isMagicLoggedIn) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      console.log("initialized");
      setInitialized(true);
    }
  }, [setIsLoggedIn, setInitialized]);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  useEffect(() => {
    if (isLoggedIn) {
      getUserMeta();
    }
  }, [isLoggedIn, getUserMeta]);

  return (
    <SafeAreaView
      style={{ marginTop: insets?.top, flex: 1, padding: 25, backgroundColor: "#ffffff" }}
    >
      {!initialized && <Text>Loading...</Text>}
      {!!initialized && (
        <>
          {!isLoggedIn ? (
            <>
              <Text style={{ height: 30, fontSize: 20, lineHeight: 30, marginBottom: 25 }}>
                Please sign up or login
              </Text>
              <TextInput
                placeholder="Enter your email"
                autoCompleteType="email"
                onChangeText={(event) => {
                  setEmail(event);
                }}
                style={{ height: 30, fontSize: 20, lineHeight: 30 }}
              />
              <TouchableOpacity
                onPress={login}
                style={{
                  width: "100%",
                  padding: 15,
                  backgroundColor: "#000000",
                  alignItems: "center",
                  marginTop: 25,
                  borderRadius: 25,
                }}
              >
                <Text style={{ color: "#eeeeee", fontSize: 20 }}>
                  {!!loginProgress ? "..." : "Login"}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <View>
              <View>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Email</Text>
                <Text style={{ fontSize: 18 }}>{email}</Text>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Public address</Text>
                <Text style={{ fontSize: 18 }}>{publicAddress}</Text>
              </View>
              <TouchableOpacity
                onPress={logout}
                style={{
                  width: "100%",
                  padding: 15,
                  backgroundColor: "#000000",
                  alignItems: "center",
                  marginTop: 25,
                  borderRadius: 25,
                }}
              >
                <Text style={{ color: "#eeeeee", fontSize: 20 }}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default Root;
