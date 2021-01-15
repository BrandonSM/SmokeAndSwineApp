import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, Text, View } from 'react-native';

export default function PastOrdersScreen({navigation}) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
        <Text>View your past orders</Text>
      </View>
    );
  }