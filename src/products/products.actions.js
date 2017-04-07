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
};
export const IMAGES=[
    require("../pngs/baseball.png"),
    require("../pngs/bear.png"),
    require("../pngs/bison.png"),
    require("../pngs/brooklyn.png"),
    require("../pngs/delaware.png"),
    require("../pngs/goldengate.png"),
    require("../pngs/goldengate2.png"),
    require("../pngs/grandcanyon.png"),
    require("../pngs/leonardo_da_vinci_52027-1400x1050.png"),
    require("../pngs/liberty2.png"),
    require("../pngs/rockies-1.png"),
    require("../pngs/rushmore.png"),
    require("../pngs/salmoncreek.png"),
    require("../pngs/shuttle.png"),
    require("../pngs/teton.png"),

]

export const queryProducts=(filter,navigate)=>{
    "use strict";
    return(dispatch)=>{

        //TODO query products from local database here


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
                catergory:filter,
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