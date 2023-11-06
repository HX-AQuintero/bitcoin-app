import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, VirtualizedList, FlatList } from 'react-native';
import axios from 'axios';
import { styles } from '../theme/Details';

const Details = ({ route, navigation }: any) => {

  const [det, setDet] = useState({});

  const details = async () => {
    let idOperation = {id: route.params.id};
    let detailOperation = await axios.post('http://localhost:3000/details', idOperation)
    let totalDetails = detailOperation.data;
    setDet(totalDetails)
  }

  useEffect(() => {
    details();
  },[])

  return (
    <View style={styles.fondo}>
      <View style={styles.botones}>
        <TouchableOpacity style={styles.botonatras} onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.textobotonatras}>Back</Text>
        </TouchableOpacity>
      </View>
      {det && det.hasOwnProperty("id") ? (
        <FlatList
          data={[det]}
          keyExtractor={( item, id ) => id.toString()}
          renderItem={({item}: any) => (
            <TouchableOpacity style={styles.bloque}>
              <Text style={styles.texto}>
                OPERATION DATE
              </Text>
              <Text style={styles.texto2}>
                {item.updated_at.slice(0,10) + ' ' + item.updated_at.slice(11,16)}
              </Text>
              <Text style={styles.texto}>
                OPERATION TYPE
              </Text>
              <Text style={styles.texto2}>
                {item.type_operation.toUpperCase()}
              </Text>
              <Text style={styles.texto}>
                CURRENT SENT
              </Text>
              <Text style={styles.texto2}>
                {item.current_sent.toUpperCase()}
              </Text>
              <Text style={styles.texto}>
                CURRENT RECEIVED
              </Text>
              <Text style={styles.texto2}>
                {item.current_received.toUpperCase()}
              </Text>
              <Text style={styles.texto}>
                QUANTITY SENT
              </Text>
              <Text style={styles.texto2}>
                {item.quantity_sent}
              </Text>
              <Text style={styles.texto}>
                QUANTITY RECEIVED
              </Text>
              <Text style={styles.texto2}>
                {item.quantity_received}
              </Text>
              <Text style={styles.texto}>
                OPERATION ID
              </Text>
              <Text style={styles.texto2}>
                {item.id}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
      <View style={styles.info}>
        <Text style={styles.texto1}>
          Loading...
        </Text>
      </View>
        )}
    </View>
  )
}

export default Details;