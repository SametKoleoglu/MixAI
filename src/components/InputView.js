import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';

const InputView = ({inputBoxMsg, onInputChange, onSendPress, isLoading}) => {
  return (
    <KeyboardAvoidingView style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Type a message"
        placeholderTextColor="white"
        onChangeText={onInputChange}
        value={inputBoxMsg}
      />

      <TouchableOpacity onPress={onSendPress} style={styles.button}>
        {isLoading ? (
          <LottieView
            source={require('../../assets/animations/Animation-loading.json')}
            autoPlay
            loop
            style={styles.loading}
          />
        ) : (
          <FAIcon name="paper-plane" size={wp(6)} color="white" />
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default InputView;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 25,
    padding: 10,
    fontSize: hp('2%'),
    color: 'white',
    width: wp('80%'),
    height: hp('5%'),
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    width: wp(10),
    height: hp(5),
  }
});
