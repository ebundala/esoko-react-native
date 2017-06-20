

'use strict';
var fs = require('fs');

// Include Gulp & tools we'll use
var gulp = require('gulp');
var download = require("gulp-download-stream");
//var fs = require('fs');

var DIST = 'android/app/src/main/assets/';
var ProjectDir="/"

var spwner=function(cmd){
  var cdvSpawn = require('child_process').exec;


  var options = {
    encoding: 'utf8',
    timeout: 0,
   // maxBuffer: 200*1024,
    killSignal: 'SIGTERM',
    //cwd: ProjectDir,
    env: process.env
  };
  var child= cdvSpawn(cmd, options,function(error, stdout, stderr){



        if (error) {
          console.error('exec error:'+error.toString());
          //return;
        }
        //console.log('stdout:'+stdout.toString());
        //console.log('stderr: '+stderr.toString());
      }
  );

  child.stdout.on('data', function(data) {
    if (data) {
      console.log(data.toString());
    }
  });
  child.stderr.on('data', function(data) {
    if (data) {
      console.error("error "+data.toString());
    }
  });
  child.on('close', function(data) {
    if (data) {
      console.log("exit with code"+data.toString());
      return child;
    }
  });
}
gulp.task("serve",function(){
  spwner('start react-native start');
})
gulp.task("log",function(){
  spwner('start adb logcat com.eSoko:V ReactNativeJS:V Firestack:V *:E');
})
gulp.task("run",function(){
  spwner('react-native run-android');
})
gulp.task("build",function(){
 spwner('cd android && gradlew.bat installDebug');

})
// Build production files, the default task
gulp.task('default',function(cb) {

  return download({
    file:"index.android.bundle",
    url:"http://localhost:8081/index.android.bundle?platform=android&dev=false&hot=false&minify=true"})
  .pipe(gulp.dest(DIST))
});


gulp.task("serveFiles",function(){
    spwner('cd ../../jpgs && http-server -a localhost -p 3000');
})

gulp.task("bundle",function () {
  spwner('react-native bundle --platform android --dev false --entry-file index.android.js \
--bundle-output android/app/src/main/assets/index.android.bundle \
--assets-dest android/app/src/main/res/')

})

gulp.task('PHPtranspile',function(cb) {

    var transpiler = require('php-transpiler');
    var instance = new transpiler({
        browser: true // says if we generate code for browser or nodejs
    });
    //var readStream = fs.createReadStream(__dirname+'/src/utils/wp-db.js');

    fs.readFile(__dirname+'/src/utils/ez_sql_core.php', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        //console.log(data);
        var jsCode = instance.read(data);
       // console.log(jsCode);


        fs.writeFile(__dirname+'/src/utils/gen/db.js', jsCode, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });
    })

   /* fs.readFile(__dirname+'/src/utils/schema.php', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        //console.log(data);
        var jsCode = instance.read(data);
        // console.log(jsCode);


        fs.writeFile(__dirname+'/src/utils/gen/schema.js', jsCode, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });
    })*/
//var php=require(".")

    //return
});
