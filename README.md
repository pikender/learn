learn
=====

Raw thoughts

Great insights come with simple problems tried from different angles

## Problem
- Log Shipping Status Change Timestamp for Orders
- Every Shippable Order would start follow New => Processing => Ready =>
  Shipped

## Schema Change
- Add OrderTimeLog Table - would belong to order
- Add new_at, processing_at, ready_at, shipped_at
- When there is a state change, create the col_name from state_name and
  update it with current time
  - Order#shipping_status:new =Update=> OrderTimeLog#new_at
- Fortunately, language of choice is Ruby so meta_programming helped
  write less code

## First Way
- Create a time_log entry when order is created and set the new_at same
  as Order#created_at
- When there is a change in shipping_status, find the time_log and
  update the respective column
### Pros
- Just by looking at time_log entries, we can figure what all is still
  pending and in which state
### Cons
- requires to update the callback creation condition everytime there is
  a change in requirement of shipping status change tracking
- migration for current orders needed to create a time log where
  shipping_status has not yet reached the final state

## Second Way
- Wait for the shipping_status change to create the time_log entry
- either find or create the entry and update respective time_log column
- 
### Pros
- No migration of existing data needed
- No extra work added on Order creation
- No check needed to create time_log entry for some specific cases and
  avoid others
  - less change means less test cases 
- depends on event and would be extendible if we decide to add more
  cases where shipping status need to be tracked
  - Today: paid and shipping 
  - Later: cod and shipping
### Cons
- OrderTimeLog would not have entry till it receives first event
  - makes us look for orders first for orders who have not yet started
  - reporting needs to take care of above point
  - NOTE: no loss of data though as new_at would always be same as
    Order#created_at
