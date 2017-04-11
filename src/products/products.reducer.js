/**
 * Created by ebundala on 3/22/2017.
 */

import {PRODUCTS_ACTIONS,initialState,IMAGES} from "./products.actions"

import {REHYDRATE} from 'redux-persist/constants'

export default productsReducer=(state=initialState,action)=>{

    switch (action.type){

       /* case REHYDRATE:

           /!* if (action.hasOwnProperty("payload"))
               if (action.payload.hasOwnProperty("nav")) {
                   let route = action.payload.nav.routes[action.payload.nav.index];
                   let routeName = route.hasOwnProperty("routes") ? route.routes[route.index].routeName : route.routeName;

                   if(routeName==="allProducts"){
                       //alert("rehydrate "+JSON.stringify(route.params))
                  let title=    route.hasOwnProperty("params")?route.params.hasOwnProperty("title")?route.params.title:"":""
                       if(title){
                     // alert(title)

                           //TODO fetch products here
                           //return

                           let product=[]
                           // dispatch({type:PRODUCTS_ACTIONS.ADD,data:Products})

                           let products=[];
                           for(let i=0,n=10000;i<n;i++){
                               let UID=Math.ceil(Math.random()*100000)
                               products.push({
                                   uid:UID,
                                   title:"product "+UID,
                                   description:"React Native JS code runs inside this Chrome tab.Press Ctrl⇧J to open Developer Tools. Enable Pause On Caught Exceptions for a better debugging experience.Status: Debugger session"+UID,
                                   price:UID,
                                   sellerID:"xxxxx",
                                   catergory:title,
                                   postedOn:new Date().getUTCFullYear(),
                                   currency:"TZS",
                                   photos:[
                                       {name:"one",
                                           url:IMAGES[Math.ceil(Math.random()*10)],
                                           type:"jpg"},
                                       {name:"two",
                                           url:IMAGES[Math.ceil(Math.random()*10)],
                                           type:"jpg"},
                                       {name:"three",
                                           url:IMAGES[Math.ceil(Math.random()*10)],
                                           type:"jpg"},
                                       {name:"four",
                                           url:IMAGES[Math.ceil(Math.random()*10)],
                                           type:"jpg"},
                                       {name:"five",
                                           url:IMAGES[Math.ceil(Math.random()*10)],
                                           type:"jpg"}
                                   ]

                               })
                           }

                           return products;
                       }

                   }
                        return {...state};
                    }
                    else {
                        return {...state};
                    }*!/


                    //
                    //

                    //route=Main.router.getStateForAction(NavigationActions.navigate({routeName:"app"}), action.payload.nav)
                    //alert(JSON.stringify(action.payload.nav))
                    // return {...action.payload.nav};
                    //alert(JSON.stringify(action.type))



            return state;*/

        case PRODUCTS_ACTIONS.GET:
            if(action.data)
            {
                //alert("ADD "+JSON.stringify(state))
               // let st=state
              //  st.push(action.data)
                return action.data||[] //{...state,products:}
            }


            return state
            break;
        case PRODUCTS_ACTIONS.ADD:
            if(action.data)
            {
                //alert("ADD "+JSON.stringify(state))
               let st=state
                st.push(action.data)
                return st||[] //{...state,products:}
            }
            return state
            break;
        case PRODUCTS_ACTIONS.DELETE:
            return state
            break;
        case PRODUCTS_ACTIONS.EDIT:
            return state
            break;
        case PRODUCTS_ACTIONS.ADD_BID:
            return state
            break;
        case PRODUCTS_ACTIONS.ADD_ORDER:
            return state
            break;
        case PRODUCTS_ACTIONS.REVIEW:
            return state
            break;
        case PRODUCTS_ACTIONS.START_CHAT:
            return state
            break;
        default:
            return state

    }
}