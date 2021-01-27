import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Button, Text, TextInput, View } from 'react-native';
import PaymentsScreen from './PaymentsScreen';

import {TEST_USER, TEST_PASSWORD, API_KEY} from "@env";

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';

export default function ProfileScreen({navigation}) {

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [passwordCheck, setPasswordCheck ] = useState(true);
  const [userInput, setUserInput ] = useState('');
  const [passwordInput, setPasswordInput ] = useState('');
  const [user, setUser] = useState();
  const [userData, setUserData ] = useState();

  // Get UserInfo from firebase
  // TODO: search customers via email instead of via sync'ed squareID field in Firestore
  const getUserSquareProfile = (emailQuery) => {
    console.log("FIRED the getUserSquareProfile with: " + emailQuery);
    firestore()
      .collection('appUsers')
      .where('email', '==', emailQuery)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          console.log('User ID: ', documentSnapshot.id, documentSnapshot.data().squareID);
          axios.get('https://connect.squareup.com/v2/customers/' + documentSnapshot.data().squareID, {
            headers : {
              Authorization: 'Bearer ' + API_KEY,
            }
          }).then((data) => {
            console.log(data.data.customer.given_name);
            setUserData(data.data.customer.given_name);
            setLoadingUser(false);
          })
        });
      });
  }

  // Handle user login
  const userLogin = () => {
    setInitializing(true);
    auth().signInWithEmailAndPassword(userInput, passwordInput)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        var emailQuery = userCredential.user.email
        console.log(emailQuery);
        getUserSquareProfile(emailQuery);
        setPasswordCheck(true);
        setInitializing(false);
        setUserInput('');
        setPasswordInput('');
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setPasswordCheck(false);
        setInitializing(false);
        // ..
      });
  }

  const adminLogin = () => {
    setInitializing(true);
    auth().signInWithEmailAndPassword(TEST_USER, TEST_PASSWORD)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        var email = userCredential.email;
        setInitializing(false);
        setUserInput('');
        setPasswordInput('');
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setInitializing(false);
        setUserInput('');
        setPasswordInput('');
        // ..
      });
  }

  // Handle user logout
  const userLogout = () => {
    auth().signOut()
      .then(() => {
        setPasswordCheck(true);
        setUserInput('');
        setPasswordInput('');
      });
  }
  
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    console.log("User is : " + user);
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Please Login</Text>
        <TextInput
          style={{ height: 30, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => setUserInput(text)}
          value={userInput}
        />
        <TextInput
          style={{ height: 30, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => setPasswordInput(text)}
          value={passwordInput}
        />
        {passwordCheck 
          ? null
          : <Text style={{color: 'red'}}>BAD USERNAME/PASSWORD TRY AGAIN</Text>
        }
        <Button
          onPress={userLogin}
          title="Login with Username + Password"
          color="#0099FF"/>
        <Button
          onPress={adminLogin}
          title="Login As Admin"
          color="#FF8000"/>
      </View>
    );
  }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
        {loadingUser ? <ActivityIndicator/> : <Text>Welcome back {userData}!</Text>}
        <Button
          title="Sign Out"
          onPress={userLogout}
          />
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

