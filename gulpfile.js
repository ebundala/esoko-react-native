

'use strict';


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
  spwner('start adb logcat com.eSoko:V ReactNativeJS:V Firestack:V *:S');
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
    url:"http://localhost:8081/index.android.bundle?platform=android"})
  .pipe(gulp.dest(DIST))
});


gulp.task("serveFiles",function(){
    spwner('cd ../../jpgs && http-server -a localhost -p 3000');
})