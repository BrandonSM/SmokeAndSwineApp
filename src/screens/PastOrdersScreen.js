import 'react-native-gesture-handler';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, InteractionManager, ActivityIndicator, Text, View,  } from 'react-native';

import { API_KEY, LOCATION_ID } from '@env'
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';

export default function PastOrdersScreen({navigation, route}) {

  const { squareID } = route.params;
  let locationID = LOCATION_ID.toString();
  console.log("Location: " + locationID);
  console.log("Square User: " + squareID);

  const [ userOrders, setUserOrders ] = useState([]);
  const [ initializing, setInitializing ] = useState(true);

  useEffect(() => {

    // Get the Orders from Square API based on the squareID from the profile screen
    axios.post('https://connect.squareup.com/v2/orders/search', 
    { 
        location_ids: [
          locationID
        ],
        query: {
          filter: {
            customer_filter: {
              customer_ids: [
                squareID
              ]
            }
          }
        }
    }, {
      headers: {
        Authorization: 'Bearer ' + API_KEY,
      }
    }).then((data) => {
      console.log("Orders for " + squareID)
      console.log(data.data.orders);
      setUserOrders(data.data.orders);
      setInitializing(false);
    }).catch(function (error, res) {
      console.log(error);
      console.log(error.response.data);
    });
  }, []);

  // TODO: Add the Card styling for the past orders

    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
        <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>View your past orders</Text>
        {initializing 
        ? <ActivityIndicator/> 
        : 
        <FlatList 
          data={userOrders}
          contentContainerStyle={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}
          keyExtractor={(item, index) => item.index}
          renderItem={(item) => {
            return (
                <View style={{ justifyContent: 'flex-start', marginBottom: 10 }}>
                  <Text>Order created at - {item.item.created_at}</Text>
                  <Text>Total Amount: {(item.item.total_money.amount / 100).toLocaleString('en-US', {style: 'currency',currency: 'USD'})}</Text>
                  <Text>Items ordered:</Text>
                  {item.item.line_items.map((item, index) => {
                    return (
                      <Text key={index}>Item: {item.name}</Text>
                    )})}
                </View>
            )
          }}
        />}
      </View>
    );
  }