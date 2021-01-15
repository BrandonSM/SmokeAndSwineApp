import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Button, Text, View } from 'react-native';

import {API_KEY } from "@env";

import axios from 'axios';

export default function MenuScreen({navigation}) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [burgers, setBurgers ] = useState([]);
  const [meats, setMeats ] = useState([]);
  const [sides, setSides ] = useState([]);
  const [appetizers, setAppetizers] = useState([]);
  useEffect(() => {
    //fetch('https://jsonplaceholder.typicode.com/todos/')
    //.then(response => response.json())
    //.then(json => setData(json))
    //.finally(setLoading(false));
    axios.post('https://connect.squareup.com/v2/catalog/search', {
      include_deleted_objects: false,
      include_related_objects: false,
      object_types: ['ITEM'],
    }, { 
      headers: {
        Authorization: 'Bearer ' + API_KEY,
    }}).then((data) => {
      console.log(data.data.objects);
      setData(data.data.objects);
      setLoading(false);
    }).catch(function (error, res) {
      console.log(error);
      console.log(error.response.data);
    })
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
      <Text>Menu for pick up</Text>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
          <Text>
            {item.index} - 
            {item.item_data.name} - 
            {(item.item_data.variations[0].item_variation_data.price_money.amount) != undefined 
            ? (item.item_data.variations[0].item_variation_data.price_money.amount / 100).toLocaleString('en-US', {style: 'currency',currency: 'USD'}) 
            : 'n/a'}
          </Text>
          )}
        />
      )}
    </View>
  );
}