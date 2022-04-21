const redux=require('redux')
const axios=require('axios')
const logger=require('redux-logger')
// const thunkMiddleware=require('redux-thunk').default
const initialState={
    loading:false,
    payload:[],
    error:''
}
const FETCH_USERS='FETCH_USERS'
const SUCCESS='SUCCESS'
const FAILURE='FAILURE'
const fetchUsers=()=>{
    return {  
       type:FETCH_USERS
    }
}
const success=(users)=>{
    return {
        type:SUCCESS,
        payload:users
}
}
const failure=(message)=>{
    return {
     type:FAILURE,
     error:message
    }
}

const fetchAction=()=>{
    return function (dispatch){
        dispatch(fetchUsers())
        axios.get('https://jsonplaceholder.typicode.com/user').then((response)=>{
            dispatch(success(response.data))
        }   
        ).catch((error)=>{
            dispatch(failure(error.message))
        }   
        )
    }
}


const reducers=(state=initialState, action)=>{
    switch(action.type){
        case FETCH_USERS:
            return {
                ...state,
                loading:true
            }
        case SUCCESS:
            return{
                ...state,
                loading:false,
                payload:action.payload
            }
        case FAILURE:{
            return {
                ...state,
                loading:false,
                error:action.error
            }
        }
        }
}
//by redux thunk we can pass function as action instead of plain object
const store=redux.createStore(reducers,redux.applyMiddleware(thunkMiddleware))
// const store=redux.createStore(reducers, redux.applyMiddleware(logger.createLogger()))
store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetchAction())