learn
=====

Raw thoughts

We came across a problem of same random numbers very rarely.

To ensure uniqueness, we were generating numbers and then
comparing against DB for its non-presence and if its succeed,
we assign it to the record.

It was working fine with no issues yet but on same day, we got two
instances of same bug.

We were generating numbers for Parent Record which had N Child records.
We observed that uniqueness problem occured for Child Records with same
Parent.

On further investigation, we concluded that we should compare for
uniqueness both againt records in DB and records in Memory (future
contendors for DB records)

Conclusion
==========

Records in Memory are future DB records so should always be part of
logic and never ignored :)
