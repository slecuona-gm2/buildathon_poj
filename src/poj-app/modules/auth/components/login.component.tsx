import { Button, StyleSheet, Text, View } from "react-native";

export function Login() {
  const onPressConnect = () => {
    console.log("Connect to POJ");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Let's create your account</Text>
      <Text style={styles.bodyText}>
        Join now to be a part of a trusted network of verified individuals.
      </Text>
      <View style={styles.bodyButton}>
        <Button
          onPress={onPressConnect}
          title='Connect'
          accessibilityLabel='Connect to Proof Of Jobs'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
  },
  titleText: {
    fontSize: 36,
    fontWeight: "700",
    color: "#0F4C81",
  },
  bodyText: {
    fontSize: 24,
    fontWeight: "400",
    color: "#75787B",
  },

  bodyButton: {
    marginTop: 500,
    width: "100%",
  },
});
