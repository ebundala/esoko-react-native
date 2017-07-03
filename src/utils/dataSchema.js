/**
 * Created by ebundala on 7/1/2017.
 */
const dataSchema = {
    termmeta: {
        meta_id:"",
        term_id:"",
        meta_key:"",
        meta_value:"",
    }
    ,
    terms: {
        term_id:"",
        name:"",
        slug:"",
        term_group:"",
    }
    ,
    term_taxonomy: {
        term_taxonomy_id:"",
        term_id:"",
        taxonomy:"",
        description:"",
        parent:"",
        count:"",
    }
    ,
    term_relationships:{
        object_id:"",
        term_taxonomy_id:"",
        term_order:"",
    }
    ,
    commentmeta:{
        meta_id:"",
        comment_id:"",
        meta_key:"",
        meta_value:"",
    }
    ,
    comments: {
        comment_ID:"",
        comment_post_ID:"",
        comment_author:"",
        // comment_author_email:"" ,
        // comment_author_url:"" ,
        // comment_author_IP:"" ,
        comment_date:"",
        // comment_date_gmt:"" ,
        comment_content:"",
        //comment_karma:"" ,
        comment_approved:"",
        //"comment_agent:"" ,
        comment_type:"",
        comment_parent:"",
        user_id:"",
    }
    ,
    postmeta: {
        meta_id:"",
        post_id:"",
        meta_key:"",
        meta_value:"",
    }
    ,
    posts: {
        ID:null,
        post_author:"",
        post_date:"",
        // post_date_gmt:"" ,
        post_content:"",
        post_title:"",
        // post_excerpt:"" ,
        post_status:"",
        comment_status:"",
        //ping_status:"" ,
        //post_password:"" ,
        post_name:"",
        // to_ping:"" ,
        //pinged:"" ,
        post_modified:"",
       // post_modified_gmt:"",
        post_content_filtered:"",
        post_parent:"",
        guid:"",
        menu_order:"",
        post_type:"",
        post_mime_type:"",
        comment_count:"",
        app_id:"",
    }
    ,
    apps: {
        id:"",
        domain:"",
        // path:"" ,
    }
    ,
    appsmeta: {
        meta_id:"",
        site_id:"",
        meta_key:"",
        meta_value:"",
    }
};

export default dataSchema;