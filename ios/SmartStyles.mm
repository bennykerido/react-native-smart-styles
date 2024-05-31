#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SmartStyles, NSObject)

RCT_EXTERN_METHOD(getTheme:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setTheme:(NSString *)theme)
RCT_EXTERN_METHOD(toggleTheme:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)


+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
