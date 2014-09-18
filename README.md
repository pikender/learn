learn
=====

Raw thoughts

- Rails Arel not enumerated
  - use of `paginate` without `all`
    - page_entries fire queries
    - iterating to show data fires queries
    - gets worse if we are eager loading stuff (additional queries) 

- Inefficient use of associations and eager-loading
  (includes/preload/eager_load)
  - whenver two tables have some common entity
    - generally `id` column but could be others like `name`
    - ShippingAddress#area => Area#name
    - ShippingAddress#state => State#name
    - Required for caching the ShippingAddress area name and state name w/o referring Area and State for
      names 
  - indicates an opportunity to have association and opens the way to
    eager-loading it
