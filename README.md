learn
=====

Raw thoughts

## Requirement

- Create Views to Redeem / Multi Redeem / Verify Coupons
- Views are almost same with some different jQUery Element Selectors
- Even Getting Data for those views was same
- Difference lied in forms and their event binding and triggering AJAX
  (Get Data) and Updating Views with Data

## Journey through

- Usecase was clearly of some Front-End MVC framework but no experience
  in any
- Being experienced in Jquery and JS class concepts
- We started with creating JS classes for Redeem / Multi Redeem / Verify
  Coupons
- Soon Lot of duplication started appearing in the way data is fetched
  and views getting updated
- We needed a way to keep similar code moved to a separate class which
  can be shared
- When the common functionality got moved to shared location
  (RedeemHelper)
- We got into a kind of circular ref problem as RedeemHelper needed to
  refer RedeemClass to get references of some jQUery Selectors specific
to Redeem Class
- Also Redeem class needed reference to call RedeemHelper to delegate
  common functionality
- It was not very intuitive to work/understand so discussed with Team

## Discussion with Team

- When explaining the inconvenience and implementation, team pointed to
  keep view updation separate from Getting Data for it

## Separating Update View Logic from Getting Data

- We started with extracting view logic from getting data
- soon, getting data class was just holding reference to AJAX and data
  needed to trigger it
- All the AJAX callbacks were essentially modifying views based on data
- All that logic got moved to UpdateView Class and related
  promises/functions are passed to AJAX callbacks from it
- As Update View Logic was same for All Redeem / Multi Redeem / Verify,
  we used JS inheritance to share the code b/w classes

## Final Organization

- CouponView BaseClass
- Redeem Class inheriting from CouponView
  - define JS events specific to Redeem
  - On Event whatever action need to be done was pushed to CouponView if
    common to all classes
  - Else defined here 
- MultiRedeem Class inheriting from CouponView
- VerifyCoupon Class inheriting from CouponView

## Conclusion

- Finally got over the barrier to use inheritance to share code b/w
  JS classes
- Initialization Sequence of Classes bacame more intuitive and avoided
  circular reference problem
- Code turned out to be more clear and maintainable


## Initial Initialization of classes

Creating Class Objects
```
var redeemCoupon = new RedeemCoupon();
var redeemHelper = new RedeemHelper(redeemCoupon, singleRedeemUrl, accessKey, secretKey);
redeemCoupon.init(redeemHelper);

var multiRedeemCoupon = new MultiRedeemCoupon();
var multiRedeemHelper = new RedeemHelper(multiRedeemCoupon, singleRedeemUrl, accessKey, secretKey);
multiRedeemCoupon.init(multiRedeemHelper);
```

RedeemHelper
```
var RedeemHelper = function(baseObj, singleRedeemUrl, accessKey, secretKey) {
  this.baseObj = baseObj;
  this.singleRedeemUrl = singleRedeemUrl;
  this.accessKey = accessKey;
  this.secretKey = secretKey;
}
```

Redeem
```
var RedeemCoupon = function() {
  this.messagesWrapper = $('#single-coupon-redeem-results');
  this.infoPlaceholder = $('#single-coupon-info-placeholder');
  this.failedRedeemCount = $('#single-coupon-redeem-summary .failed-msg');
  this.successRedeemCount = $('#single-coupon-redeem-summary .redeemed-msg');
  this.singleRedeemUrl = singleRedeemUrl;
  this.accessKey = accessKey;
  this.secretKey = secretKey;
 }
 
RedeemCoupon.prototype.init = function() {
RedeemCoupon.prototype.init = function(redeemHelper) {
  this.redeemHelper = redeemHelper;
  this.bindEvents();
}
```

## Final Initialization

```
-      var redeemCoupon = new RedeemCoupon();
-      var redeemHelper = new RedeemHelper(redeemCoupon, singleRedeemUrl, accessKey, secretKey);
-      redeemCoupon.init(redeemHelper);
+      var redeemHelper = new RedeemHelper(singleRedeemUrl, accessKey, secretKey);
 
-      var multiRedeemCoupon = new MultiRedeemCoupon();
-      var multiRedeemHelper = new RedeemHelper(multiRedeemCoupon, singleRedeemUrl, accessKey, secretKey);
-      multiRedeemCoupon.init(multiRedeemHelper);
+      var redeemCoupon = new RedeemCoupon(redeemHelper);
+      redeemCoupon.init();
 
-      var verifyCoupon = new VerifyCoupon();
-      var verifyCouponHelper = new RedeemHelper(verifyCoupon, verifyCouponUrl, accessKey, secretKey);
-      verifyCoupon.init(verifyCouponHelper);
+      var multiRedeemCoupon = new MultiRedeemCoupon(redeemHelper);
+      multiRedeemCoupon.init();
+
+      var verifyCouponHelper = new RedeemHelper(verifyCouponUrl, accessKey, secretKey);
+      var verifyCoupon = new VerifyCoupon(verifyCouponHelper);
+      verifyCoupon.init();
```

Update Coupon View Class
```
var CouponViewBase = function() {
}
```

RedeemHelper
```
var RedeemHelper = function(singleRedeemUrl, accessKey, secretKey) {
  this.singleRedeemUrl = singleRedeemUrl;
  this.accessKey = accessKey;
  this.secretKey = secretKey;
  this.couponNumber = null;
}
```

Redeem
```
var RedeemCoupon = function(redeemHelper) {
  this.messagesWrapper = $('#single-coupon-redeem-results');
  this.infoPlaceholder = $('#single-coupon-info-placeholder');
  this.failedRedeemCount = $('#single-coupon-redeem-summary .failed-msg');
  this.successRedeemCount = $('#single-coupon-redeem-summary .redeemed-msg');
  this.redeemHelper = redeemHelper;
}
```
