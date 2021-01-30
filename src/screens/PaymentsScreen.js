import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import styled from 'styled-components/native';
const CardWrapper = styled(View)`
    overflow: hidden;
    padding: 10px 10px;
    margin: 48px auto 0;
    width: 300px;
    border-radius: 5px;
    border: solid 1px #DDDDDD;
`

const CardType = styled(Image)`
    width:12px;
    height:12px;
`;

export const CardHeader = styled(Text)`
  padding-top: 6px;
  padding-bottom: 6px;
  font-size:16px
  font-weight:bold;
`;

export const CardText = styled(Text)`
    font-size:12px;
    margin: 6px 0px;
`;

export default function PaymentsScreen({navigation, route}) {

  const { userCards }  = route.params;

    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
        <Text>View your saved payment methods</Text>
        <FlatList
          data={userCards}
          renderItem={(item) => {
            return(
              <CardWrapper>
                <CardHeader>{item.item.last_4}</CardHeader>
                <CardHeader>{item.item.card_brand}</CardHeader>
                <CardText>{item.item.exp_month}/{item.item.exp_year}</CardText>
              </CardWrapper>
            )}}
        />
      </SafeAreaView>
    );
  }