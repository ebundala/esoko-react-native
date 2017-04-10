/**
 * Created by ebundala on 3/22/2017.
 */

import * as activity from "../activityIndicator/activitIndicatorAction";
import {DB} from "../utils/database"

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
};
export const IMAGES=[
    "http://10.0.2.2 :3000/baseball.png",
    "http://10.0.2.2 :3000/bear.png",
    "http://10.0.2.2 :3000/bison.png",
    "http://10.0.2.2 :3000/brooklyn.png",
    "http://10.0.2.2 :3000/delaware.png",
    "http://10.0.2.2 :3000/goldengate.png",
    "http://10.0.2.2 :3000/goldengate2.png",
    "http://10.0.2.2 :3000/grandcanyon.png",
    "http://10.0.2.2 :3000/leonardo_da_vinci_52027-1400x1050.png",
    "http://10.0.2.2 :3000/liberty2.png",
    "http://10.0.2.2 :3000/rockies-1.png",
    "http://10.0.2.2 :3000/rushmore.png",
    "http://10.0.2.2 :3000/salmoncreek.png",
    "http://10.0.2.2 :3000/shuttle.png",
    "http://10.0.2.2 :3000/teton.png",

]

export const queryProducts=(filter,navigate)=>{
    "use strict";
    return(dispatch)=>{

        //TODO query products from local database here


        //console.log(DB)
         /*   let product=[];
            // dispatch({type:PRODUCTS_ACTIONS.ADD,data:Products})

            let products=[];
            for(let i=0,n=5;i<n;i++){
                let UID=Math.ceil(Math.random()*100000)
                products.push({
                    ID:UID,
                    title:"product "+UID,
                    description:"React Native JS code runs inside this Chrome tab.Press Ctrl⇧J to open Developer Tools. Enable Pause On Caught Exceptions for a better debugging experience.Status: Debugger session"+UID,
                    price:UID,
                    sellerID:"xxxxx",
                    catergory:filter,
                    postedOn:new Date().getTime(),
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


           */
        DB.getAllProducts().then((products) => {
            dispatch({type: PRODUCTS_ACTIONS.GET, data: products});


        })


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