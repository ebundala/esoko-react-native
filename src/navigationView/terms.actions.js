/**
 * Created by ebundala on 6/12/2017.
 */


import {TERMS_ACTIONS,TERM_INITIAL_STATE} from "./terms.consts"
import {DB} from "../utils/database"

export const getTerms=(taxonomyName="apps",parentName="base_app")=>{

    return(dispatch)=>
    {
        DB.query("SELECT c.term_taxonomy_id,t.term_id,t.name,t.slug,c.taxonomy,c.parent FROM "+DB.term_taxonomy+" c JOIN "+DB.terms+" t ON c.term_id=t.term_id WHERE c.parent=(SELECT term_id FROM "+DB.terms+" WHERE name='"+parentName+"')" ).then((res)=>{

            //  for(let j=0;j<res.rows.length;j++){
            //   console.log(res.rows.item(j))
            // }

            if(res.rows.length>0)

            dispatch({
                type:TERMS_ACTIONS.GET_TERMS,
                value:{value:res.rows.raw(),name:taxonomyName}})
        })

    }
}
export const getChildTerms=()=>{
    "use strict";
    DB.query("SELECT c.term_taxonomy_id,t.term_id,t.name,t.slug,c.taxonomy,c.parent FROM "+DB.term_taxonomy+" c JOIN "+DB.terms+" t ON c.term_id=t.term_id WHERE c.parent="+category.term_id )
        .then((res)=>{

            this.setState({subCategories:res.rows.raw()});
            return   DB.query("SELECT * FROM "+DB.posts).then((products) => {
                let res=[];
                if(products.rows.length){
                    for(let i=0;i<products.rows.length;i++){
                        res.push(products.rows.item(i));
                    }
                    that.setState({products: res})
                }

                else{

                    that.setState({error: "Nothing was found at " + this.state.subCategory+" ,"+category.categoryName})

                }

            }).catch((e) => {
                //alert("error occured");
                this.setState({error: e.message});
                console.log(e)
            })
        }).catch((e)=>{
        alert("error "+e.message);
    })

}
export const termChanged=(data)=>{

    return{
        type:TERMS_ACTIONS.TERM_CHANGED,
        value:data
    }
}

export const deleteTerm=(data)=>{

    return{
        type:TERMS_ACTIONS.TERM_DELETED,
        value:data
    }
}

export const addTerm=(data)=>{

    return{
        type:TERMS_ACTIONS.ADD_TERMS,
        value:data
    }
}