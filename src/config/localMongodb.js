import AsyncStorage from '@react-native-community/async-storage';
// Type 3: Persistent datastore with automatic loading
var Datastore = require('react-native-local-mongodb')
  , db = new Datastore({ filename: 'asyncStorageKey', storage: AsyncStorage, autoload: true });

export const myDB = db;