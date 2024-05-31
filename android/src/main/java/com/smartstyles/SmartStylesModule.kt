package com.smartstyles

import android.content.Context
import android.content.SharedPreferences
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class SmartStylesModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  private val sharedPreferences: SharedPreferences = reactContext.getSharedPreferences("RNSS", Context.MODE_PRIVATE)

  override fun getName(): String {
    return NAME
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  fun multiply(a: Double, b: Double, promise: Promise) {
    promise.resolve(a * b)
  }

  @ReactMethod
  fun add(a: Double, b: Double, promise: Promise) {
    promise.resolve(a + b)
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun getTheme(): String {
    return sharedPreferences.getString("RNSSTheme", "light") ? : "light"
  }

  companion object {
    const val NAME = "SmartStyles"
  }
}
