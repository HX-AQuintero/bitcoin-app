import React, {useContext, useState, useEffect}  from 'react';
import { FlatList, View, TouchableOpacity, Text } from 'react-native';
import { UserContext } from '../Context/UserProvider';
import axios from 'axios';
import { styles } from '../theme/History';

const History = ({ navigation }: any) => {
  const [oper, setOper] = useState([]);
  const { userid } = useContext(UserContext);

  const historial = async () => {
    let idUser = {user_id: userid};
    let userOper = await axios.post('http://localhost:3000/historial', idUser)
    let operations = userOper.data.message;
    setOper(operations)
  }

  useEffect(() => {
    historial();
  },[])

  return(
    <View style={styles.fondo}>
      <View style={styles.botones}>
        <TouchableOpacity style={styles.botonatras} onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.textobotonatras}>Back</Text>
        </TouchableOpacity>
      </View>
      {oper && oper.length !== 0 ? (    
          <FlatList
            data={oper}
            keyExtractor={( item, id ) => id.toString()}
            renderItem={({item}: any) => (
              <TouchableOpacity style={styles.bloque} onPress={() => navigation.navigate('Details', {id: item.id})}>
                <Text style={styles.texto2}>
                  {item.current_received.toUpperCase()}
                </Text>
                <Text style={styles.texto3}>
                  {item.type_operation.toUpperCase()}
                </Text>
                <Text style={styles.textoFecha}>
                  {item.updated_at.slice(0,10) + ' ' + item.updated_at.slice(11,16)}
                </Text>
              </TouchableOpacity>
            )}
          />
          ) : (
        <View style={styles.info}>
          <Text style={styles.texto}>
            No operations yet
          </Text>
        </View>
          )}
    </View>
  );
};

export default History;