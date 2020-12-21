import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'
import { DB_NAME } from '../constants'
 
export default class Person extends BaseModel {
  constructor(obj) {
    super(obj)
  }
 
  static get database() {
    return async () => SQLite.openDatabase(DB_NAME)
  }
 
  static get tableName() {
    return 'people'
  }
 
  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true },
      name: { type: types.TEXT, not_null: true },
      birth_date: { type: types.DATE },
      relationship: { type: types.TEXT },
    }
  }

  static allGifts(person) {
    const sql = 'SELECT * FROM gifts WHERE gift.person_id = ?'
    const params = [person.id]
    return this.repository.databaseLayer.executeSql(sql, params).then(({ rows }) => rows)
  }
}
