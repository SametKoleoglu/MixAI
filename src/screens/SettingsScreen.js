import {View, Text, StyleSheet} from 'react-native';
import React, {useState,useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RadioButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const [checked, setChecked] = useState('gemini');
  useEffect(() => {
    loadStoredValue();
  }, []);

  const loadStoredValue = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('selectedRadioButton');
      if (storedValue != null) {
        setChecked(storedValue);
      }else{
        saveValueToStorage('gemini');
      }
    } catch (error) {
      console.log('Error loading value from storage:', error);
    }
  };

  const saveValueToStorage = async value => {
    try {
      await AsyncStorage.setItem('selectedRadioButton', value);
    } catch (error) {
      console.log('Error saving value to storage:', error);
    }
  };

  const handleRadioButtonPress = value => {
    setChecked(value);
    saveValueToStorage(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Choose a model</Text>
      <View style={styles.container2}>
        <RadioButton
          uncheckedColor="#fff"
          value="gemini"
          status={checked === 'gemini' ? 'checked' : 'unchecked'}
          onPress={() => handleRadioButtonPress('gemini')}
          color="green"
        />
        <Text style={styles.text2}>Gemini 1.5 Flash</Text>
      </View>

      <View style={styles.container2}>
        <RadioButton
          uncheckedColor="#fff"
          value="gpt"
          status={checked === 'gpt' ? 'checked' : 'unchecked'}
          onPress={() => handleRadioButtonPress('gpt')}
          color="green"
        />
        <Text style={styles.text2}>GPT 3.5 Turbo</Text>
      </View>

      <Text style={styles.text3}>
        In Choose :{' '}
        <Text
          style={{
            color: 'green',
            fontSize: hp('2.3%'),
          }}>
          {checked.toLocaleUpperCase()}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#345141',
    padding: wp(4.5),
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: hp(2.5),
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'green',
  },
  text: {
    fontSize: hp('2%'),
    color: 'white',
    marginBottom: hp('1%'),
    marginTop: hp('2%'),
  },
  text2: {
    fontSize: hp('1.5%'),
    color: 'white',
  },
  text3: {
    fontSize: hp('2%'),
    color: 'white',
    flex: 1,
    paddingTop: hp(2.5),
    alignSelf: 'center',
  },
});

export default SettingsScreen;
