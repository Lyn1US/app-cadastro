import React, {useState, useEffect} from 'react';
import { View, FlatList, TouchableOpacity, Text, TextInput, ScrollView, Alert} from 'react-native';
import Style from './style';
import database from '../firebase';
import App, {screen} from '../App';
import { Ionicons } from '@expo/vector-icons';

function CadScreen({screenHook}){

  const [user, setUser] = useState([]);
  
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassoword] = useState('');
  const [newCEP, setNewCEP] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newUF,setNewUF] = useState('');
  const [newNeighborhood, setNewNeighborhood] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newComplement, setNewComplement] = useState('');
  
  // REFERENCIAS DE COMPONENTES

  var users = [];
  function getUsers () {
    
    const userRef = database.ref('users/')

    userRef.on('value', (snapshot) => {
        // const users = snapshot.numChildren(); para ver quandos childs possui uma tabela    
        users = snapshot.val();
    })
  }

  getUsers();

  function addUser(username,password, cep, city, uf, neighborhood, street, number, complement){

    var idDoc = 1;

    
    var exists = false;

    if(username !== '' && password !== '' && cep !== '' && city !== '' && uf !== ''
    && neighborhood !== '' && street !== '' && number !== ''){

      
      users.map((user)=>{
        if(username === user.username){
          exists = true;
        }
      })

      if(!exists){

        var usersReversed = users.reverse()
        idDoc = usersReversed[0].id;

        database.ref('users/' + (idDoc + 1).toString()).set({
          id: (idDoc + 1),
          username: username,
          password: password,
          cep: cep,
          city: city,
          uf: uf,
          neighborhood: neighborhood,
          street: street,
          number: number,
          complement: complement
        })

        alert('Usuário cadastrado com sucesso')
        screenHook('view');
      }

    }
    else{
      
      alert('Preencha todos os campos!');
      screenHook('cad')
    }
    
    return;

  }

  const [json, setJson] = useState('');


  function requisition (cep) {
    
    if(cep.length == 8){
      fetch('https://viacep.com.br/ws/'+ cep +'/json/')
      .then(response => response.json())
      .then(function(json){
        
        setJson(JSON.stringify(json, null, "\t"));
        
        if(json.erro != true){

          setNewCity(json.localidade);
          setNewStreet(json.logradouro);
          setNewUF(json.uf);
          setNewNeighborhood(json.bairro);
        }
        else{
          alert("Insira um CEP válido")
        }
      });
    }
    else{
      alert("Insira um CEP válido")
    }
  }


  return (
    <View style={Style.parentView}>
    
      <View style={Style.cadHeader}>
        <Text style={Style.cadHeaderTxt}>tela de cadastro</Text>
      
        <TouchableOpacity onPress={()=> screenHook('home')} style={Style.btnLogout}>
          <Ionicons  style={Style.logoutIcon} size={25} name="log-out-outline"/>
        </TouchableOpacity>
      </View>

      <View style={Style.backgroundView}>

        <View style={Style.scrollViewContainer2}>
          <ScrollView style={Style.scrollView}>
          
            <Text style={Style.inputLabel}>Nome de usuário:</Text>
            <TextInput  onChangeText={(text)=>setNewUsername(text)} placeholderTextColor="#A864A8" placeholder="Insira seu nome de usuário" style={Style.inputs}/>
            
            <Text style={Style.inputLabel}>Senha:</Text>
            <TextInput secureTextEntry={true} onChangeText={(text)=>setNewPassoword(text)} placeholderTextColor="#A864A8" placeholder="Insira sua senha" style={Style.inputs}/>
          

            <Text style={Style.inputLabel}>CEP:</Text>
            <TextInput maxLength={8} onChangeText={(text)=>setNewCEP(text)} onBlur={() => requisition(newCEP)} placeholderTextColor="#A864A8" placeholder="Insira seu CEP" style={Style.inputs}/>
          
            <Text style={Style.inputLabel}>Cidade:</Text>
            <TextInput value={newCity} onChangeText={(text)=>setNewCity(text)} placeholderTextColor="#A864A8" placeholder="Insira sua cidade" style={Style.inputs}/>
          
            <Text style={Style.inputLabel}>UF:</Text>
            <TextInput value={newUF} maxLength={2} onChangeText={(text)=>setNewUF(text)} placeholderTextColor="#A864A8" placeholder="Insira sua unidade federal" style={Style.inputs}/>
          
            <Text style={Style.inputLabel}>Bairro:</Text>
            <TextInput value={newNeighborhood} onChangeText={(text)=>setNewNeighborhood(text)} placeholderTextColor="#A864A8" placeholder="Insira seu bairro" style={Style.inputs}/>
          
            <Text style={Style.inputLabel}>Rua:</Text>
            <TextInput value={newStreet} onChangeText={(text)=>setNewStreet(text)} placeholderTextColor="#A864A8" placeholder="Insira sua rua" style={Style.inputs}/>
          
            <Text style={Style.inputLabel}>N°:</Text>
            <TextInput keyboardType={'numeric'}  onChangeText={(text)=>setNewNumber(text)} placeholderTextColor="#A864A8" placeholder="Insira seu n°" style={Style.inputs}/>
          
            <Text style={Style.inputLabel}>Complemento:</Text>
            <TextInput  onChangeText={(text)=>setNewComplement(text)} placeholderTextColor="#A864A8" placeholder="Insira um complemento" style={Style.inputs}/>


            <Text style={Style.inputLabel}>
              {
                json
              }
            </Text>
            <View></View>
          </ScrollView>
        </View>

        <TouchableOpacity onPress={()=> addUser(newUsername,newPassword, newCEP, newCity, newUF, newNeighborhood, newStreet, newNumber, newComplement) }style={Style.loginBtn}>
            <Text style={Style.loginBtnTxt}>Cadastrar</Text>
          </TouchableOpacity>

        <TouchableOpacity onPress={()=>screenHook('view')} style={Style.btnNavigate}>
          <Text style={Style.btnNavigateTxt}>Visualizar usuários</Text>
        </TouchableOpacity>

      </View>

    </View>
  )
}
export default CadScreen;