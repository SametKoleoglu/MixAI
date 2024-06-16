import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import {InputView} from '../components';
import {dallEApiCall} from '../api/dall-e';

const ImageScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputBoxMsg, setInputBoxMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // FUNCTIONS

  const handleInputChange = async text => {
    setInputBoxMsg(text);
    console.log('InputBoxMsg: ', inputBoxMsg);
  };

  const sendMessage = async () => {
    if (inputBoxMsg === '') {
      console.error('Please enter a message');
    } else {
      setIsLoading(true);
      let newMessages = [...messages];
      newMessages.push({role: 'user', content: inputBoxMsg});
      setInputBoxMsg('');
      setMessages([...newMessages]);
      let responseData = await dallEApiCall(inputBoxMsg);
      newMessages.push(responseData);
      setMessages(newMessages);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {messages.map((message, index) => (
          <View
            key={index}
            style={
              message.role === 'user' ? styles.userMessage : styles.modelMessage
            }>
            {message.role === 'user' ? <Text></Text> : null}
          </View>
        ))}
      </ScrollView>
      <InputView
        inputBoxMsg={inputBoxMsg}
        onInputChange={handleInputChange}
        onSendPress={sendMessage}
        isLoading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4.5),
    backgroundColor: '#345141',
  },
  userMessage: {
    backgroundColor: 'lightblue',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  modelMessage: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
});

export default ImageScreen;
