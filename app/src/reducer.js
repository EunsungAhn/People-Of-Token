import { combineReducers } from 'redux'
import { drizzleReducers } from '@drizzle/store'


const reducer = combineReducers({
   ...drizzleReducers
})

export default reducer
