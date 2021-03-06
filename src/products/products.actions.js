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
    REVIEW:"REVIEW_PRODUCT",
    ADD_BID:"ADD_BID",
    ADD_ORDER:"ADD_ORDER",
    START_CHAT:"START_CHAT"
};
export const IMAGES=[
    "http://10.0.2.2:3000/IMG-20170330-WA0005.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0006.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0007.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0008.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0009.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0010.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0011.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0012.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0013.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0014.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0015.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0016.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0017.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0018.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0019.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0019.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0020.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0021.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0022.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0023.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0024.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0025.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0026.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0027.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0029.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0030.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0031.jpg",
    "http://10.0.2.2:3000/IMG-20170330-WA0032.jpg",
			
]

export const queryProducts=(filter,navigate)=>{
    "use strict";
    return(dispatch)=>{





        DB.getProducts(filter).then((products) => {
            console.log(products)
            dispatch({type: PRODUCTS_ACTIONS.GET, data: products});
           navigate("products", {title: filter,products})



        }).catch((e)=>{
            alert("error occured");
            console.log(e)
        })









    }

}

export const searchProducts = (keyword,category, navigate) => {
    "use strict";
    return (dispatch) => {

        DB.searchProducts(keyword,category).then((products)=>{
            navigate("searchResults", {title:"Results from "+category,products})

        }).catch((e)=>{
            alert("error occured");
        })

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




        navigate("createReview",{product,reviews:product.reviews})
    }

}
export const allReviews = (product, navigate) => {
    "use strict";
    return (dispatch) => {


//todo fetch reviews here for a product

        navigate("reviews",{product,reviews:product.reviews})
    }

}
export const startChat = (data, navigate) => {
    "use strict";
    return (dispatch) => {
        //const chats=['John', 'Joel', 'James', /*'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'*/]//Todo fetch previus chats here

    if(data.hasOwnProperty("uid")?data.uid==="all":false){

        let chats=[];
        for(let i=0;i<9;i++){
            chats.push({
                userName:"Elias Bundala",
                time:new Date().getTime(),
                body:"hello this is a terible product dont buy it an way too expensive",
                userAvator:IMAGES[Math.floor(Math.random()*31)]
            })
        }


        navigate("chats",{chats})
    }else {
        navigate("singleChat",{data:{userName:"Elias"}})
    }
}



}