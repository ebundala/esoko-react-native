

/**********************************************************************
 *  Author: Justin Vincent (jv@vip.ie)
 *  Web...: http://justinvincent.com
 *  Name..: ezSQL
 *  Desc..: ezSQL Core module - database abstraction library to make
 *          it very easy to deal with databases. ezSQLcore can not be used by
 *          itself (it is designed for use by database specific modules).
 *
 */

/**********************************************************************
 *  ezSQL Constants
 */

const EZSQL_VERSION='2.17';
const OBJECT='OBJECT';
const ARRAY_A='ARRAY_A';
const ARRAY_N='ARRAY_N';

	/**********************************************************************
	*  Core class containg common functions to manipulate query result
	*  sets once returned
	*/

	class ezSQLcore
	{
        /**********************************************************************
         *  Constructor
         */
        constructor()
    {
		this.trace            = false;  // same as debug_all
		this.debug_all        = false;  // same as trace
		this.debug_called     = false;
		this.vardump_called   = false;
		this.show_errors      = true;
		this.num_queries      = 0;
		this.conn_queries     = 0;
		this.last_query       = null;
		this.last_error       = null;
		this.col_info         = null;
		this.captured_errors  = [];
		this.cache_dir        = false;
		this.cache_queries    = false;
		this.cache_inserts    = false;
		this.use_disk_cache   = false;
		this.cache_timeout    = 24; // hours
		this.timers           = [];
		this.total_query_time = 0;
		this.db_connect_time  = 0;
		this.trace_log        = [];
		this.use_trace_log    = false;
		this.sql_log_file     = false;
		this.do_profile       = false;
		this.profile_times    = [];

		// == TJH == default now needed for echo of debug function
		this.debug_echo_is_on = true;


    }

		/**********************************************************************
		*  Get host and port from an "host:port" notation.
		*  Returns array of host and port. If port is omitted, returns default
		*/

		 get_host_port( host, def= false )
		{
			port = def;
			if ( false !== host.strpos(':' ) )
			{
    //list( host, port ) = explode( ':', host );
    port = port;

			}

			return array( host, port );
        }

/**********************************************************************
 *  Print SQL/DB error - over-ridden by specific DB class
 */

 register_error(err_str)
{
    // Keep track of last error
    this.last_error = err_str;

    // Capture all errors to an error array no matter what happens
    this.captured_errors.push({
            'error_str': err_str,
            'query': this.last_query
        });
}

/**********************************************************************
 *  Turn error handling on or off..
 */

 show_errors()
{
    this.show_errors = true;
}

 hide_errors()
{
    this.show_errors = false;
}

/**********************************************************************
 *  Kill cached query results
 */

 flush()
{
    // Get rid of these
    this.last_result = null;
    this.col_info = null;
    this.last_query = null;
    this.from_disk_cache = false;
}

/**********************************************************************
 *  Get one variable from the DB - see docs for more detail
 */

 get_var(query=null,x=0,y=0)
{
let values;
    // Log how the function was called
    this.func_call = "\db.get_var(\"query\",x,y)";

    // If there is a query then perform it if not then use cached results..
    if ( query )
{
    this.query(query);
}

    // Extract var out of cached results based x,y vals
    if ( this.last_result[y] )
{
    values = this.last_result[y];
}

    // If there is a value return it else return null
    return (values[x] && values[x]!=='')?values[x]:null;
}

/**********************************************************************
 *  Get one row from the DB - see docs for more detail
 */

 get_row(query=null,output="OBJECT",y=0)
{

    // Log how the function was called
    this.func_call = "\db.get_row(\"query\",output,y)";

    // If there is a query then perform it if not then use cached results..
    if ( query )
{
    this.query(query);
}

    // If the output is an object then return object using the row offset..
    if ( output == OBJECT )
{
    return this.last_result[y]?this.last_result[y]:null;
}
    /*// If the output is an associative array then return row as such..
    else if ( output == ARRAY_A )
{
    return this.last_result[y]?get_object_vars(this.last_result[y]):null;
}
    // If the output is an numerical array then return row as such..
    elseif ( output == ARRAY_N )
{
    return this.last_result[y]?array_values(get_object_vars(this.last_result[y])):null;
}*/
    // If invalid output type was specified..
    else
{
    this.show_errors ? this.trigger_error(" \db.get_row(string query, output type, int offset) -- Output type must be one of: OBJECT, ARRAY_A, ARRAY_N",E_USER_WARNING) : null;
}

}

/**********************************************************************
 *  Function to get 1 column from the cached result set based in X index
 *  see docs for usage and info
 */

 get_col(query=null,x=0)
{

  let  new_array = [];

    // If there is a query then perform it if not then use cached results..
    if ( query )
{
    this.query(query);
}

    // Extract the column values
  let  j = this.last_result.length;
    for ( i=0; i < j; i++ )
{
    new_array[i] = this.get_var(null,x,i);
}

    return new_array;
}


/**********************************************************************
 *  Return the the query as a result set - see docs for more details
 */

 get_results(query=null, output = OBJECT)
{

    // Log how the function was called
    this.func_call = "\db.get_results(\"query\", output)";

    // If there is a query then perform it if not then use cached results..
    if ( query )
{
    this.query(query);
}

    // Send back array of objects. Each row is an object
    if ( output == OBJECT )
{
    return this.last_result;
}
   /* else if ( output == ARRAY_A || output == ARRAY_N )
{
    if ( this.last_result )
{
    i=0;
    foreach( this.last_result as row )
{

    new_array[i] = get_object_vars(row);

    if ( output == ARRAY_N )
{
    new_array[i] = array_values(new_array[i]);
}

    i++;
}

    return new_array;
}*/
    else
{
    return [];
}
}



/**********************************************************************
 *  Function to get column meta data info pertaining to the last query
 * see docs for more info and usage
 */

 get_col_info(info_type="name",col_offset=-1)
{

    if ( this.col_info )
{
    if ( col_offset == -1 )
{
    //i=0;
    this.col_info.forEach((col,i)=>

    {
    new_array[i] = col[info_type];


    });
    return new_array;
}
    else
{
    return this.col_info[col_offset][info_type];
}

}

}

/**********************************************************************
 *  store_cache
 */

 store_cache(query,is_insert)
{

    // The would be cache file for this query
    //cache_file = this.cache_dir.'/'.md5(query);

    // disk caching of queries
    if ( this.use_disk_cache && ( this.cache_queries && ! is_insert ) || ( this.cache_inserts && is_insert ))
{

        // Cache all result values
        this.result_cache = {
        'col_info':this.col_info,
            'last_result':this.last_result,
            'num_rows':this.num_rows,
            'return_value':this.num_rows,
    };

}

}

/**********************************************************************
 *  get_cache
 */

 get_cache(query)
{

    // The would be cache file for this query
    //cache_file = this.cache_dir.'/'.md5(query);

    // Try to get previously cached version

    if(this.result_cache ) {

        this.col_info = this.result_cache['col_info'];
        this.last_result = this.result_cache['last_result'];
        this.num_rows = this.result_cache['num_rows'];

        this.from_disk_cache = true;

        // If debug ALL queries
        this.trace || this.debug_all ? this.debug() : null;

        return this.result_cache
    }
    return[];

}

/**********************************************************************
 *  Dumps the contents of any input variable to screen in a nicely
 *  formatted and easy to understand way - any type: Object, Var or Array
 */

 vardump(mixed='')
{



    // Only echo output if it is turned on
    if ( this.debug_echo_is_on )
{
    console.log( JSON.stringify(mixed));
}

    this.vardump_called = true;

    return JSON.stringify(mixed);

}

/**********************************************************************
 *  Alias for the above function
 */

 dumpvar(mixed)
{
    this.vardump(mixed);
}

/**********************************************************************
 *  Displays the last query string that was sent to the database & a
 * table listing results (if there were any).
 * (abstracted into a seperate file to save server overhead).
 */

 debug(print_to_screen=true) {

    // Start outup buffering
    ob_start();

    echo
    "<blockquote>";

    // Only show ezSQL credits once..


    if (this.last_error) {
        console.log("Last Error --", this.last_error);
    }

    if (this.from_disk_cache) {
        console.log("Results retrieved from disk cache");
    }

    console.log("Query [" + this.num_queries + "] \n" +
        "[" + this.last_query + "]\n");

    if (this.last_result) {

        if (this.col_info) {

            // =====================================================
            // Results top rows

            for (i = 0, j = this.col_info.length; i < j; i++) {
                /* when selecting count(*) the maxlengh is not set, size is set instead. */
                console.log(this.col_info[i].type, "\n");
                if (this.col_info[i].max_length) {
                    console.log(this.col_info[i].size, "\n");
                } else {
                    console.log(this.col_info[i].max_length, "\n");
                }
                console.log(this.col_info[i].name, "\n");
            }


            // ======================================================
            // print main results


            // Only echo output if it is turned on
            if (this.debug_echo_is_on && print_to_screen) {

            }

            this.debug_called = true;

            return "";

        }
    }
}
/**********************************************************************
 *  Naughty little function to ask for some remuniration!
 */

 donation()
{
    //return "<font size=1 face=arial color=000000>If ezSQL has helped <a href=\"https://www.paypal.com/xclick/business=justin%40justinvincent.com&item_name=ezSQL&no_note=1&tax=0\" style=\"color: 0000CC;\">make a donation!?</a> &nbsp;&nbsp;<!--[ go on! you know you want to! ]-.</font>";
}

/**********************************************************************
 *  Timer related functions
 */

 timer_get_cur()
{

    return Date.now();
}

 timer_start(timer_name)
{
    this.timers[timer_name] = this.timer_get_cur();
}

 timer_elapsed(timer_name)
{
    return Math.round(this.timer_get_cur() - this.timers[timer_name]);
}

 timer_update_global(timer_name)
{
    if ( this.do_profile )
{
    this.profile_times.push({
        'query':this.last_query,
        'time':this.timer_elapsed(timer_name)
})
}

    this.total_query_time += this.timer_elapsed(timer_name);
}

/**********************************************************************
 * Creates a SET nvp sql string from an associative array (and escapes all values)
 *
 *  Usage:
 *
 *     db_data = array('login'=>'jv','email'=>'jv@vip.ie', 'user_id' => 1, 'created' => 'NOW()');
 *
 *     db.query("INSERT INTO users SET ".db.get_set(db_data));
 *
 *     ...OR...
 *
 *     db.query("UPDATE users SET ".db.get_set(db_data)." WHERE user_id = 1");
 *
 * Output:
 *
 *     login = 'jv', email = 'jv@vip.ie', user_id = 1, created = NOW()
 */

 get_set(params)
{
    if( ! (typeof(params )===Array) )
{
    this.register_error( 'get_set() parameter invalid. Expected array in '+' on line ');
    return;
}
   let sql = []
    params.forEach((field,i) =>{

     let val
    if ( val === 'true' || val === true )
    val = 1;
    if ( val === 'false' || val === false )
    val = 0;

    switch( val ){
    case 'NOW()' :
    case 'NULL' :
    sql.push("field = val");
    break;
    default :
    sql.push("field = '"+val +"'");
}
});

    return sql.implode( ', ');
}

/**
 * Function for operating query count
 *
 * @param bool all Set to false for function to return queries only during this connection
 * @param bool increase Set to true to increase query count (internal usage)
 * @return int Returns query count base on all
 */
 count (all = true, increase = false) {
    if (increase) {
    this.num_queries++;
    this.conn_queries++;
}

    return (all) ? this.num_queries : this.conn_queries;
}
}




let ezsql_sqlite3_str = 
[
    'Require dbpath and dbname to open an SQLite database'
]
/**********************************************************************
 *  ezSQL Database specific class - SQLite
 */


class ezSQL_sqlite3 extends ezSQLcore
{
constructor(dbpath='', dbname=''){
    super();

   this.rows_affected = false;

    /**********************************************************************
     *  Constructor - allow the user to perform a quick connect at the
     *  same time as initialising the ezSQL_sqlite3 class
     */
    
    // Turn on track errors 
    
    if ( dbpath && dbname )
    {
        this.connect(dbpath, dbname);
    }

}
    /**********************************************************************
     *  Try to connect to SQLite database server
     */

     connect(dbpath='', dbname='')
{
  let return_val = false;

    // Must have a user and a password
    if ( ! dbpath || ! dbname )
    {
        this.register_error(ezsql_sqlite3_str[0]+' in  on line ');
        this.show_errors ? this.trigger_error(ezsql_sqlite3_str[0]) : null;
    }
else
    {
        return_val = true;
        this.conn_queries = 0;
    }

    return return_val;
}

    /**********************************************************************
     *  In the case of SQLite quick_connect is not really needed
     *  because std. connect already does what quick connect does -
     *  but for the sake of consistency it has been included
     */

     quick_connect(dbpath='', dbname='')
{
    return this.connect(dbpath, dbname);
}

    /**********************************************************************
     *  No real equivalent of mySQL select in SQLite
     *  once again, function included for the sake of consistency
     */

     select(dbpath='', dbname='')
{
    return this.connect(dbpath, dbname);
}

    /**********************************************************************
     *  Format a SQLite string correctly for safe SQLite insert
     *  (no mater if magic quotes are on or not)
     */

     escape(str)
{
    return str.replace("/[\r\n]/",'');
}

    /**********************************************************************
     *  Return SQLite specific system date syntax
     *  i.e. Oracle: SYSDATE Mysql: NOW()
     */

     sysdate()
{
    return 'now';
}

    /**********************************************************************
     *  Perform SQLite query and try to detirmin result value
     */

        // ==================================================================
        //	Basic Query	- see docs for more detail

     query(query)
{

    // For reg expressions
    query = str_replace("/[\n\r]/",'',trim(query));

    // initialise return
    return_val = 0;

    // Flush cached values..
    this.flush();

    // Log how the function was called
    this.func_call = "\db.query(\"query\")";

    // Keep track of the last query for debug..
    this.last_query = query;

    // Perform the query via std mysql_query function..
    this.result = this.dbh.query(query);
    this.count(true, true);

    // If there is an error then take note of it..
    if (this.dbh.lastErrorCode())
    {
        err_str = this.dbh.lastErrorMsg();
        this.register_error(err_str);
        this.show_errors ? trigger_error(err_str,E_USER_WARNING) : null;
        return false;
    }

    // Query was an insert, delete, update, replace
    if ( preg_match("/^(insert|delete|update|replace)\s+/i",query) )
    {
        this.rows_affected = @this.dbh.changes();

        // Take note of the insert_id
        if ( preg_match("/^(insert|replace)\s+/i",query) )
        {
            this.insert_id = @this.dbh.lastInsertRowID();
        }

        // Return number fo rows affected
        return_val = this.rows_affected;

    }
    // Query was an select
    else
    {

        // Take note of column info	
        i=0;
        this.col_info = array();
        while (i < @this.result.numColumns())
        {
            this.col_info[i] = new StdClass;
            this.col_info[i].name       = this.result.columnName(i);
            this.col_info[i].type       = null;
            this.col_info[i].max_length = null;
            i++;
        }

        // Store Query Results
        num_rows=0;
        while (row =  @this.result.fetchArray(SQLITE3_ASSOC))
        {
            // Store relults as an objects within main array
            obj= (object) row; //convert to object
            this.last_result[num_rows] = obj;
            num_rows++;
        }

        // Log number of rows the query returned
        this.num_rows = num_rows;

        // Return number of rows selected
        return_val = this.num_rows;

    }

    // If debug ALL queries
    this.trace||this.debug_all ? this.debug() : null ;

    return return_val;

}

}
