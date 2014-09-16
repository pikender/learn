learn
=====

Raw thoughts

## Sometimes, you come across situations where only a page should be
 shown only once
- e.g. Order Success Page

## Possible Ways
- Just restricting access through browser's navigation bar
  - check for `request.referrer`, it would not be present if url is
    directly accessed through browser
  - but if you create an <a> tag and put it there, this check would fail
    :(
  - not very reliable
- adding a column in DB table of concerned page's object
  - e.g. Order
  - add a column `show_once` as boolean
  - set `show_once` as true when order is created
  - unset `show_once` when Order success page is rendered
  - Add a check on Order success page which allows page view based on
    `show_once`
- Using session
  - its also about keeping persistent state but not in DB
  - it would use session as its persistent store
  - define a unique key `show_once` in session
  - set `show_once` as true when order is created
  - unset when Order success page is rendered
  - Add a check on Order success page which allows page view based on
    `show_once` key in session

