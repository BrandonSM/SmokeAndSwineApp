import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Image, SafeAreaView, Text, TextInput } from 'react-native';
import FullWidthButton from './../components/FullWidthButton';
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
  const [userData, setUserData ] = useState('');
  const [userCards, setUserCards ] = useState([]);

  // Get UserInfo from firebase
  const getUserSquareProfile = (emailQuery) => {
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
            setUserData(data.data.customer.given_name);
            setUserCards(data.data.customer.cards);
            setLoadingUser(false);
          })
        });
      });
  }

  // Handle user login
  const userLogin = () => {
    console.log(user);
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
        setUser();
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
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <SafeAreaView>
        <Image 
          style={{ height: 280, width: 280, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 60, marginTop: 80, marginBottom: 50 }}
          source={require('./../assets/images/fire-logo.png')}/>
        <Text>Please Login</Text>
        <TextInput
          style={{ height: 50, borderColor: 'gray', borderWidth: 1, padding: 10, marginLeft: 10, marginRight: 10, marginBottom: 10 }}
          onChangeText={text => setUserInput(text)}
          value={userInput}
        />
        <TextInput
          style={{ height: 50, borderColor: 'gray', borderWidth: 1, padding: 10, marginLeft: 10, marginRight: 10, marginBottom: 10 }}
          onChangeText={text => setPasswordInput(text)}
          value={passwordInput}
        />
        {passwordCheck 
          ? null
          : <Text style={{color: 'red'}}>BAD USERNAME/PASSWORD TRY AGAIN</Text>
        }
        <FullWidthButton
          onPress={userLogin}>
            <Text>Login with Username + Password</Text>
        </FullWidthButton>
        <FullWidthButton
          onPress={adminLogin}>
          <Text>Login As Admin</Text>
        </FullWidthButton>
      </SafeAreaView>
    );
  }

    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
        {loadingUser ? <ActivityIndicator/> : <Text>Welcome back {userData}!</Text>}
        <FullWidthButton onPress={userLogout}>
            <Text>Logout</Text>
        </FullWidthButton>
        <FullWidthButton onPress={() => navigation.navigate('Past Orders')}>
          <Text>Past Orders</Text>
        </FullWidthButton>
        <FullWidthButton onPress={() => navigation.navigate('Payments', {userCards})}>
        <Text>Saved Payment Methods</Text>
        </FullWidthButton>
        <FullWidthButton onPress={() => navigation.navigate('Rewards')}>
          <Text>View My Rewards Points</Text>
        </FullWidthButton>
      </SafeAreaView>
    );
  }

