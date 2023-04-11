import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, ImageBackground, StyleSheet, Text, TextInput, View, } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={require('./image/Bg.jpg')}>
    <View style = {styles.form}>
      <View>
        <Text style={styles.inputTitle}>EMAIL ADDRES</Text>
      <TextInput style={styles.input} textAlign={'center'}/>
      </View>
      <View style={{marginTop: 20}}>
        <Text style={styles.inputTitle}>PASSWORD</Text>
      <TextInput style={styles.input} textAlign={'center'} secureTextEntry = {true}/>
      </View>
     <TouchableOpacity/>
    </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  image: {
    flex:1,
    resizeMode: 'cover',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  
  form:{
    marginHorizontal:40,
  },

  inputTitle:{
    color: '#ffffff',
    marginBottom: 10,
    fontSize:18
  }, 


  input:{
    borderWidth:1,
    borderColor: '#ffffff',
    height:40,
    borderRadius: 6,
    color: '#ffffff'
  }

});
