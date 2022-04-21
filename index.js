const redux= require('redux')
const logger=require('redux-logger')
// action provider function which returns action object
//action object contains type of the action to be emit
function actionProvider(){
    return {
        type:'BUY_CAKE'
    }
}

function cakeActionProvider(){
    return {
        type:'BUY_CAKE'
    }
}

function chocolateActionProvider(){
    return {
        type:'BUY_CHOCOLATES'
    }
}
const initialState={
    noOfCakes:10
}

const cakeState={
    noOfCakes:50
}
const chocolateState={
    noOfChocolates:30
}
//reducers are responsible for updating the state
const reducers= (state=initialState,action)=>{
    switch(action.type){
        case 'BUY_CAKE':{
            console.log("In case")
            return {
            ...state,
            noOfCakes:state.noOfCakes-1
        }}
        default:return state
    }
}

const cakeReducer=(state=cakeState,action)=>{
    switch(action.type){
        case 'BUY_CAKE':return {
            ...state,
            noOfCakes:state.noOfCakes-1
        }
        default:return state
    }
}

const chocolateReducer=(state=chocolateState,action)=>{
    switch(action.type){
        case 'BUY_CHOCOLATES':return {
            ...state,
            noOfChocolates:state.noOfChocolates-1
        }
        default:return state
    }
}
//createStore method creates a store 
// const store=redux.createStore(cakeReducer)//store with single reducer

// store with middleware which used for by default logger
const store=redux.createStore(cakeReducer, redux.applyMiddleware(logger.createLogger()))//

/* const multipleReducers=redux.combineReducers({
    cake:cakeReducer,
    chocolate:chocolateReducer
}) *///multiple reducers to manage multiple products
// const store=redux.createStore(multipleReducers)//store with multiple reducers
console.log("Initial state",store.getState())

//subscribe method do the given task after each and every time when state is updated
const unsubscribe=store.subscribe(()=>{})

//dispatch is used to invoke the action
store.dispatch(cakeActionProvider())
store.dispatch(chocolateActionProvider())
// store.dispatch(cakeActionProvider())
// store.dispatch(cakeActionProvider())
// store.dispatch(chocolateActionProvider())
unsubscribe();