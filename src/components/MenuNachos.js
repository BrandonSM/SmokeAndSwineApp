import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

// Get menu sides from Square
function MenuNachos() {

    const { isLoading, isError, data, error } = useQuery('sides', fetchSides); 
    // Get the sides from the Square API
    const fetchSides = () => {
        axios.post('https://connect.squareup.com/v2/catalog/search-catalog-items', {
          category_ids: [
            "OJY5L6U653Y7ZGJPZI3CKYHN"
          ]
        }, {
          headers: {
            Authorization: 'Bearer ' + API_KEY,
          }
        } )
          .then(function (data) {
            // handle success
            console.log(data);
            return data;
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
      };

    // Access the client
    const queryClient = useQueryClient()
  
    // Queries
    const query = useQuery('sides', fetchSides)
  
    return (
      <div>
        <ul>
          {query.data.map(todo => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
  
        <button
          onClick={() => {
            mutation.mutate({
              id: Date.now(),
              title: 'Do Laundry',
            })
          }}
        >
          Add Todo
        </button>
      </div>
    )
  }