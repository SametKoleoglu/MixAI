import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
        <Image
          source={require('../../assets/aiMix.jpg')}
          style={styles.image}
        />
        <Text style={styles.description}>
          Welcome to AIMix, the best AI mixing app
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Tab');
        }}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    gap: 25,
    marginBottom: 40,
  },
  image: {
    width: 350,
    height: 200,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#104010',
    width: 250,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
