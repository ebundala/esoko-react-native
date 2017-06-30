/**
 * Created by ebundala on 6/17/2017.
 */

import {DB} from "./database";


export function get_DB_schema(scope="all", app_id) 
{

    
    
     

    /*if ( app_id && app_id != DB.app_id )
    old_app_id = DB.set_app_id( app_id );*/

    // Engage multisite if in the middle of turning it on from network.php.
   

    /*
     * Indexes have a maximum size of 767 bytes. Historically, we haven't need to be concerned about that.
     * As of 4.2, however, we moved to utf8mb4, which uses 4 bytes per character. This means that an index which
     * used to have room for floor(767/3) = 255 characters, now only has room for floor(767/4) = 191 characters.
     */
    max_index_length = 191;

    // Blog specific tables.
  const  app_tables = ["CREATE TABLE IF NOT EXISTS  "+DB.termmeta+" (" +
        "meta_id bigint(20)  NOT NULL ," +
        "term_id bigint(20)  NOT NULL default '0'," +
        "meta_key varchar(255) default NULL," +
        "meta_value longtext," +
        "PRIMARY KEY  (meta_id)" +
       // "INDEX term_id (term_id)," +
        //"KEY meta_key (meta_key("+max_index_length+"))" +
        ");"
      ,
   "CREATE TABLE IF NOT EXISTS  "+DB.terms +"(" +
    "term_id bigint(20)  NOT NULL ," +
        "name varchar(200) NOT NULL default ''," +
        "slug varchar(200) NOT NULL default ''," +
        "term_group bigint(10) NOT NULL default 0," +
        "PRIMARY KEY  (term_id)" +
        //"KEY slug (slug("+max_index_length+"))," +
       // "KEY name (name("+max_index_length+"))" +
   ") ;"
      ,
      "CREATE TABLE IF NOT EXISTS  "+DB.term_taxonomy +"(" +
        "term_taxonomy_id bigint(20)  NOT NULL ," +
        "term_id bigint(20)  NOT NULL default 0," +
        "taxonomy varchar(32) NOT NULL default ''," +
        "description longtext NOT NULL," +
        "parent bigint(20)  NOT NULL default 0," +
        "count bigint(20) NOT NULL default 0," +
        "PRIMARY KEY  (term_taxonomy_id)" +
       // "UNIQUE KEY term_id_taxonomy (term_id,taxonomy)" +
       // "KEY taxonomy (taxonomy)" +
        ") ;"
      ,
        "CREATE TABLE IF NOT EXISTS  "+DB.term_relationships +"(" +
        "object_id bigint(20)  NOT NULL default 0," +
        "term_taxonomy_id bigint(20)  NOT NULL default 0," +
        "term_order int(11) NOT NULL default 0," +
        "PRIMARY KEY  (object_id,term_taxonomy_id)" +
       // "KEY term_taxonomy_id (term_taxonomy_id)" +
        ") ;"
            ,
            
        "CREATE TABLE IF NOT EXISTS  "+DB.commentmeta +"(" +
        "meta_id bigint(20)  NOT NULL ," +
        "comment_id bigint(20)  NOT NULL default '0'," +
        "meta_key varchar(255) default NULL," +
        "meta_value longtext," +
        "PRIMARY KEY  (meta_id)" +
       // "KEY comment_id (comment_id)," +
       // "KEY meta_key (meta_key("+max_index_length+"))" +
        ") ;"
            
            ,
        "CREATE TABLE IF NOT EXISTS  "+DB.comments+" (" +
        "comment_ID bigint(20)  NOT NULL ," +
        "comment_post_ID bigint(20)  NOT NULL default '0'," +
        "comment_author tinytext NOT NULL," +
        "comment_author_email varchar(100) NOT NULL default ''," +
        "comment_author_url varchar(200) NOT NULL default ''," +
        "comment_author_IP varchar(100) NOT NULL default ''," +
        "comment_date datetime NOT NULL default '0000-00-00 00:00:00'," +
        "comment_date_gmt datetime NOT NULL default '0000-00-00 00:00:00'," +
        "comment_content text NOT NULL," +
        "comment_karma int(11) NOT NULL default '0'," +
        "comment_approved varchar(20) NOT NULL default '1'," +
        "comment_agent varchar(255) NOT NULL default ''," +
        "comment_type varchar(20) NOT NULL default ''," +
        "comment_parent bigint(20)  NOT NULL default '0'," +
        "user_id bigint(20)  NOT NULL default '0'," +
        "PRIMARY KEY  (comment_ID)" +
       // "KEY comment_post_ID (comment_post_ID)," +
       // "KEY comment_approved_date_gmt (comment_approved,comment_date_gmt)," +
        //"KEY comment_date_gmt (comment_date_gmt)," +
       // "KEY comment_parent (comment_parent)," +
       // "KEY comment_author_email (comment_author_email(10))" +
        ") ;"
        ,
        "CREATE TABLE IF NOT EXISTS  "+DB.postmeta+" (" +
        "meta_id bigint(20)  NOT NULL ," +
        "post_id bigint(20)  NOT NULL default '0'," +
        "meta_key varchar(255) default NULL," +
        "meta_value longtext," +
        "PRIMARY KEY  (meta_id)" +
       // "KEY post_id (post_id)," +
       // "KEY meta_key (meta_key("+max_index_length+"))" +
        ") ;"
        ,
        "CREATE TABLE IF NOT EXISTS  "+DB.posts+" (" +
        "ID bigint(20)  NOT NULL ," +
        "post_author bigint(20)  NOT NULL default '0'," +
        "post_date datetime NOT NULL default '0000-00-00 00:00:00'," +
        "post_date_gmt datetime NOT NULL default '0000-00-00 00:00:00'," +
        "post_content longtext NOT NULL," +
        "post_title text NOT NULL," +
        "post_excerpt text NOT NULL," +
        "post_status varchar(20) NOT NULL default 'publish'," +
        "comment_status varchar(20) NOT NULL default 'open'," +
        "ping_status varchar(20) NOT NULL default 'open'," +
        "post_password varchar(255) NOT NULL default ''," +
        "post_name varchar(200) NOT NULL default ''," +
        "to_ping text NOT NULL," +
        "pinged text NOT NULL," +
        "post_modified datetime NOT NULL default '0000-00-00 00:00:00'," +
        "post_modified_gmt datetime NOT NULL default '0000-00-00 00:00:00'," +
        "post_content_filtered longtext NOT NULL," +
        "post_parent bigint(20)  NOT NULL default '0'," +
        "guid varchar(255) NOT NULL default ''," +
        "menu_order int(11) NOT NULL default '0'," +
        "post_type varchar(20) NOT NULL default 'post'," +
        "post_mime_type varchar(100) NOT NULL default ''," +
        "comment_count bigint(20) NOT NULL default '0'," +
        "PRIMARY KEY  (ID)" +
        //"KEY post_name (post_name("+max_index_length+"))," +
       // "KEY type_status_date (post_type,post_status,post_date,ID)," +
       // "KEY post_parent (post_parent)," +
       // "KEY post_author (post_author)
      ");"
           ,
        "CREATE TABLE IF NOT EXISTS  "+DB.apps+" (" +
        "id bigint(20) NOT NULL ," +
        "domain varchar(200) NOT NULL default ''," +
        "path varchar(100) NOT NULL default ''," +
        "PRIMARY KEY  (id)" +
        //"KEY domain (domain(140),path(51))" +
        ");"
            ,
        "CREATE TABLE IF NOT EXISTS "+DB.appsmeta+" (" +
        "meta_id bigint(20) NOT NULL ," +
        "site_id bigint(20) NOT NULL default '0'," +
        "meta_key varchar(255) default NULL," +
        "meta_value longtext," +
        "PRIMARY KEY  (meta_id)" +
        //"KEY meta_key (meta_key("+max_index_length+"))," +
        //"KEY site_id (site_id)" +
        ")"];
    
return app_tables;
}

