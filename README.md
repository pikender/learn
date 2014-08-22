learn
=====

Raw thoughts

Tower Data provides a service to clean email data

- Result is available in form of csv added with a column w/ update for
  Status of Email as per Tower Data

- Task in hand was to update User record's email as per Tower Data
  Status

- Can be done sequentially iterating over LAKHS of records - Lot of Time
- Can be processed in batches - Time almost remains same - but unit of
  work completion are smaller now

Solution
========

- Exploit the CSV
- Import the CSV into temp table and Using SQL do the ACTION
- drop the table, if data not needed
- DONE !!!
