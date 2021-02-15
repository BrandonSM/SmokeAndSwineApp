import 'react-native-gesture-handler';
import * as React from 'react';
import { Image, Text, SafeAreaView } from 'react-native';
import FullWidthButton from './../components/FullWidthButton';
import styled from 'styled-components/native';

export default function HomeScreen({navigation}) {

    return (
      <SafeAreaView style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        <Image 
          style={{ height: 360, width: 360, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 15, marginRight: 15, marginTop: 100, marginBottom: 50 }}
          source={require('./../assets/images/main-logo.png')}/>
        <FullWidthButton>
          <Text style={{ textAlign: 'center' }}>View the Menu</Text>
        </FullWidthButton>
        <FullWidthButton>
          <Text style={{ textAlign: 'center' }}>Login</Text>
        </FullWidthButton>
      </SafeAreaView>
    );
  }

