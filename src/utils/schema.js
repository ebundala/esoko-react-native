/**
 * Created by ebundala on 6/17/2017.
 */

//import {wpdb} from "db";

export function wp_get_db_schema(scope, blog_id) {
    if (typeof scope === 'undefined') scope = null;

    if (typeof blog_id === 'undefined')
        blog_id = null;


    // variables into current scope
    var result, charset_collate, wpdb, old_blog_id, is_multisite, max_index_length, blog_tables, users_single_table, users_multi_table, usermeta_table, global_tables, ms_global_tables, queries;
    // Not supported "global" at line 37
    charset_collate = wpdb.get_charset_collate();
    if (blog_id && blog_id != wpdb.blogid)
        old_blog_id = wpdb.set_blog_id(blog_id);
    is_multisite = fn__is_multisite();
    /* * Indexes have a maximum size of 767 bytes. Historically, we haven't need to be concerned about that.
     * As of 4.2, however, we moved to utf8mb4, which uses 4 bytes per character. This means that an index which
     * used to have room for floor(767/3) = 255 characters, now only has room for floor(767/4) = 191 characters. */
    max_index_length = 191;
    // Blog specific tables.
    blog_tables = 'CREATE TABLE ' + wpdb.termmeta    // Not supported "propertylookup" at line 55
        + ' (\n  meta_id bigint(20) unsigned NOT NULL auto_increment,\n  term_id bigint(20) unsigned NOT NULL default \'0\',\n  meta_key varchar(255) default NULL,\n  meta_value longtext,\n  PRIMARY KEY  (meta_id),\n  KEY term_id (term_id),\n  KEY meta_key (meta_key(' + max_index_length + '))\n) ' + charset_collate + ';\nCREATE TABLE ' +   wpdb.terms  // Not supported "propertylookup" at line 64
        +' (\n term_id bigint(20) unsigned NOT NULL auto_increment,\n name varchar(200) NOT NULL default \'\',\n slug varchar(200) NOT NULL default \'\',\n term_group bigint(10) NOT NULL default 0,\n PRIMARY KEY  (term_id),\n KEY slug (slug(' + max_index_length + ')),\n KEY name (name(' + max_index_length + '))\n) ' + charset_collate + ';\nCREATE TABLE ' +   wpdb.term_taxonomy  // Not supported "propertylookup" at line 73
        +' (\n term_taxonomy_id bigint(20) unsigned NOT NULL auto_increment,\n term_id bigint(20) unsigned NOT NULL default 0,\n taxonomy varchar(32) NOT NULL default \'\',\n description longtext NOT NULL,\n parent bigint(20) unsigned NOT NULL default 0,\n count bigint(20) NOT NULL default 0,\n PRIMARY KEY  (term_taxonomy_id),\n UNIQUE KEY term_id_taxonomy (term_id,taxonomy),\n KEY taxonomy (taxonomy)\n) ' + charset_collate + ';\nCREATE TABLE ' + wpdb.term_relationships    // Not supported "propertylookup" at line 84
        +' (\n object_id bigint(20) unsigned NOT NULL default 0,\n term_taxonomy_id bigint(20) unsigned NOT NULL default 0,\n term_order int(11) NOT NULL default 0,\n PRIMARY KEY  (object_id,term_taxonomy_id),\n KEY term_taxonomy_id (term_taxonomy_id)\n) ' + charset_collate + ';\nCREATE TABLE ' +   wpdb.commentmeta  // Not supported "propertylookup" at line 91
        +' (\n  meta_id bigint(20) unsigned NOT NULL auto_increment,\n  comment_id bigint(20) unsigned NOT NULL default \'0\',\n  meta_key varchar(255) default NULL,\n  meta_value longtext,\n  PRIMARY KEY  (meta_id),\n  KEY comment_id (comment_id),\n  KEY meta_key (meta_key(' + max_index_length + '))\n) ' + charset_collate + ';\nCREATE TABLE ' +  wpdb.comments   // Not supported "propertylookup" at line 100
        +' (\n  comment_ID bigint(20) unsigned NOT NULL auto_increment,\n  comment_post_ID bigint(20) unsigned NOT NULL default \'0\',\n  comment_author tinytext NOT NULL,\n  comment_author_email varchar(100) NOT NULL default \'\',\n  comment_author_url varchar(200) NOT NULL default \'\',\n  comment_author_IP varchar(100) NOT NULL default \'\',\n  comment_date datetime NOT NULL default \'0000-00-00 00:00:00\',\n  comment_date_gmt datetime NOT NULL default \'0000-00-00 00:00:00\',\n  comment_content text NOT NULL,\n  comment_karma int(11) NOT NULL default \'0\',\n  comment_approved varchar(20) NOT NULL default \'1\',\n  comment_agent varchar(255) NOT NULL default \'\',\n  comment_type varchar(20) NOT NULL default \'\',\n  comment_parent bigint(20) unsigned NOT NULL default \'0\',\n  user_id bigint(20) unsigned NOT NULL default \'0\',\n  PRIMARY KEY  (comment_ID),\n  KEY comment_post_ID (comment_post_ID),\n  KEY comment_approved_date_gmt (comment_approved,comment_date_gmt),\n  KEY comment_date_gmt (comment_date_gmt),\n  KEY comment_parent (comment_parent),\n  KEY comment_author_email (comment_author_email(10))\n) ' + charset_collate + ';\nCREATE TABLE ' +  wpdb.links   // Not supported "propertylookup" at line 123
        +' (\n  link_id bigint(20) unsigned NOT NULL auto_increment,\n  link_url varchar(255) NOT NULL default \'\',\n  link_name varchar(255) NOT NULL default \'\',\n  link_image varchar(255) NOT NULL default \'\',\n  link_target varchar(25) NOT NULL default \'\',\n  link_description varchar(255) NOT NULL default \'\',\n  link_visible varchar(20) NOT NULL default \'Y\',\n  link_owner bigint(20) unsigned NOT NULL default \'1\',\n  link_rating int(11) NOT NULL default \'0\',\n  link_updated datetime NOT NULL default \'0000-00-00 00:00:00\',\n  link_rel varchar(255) NOT NULL default \'\',\n  link_notes mediumtext NOT NULL,\n  link_rss varchar(255) NOT NULL default \'\',\n  PRIMARY KEY  (link_id),\n  KEY link_visible (link_visible)\n) ' + charset_collate + ';\nCREATE TABLE ' +   wpdb.options  // Not supported "propertylookup" at line 140
        +' (\n  option_id bigint(20) unsigned NOT NULL auto_increment,\n  option_name varchar(191) NOT NULL default \'\',\n  option_value longtext NOT NULL,\n  autoload varchar(20) NOT NULL default \'yes\',\n  PRIMARY KEY  (option_id),\n  UNIQUE KEY option_name (option_name)\n) ' + charset_collate + ';\nCREATE TABLE ' +  wpdb.postmeta   // Not supported "propertylookup" at line 148
        +' (\n  meta_id bigint(20) unsigned NOT NULL auto_increment,\n  post_id bigint(20) unsigned NOT NULL default \'0\',\n  meta_key varchar(255) default NULL,\n  meta_value longtext,\n  PRIMARY KEY  (meta_id),\n  KEY post_id (post_id),\n  KEY meta_key (meta_key(' + max_index_length + '))\n) ' + charset_collate + ';\nCREATE TABLE ' +   wpdb.posts  // Not supported "propertylookup" at line 157
        +' (\n  ID bigint(20) unsigned NOT NULL auto_increment,\n  post_author bigint(20) unsigned NOT NULL default \'0\',\n  post_date datetime NOT NULL default \'0000-00-00 00:00:00\',\n  post_date_gmt datetime NOT NULL default \'0000-00-00 00:00:00\',\n  post_content longtext NOT NULL,\n  post_title text NOT NULL,\n  post_excerpt text NOT NULL,\n  post_status varchar(20) NOT NULL default \'publish\',\n  comment_status varchar(20) NOT NULL default \'open\',\n  ping_status varchar(20) NOT NULL default \'open\',\n  post_password varchar(255) NOT NULL default \'\',\n  post_name varchar(200) NOT NULL default \'\',\n  to_ping text NOT NULL,\n  pinged text NOT NULL,\n  post_modified datetime NOT NULL default \'0000-00-00 00:00:00\',\n  post_modified_gmt datetime NOT NULL default \'0000-00-00 00:00:00\',\n  post_content_filtered longtext NOT NULL,\n  post_parent bigint(20) unsigned NOT NULL default \'0\',\n  guid varchar(255) NOT NULL default \'\',\n  menu_order int(11) NOT NULL default \'0\',\n  post_type varchar(20) NOT NULL default \'post\',\n  post_mime_type varchar(100) NOT NULL default \'\',\n  comment_count bigint(20) NOT NULL default \'0\',\n  PRIMARY KEY  (ID),\n  KEY post_name (post_name(' + max_index_length + ')),\n  KEY type_status_date (post_type,post_status,post_date,ID),\n  KEY post_parent (post_parent),\n  KEY post_author (post_author)\n) ' + charset_collate + ';\n';
    // Single site users table. The multisite flavor of the users table is handled below.
    users_single_table = 'CREATE TABLE ' +  wpdb.users   // Not supported "propertylookup" at line 189
        +' (\n  ID bigint(20) unsigned NOT NULL auto_increment,\n  user_login varchar(60) NOT NULL default \'\',\n  user_pass varchar(255) NOT NULL default \'\',\n  user_nicename varchar(50) NOT NULL default \'\',\n  user_email varchar(100) NOT NULL default \'\',\n  user_url varchar(100) NOT NULL default \'\',\n  user_registered datetime NOT NULL default \'0000-00-00 00:00:00\',\n  user_activation_key varchar(255) NOT NULL default \'\',\n  user_status int(11) NOT NULL default \'0\',\n  display_name varchar(250) NOT NULL default \'\',\n  PRIMARY KEY  (ID),\n  KEY user_login_key (user_login),\n  KEY user_nicename (user_nicename),\n  KEY user_email (user_email)\n) ' + charset_collate + ';\n';
    // Multisite users table
    users_multi_table = 'CREATE TABLE ' +   wpdb.users  // Not supported "propertylookup" at line 207
        +' (\n  ID bigint(20) unsigned NOT NULL auto_increment,\n  user_login varchar(60) NOT NULL default \'\',\n  user_pass varchar(255) NOT NULL default \'\',\n  user_nicename varchar(50) NOT NULL default \'\',\n  user_email varchar(100) NOT NULL default \'\',\n  user_url varchar(100) NOT NULL default \'\',\n  user_registered datetime NOT NULL default \'0000-00-00 00:00:00\',\n  user_activation_key varchar(255) NOT NULL default \'\',\n  user_status int(11) NOT NULL default \'0\',\n  display_name varchar(250) NOT NULL default \'\',\n  spam tinyint(2) NOT NULL default \'0\',\n  deleted tinyint(2) NOT NULL default \'0\',\n  PRIMARY KEY  (ID),\n  KEY user_login_key (user_login),\n  KEY user_nicename (user_nicename),\n  KEY user_email (user_email)\n) ' + charset_collate + ';\n';
    // Usermeta.
    usermeta_table = 'CREATE TABLE ' +   wpdb.usermeta  // Not supported "propertylookup" at line 227
        +' (\n  umeta_id bigint(20) unsigned NOT NULL auto_increment,\n  user_id bigint(20) unsigned NOT NULL default \'0\',\n  meta_key varchar(255) default NULL,\n  meta_value longtext,\n  PRIMARY KEY  (umeta_id),\n  KEY user_id (user_id),\n  KEY meta_key (meta_key(' + max_index_length + '))\n) ' + charset_collate + ';\n';
    // Global tables
    if (is_multisite) global_tables = users_multi_table + usermeta_table else global_tables = users_single_table + usermeta_table
    // Multisite global tables.
    ms_global_tables = 'CREATE TABLE ' +  wpdb.blogs   // Not supported "propertylookup" at line 244
        +' (\n  blog_id bigint(20) NOT NULL auto_increment,\n  site_id bigint(20) NOT NULL default \'0\',\n  domain varchar(200) NOT NULL default \'\',\n  path varchar(100) NOT NULL default \'\',\n  registered datetime NOT NULL default \'0000-00-00 00:00:00\',\n  last_updated datetime NOT NULL default \'0000-00-00 00:00:00\',\n  public tinyint(2) NOT NULL default \'1\',\n  archived tinyint(2) NOT NULL default \'0\',\n  mature tinyint(2) NOT NULL default \'0\',\n  spam tinyint(2) NOT NULL default \'0\',\n  deleted tinyint(2) NOT NULL default \'0\',\n  lang_id int(11) NOT NULL default \'0\',\n  PRIMARY KEY  (blog_id),\n  KEY domain (domain(50),path(5)),\n  KEY lang_id (lang_id)\n) ' + charset_collate + ';\nCREATE TABLE ' + wpdb.blog_versions    // Not supported "propertylookup" at line 261
        +' (\n  blog_id bigint(20) NOT NULL default \'0\',\n  db_version varchar(20) NOT NULL default \'\',\n  last_updated datetime NOT NULL default \'0000-00-00 00:00:00\',\n  PRIMARY KEY  (blog_id),\n  KEY db_version (db_version)\n) ' + charset_collate + ';\nCREATE TABLE ' + wpdb.registration_log    // Not supported "propertylookup" at line 268
        +' (\n  ID bigint(20) NOT NULL auto_increment,\n  email varchar(255) NOT NULL default \'\',\n  IP varchar(30) NOT NULL default \'\',\n  blog_id bigint(20) NOT NULL default \'0\',\n  date_registered datetime NOT NULL default \'0000-00-00 00:00:00\',\n  PRIMARY KEY  (ID),\n  KEY IP (IP)\n) ' + charset_collate + ';\nCREATE TABLE ' + wpdb.site    // Not supported "propertylookup" at line 277
        +' (\n  id bigint(20) NOT NULL auto_increment,\n  domain varchar(200) NOT NULL default \'\',\n  path varchar(100) NOT NULL default \'\',\n  PRIMARY KEY  (id),\n  KEY domain (domain(140),path(51))\n) ' + charset_collate + ';\nCREATE TABLE ' + wpdb.sitemeta    // Not supported "propertylookup" at line 284
        +' (\n  meta_id bigint(20) NOT NULL auto_increment,\n  site_id bigint(20) NOT NULL default \'0\',\n  meta_key varchar(255) default NULL,\n  meta_value longtext,\n  PRIMARY KEY  (meta_id),\n  KEY meta_key (meta_key(' + max_index_length + ')),\n  KEY site_id (site_id)\n) ' + charset_collate + ';\nCREATE TABLE ' + wpdb.signups    // Not supported "propertylookup" at line 293
        +' (\n  signup_id bigint(20) NOT NULL auto_increment,\n  domain varchar(200) NOT NULL default \'\',\n  path varchar(100) NOT NULL default \'\',\n  title longtext NOT NULL,\n  user_login varchar(60) NOT NULL default \'\',\n  user_email varchar(100) NOT NULL default \'\',\n  registered datetime NOT NULL default \'0000-00-00 00:00:00\',\n  activated datetime NOT NULL default \'0000-00-00 00:00:00\',\n  active tinyint(1) NOT NULL default \'0\',\n  activation_key varchar(50) NOT NULL default \'\',\n  meta longtext,\n  PRIMARY KEY  (signup_id),\n  KEY activation_key (activation_key),\n  KEY user_email (user_email),\n  KEY user_login_email (user_login,user_email),\n  KEY domain_path (domain(140),path(51))\n) ' + charset_collate + ';';

    switch ( scope ) {
        case 'blog' :
            queries = blog_tables;
            break;
        case 'global' :
            queries = global_tables;
            if ( is_multisite )
                queries += ms_global_tables;
            break;
        case 'ms_global' :
            queries = ms_global_tables;
            break;
        case 'all' :
        default:
            queries = global_tables + blog_tables;
            if ( is_multisite )
                queries += ms_global_tables;
            break;
    }

    if (  old_blog_id  )
        wpdb.set_blog_id(old_blog_id);

    return queries;


}

