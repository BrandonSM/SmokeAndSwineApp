import 'react-native-gesture-handler';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import PaymentsScreen from './PaymentsScreen';


export default function ProfileScreen({navigation}) {

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
        <Text>Your Profile</Text>
        <Button 
          title="Past Orders"
          onPress={() => navigation.navigate('Past Orders')}/>
        <Button 
          title="Saved Payment Methods"
          onPress={() => navigation.navigate('Payments')}/>
        <Button 
          title="Rewards Points"
          onPress={() => navigation.navigate('Rewards')}/>
      </View>
    );
  }

