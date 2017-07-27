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
    ,
    locations: {

       "Arusha": {
           "Arusha": {},
           "Karatu": {},
           "Longido": {},
           "Meru": {},
           "Monduli": {},
           "Ngorongoro": {}
        }
        ,"Dar es Salaam": {
           "Ilala": {},
           "Kinondoni": {},
           "Temeke": {},

        }
        ,"Dodoma": {
           "Bahi": {},
           "Chamwino": {},
           "Chemba": {},
           "Dodoma": {},
           "Kondoa": {},
           "Kongwa": {},
           "Mpwapwa": {},
        }
        ,"Geita": {
           "Bukombe": {},
           "Chato": {},
           "Geita": {},
           "Mbogwe": {},
           "Nyanghwale": {},
        }
        ,"Iringa": {
           "Iringa": {},
           "Kilolo": {},
           "Mafinga": {},
           "Mufindi": {},
        }
        ,"Kagera": {
           "Biharamulo": {},
           "Bukoba M": {},
           "Bukoba": {},
           "Karagwe": {},
           "Kyerwa": {},
           "Missenyi": {},
           "Muleba": {},
           "Ngara": {},
        }
        ,"Kaskazini Pemba": {
           "Micheweni": {},
           "Wete": {}
        }
        ,"Kaskazini Unguja": {
           "Kaskazini A": {},
           "Kaskazini B": {},
        }
        ,"Katavi": {
           "Mlele": {},
           "Mpanda": {},
           "Mpanda": {},
        }
        ,"Kigoma": {
           "Buhigwe": {},
           "Kakonko": {},
           "Kasulu": {},
           "Kasulu": {},
           "Kibondo": {},
           "Kigoma": {},
           "Kigoma Ujiji": {},
           "Uvinza": {},
        }
        ,"Kilimanjaro": {
           "Hai": {},
           "Moshi": {},
           "Moshi": {},
           "Mwanga": {},
           "Rombo": {},
           "Same": {},
           "Siha": {},
        }
        ,"Kusini Pemba": {
           "Chake Chake": {},
           "Mkoani": {}
        }
        ,"Kusini Unguja": {
           "Kati": {},
           "Kusini": {},
        }
        ,"Lindi": {
           "Kilwa": {},
           "Lindi M": {},
           "Lindi": {},
           "Liwale": {},
           "Nachingwea": {},
           "Ruangwa": {},
        }
        ,"Manyara": {
           "Babati M": {},
           "Babati": {},
           "Hanang": {},
           "Kiteto": {},
           "Mbulu": {},
           "Simanjiro": {},
        }
        ,"Mara": {
           "Bunda": {},
           "Butiama": {},
           "Musoma M": {},
           "Musoma": {},
           "Rorya": {},
           "Serengeti": {},
           "Tarime": {},
        }
        ,"Mbeya": {
           "Chunya": {},
           "Ileje": {},
           "Kyela": {},
           "Mbarali": {},
           "Mbeya": {},
           "Mbozi": {},
           "Momba": {},
           "Rungwe": {},
           "Tunduma": {},
        }
        ,"Mjini Magharibi": {
           "Magharibi": {},
           "Mjini": {},
        }
        ,"Morogoro": {
           "Gairo": {},
           "Kilombero": {},
           "Kilosa": {},
           "Morogoro M": {},
           "Morogoro": {},
           "Mvomero": {},
           "Ulanga": {},
        }
        ,"Mtwara": {
           "Masasi M": {},
           "Masasi": {},
           "Mtwara": {},
           "Nanyumbu": {},
           "Newala": {},
           "Tandahimba": {},
        }
        ,"Mwanza": {
           "Ilemela": {},
           "Kwimba": {},
           "Magu": {},
           "Misungwi": {},
           "Nyamagana": {},
           "Sengerema": {},
           "Ukerewe": {},
        }
        ,"Njombe": {
           "Ludewa": {},
           "Makambako": {},
           "Makete": {},
           "Njombe": {},
           "Wangingombe": {},
        }
        ,"Pwani": {
           "Bagamoyo": {},
           "Kibaha M": {},
           "Kibaha": {},
           "Kisarawe": {},
           "Mafia": {},
           "Mkuranga": {},
           "Rufiji": {},
        }
        ,"Rukwa": {
           "Kalambo": {},
           "Nkasi": {},
           "Sumbawanga M": {},
           "Sumbawanga": {},
        }
        ,"Ruvuma": {
           "Mbinga": {},
           "Namtumbo": {},
           "Nyasa": {},
           "Songea M": {},
           "Songea": {},
           "Tunduru": {},
        }
        ,"Shinyanga": {
           "Kahama M": {},
           "Kahama": {},
           "Kishapu": {},
           "Shinyanga M": {},
           "Shinyanga": {},
        }
        ,"Simiyu": {
           "Bariadi": {},
           "Busega": {},
           "Itilima": {},
           "Maswa": {},
           "Meatu": {},
        }
        ,"Singida": {
           "Ikungi": {},
           "Manyoni": {},
           "Mkalama": {},
           "Singida M": {},
           "Singida": {},
        }
        ,"Tabora": {
           "Igunga": {},
           "Kaliua": {},
           "Nzega": {},
           "Sikonge": {},
           "Tabora": {},
           "Urambo": {},
           "Uyui": {},
        }
        ,"Tanga": {
           "Handeni M": {},
           "Handeni": {},
           "Kilindi": {},
           "Korogwe M": {},
           "Korogwe": {},
           "Lushoto": {},
           "Mkinga": {},
           "Muheza": {},
           "Pangani": {},
           "Tanga": {}
        }
    }

};

export default dataSchema;