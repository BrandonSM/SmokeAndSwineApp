import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Text, Image, View, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import axios from 'axios';
import { API_KEY } from '@env';

// Get menu sides from Square
export default function MenuDrinks() {

    const renderItem = ({ item }) => {
        return (
          <View style={{ width: 160, marginRight: 15 }}>
            <Image
              style={{ width: 160, height:160 }}
              source={{ uri: 'https://via.placeholder.com/160',}}/>
            <Text>{item.item_data.name}</Text>
          </View>
        )
    };
    const queryClient = useQueryClient();

      const { isLoading, isError, data, error } = useQuery('drinks', () => 
        axios.post('https://connect.squareup.com/v2/catalog/search-catalog-items', {
          category_ids: [
            "MIFDAR22GURGKJDCESDOK57D"
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

    // Render the Sides
    if (isLoading) return <Text>Loading...</Text>;

    if (isError) return <Text>An error has occurred: {error.message}</Text>;
    
    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start',  height: 280 }}>
        <Text style={{ fontSize: 24 }}>DRINKS</Text>
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