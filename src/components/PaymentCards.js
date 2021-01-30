import 'react-native-gesture-handler';
import * as React from 'react';
import { Pressable, Text, View, Image } from 'react-native';
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

export default function PaymentCards({children, card}) {
  
      return (
        <CardWrapper>
            <CardHeader>{JSON.stringify(card)}</CardHeader>
            <CardHeader>{cardEXP}</CardHeader>
            <CardText>Name on Card</CardText>
            <CardText>12/23</CardText>
            <CardText>Card Zip</CardText>
        </CardWrapper>
      );
    }