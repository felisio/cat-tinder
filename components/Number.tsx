import { Colors } from "@/constants/Colors";
import Container from "./Container";
import { Text, StyleSheet, View } from "react-native";

export default function Number({ number }: { number: string }) {
  return (
    <Container style={styles.container}>
      <View style={styles.numberContainer}>
        <Text style={styles.number}>{number}</Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  number: {
    fontSize: 200,
    fontWeight: "bold",
    color: Colors.lightGrey,
  },
  container: {
    justifyContent: "flex-start",
  },
  numberContainer: {
    marginTop: 150,
  },
});
