package com.esoko;

import android.app.Application;
import android.util.Log;
import java.util.Arrays;
import java.util.List;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
//user import
import io.fullstack.firestack.FirestackPackage;
import org.pgsqlite.SQLitePluginPackage;
import com.imagepicker.ImagePickerPackage;
//import co.apptailor.Worker.WorkerPackage;


public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
         new SQLitePluginPackage(),   // register SQLite Plugin here
          new FirestackPackage(),  //register firestack here
          new ImagePickerPackage(),//image picker
         // new WorkerPackage(new SQLitePluginPackage(),new FirestackPackage()),//workers thread
          new MainReactPackage()

      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
