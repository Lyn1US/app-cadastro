import React, {useState, useEffect} from 'react';
import {View, Text, Touchable, TouchableOpacity, ScrollView, SafeAreaView, TextInput} from 'react-native';
import Style from './style';
import database from '../firebase';
import App, {screen} from '../App';
import { Ionicons } from '@expo/vector-icons';

var users = [];
var val = [];
function getUsers () {
  
  const userRef = database.ref('users/')

  userRef.on('value', (snapshot) => {
      // const users = snapshot.numChildren(); para ver quandos childs possui uma tabela    
      users = snapshot.val();
  })
}

getUsers();

function ViewScreen({screenHook}){

  const [user, setUser] = useState([]);

  const [modal, setModal] = useState(false);
  const [id, setId] = useState('');

  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassoword] = useState('');
  const [newCEP, setNewCEP] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newUF,setNewUF] = useState('');
  const [newNeighborhood, setNewNeighborhood] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newComplement, setNewComplement] = useState('');
    
    
  

  function gotoEdit(id){
      
    setId(id);
    setModal(true);

    var editableuser = users.filter(user => user.id == id);

    setNewUsername(editableuser[0].username);
    setNewPassoword(editableuser[0].password);
    setNewCEP(editableuser[0].cep);
    setNewCity(editableuser[0].city);
    setNewUF(editableuser[0].uf);
    setNewNeighborhood(editableuser[0].neighborhood);
    setNewStreet(editableuser[0].street);
    setNewNumber(editableuser[0].number);
    setNewComplement(editableuser[0].complement)
    

  }

  function editUser(id,username,password, cep, city, uf, neighborhood, street, number, complement){
    
    var exists = false;
    if(username !== '' && password !== '' && cep !== '' && city !== '' && uf !== ''
    && neighborhood !== '' && street !== '' && number !== ''){

      users.map((user)=>{
        if(username === user.username && user.id != id){
          exists = true;
        }
      })

      if(!exists){

        database.ref('users/' + id.toString()).set({
          id: id,
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

        alert('Usuário editado com sucesso')
      }else{
        alert('Algo inesperado ocorreu');
      }
    setModal(false);
    }
}

  function deleteUser(id){
    if(id != '1' && id != '2'){
      database.ref('users/'+ id.toString()).remove();
      alert('Dados excluídos com sucesso, veja na página de visualização!');
    }else{
      alert('não é possivel deletar esse usuário');
    }
    setModal(false);
  }

  function requisition (cep) {
    
    if(cep.length == 8){
      fetch('https://viacep.com.br/ws/'+ cep +'/json/')
      .then(response => response.json())
      .then(function(json){
        
        //JSON.stringify(json, null, "\t")
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


    if(!modal){
        return(
            <View style={Style.parentView}>
    
                <View style={Style.viewHeader}>
                    <Text style={Style.viewHeaderTxt}>Tela de visualização</Text>
                    
                    <TouchableOpacity onPress={()=> screenHook('home')} style={Style.btnLogout}>
                        <Ionicons name="log-out-outline" size={25} style={Style.logoutIcon}/>
                    </TouchableOpacity>
                
                </View>
    
                <View style={Style.backgroundView}>
    
                   <View style={Style.scrollViewContainer}>
                       <ScrollView style={Style.scrollView}>
                        {
                            users.map((val)=>{
                                
                                return(
                                    <TouchableOpacity onPress={()=> gotoEdit(val.id)} key={val.id} style={Style.scrollViewCell}>
                                        <Text style={Style.scrollViewCellTxt}>{val["username"]}</Text>
                                        <Text style={Style.scrollViewCellTxt}>{val["street"]}</Text>
                                        <Text style={Style.scrollViewCellTxt}>{val["city"] + ', ' + val["uf"]}</Text>
                                        
                                    </TouchableOpacity>
                                )
                            
                            })
                        }
    
                       </ScrollView>
                   </View>
    
                   <TouchableOpacity onPress={()=>screenHook('cad')} style={Style.btnNavigateView}>
                        <Text style={Style.btnNavigateTxt}>Cadastrar usuários</Text>
                    </TouchableOpacity>
                   
                </View>
    
            </View>
        )
    }
    else{
        return(
            <View style={Style.parentView}>
                
                <View style={Style.viewHeader}>
                    <Text style={Style.viewHeaderTxt}> Tela de Edição</Text>
                </View>

                <View style={Style.backgroundView}>

                    <View style={Style.userInfo}>
                        {
                            

                            users.map((val)=>{
                                
                                if(val.id == id){

                                    return(
                                       
                                        <View style={Style.modalInfoView} key={val.id}>
                                            <Text style={Style.labelModalInfo}> Dados atuais: </Text>
                                            
                                            <View style={Style.userInfoScrollViewContainer}>
                                                <ScrollView>
                                                    <Text style={Style.modalInfoViewTxt}>{"Nome de usuário: " + val["username"]}</Text>
                                                    <Text style={Style.modalInfoViewTxt}>{"Senha: " + val["password"]}</Text>
                                                    <Text style={Style.modalInfoViewTxt}>{"CEP: " + val["cep"]}</Text>
                                                    <Text style={Style.modalInfoViewTxt}>{"Cidade: " + val["city"]}</Text>
                                                    <Text style={Style.modalInfoViewTxt}>{"UF: " + val["uf"]}</Text>
                                                    <Text style={Style.modalInfoViewTxt}>{"Bairro: " + val["neighborhood"]}</Text>
                                                    <Text style={Style.modalInfoViewTxt}>{"Logradouro: " + val["street"]}</Text>
                                                    <Text style={Style.modalInfoViewTxt}>{"N°: " + val["number"]}</Text>
                                                    <Text style={Style.modalInfoViewTxt}>{"Complemento: " + val["complement"]}</Text>
                                                </ScrollView>
                                            </View>
                                        </View>
                                    )
                                }  
                            })
                            


                        }

                    </View>

                    <View style={Style.newDataScrollViewContainer}>
                        <ScrollView>
                            <TextInput value={newUsername} onChangeText={(text)=> setNewUsername(text)} placeholderTextColor="#A864A8" placeholder="Insira um novo nome" style={Style.inputs}/>
                            <TextInput value={newPassword} onChangeText={(text)=> setNewPassword(text)} placeholderTextColor="#A864A8" placeholder="Insira uma nova senha" style={Style.inputs}/>
                            <TextInput value={newCEP} onChangeText={(text)=> setNewCEP(text)} onBlur={() => requisition(newCEP)} placeholderTextColor="#A864A8" placeholder="Insira um novo CEP" style={Style.inputs}/>
                            <TextInput value={newCity} onChangeText={(text)=> setNewCity(text)} placeholderTextColor="#A864A8" placeholder="Insira um novo Cidade" style={Style.inputs}/>
                            <TextInput value={newUF} onChangeText={(text)=> setNewUF(text)} placeholderTextColor="#A864A8" placeholder="Insira um novo UF" style={Style.inputs}/>
                            <TextInput value={newNeighborhood} onChangeText={(text)=> setNewNeighborhood(text)} placeholderTextColor="#A864A8" placeholder="Insira um novo Bairro" style={Style.inputs}/>
                            <TextInput value={newStreet} onChangeText={(text)=> setNewStreet(text)} placeholderTextColor="#A864A8" placeholder="Insira um novo Logradouro" style={Style.inputs}/>
                            <TextInput value={newNumber} onChangeText={(text)=> setNewNumber(text)} placeholderTextColor="#A864A8" placeholder="Insira um novo n°" style={Style.inputs}/>
                            <TextInput value={newComplement} onChangeText={(text)=> setNewComplement(text)} placeholderTextColor="#A864A8" placeholder="Insira um novo complemento" style={Style.inputs}/>
                        
                           
                        </ScrollView>
                    </View>

                    


                    <TouchableOpacity onPress={()=> editUser(id,newUsername,newPassword, newCEP, newCity, newUF, newNeighborhood, newStreet, newNumber, newComplement)}style={Style.loginBtn}>
                        <Text style={Style.loginBtnTxt}>Alterar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> deleteUser(id)}style={Style.deleteBtn}>
                        <Text style={Style.loginBtnTxt}>Deletar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>setModal(false)} style={Style.btnNavigateView}>
                        <Text style={Style.btnNavigateTxt}>Cancelar</Text>
                    </TouchableOpacity>
                
                </View>

            </View>
        )
        
    }
}
export default ViewScreen;