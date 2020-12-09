import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'
import { DB_NAME } from '../constants'

export default class Gift extends BaseModel {
  constructor(obj) {
    super(obj)
  }
 
  static get database() {
    return async () => SQLite.openDatabase(DB_NAME)
  }
 
  static get tableName() {
    return 'gifts'
  }
 
  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true },
      name: { type: types.TEXT, not_null: true },
      person_id: { type: types.INTEGER, not_null: true },
      notes: { type: types.TEXT },
      links: { type: types.TEXT },
      tags: { type: types.TEXT },
      price_cents: { type: types.INTEGER },
      timestamp: { type: types.INTEGER, default: () => Date.now() }
    }
  }
}
