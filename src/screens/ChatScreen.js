import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {InputView} from '../components';
import {geminiApiCall} from '../api/gemini';
import {gptApiCall} from '../api/gpt';
import Markdown from 'react-native-markdown-display';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = () => {
  // States
  const [inputBoxMsg, setInputBoxMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [replyLabelName, setReplyLabelName] = useState(null);
  const [selectModel, setSelectModel] = useState('gemini');

  const scrollViewRef = useRef();

  useEffect(() => {
    loadSelectModel();
  }, []);

  useEffect(() => {
    loadMessages(selectModel);
  }, [selectModel]);

  const loadSelectModel = async () => {
    try {
      const storedModel = await AsyncStorage.getItem('selectedRadioButton');
      if (storedModel != null) {
        setSelectModel(storedModel);
      } else {
        saveSelectedModel('gemini');
      }
    } catch (error) {
      console.log('Error loading select model from storage:', error);
    }
  };

  const loadMessages = async model => {
    try {
      console.log(`messages loading...`);
      const storedMessages = await AsyncStorage.getItem(`messages_${model}`);
      if (storedMessages != null) {
        console.log(`Stored messages are not null!!! `);
        const parsedMessages = JSON.parse(storedMessages);
        setMessages(parsedMessages);
      } else {
        setMessages([]);
        console.log(`Stored messages null!!! `);
      }
    } catch (error) {
      console.error('Error loading messages from storage:', error);
    }
  };

  const saveMessages = async (model, allMessages) => {
    try {
      await AsyncStorage.setItem(
        `messages_${model}`,
        JSON.stringify(allMessages),
      );
      console.log('Messages saved successfully');
    } catch (error) {
      console.error('Error saving messages to storage:', error);
    }
  };

  const saveSelectedModel = async model => {
    try {
      await AsyncStorage.setItem('selectedRadioButton', model);
    } catch (error) {
      console.log('Error saving select model to storage:', error);
    }
  };

  // Functions
  const handleInputChange = text => {
    setInputBoxMsg(text);
  };

  const sendMsg = async () => {
    if (inputBoxMsg === '') {
      console.error('Please enter a message');
    } else {
      setIsLoading(true);
      let newMessages = [...messages];
      newMessages.push({role: 'user', content: inputBoxMsg});
      setInputBoxMsg('');
      setMessages([...newMessages]);

      if (selectModel === 'gpt') {
        setReplyLabelName('GPT');
        let responseData = await gptApiCall(newMessages);
        newMessages.push(responseData);
        setMessages(newMessages);
        saveMessages(selectModel, newMessages);
      } else if (selectModel === 'gemini') {
        setReplyLabelName('Gemini');
        let responseData = await geminiApiCall(newMessages);
        newMessages.push(responseData);
        setMessages(newMessages);
        saveMessages(selectModel, newMessages);
      }

      setIsLoading(false);

      scrollToBottom();
    }
  };

  const scrollToBottom = async () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  };

  const handleDeleteMessages = async () => {
    try {
      await AsyncStorage.removeItem(`messages_${selectModel}`);
      setMessages([]);
    } catch (error) {
      console.error('Error deleting messages from storage:', error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.deleteIcon}>
        <MCIcon
          name="delete-circle"
          size={wp(8)}
          color="red"
          onPress={handleDeleteMessages}
        />
      </View>
      <ScrollView
        style={styles.messageContainer}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onContentSizeChange={scrollToBottom}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={message.role == 'user' ? styles.user : styles.model}>
            {message.role == 'user' ? (
              <View style={styles.messageLabel}>
                <FAIcon name="user" size={wp(3)} color="black" />
                <Text style={styles.messageLabelText}>{message.role}</Text>
              </View>
            ) : (
              <View style={styles.messageLabel}>
                <FAIcon name="robot" size={wp(3)} color="black" />
                <Text style={styles.messageLabelText}>{replyLabelName}</Text>
              </View>
            )}

            <Markdown style={markdown}>{message.content}</Markdown>
          </View>
        ))}
      </ScrollView>

      <InputView
        inputBoxMsg={inputBoxMsg}
        onInputChange={handleInputChange}
        onSendPress={sendMsg}
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
  messageContainer: {
    marginTop: hp(2.5),
  },
  user: {
    backgroundColor: 'lightblue',
    padding: 10,
    marginRight: 0,
    borderRadius: 10,
    marginVertical: 10,
  },
  model: {
    backgroundColor: 'lightgreen',
    padding: 10,
    marginLeft: 0,
    borderRadius: 10,
    marginVertical: 10,
  },
  messageLabel: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(3),
  },
  messageLabelText: {
    fontSize: wp(3.5),
    color: 'black',
    marginLeft: wp(1.5),
  },
});

const markdown = StyleSheet.create({
  body: {
    fontSize: wp(3),
    color: 'black',
  },

  blockquote: {
    marginTop: 10,
    marginBottom: 10,
  },

  fence: {
    backgroundColor: 'steelblue',
    borderColor: '#883ef8',
    color: '#fff',
    marginTop: wp(2),
  },

  code_inline: {
    borderColor: '#883ef8',
    backgroundColor: 'steelblue',
    color: '#fff',
  },
  deleteIcon: {
    padding: wp(2),
    alignSelf: 'flex-end',
    marginBottom: -wp(2),
  },
});

export default ChatScreen;
