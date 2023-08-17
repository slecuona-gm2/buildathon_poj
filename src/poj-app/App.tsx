import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Login } from "./modules/auth/components/login.component";

export default function App() {
  return (
    <View style={styles.container}>
      <Login></Login>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontFamily: "Helvetica Neue",
    paddingTop: 100,
    paddingLeft: 30,
    paddingRight: 30,
  },
});
