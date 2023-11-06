import React, {useEffect, useContext, useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../theme/Dashboard';
import axios from 'axios';
import { UserContext } from '../Context/UserProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = ({ navigation }: any) => {
  const [info, setInfo] = useState('');

  const { userid, setUserid } = useContext(UserContext);
  
  const getData = async () => {
    try {
      var value = await AsyncStorage.getItem('token');
        if(value) {
          var change = setInterval(data, 6000);
            return () => {
              clearTimeout(change)
            }
        } else {
          alert('Please, log in first');
          navigation.navigate('Login')
        }
    } catch(err) {
      console.log(err)
    }
  }

  const data = async() => {
    let info = await axios.get('http://localhost:3000/info');
    let infoBitcoin = info.data.data;
    setInfo(infoBitcoin)
  };

  useEffect(() => {  
    getData();
  }, [])

  const logout = () => {
    setUserid('');
    AsyncStorage.removeItem('token')
    return navigation.navigate('Login')
  }

  return (
    <View style={styles.fondo}>
      <View style={styles.botones}>
        <TouchableOpacity style={styles.boton} onPress={logout}
        >
          <Text style={styles.textoboton}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Text style={styles.texto}>
          Current Bitcoin price:
        </Text>
        <Text style={styles.texto}>
        {!info ? (
        <Text style={styles.texto}>Loading...</Text>
          ) : (
          <Text style={styles.texto}>{info} USD</Text>
            )}
        </Text>
        <Text style={styles.texto2}>
          New operation or
        </Text><Text style={styles.texto2}>
          Check history?
        </Text>
      </View>
      <View style={styles.botones}>
        <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Operations')}
        >
          <Text style={styles.textoboton}>New</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.textoboton2}>History</Text>
        </TouchableOpacity> 
      </View>
    </View>
  )
}

export default Dashboard;