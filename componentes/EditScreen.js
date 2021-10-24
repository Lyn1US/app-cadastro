import React, {useState, useEffect} from 'react';
import {View, Text, Touchable} from 'react-native';
import Style from './style';
import database from '../firebase';
import App, {screen} from '../App.js';
import { Ionicons } from '@expo/vector-icons';
import ViewScreen, {gotoEdit} from './ViewScreen.js';
