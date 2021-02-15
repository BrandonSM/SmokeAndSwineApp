import 'react-native-gesture-handler';
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import styled from 'styled-components/native';

const MenuActionButtonSmall = styled(Pressable)`
  background: #FF9000;
  border-radius: 3px;
  border: 1px solid #000000;
  text-align: center;
  margin: 0px 10px;
  color: #FF9000;
  width: 48px;
  height: 36px;
  line-height: 36px;
`

export default function MenuActionButton({children, ...props}) {
  
      return (
        <View>
          <MenuActionButtonSmall {...props}>
            {children}
          </MenuActionButtonSmall>
        </View>
      );
    }