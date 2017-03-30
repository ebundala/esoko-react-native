/**
 * Created by ebundala on 3/22/2017.
 */

import * as activity from "../activityIndicator/activitIndicatorAction";


export const initialState = [


    ]


export const PRODUCTS_ACTIONS = {
    ADD: "ADD_PRODUCT",
    GET: "GET_PRODUCT",
    DELETE: "DELETE_PRODUCT",
    EDIT:"EDIT_PRODUCT",
    REVIEW:"DELETE_PRODUCT",
    ADD_BID:"ADD_BID",
    ADD_ORDER:"ADD_ORDER",
    START_CHAT:"START_CHAT"
}

export const queryProducts=(filter,navigate)=>{
    "use strict";
    return(dispatch)=>{

        //TODO query products from local database here

        let UID=Math.ceil(Math.random()*100000)
        let product={
            uid:UID,
            title:"product "+UID,
            discription:"hellow world "+UID,
            price:UID,
            sellerID:"xxxxx",
            catergory:filter

        }
       // dispatch({type:PRODUCTS_ACTIONS.ADD,data:Products})

        let products=[
            product,
            product,
            product


        ];
        dispatch({type:PRODUCTS_ACTIONS.GET,data:products})





        navigate("products", {title: filter})
    }

}



export const  addProduct = (product, navigate) => {
    "use strict";

    return (dispatch) => {
       dispatch(activity.startActivity("addig product"))
let UID=Math.ceil(Math.random()*100000)

        let Products={
           uid:UID,
            title:"product "+UID,
            discription:"hellow world "+UID,
            price:UID,
            sellerID:"xxxxx",

        }
        dispatch({type:PRODUCTS_ACTIONS.ADD,data:Products})

       // setTimeout(() => {
            dispatch(activity.endActivity("end add product"))
      //  }, 000)
    }

}

export const deleteProduct = (product, navigate) => {
    "use strict";
    return (dispatch) => {

    }

}
export const editProduct = (product, navigate) => {
    "use strict";
    return (dispatch) => {
        navigate("editProduct",product)
    }

}
export const placeBid = (product,navigate) => {
    "use strict";
    return (dispatch) => {
        const bids=["c","b","d"]//fetch bids here
        navigate("bids",{product,bids})

    }

}
export const  placeOrder = (product, navigate) => {
    "use strict";
    return (dispatch) => {
        const orders=["c","b","d"]//fetch orders here
        navigate("orders",{product,orders})

    }

}
export const reviewProduct = (product, navigate) => {
    "use strict";
    return (dispatch) => {
        const reviews=["c","b","d"]//TODO fetch reviews here



        navigate("reviews",{product,reviews})
    }

}
export const startChat = (product, navigate) => {
    "use strict";
    return (dispatch) => {
        const chats=['John', 'Joel', 'James', /*'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'*/]//Todo fetch previus chats here

        navigate("chats",{product,chats})
    }

}