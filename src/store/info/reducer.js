import { GETINFOLIST ,CHANGEINFOLIST} from './actionType'

const defaultStore = {
    data : {},
    list:[ ]
}

export default (state = defaultStore,action)=>{
    if(action.type === GETINFOLIST){
        // let newState = JSON.parse(JSON.stringify(state))
        let newState = {...state}
        newState.data = action.data;
        return newState
    }
    return state
}