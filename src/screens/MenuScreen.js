import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Button, Text, SafeAreaView } from 'react-native';
import { useQuery, useQueries, useQueryClient } from 'react-query';
import MenuSides from './../components/MenuSides';
import MenuPounds from './../components/MenuPounds';

import { API_KEY } from "@env";

import axios from 'axios';
import MenuDrinks from '../components/MenuDrinks';
import { ScrollView } from 'react-native-gesture-handler';

export default function MenuScreen({navigation}) {

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
      <ScrollView>
        <MenuPounds/>
        <MenuSides/>
        <MenuDrinks/>
      </ScrollView>
    </SafeAreaView>
  );
}