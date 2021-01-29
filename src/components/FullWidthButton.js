import 'react-native-gesture-handler';
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import styled from 'styled-components/native';

const FullButton = styled(Pressable)`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #FF9000;
  color: #FF9000;
  margin: 10px 15px;
  padding: 12px 24px;
  width: 380px;
`

export default function FullWidthButton({children, ...props}) {

    const onPressFunction = () => {
      console.log('Pressed the Orange button');
    }
  
      return (
        <View>
          <FullButton {...props}>
            {children}
          </FullButton>
        </View>
      );
    }
  