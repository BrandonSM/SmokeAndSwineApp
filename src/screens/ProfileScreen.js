import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, Text, View } from 'react-native';
import PaymentsScreen from './PaymentsScreen';

export default function ProfileScreen({navigation}) {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

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
      <View>
        <Text>c</Text>
      </View>
    );
  }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
        <Text>Your Profile</Text>
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

