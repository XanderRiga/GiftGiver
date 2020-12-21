import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'
import { DB_NAME } from '../constants'
 
export default class Event extends BaseModel {
  constructor(obj) {
    super(obj)
  }
 
  static get database() {
    return async () => SQLite.openDatabase(DB_NAME)
  }
 
  static get tableName() {
    return 'events'
  }
 
  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true },
      name: { type: types.TEXT, not_null: true },
      person_id: { type: types.INTEGER, not_null: true },
      date: { type: types.DATE }
    }
  }
}
