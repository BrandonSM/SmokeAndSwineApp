import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { View } from 'react-native';

// Get menu sides from Square
function MenuTacos() {

    const { isLoading, isError, data, error } = useQuery('sides', fetchTacos); 
    // Get the sides from the Square API
    const fetchDrinks = () => {
        axios.post('https://connect.squareup.com/v2/catalog/search-catalog-items', {
          category_ids: [
            "MIFDAR22GURGKJDCESDOK57D"
          ]
        }, {
          headers: {
            Authorization: 'Bearer ' + API_KEY,
          }
        } )
          .then(function (response) {
            // handle success
            console.log(response);
            return response;
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
      }

    // Access the client
    const queryClient = useQueryClient()
  
    // Queries
    const query = useQuery('sides', fetchSides)
  
    return (
      <View>
        {query.data.map((side) => {
            return (
                <Text key={side.id}>{todo.title}</Text>
            )
        })}
      </View>
    )
  }