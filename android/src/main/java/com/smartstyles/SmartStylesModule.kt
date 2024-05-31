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

  @ReactMethod()
  fun getTheme(promise: Promise) {
    val theme: String = sharedPreferences.getString("RNSSTheme", "light") ?: "light"
    promise.resolve(theme)
  }

  @ReactMethod()
  fun setTheme(theme: String) {
    val editor: SharedPreferences.Editor = sharedPreferences.edit()
    editor.putString("RNSSTheme", theme)
    editor.apply()
  }

  @ReactMethod()
  fun toggleTheme(promise: Promise) {
    val theme: String = sharedPreferences.getString("RNSSTheme", "light") ?: "light"
    val otherTheme: String = if (theme == "light") "dark" else "light"
    setTheme(otherTheme)
    promise.resolve(otherTheme)
  }

  companion object {
    const val NAME = "SmartStyles"
  }
}
