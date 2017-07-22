/**
 * Created by ebundala on 6/17/2017.
 */

import {DB} from "./database";


export function get_DB_schema(scope="all", app_id) 
{
    /*
     * Indexes have a maximum size of 767 bytes. Historically, we haven't need to be concerned about that.
     * As of 4.2, however, we moved to utf8mb4, which uses 4 bytes per character. This means that an index which
     * used to have room for floor(767/3) = 255 characters, now only has room for floor(767/4) = 191 characters.
     */
  const  max_index_length = 191;

    // Blog specific tables.
  const  app_tables = ["CREATE TABLE IF NOT EXISTS  "+DB.termmeta+" (" +
        "meta_id INTEGER  NOT NULL ," +
        "term_id INTEGER  NOT NULL DEFAULT '0'," +
        "meta_key VARCHAR(255) DEFAULT NULL," +
        "meta_value longtext," +
        "PRIMARY KEY  (meta_id)" +
        //" KEY term_id (term_id)," +
        //"KEY meta_key (meta_key("+max_index_length+"))" +
        ");"
      ,
   "CREATE TABLE IF NOT EXISTS  "+DB.terms +"(" +
    "term_id INTEGER  NOT NULL ," +
        "name VARCHAR(200) NOT NULL DEFAULT ''," +
        "slug VARCHAR(200) NOT NULL DEFAULT ''," +
        "term_group INTEGER NOT NULL DEFAULT 0," +
        "PRIMARY KEY  (term_id)" +
        //"KEY slug (slug("+max_index_length+"))," +
       // "KEY name (name("+max_index_length+"))" +
   ") ;"
      ,
      "CREATE TABLE IF NOT EXISTS  "+DB.term_taxonomy +"(" +
        "term_taxonomy_id INTEGER  NOT NULL ," +
        "term_id INTEGER  NOT NULL DEFAULT 0," +
        "taxonomy VARCHAR(32) NOT NULL DEFAULT ''," +
        "description longtext NOT NULL DEFAULT ''," +
        "parent INTEGER  NOT NULL DEFAULT 0," +
        "count INTEGER NOT NULL DEFAULT 0," +
        "PRIMARY KEY  (term_taxonomy_id)" +
       // "UNIQUE KEY term_id_taxonomy (term_id,taxonomy)" +
       // "KEY taxonomy (taxonomy)" +
        ") ;"
      ,
        "CREATE TABLE IF NOT EXISTS  "+DB.term_relationships +"(" +
        "object_id INTEGER  NOT NULL DEFAULT 0," +
        "term_taxonomy_id INTEGER  NOT NULL DEFAULT 0," +
        "term_order int(11) NOT NULL DEFAULT 0," +
        "PRIMARY KEY  (object_id,term_taxonomy_id)" +
       // "KEY term_taxonomy_id (term_taxonomy_id)" +
        ") ;"
            ,
            
        "CREATE TABLE IF NOT EXISTS  "+DB.commentmeta +"(" +
        "meta_id INTEGER  NOT NULL ," +
        "comment_id INTEGER  NOT NULL DEFAULT '0'," +
        "meta_key VARCHAR(255) DEFAULT NULL," +
        "meta_value longtext," +
        "PRIMARY KEY  (meta_id)" +
       // "KEY comment_id (comment_id)," +
       // "KEY meta_key (meta_key("+max_index_length+"))" +
        ") ;"
            
            ,
        "CREATE TABLE IF NOT EXISTS  "+DB.comments+" (" +
        "comment_ID INTEGER  NOT NULL ," +
        "comment_post_ID INTEGER  NOT NULL DEFAULT '0'," +
        "comment_author tinytext NOT NULL," +
       // "comment_author_email VARCHAR(100) NOT NULL DEFAULT ''," +
       // "comment_author_url VARCHAR(200) NOT NULL DEFAULT ''," +
       // "comment_author_IP VARCHAR(100) NOT NULL DEFAULT ''," +
        "comment_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP," +
       // "comment_date_gmt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "comment_content text NOT NULL," +
        //"comment_karma int(11) NOT NULL DEFAULT '0'," +
        "comment_approved VARCHAR(20) NOT NULL DEFAULT '1'," +
        //"comment_agent VARCHAR(255) NOT NULL DEFAULT ''," +
        "comment_type VARCHAR(20) NOT NULL DEFAULT ''," +
        "comment_parent INTEGER  NOT NULL DEFAULT '0'," +
        "user_id INTEGER  NOT NULL DEFAULT '0'," +
        "PRIMARY KEY  (comment_ID)" +
       // "KEY comment_post_ID (comment_post_ID)," +
       // "KEY comment_approved_date_gmt (comment_approved,comment_date_gmt)," +
        //"KEY comment_date_gmt (comment_date_gmt)," +
       // "KEY comment_parent (comment_parent)," +
       // "KEY comment_author_email (comment_author_email(10))" +
        ") ;"
        ,
        "CREATE TABLE IF NOT EXISTS  "+DB.postmeta+" (" +
        "meta_id INTEGER  NOT NULL ," +
        "post_id INTEGER  NOT NULL DEFAULT '0'," +
        "meta_key VARCHAR(255) DEFAULT NULL," +
        "meta_value longtext," +
        "PRIMARY KEY  (meta_id)" +
       // "KEY post_id (post_id)," +
       // "KEY meta_key (meta_key("+max_index_length+"))" +
        ") ;"
        ,
        "CREATE TABLE IF NOT EXISTS  "+DB.posts+" (" +
        "ID INTEGER  ," +
        "post_author INTEGER  NOT NULL DEFAULT '0'," +
        "post_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP," +
       // "post_date_gmt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "post_content longtext NOT NULL," +
        "post_title text NOT NULL," +
       // "post_excerpt text NOT NULL," +
        "post_status VARCHAR(20) NOT NULL DEFAULT 'publish'," +
        "comment_status VARCHAR(20) NOT NULL DEFAULT 'open'," +
        //"ping_status VARCHAR(20) NOT NULL DEFAULT 'open'," +
        //"post_password VARCHAR(255) NOT NULL DEFAULT ''," +
        "post_name VARCHAR(200) NOT NULL DEFAULT ''," +
       // "to_ping text NOT NULL," +
        //"pinged text NOT NULL," +
        "post_modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP," +
       // "post_modified_gmt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "post_content_filtered longtext NOT NULL DEFAULT ''," +
        "post_parent INTEGER  NOT NULL DEFAULT '0'," +
        "guid VARCHAR(255) NOT NULL DEFAULT ''," +
        "menu_order int(11) NOT NULL DEFAULT '0'," +
        "post_type VARCHAR(20) NOT NULL DEFAULT 'post'," +
        "post_mime_type VARCHAR(100) NOT NULL DEFAULT ''," +
        "comment_count INTEGER NOT NULL DEFAULT '0'," +
        "app_id INTEGER NOT NULL DEFAULT '0'," +
        "PRIMARY KEY  (ID)" +
        //"KEY post_name (post_name("+max_index_length+"))," +
       // "KEY type_status_date (post_type,post_status,post_date,ID)," +
       // "KEY post_parent (post_parent)," +
       // "KEY post_author (post_author)
      ");"
           ,
        "CREATE TABLE IF NOT EXISTS  "+DB.apps+" (" +
        "id INTEGER NOT NULL ," +
        "domain VARCHAR(200) NOT NULL DEFAULT ''," +
       // "path VARCHAR(100) NOT NULL DEFAULT ''," +
        "PRIMARY KEY  (id)" +
        //"KEY domain (domain(140),path(51))" +
        ");"
            ,
        "CREATE TABLE IF NOT EXISTS "+DB.appsmeta+" (" +
        "meta_id INTEGER NOT NULL ," +
        "site_id INTEGER NOT NULL DEFAULT '0'," +
        "meta_key VARCHAR(255) DEFAULT NULL," +
        "meta_value longtext," +
        "PRIMARY KEY  (meta_id)" +
        //"KEY meta_key (meta_key("+max_index_length+"))," +
        //"KEY site_id (site_id)" +
        ")"];
    
return app_tables;
}

