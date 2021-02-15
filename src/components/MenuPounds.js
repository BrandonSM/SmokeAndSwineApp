import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Text, Image, View, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
import { API_KEY } from '@env';
import MenuPressable from './MenuPressable';

// Get menu sides from Square
export default function MenuPounds() {

  const navigation = useNavigation();

  const renderItem = ({ item }) => {
      return (
        <MenuPressable
          onPress={() => navigation.navigate('Menu Item Details', { item })} >
          <Image
            style={{ width: 160, height:160 }}
            source={{ uri: 'https://via.placeholder.com/160',}}/>
          <Text>{item.item_data.name}</Text>
        </MenuPressable>
      )
  };

  // Initiate the queryClient
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery('pounds', () => 
    axios.post('https://connect.squareup.com/v2/catalog/search-catalog-items', {
      category_ids: [
        "QP4ZDTAHLTH6UZRG7LFLEYVU"
      ]
    }, {
      headers: {
        Authorization: 'Bearer ' + API_KEY,
      }
      })
      .then(function(response) {
        console.log(response.data.items);
        return response.data.items;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  ); 

  if (isLoading) return <Text>Loading...</Text>;

  if (isError) return <Text>An error has occurred: {error.message}</Text>;
  
  // Render the Pounds
  return (
    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start',  marginBottom: 20}}>
      <Text style={{ fontSize: 24 }}>MEATS</Text>
      <FlatList
          data={data}
          horizontal={true}
          renderItem={renderItem}
          ListEmptyComponent={<ActivityIndicator size="large"/>}
          contentContainerStyle={{ alignItems: 'flex-start' }}
          keyExtractor={item => item.index}/>
    </View>
  )
}