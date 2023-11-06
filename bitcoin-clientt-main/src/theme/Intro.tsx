import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  boton: {
    marginHorizontal: "35%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#037171",
    height: 37,
    borderRadius: 10,
    width: 100
  },
  botones: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: "35%"
  },
  fondo: {
    backgroundColor: "#03312E",
    paddingBottom: 400
  },
  texto: {
    fontSize: 30,
    color: "white"
  },
  info: {
    marginTop: 150,
    alignItems: "center"
  },
  intro: {
    fontSize: 30,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "white",
    marginTop: 20,
    marginLeft: 20
  },
  textoboton: {
    fontSize: 25,
    color: "white",
    paddingTop: 0,
    paddingBottom: 5
  }
})