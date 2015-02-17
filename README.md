learn
=====

Raw thoughts

Doing paid campaigns and collecting emails to subscribe for newsletter,
we got challenged to store subscription status as:

- subscribed: if new subscription created
- now_subscribed: if existing and inactive and now changed as active
- no_change: if already subscribed

Subscriptions are tracked in EmailSubscription Table and emails are
collected per state basis.

It turned out easy
- as we are finding the email and state in
EmailSubscription
  - if found, check subscription active or not
    - if inactive, set subscription status as now_subscribed [Turning to
      active]
    - if active, set subscription status as no_change [Turning to
      active will result in no change]
  - if not found, set subscription status as subscribed [New
    Subscription]

Now, it becomes interesting when we need to track subscription status
when User decides to signup too when coming from paid campaign

Again, we have same decision tree to traverse
- New Subscription [subscribed]
- Existing Subscription
  - Inactive [now_subscribed]
  - Active [no_change]

Note: EmailSubscription can exist without user being in system as
newsletters can be sent to prospective customers who might become users

User is created and email subscriptions are created with it.
As we are not directly editing/referencing subscriptions, it became
difficult to track new / existing subscription.

We asked whether there is a way to track new associated objects created in the
object lifecycle [Not yet answered]

But answer was hidden in the assertion that

>
Note: EmailSubscription can exist without user being in system as
newsletters can be sent to prospective customers who might become users

If we will delay the association of existing EmailSubscription to User,
we can track whether subscription is new / existing by just checking
*user_id* key.

If *user_id* is NIL, its existing else New.

BINGO !! We are saved :)
