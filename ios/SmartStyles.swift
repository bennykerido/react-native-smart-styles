import Foundation

@objc(SmartStyles)
class SmartStyles: NSObject {

  @objc func getTheme(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
    let defaults = UserDefaults.standard
    let theme = defaults.string(forKey: "RNSSTheme") ?? "light"
    resolve(theme)
  }

  @objc func setTheme(_ theme: String) -> Void {
    let defaults = UserDefaults.standard
    defaults.set(theme, forKey: "RNSSTheme")
  }

  @objc func toggleTheme(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
    let defaults = UserDefaults.standard
    let theme = defaults.string(forKey: "RNSSTheme") ?? "light"
    let otherTheme = theme == "light" ? "dark" : "light"
    defaults.set(otherTheme, forKey: "RNSSTheme")
    resolve(otherTheme)
  }
}
