import React, {useState, useEffect} from 'react';
import {View, Text, Touchable, TouchableOpacity, ScrollView, SafeAreaView, TextInput} from 'react-native';
import Style from './style';
import database from '../firebase';
import App, {screen} from '../App';
import { Ionicons } from '@expo/vector-icons';

var users = [];
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

    const [newName,setNewName] = useState('');
    const [newPassword, setNewPassword] = useState('');
  
  

  function gotoEdit(id){
      
    setId(id);
    setModal(true);
  
  }

  function editUser(){
    
    alert('Dados alterados com sucesso, veja na página de visualização!')
    setModal(false);
}

  function deleteUser(){
    
    alert('Dados excluídos com sucesso, veja na página de visualização!')
    setModal(false)
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
                            <TextInput onChangeText={(text)=>setNewName(text)} placeholderTextColor="#A864A8" placeholder="Insira um novo nome" style={Style.inputs}/>
                            <TextInput onChangeText={(text)=>setNewPassword(text)} placeholderTextColor="#A864A8" placeholder="Insira uma nova senha" style={Style.inputs}/>
                            <TextInput onChangeText={(text)=> text} placeholderTextColor="#A864A8" placeholder="Insira um novo CEP" style={Style.inputs}/>
                            <TextInput onChangeText={(text)=> text} placeholderTextColor="#A864A8" placeholder="Insira um novo Cidade" style={Style.inputs}/>
                            <TextInput onChangeText={(text)=> text} placeholderTextColor="#A864A8" placeholder="Insira um novo UF" style={Style.inputs}/>
                            <TextInput onChangeText={(text)=> text} placeholderTextColor="#A864A8" placeholder="Insira um novo Bairro" style={Style.inputs}/>
                            <TextInput onChangeText={(text)=> text} placeholderTextColor="#A864A8" placeholder="Insira um novo Logradouro" style={Style.inputs}/>
                            <TextInput onChangeText={(text)=> text} placeholderTextColor="#A864A8" placeholder="Insira um novo n°" style={Style.inputs}/>
                            <TextInput onChangeText={(text)=> text} placeholderTextColor="#A864A8" placeholder="Insira um novo complemento" style={Style.inputs}/>
                        
                           
                        </ScrollView>
                    </View>

                    


                    <TouchableOpacity onPress={()=> editUser()}style={Style.loginBtn}>
                        <Text style={Style.loginBtnTxt}>Alterar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> deleteUser()}style={Style.deleteBtn}>
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