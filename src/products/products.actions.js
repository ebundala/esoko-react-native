/**
 * Created by ebundala on 3/22/2017.
 */

import * as activity from "../activityIndicator/activitIndicatorAction";
import {DB} from "../utils/database"
import {initialState,IMAGES,PRODUCTS_ACTIONS} from "./products.consts"


export const queryProducts=(category,navigate)=>{
    "use strict";
    return(dispatch)=>{





        //DB.getProducts(category.categoryName).then((products) => {
            //console.log(products)
            //dispatch({type: PRODUCTS_ACTIONS.GET, data: products});
           navigate("products", {category})



       /* }).catch((e)=>{
            alert("error occured");
            console.log(e)
        })*/









    }

}

export const searchProducts = (keyword,category, navigate) => {
    "use strict";
    return (dispatch) => {

        /*DB.searchProducts(keyword,category).then((products)=>{
            navigate("searchResults", {title:"Results from "+category,products})

        }).catch((e)=>{
            alert("error occured");
        })*/

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