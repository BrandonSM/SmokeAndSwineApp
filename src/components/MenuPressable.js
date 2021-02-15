import 'react-native-gesture-handler';
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import styled from 'styled-components/native';

const MenuView = styled(Pressable)`
  border-radius: 3px;
  border: 2px solid #FF9000;
  margin: 0px 5px;
  padding: 5px 5px;
  width: 175px;
  height: 220px;
`

export default function MenuPressable({children, ...props}) {
  
      return (
        <MenuView {...props}>
          {children}
        </MenuView>
      );
    }