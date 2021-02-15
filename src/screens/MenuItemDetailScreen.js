import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, Text, View, Image } from 'react-native';
import MenuPressable from './../components/MenuPressable';
import MenuActionButton from '../components/MenuActionButton';

export default function MenuItemDetailScreen({navigation, route}) {

  const { item } = route.params;

  let variations = item.item_data.variations;

    return (
      <View style={{ flex: 1, alignItems: 'flex-start', padding: 25 }}>
        <Image  
          source={{ uri: 'https://via.placeholder.com/360',}}
          style={{ width: 360, height: 360}}/>
        <Text>{item.item_data.name}</Text>
        <Text>{item.item_data.description}</Text>
        {variations.sort((a, b) => a.item_variation_data.price_money.amount - b.item_variation_data.price_money.amount)
          .map((element, index) => {
            return (
              <MenuPressable key={index} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', width: 300 }}>
                <Text style={{ height: 36, alignItems: 'center'}}>
                  {element.item_variation_data.name}
                </Text>
                <Text style={{ height: 36, alignItems: 'center', lineHeight: 36 }}> - </Text> 
                <Text style={{ height: 36, alignItems: 'center', lineHeight: 36 }}>
                  {(element.item_variation_data.price_money.amount / 100).toLocaleString('en-US', {style: 'currency',currency: 'USD',})}
                </Text>
                <MenuActionButton style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text>Add</Text>
                </MenuActionButton>
              </MenuPressable>
            )
        })}
      </View>
    );
  }