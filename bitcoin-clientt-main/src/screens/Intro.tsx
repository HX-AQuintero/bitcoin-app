import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { styles } from '../theme/Intro';

const Intro = ({ navigation}: any) => {

  return (
    <View style={styles.fondo}>
      <Text style={styles.intro}>
        Welcome!
      </Text>
      <View style={styles.info}>
        <Text style={styles.texto}>
          Buy or sell BTC - USD!
        </Text>
        <Text style={styles.texto}>
          Let's get started!
        </Text>
        <Text style={styles.texto}>
          Login in or registrate
        </Text>
      </View>
      <View style={styles.botones}>
        <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.textoboton}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.textoboton}>Register</Text>
        </TouchableOpacity> 
      </View>
    </View>
  );
};

export default Intro;