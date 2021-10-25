import React, {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native';

//#region EXEMPLO DE LOOPINGS E OBJECTS


/*
const object = [
  {
    name: "Lyniker",
    idade: 18,  
  },
  {
    name: "Thiago",
    idade: 14,  
  },
  {
    name: "TeXuu",
    idade: 25,  
  },
];




function loop(){

  object.map((valor)=>{
    return valor.name;
  })

}
*/

//#endregion exemplos

// IMPORTANDO COMPONENTES
import database from './firebase';

import CadScreen from './componentes/CadScreen.js';
import ViewScreen from './componentes/ViewScreen.js';
import EditScreen from './componentes/EditScreen';
import Style from './componentes/style.js';
import img from './componentes/firebase.png';

// CODIGO

console.disableYellowBox = true;

export default function App() {

  const [user,setUser] = useState([]);

  const [currentUser, setCUser] = useState('');
  const [currentPassowrd, setCPassword] = useState('');

  // USUARIOS

  var users = [];

  function getUsers () {
    
    const userRef = database.ref('users/')

    userRef.on('value', (snapshot) => {
        // const users = snapshot.numChildren(); para ver quandos childs possui uma tabela    
        users = snapshot.val();
    })
  }

  getUsers();
  //console.log(users);

  
  function verifyUser(id,password){

    var finded = false;

    users.map((value)=>{
      if(id == value["username"] && password == value["password"]){
        alert('Bem-vindo, ' + value["username"]);
        finded = true;
        setScreen('cad');
        return;
      }
    })
    if(!finded){
      alert('Esse usuário não consta em nossos registros!')
    } 

    

    /*
    if(password == user["password"] ){
      alert('A senha é igual');
    }
    else{
      alert("ops")
    }
    */

    
  }

  const [screen, setScreen] = useState('home');
  
  if(screen == 'home'){

    return(
      <View style={Style.parentView}>
        
        <View style={Style.header}></View>
          
        <View style={Style.backgroundView}>
          
          <Image style={Style.imgStyle}source={img}></Image>

          <TextInput onChangeText={(text)=> setCUser(text)} placeholder="Insira seu nome de usuário" placeholderTextColor="#A864A8" style={Style.inputs}/>
          <TextInput onChangeText={(text)=> setCPassword(text)} placeholder="Insira sua senha" placeholderTextColor="#A864A8" style={Style.inputs} secureTextEntry={true}/>

          <TouchableOpacity onPress={()=> verifyUser(currentUser,currentPassowrd)}style={Style.loginBtn}>
            <Text style={Style.loginBtnTxt}>Log-in</Text>
          </TouchableOpacity>

        </View>

      </View>

    );
  
  }
  else if(screen == 'cad'){
    return(
     
        <CadScreen screenHook={setScreen}></CadScreen>
    )
  }
  else if(screen == 'view'){

    return(

      <ViewScreen screenHook={setScreen}></ViewScreen>
    ) 
  }
}
