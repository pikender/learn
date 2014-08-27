learn
=====

Raw thoughts

Model Objects
=======

- Deal
- OptionTypes
- OptionValues [Belongs to OptionTypes]
- Variant [Belongs to Deal]
- DealOptionTypes
- VariantOptionValues


Problem
=======

- Ability to Order DealOptionTypes
- Should reflect the ordering in OptioValues through VariantOptionValues 


First Approach
==============

- Add a position field in DealOptionTypes
  - Reorder it using acts_as_list
- Sync the reordering change in VariantOptionValues from DealOptionTypes 
  - Add a position field in VariantOptionValues
  - Reorder it as and when there is a change in DealOptionTypes
- Add the position order as default to read of VariantOptionValues 
  - In turn, orders OptionValues of Variant

## Pros
- SQL way of handling
 
## Cons
- Syncing Overhead and keeping upto it

Second Approach
==============

- Add a position field in DealOptionTypes
  - Reorder it using acts_as_list
- Get the DealOptionTypes ids in the order of their position
- Use `field(option_type_id, DealOptionTypes_ids_list)` while
  fetching OptionValues from Variant

## Pros
- Less overhead in terms of syncing
- SQL helped achieve it

## Cons
- Prior knowledge of such hack everywhere needed
- Procedural approach for finding option_values
  - Find Variant
  - Find DealOptionTypes
  - Find OptionValues and add the clause of ordering from above step
