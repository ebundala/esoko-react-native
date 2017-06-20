/**
 * GLAYZZLE GENERATED FILE
 * @date Sat Jun 17 2017 13:11:53 GMT+0300 (E. Africa Standard Time)
 * @see https://github.com/glayzzle/php-transpiler
 */
module.exports = function($php) {
  // function imports
  var $fn__is_multisite = $php.context.function.callback('\\is_multisite', true, function(cb) { $fn__is_multisite = cb; });
  var $fn__wp_get_db_schema = $php.context.function.callback('\\wp_get_db_schema', true, function(cb) { $fn__wp_get_db_schema = cb; });
  var $fn__wp_guess_url = $php.context.function.callback('\\wp_guess_url', true, function(cb) { $fn__wp_guess_url = cb; });
  var $fn__do_action = $php.context.function.callback('\\do_action', true, function(cb) { $fn__do_action = cb; });
  var $fn__ini_get = $php.context.function.callback('\\ini_get', true, function(cb) { $fn__ini_get = cb; });
  var $fn__wp_get_theme = $php.context.function.callback('\\wp_get_theme', true, function(cb) { $fn__wp_get_theme = cb; });
  var $fn___x = $php.context.function.callback('\\_x', true, function(cb) { $fn___x = cb; });
  var $fn__is_numeric = $php.context.function.callback('\\is_numeric', true, function(cb) { $fn__is_numeric = cb; });
  var $fn__in_array = $php.context.function.callback('\\in_array', true, function(cb) { $fn__in_array = cb; });
  var $fn__timezone_identifiers_list = $php.context.function.callback('\\timezone_identifiers_list', true, function(cb) { $fn__timezone_identifiers_list = cb; });
  var $fn__sprintf = $php.context.function.callback('\\sprintf', true, function(cb) { $fn__sprintf = cb; });
  var $fn____ = $php.context.function.callback('\\__', true, function(cb) { $fn____ = cb; });
  var $fn__implode = $php.context.function.callback('\\implode', true, function(cb) { $fn__implode = cb; });
  var $fn__array_keys = $php.context.function.callback('\\array_keys', true, function(cb) { $fn__array_keys = cb; });
  var $fn__update_option = $php.context.function.callback('\\update_option', true, function(cb) { $fn__update_option = cb; });
  var $fn__time = $php.context.function.callback('\\time', true, function(cb) { $fn__time = cb; });
  var $fn__is_main_site = $php.context.function.callback('\\is_main_site', true, function(cb) { $fn__is_main_site = cb; });
  var $fn__is_main_network = $php.context.function.callback('\\is_main_network', true, function(cb) { $fn__is_main_network = cb; });
  var $fn__populate_roles_160 = $php.context.function.callback('\\populate_roles_160', true, function(cb) { $fn__populate_roles_160 = cb; });
  var $fn__populate_roles_210 = $php.context.function.callback('\\populate_roles_210', true, function(cb) { $fn__populate_roles_210 = cb; });
  var $fn__populate_roles_230 = $php.context.function.callback('\\populate_roles_230', true, function(cb) { $fn__populate_roles_230 = cb; });
  var $fn__populate_roles_250 = $php.context.function.callback('\\populate_roles_250', true, function(cb) { $fn__populate_roles_250 = cb; });
  var $fn__populate_roles_260 = $php.context.function.callback('\\populate_roles_260', true, function(cb) { $fn__populate_roles_260 = cb; });
  var $fn__populate_roles_270 = $php.context.function.callback('\\populate_roles_270', true, function(cb) { $fn__populate_roles_270 = cb; });
  var $fn__populate_roles_280 = $php.context.function.callback('\\populate_roles_280', true, function(cb) { $fn__populate_roles_280 = cb; });
  var $fn__populate_roles_300 = $php.context.function.callback('\\populate_roles_300', true, function(cb) { $fn__populate_roles_300 = cb; });
  var $fn__add_role = $php.context.function.callback('\\add_role', true, function(cb) { $fn__add_role = cb; });
  var $fn__get_role = $php.context.function.callback('\\get_role', true, function(cb) { $fn__get_role = cb; });
  var $fn__define = $php.context.function.callback('\\define', true, function(cb) { $fn__define = cb; });
  var $fn__dbDelta = $php.context.function.callback('\\dbDelta', true, function(cb) { $fn__dbDelta = cb; });
  var $fn__get_user_by = $php.context.function.callback('\\get_user_by', true, function(cb) { $fn__get_user_by = cb; });
  var $fn__wp_get_current_user = $php.context.function.callback('\\wp_get_current_user', true, function(cb) { $fn__wp_get_current_user = cb; });
  var $fn__get_option = $php.context.function.callback('\\get_option', true, function(cb) { $fn__get_option = cb; });
  var $fn__wp_cache_delete = $php.context.function.callback('\\wp_cache_delete', true, function(cb) { $fn__wp_cache_delete = cb; });
  var $fn__get_users = $php.context.function.callback('\\get_users', true, function(cb) { $fn__get_users = cb; });
  var $fn__array_unique = $php.context.function.callback('\\array_unique', true, function(cb) { $fn__array_unique = cb; });
  var $fn__get_site_option = $php.context.function.callback('\\get_site_option', true, function(cb) { $fn__get_site_option = cb; });
  var $fn__wp_get_audio_extensions = $php.context.function.callback('\\wp_get_audio_extensions', true, function(cb) { $fn__wp_get_audio_extensions = cb; });
  var $fn__wp_get_video_extensions = $php.context.function.callback('\\wp_get_video_extensions', true, function(cb) { $fn__wp_get_video_extensions = cb; });
  var $fn__array_merge = $php.context.function.callback('\\array_merge', true, function(cb) { $fn__array_merge = cb; });
  var $fn__apply_filters = $php.context.function.callback('\\apply_filters', true, function(cb) { $fn__apply_filters = cb; });
  var $fn__ucfirst = $php.context.function.callback('\\ucfirst', true, function(cb) { $fn__ucfirst = cb; });
  var $fn__update_user_meta = $php.context.function.callback('\\update_user_meta', true, function(cb) { $fn__update_user_meta = cb; });
  var $fn__flush_rewrite_rules = $php.context.function.callback('\\flush_rewrite_rules', true, function(cb) { $fn__flush_rewrite_rules = cb; });
  var $fn__substr = $php.context.function.callback('\\substr', true, function(cb) { $fn__substr = cb; });
  var $fn__md5 = $php.context.function.callback('\\md5', true, function(cb) { $fn__md5 = cb; });
  var $fn__wp_remote_get = $php.context.function.callback('\\wp_remote_get', true, function(cb) { $fn__wp_remote_get = cb; });
  var $fn__is_wp_error = $php.context.function.callback('\\is_wp_error', true, function(cb) { $fn__is_wp_error = cb; });
  var $fn__wp_remote_retrieve_response_code = $php.context.function.callback('\\wp_remote_retrieve_response_code', true, function(cb) { $fn__wp_remote_retrieve_response_code = cb; });
  // classes imports
  var $cls__WP_Theme = $php.context.class.callback('\\WP_Theme', true, function(cb) { $cls__WP_Theme = cb; });
  var $cls__WP_Error = $php.context.class.callback('\\WP_Error', false, function(cb) { $cls__WP_Error = cb; });
  var $cls__stdClass = $php.context.class.callback('\\stdClass', false, function(cb) { $cls__stdClass = cb; });

  // variables into current scope
  var charset_collate, wpdb, wp_queries;
  /** 
   * WordPress Administration Scheme API
   * 
   * Here we keep the DB structure and option values.
   * 
   * @package WordPress
   * @subpackage Administration
   */
  /** 
   * Declare these as global in case schema.php is included from a function.
   * 
   * @global wpdb   $wpdb
   * @global array  $wp_queries
   * @global string $charset_collate
   */
  // Not supported "global" at line 18 
  /** 
   * The database character collate.
   */
  charset_collate = wpdb.get_charset_collate ();
  /** 
   * Retrieve the SQL for creating database tables.
   * 
   * @since 3.3.0
   * 
   * @global wpdb $wpdb WordPress database abstraction object.
   * 
   * @param string $scope Optional. The tables for which to retrieve SQL. Can be all, global, ms_global, or blog tables. Defaults to all.
   * @param int $blog_id Optional. The site ID for which to retrieve SQL. Default is the current site ID.
   * @return string The SQL needed to create the requested tables.
   */
  $php.context.function.declare(
    "wp_get_db_schema",
    [{"name":"scope","default":{"kind":"string","loc":{"source":null,"start":{"line":36,"column":36,"offset":963},"end":{"line":36,"column":41,"offset":968}},"value":"all","isDoubleQuote":false}},{"name":"blog_id","default":{"kind":"constref","loc":{"source":null,"start":{"line":36,"column":54,"offset":981},"end":{"line":36,"column":58,"offset":985}},"name":{"kind":"identifier","loc":{"source":null,"start":{"line":36,"column":54,"offset":981},"end":{"line":36,"column":58,"offset":985}},"resolution":"uqn","name":"null"}}}],
    null, function wp_get_db_schema (scope, blog_id) {
    if (typeof scope === 'undefined') scope = null;

    if (typeof blog_id === 'undefined') blog_id = null;


    // variables into current scope
    var $result, charset_collate, wpdb, old_blog_id, is_multisite, max_index_length, blog_tables, users_single_table, users_multi_table, usermeta_table, global_tables, ms_global_tables, queries;
    // Not supported "global" at line 37 
    charset_collate = wpdb.get_charset_collate ();
    if (blog_id && blog_id !=     // Not supported "propertylookup" at line 41 
) old_blog_id = wpdb.set_blog_id (blog_id)
    is_multisite = $fn__is_multisite () ||     // Not supported "parenthesis" at line 45 
;
    /* * Indexes have a maximum size of 767 bytes. Historically, we haven't need to be concerned about that.
	 * As of 4.2, however, we moved to utf8mb4, which uses 4 bytes per character. This means that an index which
	 * used to have room for floor(767/3) = 255 characters, now only has room for floor(767/4) = 191 characters. */
    max_index_length = 191;
    // Blog specific tables. 
    blog_tables = 'CREATE TABLE ' +     // Not supported "propertylookup" at line 55 
 + ' (\n  meta_id bigint(20) unsigned NOT NULL auto_increment,\n  term_id bigint(20) unsigned NOT NULL default \'0\',\n  meta_key varchar(255) default NULL,\n  meta_value longtext,\n  PRIMARY KEY  (meta_id),\n  KEY term_id (term_id),\n  KEY meta_key (meta_key(' + max_index_length + '))\n) ' + charset_collate + ';\nCREATE TABLE ' +     // Not supported "propertylookup" at line 64 
 + ' (\n term_id bigint(20) unsigned NOT NULL auto_increment,\n name varchar(200) NOT NULL default \'\',\n slug varchar(200) NOT NULL default \'\',\n term_group bigint(10) NOT NULL default 0,\n PRIMARY KEY  (term_id),\n KEY slug (slug(' + max_index_length + ')),\n KEY name (name(' + max_index_length + '))\n) ' + charset_collate + ';\nCREATE TABLE ' +     // Not supported "propertylookup" at line 73 
 + ' (\n term_taxonomy_id bigint(20) unsigned NOT NULL auto_increment,\n term_id bigint(20) unsigned NOT NULL default 0,\n taxonomy varchar(32) NOT NULL default \'\',\n description longtext NOT NULL,\n parent bigint(20) unsigned NOT NULL default 0,\n count bigint(20) NOT NULL default 0,\n PRIMARY KEY  (term_taxonomy_id),\n UNIQUE KEY term_id_taxonomy (term_id,taxonomy),\n KEY taxonomy (taxonomy)\n) ' + charset_collate + ';\nCREATE TABLE ' +     // Not supported "propertylookup" at line 84 
 + ' (\n object_id bigint(20) unsigned NOT NULL default 0,\n term_taxonomy_id bigint(20) unsigned NOT NULL default 0,\n term_order int(11) NOT NULL default 0,\n PRIMARY KEY  (object_id,term_taxonomy_id),\n KEY term_taxonomy_id (term_taxonomy_id)\n) ' + charset_collate + ';\nCREATE TABLE ' +     // Not supported "propertylookup" at line 91 
 + ' (\n  meta_id bigint(20) unsigned NOT NULL auto_increment,\n  comment_id bigint(20) unsigned NOT NULL default \'0\',\n  meta_key varchar(255) default NULL,\n  meta_value longtext,\n  PRIMARY KEY  (meta_id),\n  KEY comment_id (comment_id),\n  KEY meta_key (meta_key(' + max_index_length + '))\n) ' + charset_collate + ';\nCREATE TABLE ' +     // Not supported "propertylookup" at line 100 
 + ' (\n  comment_ID bigint(20) unsigned NOT NULL auto_increment,\n  comment_post_ID bigint(20) unsigned NOT NULL default \'0\',\n  comment_author tinytext NOT NULL,\n  comment_author_email varchar(100) NOT NULL default \'\',\n  comment_author_url varchar(200) NOT NULL default \'\',\n  comment_author_IP varchar(100) NOT NULL default \'\',\n  comment_date datetime NOT NULL default \'0000-00-00 00:00:00\',\n  comment_date_gmt datetime NOT NULL default \'0000-00-00 00:00:00\',\n  comment_content text NOT NULL,\n  comment_karma int(11) NOT NULL default \'0\',\n  comment_approved varchar(20) NOT NULL default \'1\',\n  comment_agent varchar(255) NOT NULL default \'\',\n  comment_type varchar(20) NOT NULL default \'\',\n  comment_parent bigint(20) unsigned NOT NULL default \'0\',\n  user_id bigint(20) unsigned NOT NULL default \'0\',\n  PRIMARY KEY  (comment_ID),\n  KEY comment_post_ID (comment_post_ID),\n  KEY comment_approved_date_gmt (comment_approved,comment_date_gmt),\n  KEY comment_date_gmt (comment_date_gmt),\n  KEY comment_parent (comment_parent),\n  KEY comment_author_email (comment_author_email(10))\n) ' + charset_collate + ';\nCREATE TABLE ' +     // Not supported "propertylookup" at line 123 
 + ' (\n  link_id bigint(20) unsigned NOT NULL auto_increment,\n  link_url varchar(255) NOT NULL default \'\',\n  link_name varchar(255) NOT NULL default \'\',\n  link_image varchar(255) NOT NULL default \'\',\n  link_target varchar(25) NOT NULL default \'\',\n  link_description varchar(255) NOT NULL default \'\',\n  link_visible varchar(20) NOT NULL default \'Y\',\n  link_owner bigint(20) unsigned NOT NULL default \'1\',\n  link_rating int(11) NOT NULL default \'0\',\n  link_updated datetime NOT NULL default \'0000-00-00 00:00:00\',\n  link_rel varchar(255) NOT NULL default \'\',\n  link_notes mediumtext NOT NULL,\n  link_rss varchar(255) NOT NULL default \'\',\n  PRIMARY KEY  (link_id),\n  KEY link_visible (link_visible)\n) ' + charset_collate + ';\nCREATE TABLE ' +     // Not supported "propertylookup" at line 140 
 + ' (\n  option_id bigint(20) unsigned NOT NULL auto_increment,\n  option_name varchar(191) NOT NULL default \'\',\n  option_value longtext NOT NULL,\n  autoload varchar(20) NOT NULL default \'yes\',\n  PRIMARY KEY  (option_id),\n  UNIQUE KEY option_name (option_name)\n) ' + charset_collate + ';\nCREATE TABLE ' +     // Not supported "propertylookup" at line 148 
 + ' (\n  meta_id bigint(20) unsigned NOT NULL auto_increment,\n  post_id bigint(20) unsigned NOT NULL default \'0\',\n  meta_key varchar(255) default NULL,\n  meta_value longtext,\n  PRIMARY KEY  (meta_id),\n  KEY post_id (post_id),\n  KEY meta_key (meta_key(' + max_index_length + '))\n) ' + charset_collate + ';\nCREATE TABLE ' +     // Not supported "propertylookup" at line 157 
 + ' (\n  ID bigint(20) unsigned NOT NULL auto_increment,\n  post_author bigint(20) unsigned NOT NULL default \'0\',\n  post_date datetime NOT NULL default \'0000-00-00 00:00:00\',\n  post_date_gmt datetime NOT NULL default \'0000-00-00 00:00:00\',\n  post_content longtext NOT NULL,\n  post_title text NOT NULL,\n  post_excerpt text NOT NULL,\n  post_status varchar(20) NOT NULL default \'publish\',\n  comment_status varchar(20) NOT NULL default \'open\',\n  ping_status varchar(20) NOT NULL default \'open\',\n  post_password varchar(255) NOT NULL default \'\',\n  post_name varchar(200) NOT NULL default \'\',\n  to_ping text NOT NULL,\n  pinged text NOT NULL,\n  post_modified datetime NOT NULL default \'0000-00-00 00:00:00\',\n  post_modified_gmt datetime NOT NULL default \'0000-00-00 00:00:00\',\n  post_content_filtered longtext NOT NULL,\n  post_parent bigint(20) unsigned NOT NULL default \'0\',\n  guid varchar(255) NOT NULL default \'\',\n  menu_order int(11) NOT NULL default \'0\',\n  post_type varchar(20) NOT NULL default \'post\',\n  post_mime_type varchar(100) NOT NULL default \'\',\n  comment_count bigint(20) NOT NULL default \'0\',\n  PRIMARY KEY  (ID),\n  KEY post_name (post_name(' + max_index_length + ')),\n  KEY type_status_date (post_type,post_status,post_date,ID),\n  KEY post_parent (post_parent),\n  KEY post_author (post_author)\n) ' + charset_collate + ';\n';
    // Single site users table. The multisite flavor of the users table is handled below. 
    users_single_table = 'CREATE TABLE ' +     // Not supported "propertylookup" at line 189 
 + ' (\n  ID bigint(20) unsigned NOT NULL auto_increment,\n  user_login varchar(60) NOT NULL default \'\',\n  user_pass varchar(255) NOT NULL default \'\',\n  user_nicename varchar(50) NOT NULL default \'\',\n  user_email varchar(100) NOT NULL default \'\',\n  user_url varchar(100) NOT NULL default \'\',\n  user_registered datetime NOT NULL default \'0000-00-00 00:00:00\',\n  user_activation_key varchar(255) NOT NULL default \'\',\n  user_status int(11) NOT NULL default \'0\',\n  display_name varchar(250) NOT NULL default \'\',\n  PRIMARY KEY  (ID),\n  KEY user_login_key (user_login),\n  KEY user_nicename (user_nicename),\n  KEY user_email (user_email)\n) ' + charset_collate + ';\n';
    // Multisite users table 
    users_multi_table = 'CREATE TABLE ' +     // Not supported "propertylookup" at line 207 
 + ' (\n  ID bigint(20) unsigned NOT NULL auto_increment,\n  user_login varchar(60) NOT NULL default \'\',\n  user_pass varchar(255) NOT NULL default \'\',\n  user_nicename varchar(50) NOT NULL default \'\',\n  user_email varchar(100) NOT NULL default \'\',\n  user_url varchar(100) NOT NULL default \'\',\n  user_registered datetime NOT NULL default \'0000-00-00 00:00:00\',\n  user_activation_key varchar(255) NOT NULL default \'\',\n  user_status int(11) NOT NULL default \'0\',\n  display_name varchar(250) NOT NULL default \'\',\n  spam tinyint(2) NOT NULL default \'0\',\n  deleted tinyint(2) NOT NULL default \'0\',\n  PRIMARY KEY  (ID),\n  KEY user_login_key (user_login),\n  KEY user_nicename (user_nicename),\n  KEY user_email (user_email)\n) ' + charset_collate + ';\n';
    // Usermeta. 
    usermeta_table = 'CREATE TABLE ' +     // Not supported "propertylookup" at line 227 
 + ' (\n  umeta_id bigint(20) unsigned NOT NULL auto_increment,\n  user_id bigint(20) unsigned NOT NULL default \'0\',\n  meta_key varchar(255) default NULL,\n  meta_value longtext,\n  PRIMARY KEY  (umeta_id),\n  KEY user_id (user_id),\n  KEY meta_key (meta_key(' + max_index_length + '))\n) ' + charset_collate + ';\n';
    // Global tables 
    if (is_multisite) global_tables = users_multi_table + usermeta_table    else global_tables = users_single_table + usermeta_table
    // Multisite global tables. 
    ms_global_tables = 'CREATE TABLE ' +     // Not supported "propertylookup" at line 244 
 + ' (\n  blog_id bigint(20) NOT NULL auto_increment,\n  site_id bigint(20) NOT NULL default \'0\',\n  domain varchar(200) NOT NULL default \'\',\n  path varchar(100) NOT NULL default \'\',\n  registered datetime NOT NULL default \'0000-00-00 00:00:00\',\n  last_updated datetime NOT NULL default \'0000-00-00 00:00:00\',\n  public tinyint(2) NOT NULL default \'1\',\n  archived tinyint(2) NOT NULL default \'0\',\n  mature tinyint(2) NOT NULL default \'0\',\n  spam tinyint(2) NOT NULL default \'0\',\n  deleted tinyint(2) NOT NULL default \'0\',\n  lang_id int(11) NOT NULL default \'0\',\n  PRIMARY KEY  (blog_id),\n  KEY domain (domain(50),path(5)),\n  KEY lang_id (lang_id)\n) ' + charset_collate + ';\nCREATE TABLE ' +     // Not supported "propertylookup" at line 261 
 + ' (\n  blog_id bigint(20) NOT NULL default \'0\',\n  db_version varchar(20) NOT NULL default \'\',\n  last_updated datetime NOT NULL default \'0000-00-00 00:00:00\',\n  PRIMARY KEY  (blog_id),\n  KEY db_version (db_version)\n) ' + charset_collate + ';\nCREATE TABLE ' +     // Not supported "propertylookup" at line 268 
 + ' (\n  ID bigint(20) NOT NULL auto_increment,\n  email varchar(255) NOT NULL default \'\',\n  IP varchar(30) NOT NULL default \'\',\n  blog_id bigint(20) NOT NULL default \'0\',\n  date_registered datetime NOT NULL default \'0000-00-00 00:00:00\',\n  PRIMARY KEY  (ID),\n  KEY IP (IP)\n) ' + charset_collate + ';\nCREATE TABLE ' +     // Not supported "propertylookup" at line 277 
 + ' (\n  id bigint(20) NOT NULL auto_increment,\n  domain varchar(200) NOT NULL default \'\',\n  path varchar(100) NOT NULL default \'\',\n  PRIMARY KEY  (id),\n  KEY domain (domain(140),path(51))\n) ' + charset_collate + ';\nCREATE TABLE ' +     // Not supported "propertylookup" at line 284 
 + ' (\n  meta_id bigint(20) NOT NULL auto_increment,\n  site_id bigint(20) NOT NULL default \'0\',\n  meta_key varchar(255) default NULL,\n  meta_value longtext,\n  PRIMARY KEY  (meta_id),\n  KEY meta_key (meta_key(' + max_index_length + ')),\n  KEY site_id (site_id)\n) ' + charset_collate + ';\nCREATE TABLE ' +     // Not supported "propertylookup" at line 293 
 + ' (\n  signup_id bigint(20) NOT NULL auto_increment,\n  domain varchar(200) NOT NULL default \'\',\n  path varchar(100) NOT NULL default \'\',\n  title longtext NOT NULL,\n  user_login varchar(60) NOT NULL default \'\',\n  user_email varchar(100) NOT NULL default \'\',\n  registered datetime NOT NULL default \'0000-00-00 00:00:00\',\n  activated datetime NOT NULL default \'0000-00-00 00:00:00\',\n  active tinyint(1) NOT NULL default \'0\',\n  activation_key varchar(50) NOT NULL default \'\',\n  meta longtext,\n  PRIMARY KEY  (signup_id),\n  KEY activation_key (activation_key),\n  KEY user_email (user_email),\n  KEY user_login_email (user_login,user_email),\n  KEY domain_path (domain(140),path(51))\n) ' + charset_collate + ';';
    // Not supported "switch" at line 312 
    if (    // Not supported "isset" at line 332 
) wpdb.set_blog_id (old_blog_id)
    return queries;
    return $result;
  });
  // Populate for back compat. 
  wp_queries = $fn__wp_get_db_schema ('all');
  /** 
   * Create WordPress options and set the default values.
   * 
   * @since 1.5.0
   * 
   * @global wpdb $wpdb WordPress database abstraction object.
   * @global int  $wp_db_version
   * @global int  $wp_current_db_version
   */
  $php.context.function.declare(
    "populate_options",
    [],
    null, function populate_options () {

    // variables into current scope
    var $result, guessurl, uploads_use_yearmonth_folders, stylesheet, template, theme, timezone_string, gmt_offset, offset_or_tz, options, wp_current_db_version, wp_db_version, fat_options, keys, existing_options, wpdb, insert, unusedoptions, time, sql;
    // Not supported "global" at line 351 
    guessurl = $fn__wp_guess_url ();
    /** 
     * Fires before creating WordPress options and populating their default values.
     * 
     * @since 2.6.0
     */
    $fn__do_action ('populate_options');
    if ($fn__ini_get ('safe_mode')) {
      // Safe mode can break mkdir() so use a flat structure by default. 
      uploads_use_yearmonth_folders = 0;
    }
    else {
      uploads_use_yearmonth_folders = 1;
    }

    // If WP_DEFAULT_THEME doesn't exist, fall back to the latest core default theme. 
    stylesheet = template =     // Not supported "constref" at line 369 
;
    theme = $fn__wp_get_theme (    // Not supported "constref" at line 370 
);
    if (    // Not supported "unary" at line 371 
) {
      theme = $cls__WP_Theme.get_core_default_theme ();
    }

    if (theme) {
      stylesheet = theme.get_stylesheet ();
      template = theme.get_template ();
    }

    timezone_string = '';
    gmt_offset = 0;
    /* translators: default GMT offset or timezone string. Must be either a valid offset (-12 to 14)
	   or a valid timezone string (America/New_York). See https://secure.php.net/manual/en/timezones.php
	   for all timezone strings supported by PHP. */
    offset_or_tz = $fn___x ('0', 'default GMT offset or timezone string');
    if ($fn__is_numeric (offset_or_tz)) gmt_offset = offset_or_tz    else if (offset_or_tz && $fn__in_array (offset_or_tz, $fn__timezone_identifiers_list ())) timezone_string = offset_or_tz
    options =     // Not supported "array" at line 393 
;
    // 3.3 
    if (    // Not supported "unary" at line 522 
) {
            // Not supported "offsetlookup" at line 523 
 = (      // Not supported "unary" at line 523 
) ? wp_current_db_version : wp_db_version;
    }

    if ($fn__is_multisite ()) {
      // translators: site tagline 
            // Not supported "offsetlookup" at line 530 
 = $fn__sprintf ($fn____ ('Just another %s site'),       // Not supported "propertylookup" at line 530 
);
            // Not supported "offsetlookup" at line 531 
 = '/%year%/%monthnum%/%day%/%postname%/';
    }

    fat_options =     // Not supported "array" at line 535 
;
    keys = '\'' + $fn__implode ('\', \'', $fn__array_keys (options)) + '\'';
    existing_options = wpdb.get_col ('SELECT option_name FROM ' +     // Not supported "propertylookup" at line 538 
 + ' WHERE option_name in ( ' + keys + ' )');
    insert = '';
    // Not supported "foreach" at line 541 
    if (    // Not supported "unary" at line 556 
) wpdb.query ('INSERT INTO ' +     // Not supported "propertylookup" at line 557 
 + ' (option_name, option_value, autoload) VALUES ' + insert)
    if (    // Not supported "unary" at line 560 
) $fn__update_option ('home', guessurl)
    unusedoptions =     // Not supported "array" at line 563 
;
    // Not supported "foreach" at line 581 
    // Delete obsolete magpie stuff. 
    wpdb.query ('DELETE FROM ' +     // Not supported "propertylookup" at line 585 
 + ' WHERE option_name REGEXP \'^rss_[0-9a-f]{32}(_ts)?$\'');
    /* * Deletes all expired transients. The multi-table delete syntax is used
	 * to delete the transient record from table a, and the corresponding
	 * transient_timeout record from table b. */
    time = $fn__time ();
    sql = 'DELETE a, b FROM ' +     // Not supported "propertylookup" at line 593 
 + ' a, ' +     // Not supported "propertylookup" at line 593 
 + ' b\n		WHERE a.option_name LIKE %s\n		AND a.option_name NOT LIKE %s\n		AND b.option_name = CONCAT( \'_transient_timeout_\', SUBSTRING( a.option_name, 12 ) )\n		AND b.option_value < %d';
    wpdb.query (wpdb.prepare (sql, wpdb.esc_like ('_transient_') + '%', wpdb.esc_like ('_transient_timeout_') + '%', time));
    if ($fn__is_main_site () && $fn__is_main_network ()) {
      sql = 'DELETE a, b FROM ' +       // Not supported "propertylookup" at line 601 
 + ' a, ' +       // Not supported "propertylookup" at line 601 
 + ' b\n			WHERE a.option_name LIKE %s\n			AND a.option_name NOT LIKE %s\n			AND b.option_name = CONCAT( \'_site_transient_timeout_\', SUBSTRING( a.option_name, 17 ) )\n			AND b.option_value < %d';
      wpdb.query (wpdb.prepare (sql, wpdb.esc_like ('_site_transient_') + '%', wpdb.esc_like ('_site_transient_timeout_') + '%', time));
    }

    return $result;
  });
  /** 
   * Execute WordPress role creation for the various WordPress versions.
   * 
   * @since 2.0.0
   */
  $php.context.function.declare(
    "populate_roles",
    [],
    null, function populate_roles () {

    // variables into current scope
    var $result;
    $fn__populate_roles_160 ();
    $fn__populate_roles_210 ();
    $fn__populate_roles_230 ();
    $fn__populate_roles_250 ();
    $fn__populate_roles_260 ();
    $fn__populate_roles_270 ();
    $fn__populate_roles_280 ();
    $fn__populate_roles_300 ();
    return $result;
  });
  /** 
   * Create the roles for WordPress 2.0
   * 
   * @since 2.0.0
   */
  $php.context.function.declare(
    "populate_roles_160",
    [],
    null, function populate_roles_160 () {

    // variables into current scope
    var $result, role;
    // Add roles 
    // Dummy gettext calls to get strings in the catalog. 
    // translators: user role 
    $fn___x ('Administrator', 'User role');
    // translators: user role 
    $fn___x ('Editor', 'User role');
    // translators: user role 
    $fn___x ('Author', 'User role');
    // translators: user role 
    $fn___x ('Contributor', 'User role');
    // translators: user role 
    $fn___x ('Subscriber', 'User role');
    $fn__add_role ('administrator', 'Administrator');
    $fn__add_role ('editor', 'Editor');
    $fn__add_role ('author', 'Author');
    $fn__add_role ('contributor', 'Contributor');
    $fn__add_role ('subscriber', 'Subscriber');
    // Add caps for Administrator role 
    role = $fn__get_role ('administrator');
    role.add_cap ('switch_themes');
    role.add_cap ('edit_themes');
    role.add_cap ('activate_plugins');
    role.add_cap ('edit_plugins');
    role.add_cap ('edit_users');
    role.add_cap ('edit_files');
    role.add_cap ('manage_options');
    role.add_cap ('moderate_comments');
    role.add_cap ('manage_categories');
    role.add_cap ('manage_links');
    role.add_cap ('upload_files');
    role.add_cap ('import');
    role.add_cap ('unfiltered_html');
    role.add_cap ('edit_posts');
    role.add_cap ('edit_others_posts');
    role.add_cap ('edit_published_posts');
    role.add_cap ('publish_posts');
    role.add_cap ('edit_pages');
    role.add_cap ('read');
    role.add_cap ('level_10');
    role.add_cap ('level_9');
    role.add_cap ('level_8');
    role.add_cap ('level_7');
    role.add_cap ('level_6');
    role.add_cap ('level_5');
    role.add_cap ('level_4');
    role.add_cap ('level_3');
    role.add_cap ('level_2');
    role.add_cap ('level_1');
    role.add_cap ('level_0');
    // Add caps for Editor role 
    role = $fn__get_role ('editor');
    role.add_cap ('moderate_comments');
    role.add_cap ('manage_categories');
    role.add_cap ('manage_links');
    role.add_cap ('upload_files');
    role.add_cap ('unfiltered_html');
    role.add_cap ('edit_posts');
    role.add_cap ('edit_others_posts');
    role.add_cap ('edit_published_posts');
    role.add_cap ('publish_posts');
    role.add_cap ('edit_pages');
    role.add_cap ('read');
    role.add_cap ('level_7');
    role.add_cap ('level_6');
    role.add_cap ('level_5');
    role.add_cap ('level_4');
    role.add_cap ('level_3');
    role.add_cap ('level_2');
    role.add_cap ('level_1');
    role.add_cap ('level_0');
    // Add caps for Author role 
    role = $fn__get_role ('author');
    role.add_cap ('upload_files');
    role.add_cap ('edit_posts');
    role.add_cap ('edit_published_posts');
    role.add_cap ('publish_posts');
    role.add_cap ('read');
    role.add_cap ('level_2');
    role.add_cap ('level_1');
    role.add_cap ('level_0');
    // Add caps for Contributor role 
    role = $fn__get_role ('contributor');
    role.add_cap ('edit_posts');
    role.add_cap ('read');
    role.add_cap ('level_1');
    role.add_cap ('level_0');
    // Add caps for Subscriber role 
    role = $fn__get_role ('subscriber');
    role.add_cap ('read');
    role.add_cap ('level_0');
    return $result;
  });
  /** 
   * Create and modify WordPress roles for WordPress 2.1.
   * 
   * @since 2.1.0
   */
  $php.context.function.declare(
    "populate_roles_210",
    [],
    null, function populate_roles_210 () {

    // variables into current scope
    var $result, roles, role;
    roles =     // Not supported "array" at line 737 
;
    // Not supported "foreach" at line 738 
    role = $fn__get_role ('administrator');
    if (    // Not supported "unary" at line 761 
) {
      role.add_cap ('delete_users');
      role.add_cap ('create_users');
    }

    role = $fn__get_role ('author');
    if (    // Not supported "unary" at line 767 
) {
      role.add_cap ('delete_posts');
      role.add_cap ('delete_published_posts');
    }

    role = $fn__get_role ('contributor');
    if (    // Not supported "unary" at line 773 
) {
      role.add_cap ('delete_posts');
    }

    return $result;
  });
  /** 
   * Create and modify WordPress roles for WordPress 2.3.
   * 
   * @since 2.3.0
   */
  $php.context.function.declare(
    "populate_roles_230",
    [],
    null, function populate_roles_230 () {

    // variables into current scope
    var $result, role;
    role = $fn__get_role ('administrator');
    if (    // Not supported "unary" at line 786 
) {
      role.add_cap ('unfiltered_upload');
    }

    return $result;
  });
  /** 
   * Create and modify WordPress roles for WordPress 2.5.
   * 
   * @since 2.5.0
   */
  $php.context.function.declare(
    "populate_roles_250",
    [],
    null, function populate_roles_250 () {

    // variables into current scope
    var $result, role;
    role = $fn__get_role ('administrator');
    if (    // Not supported "unary" at line 799 
) {
      role.add_cap ('edit_dashboard');
    }

    return $result;
  });
  /** 
   * Create and modify WordPress roles for WordPress 2.6.
   * 
   * @since 2.6.0
   */
  $php.context.function.declare(
    "populate_roles_260",
    [],
    null, function populate_roles_260 () {

    // variables into current scope
    var $result, role;
    role = $fn__get_role ('administrator');
    if (    // Not supported "unary" at line 812 
) {
      role.add_cap ('update_plugins');
      role.add_cap ('delete_plugins');
    }

    return $result;
  });
  /** 
   * Create and modify WordPress roles for WordPress 2.7.
   * 
   * @since 2.7.0
   */
  $php.context.function.declare(
    "populate_roles_270",
    [],
    null, function populate_roles_270 () {

    // variables into current scope
    var $result, role;
    role = $fn__get_role ('administrator');
    if (    // Not supported "unary" at line 826 
) {
      role.add_cap ('install_plugins');
      role.add_cap ('update_themes');
    }

    return $result;
  });
  /** 
   * Create and modify WordPress roles for WordPress 2.8.
   * 
   * @since 2.8.0
   */
  $php.context.function.declare(
    "populate_roles_280",
    [],
    null, function populate_roles_280 () {

    // variables into current scope
    var $result, role;
    role = $fn__get_role ('administrator');
    if (    // Not supported "unary" at line 840 
) {
      role.add_cap ('install_themes');
    }

    return $result;
  });
  /** 
   * Create and modify WordPress roles for WordPress 3.0.
   * 
   * @since 3.0.0
   */
  $php.context.function.declare(
    "populate_roles_300",
    [],
    null, function populate_roles_300 () {

    // variables into current scope
    var $result, role;
    role = $fn__get_role ('administrator');
    if (    // Not supported "unary" at line 853 
) {
      role.add_cap ('update_core');
      role.add_cap ('list_users');
      role.add_cap ('remove_users');
      role.add_cap ('promote_users');
      role.add_cap ('edit_theme_options');
      role.add_cap ('delete_themes');
      role.add_cap ('export');
    }

    return $result;
  });
  if (  // Not supported "unary" at line 864 
) {
    $php.context.function.declare(
      "install_network",
      [],
      null, function install_network () {

      // variables into current scope
      var $result;
      if (      // Not supported "unary" at line 871 
) $fn__define ('WP_INSTALLING_NETWORK', true)
      $fn__dbDelta ($fn__wp_get_db_schema ('global'));
      return $result;
    });
  }

  /** 
   * Populate network settings.
   * 
   * @since 3.0.0
   * 
   * @global wpdb       $wpdb
   * @global object     $current_site
   * @global int        $wp_db_version
   * @global WP_Rewrite $wp_rewrite
   * 
   * @param int    $network_id        ID of network to populate.
   * @param string $domain            The domain name for the network (eg. "example.com").
   * @param string $email             Email address for the network administrator.
   * @param string $site_name         The name of the network.
   * @param string $path              Optional. The path to append to the network's domain name. Default '/'.
   * @param bool   $subdomain_install Optional. Whether the network is a subdomain install or a subdirectory install.
   * Default false, meaning the network is a subdirectory install.
   * @return bool|WP_Error True on success, or WP_Error on warning (with the install otherwise successful,
   * so the error code must be checked) or failure.
   */
  $php.context.function.declare(
    "populate_network",
    [{"name":"network_id","default":{"kind":"number","loc":{"source":null,"start":{"line":898,"column":41,"offset":29045},"end":{"line":898,"column":42,"offset":29046}},"value":"1"}},{"name":"domain","default":{"kind":"string","loc":{"source":null,"start":{"line":898,"column":54,"offset":29058},"end":{"line":898,"column":56,"offset":29060}},"value":"","isDoubleQuote":false}},{"name":"email","default":{"kind":"string","loc":{"source":null,"start":{"line":898,"column":67,"offset":29071},"end":{"line":898,"column":69,"offset":29073}},"value":"","isDoubleQuote":false}},{"name":"site_name","default":{"kind":"string","loc":{"source":null,"start":{"line":898,"column":84,"offset":29088},"end":{"line":898,"column":86,"offset":29090}},"value":"","isDoubleQuote":false}},{"name":"path","default":{"kind":"string","loc":{"source":null,"start":{"line":898,"column":96,"offset":29100},"end":{"line":898,"column":99,"offset":29103}},"value":"/","isDoubleQuote":false}},{"name":"subdomain_install","default":{"kind":"boolean","loc":{"source":null,"start":{"line":898,"column":122,"offset":29126},"end":{"line":898,"column":127,"offset":29131}},"value":false}}],
    null, function populate_network (network_id, domain, email, site_name, path, subdomain_install) {
    if (typeof network_id === 'undefined') network_id = null;

    if (typeof domain === 'undefined') domain = null;

    if (typeof email === 'undefined') email = null;

    if (typeof site_name === 'undefined') site_name = null;

    if (typeof path === 'undefined') path = null;

    if (typeof subdomain_install === 'undefined') subdomain_install = null;


    // variables into current scope
    var $result, errors, wpdb, site_user, template, stylesheet, allowed_themes, core_default, site_admins, users, welcome_email, misc_exts, audio_exts, video_exts, upload_filetypes, sitemeta, insert, current_site, blog_id, wp_rewrite, vhost_ok, errstr, hostname, page, msg;
    // Not supported "global" at line 899 
    errors =  new $cls__WP_Error();
    if ('' == domain) errors.add ('empty_domain', $fn____ ('You must provide a domain name.'))
    if ('' == site_name) errors.add ('empty_sitename', $fn____ ('You must provide a name for your network of sites.'))
    if (network_id == wpdb.get_var (wpdb.prepare ('SELECT id FROM ' +     // Not supported "propertylookup" at line 908 
 + ' WHERE id = %d', network_id))) errors.add ('siteid_exists', $fn____ ('The network already exists.'))
    if (    // Not supported "unary" at line 911 
) errors.add ('invalid_email', $fn____ ('You must provide a valid email address.'))
    if (errors.get_error_code ()) return errors
    site_user = $fn__get_user_by ('email', email);
    if (false === site_user) {
      site_user = $fn__wp_get_current_user ();
    }

    template = $fn__get_option ('template');
    stylesheet = $fn__get_option ('stylesheet');
    allowed_themes =     // Not supported "array" at line 926 
;
    if (template != stylesheet) {
            // Not supported "offsetlookup" at line 929 
 = true;
    }

    if (    // Not supported "constref" at line 932 
 != stylesheet &&     // Not supported "constref" at line 932 
 != template) {
            // Not supported "offsetlookup" at line 933 
 = true;
    }

    if (    // Not supported "unary" at line 937 
) {
      if (core_default = $cls__WP_Theme.get_core_default_theme ()) {
                // Not supported "offsetlookup" at line 939 
 = true;
      }

    }

    if (1 == network_id) {
      wpdb.insert (      // Not supported "propertylookup" at line 944 
,       // Not supported "array" at line 944 
);
      network_id =       // Not supported "propertylookup" at line 945 
;
    }
    else {
      wpdb.insert (      // Not supported "propertylookup" at line 947 
,       // Not supported "array" at line 947 
);
    }

    $fn__wp_cache_delete ('networks_have_paths', 'site-options');
    if (    // Not supported "unary" at line 952 
) {
      site_admins =       // Not supported "array" at line 953 
;
      users = $fn__get_users (      // Not supported "array" at line 954 
);
      if (users) {
        // Not supported "foreach" at line 959 
        site_admins = $fn__array_unique (site_admins);
      }

    }
    else {
      site_admins = $fn__get_site_option ('site_admins');
    }

    // translators: Do not translate USERNAME, SITE_NAME, BLOG_URL, PASSWORD: those are placeholders. 
    welcome_email = $fn____ ('Howdy USERNAME,\n\nYour new SITE_NAME site has been successfully set up at:\nBLOG_URL\n\nYou can log in to the administrator account with the following information:\n\nUsername: USERNAME\nPassword: PASSWORD\nLog in here: BLOG_URLwp-login.php\n\nWe hope you enjoy your new site. Thanks!\n\n--The Team @ SITE_NAME');
    misc_exts =     // Not supported "array" at line 985 
;
    audio_exts = $fn__wp_get_audio_extensions ();
    video_exts = $fn__wp_get_video_extensions ();
    upload_filetypes = $fn__array_unique ($fn__array_merge (misc_exts, audio_exts, video_exts));
    sitemeta =     // Not supported "array" at line 999 
;
    if (    // Not supported "unary" at line 1025 
)     // Not supported "offsetlookup" at line 1026 
 = 'blog'
    sitemeta = $fn__apply_filters ('populate_network_meta', sitemeta, network_id);
    insert = '';
    // Not supported "foreach" at line 1039 
    wpdb.query ('INSERT INTO ' +     // Not supported "propertylookup" at line 1046 
 + ' ( site_id, meta_key, meta_value ) VALUES ' + insert);
    /* * When upgrading from single to multisite, assume the current site will
	 * become the main site of the network. When using populate_network()
	 * to create another network in an existing multisite environment, skip
	 * these steps since the main site of the new network has not yet been
	 * created. */
    if (    // Not supported "unary" at line 1055 
) {
      current_site =  new $cls__stdClass();
            // Not supported "propertylookup" at line 1057 
 = domain;
            // Not supported "propertylookup" at line 1058 
 = path;
            // Not supported "propertylookup" at line 1059 
 = $fn__ucfirst (domain);
      wpdb.insert (      // Not supported "propertylookup" at line 1060 
,       // Not supported "array" at line 1060 
);
            // Not supported "propertylookup" at line 1061 
 = blog_id =       // Not supported "propertylookup" at line 1061 
;
      $fn__update_user_meta (      // Not supported "propertylookup" at line 1062 
, 'source_domain', domain);
      $fn__update_user_meta (      // Not supported "propertylookup" at line 1063 
, 'primary_blog', blog_id);
      if (subdomain_install) wp_rewrite.set_permalink_structure ('/%year%/%monthnum%/%day%/%postname%/')      else wp_rewrite.set_permalink_structure ('/blog/%year%/%monthnum%/%day%/%postname%/')
      $fn__flush_rewrite_rules ();
      if (      // Not supported "unary" at line 1072 
) return true
      vhost_ok = false;
      errstr = '';
      hostname = $fn__substr ($fn__md5 ($fn__time ()), 0, 6) + '.' + domain;
      // Very random hostname! 
      page = $fn__wp_remote_get ('http://' + hostname,       // Not supported "array" at line 1078 
);
      if ($fn__is_wp_error (page)) errstr = page.get_error_message ()      else if (200 == $fn__wp_remote_retrieve_response_code (page)) vhost_ok = true
      if (      // Not supported "unary" at line 1084 
) {
        msg = '<p><strong>' + $fn____ ('Warning! Wildcard DNS may not be configured correctly!') + '</strong></p>';
        msg .= '<p>' + $fn__sprintf ($fn____ ('The installer attempted to contact a random hostname (%s) on your domain.'), '<code>' + hostname + '</code>');
        if (        // Not supported "unary" at line 1092 
) {
          // translators: %s: error message 
          msg .= ' ' + $fn__sprintf ($fn____ ('This resulted in an error message: %s'), '<code>' + errstr + '</code>');
        }

        msg .= '</p>';
        msg .= '<p>' + $fn__sprintf ($fn____ ('To use a subdomain configuration, you must have a wildcard entry in your DNS. This usually means adding a %s hostname record pointing at your web server in your DNS configuration tool.'), '<code>*</code>') + '</p>';
        msg .= '<p>' + $fn____ ('You can still use your site but any subdomain you create may not be accessible. If you know your DNS is correct, ignore this message.') + '</p>';
        return  new $cls__WP_Error('no_wildcard_dns', msg);
      }

    }

    return true;
    return $result;
  });
};
