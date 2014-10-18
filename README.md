learn
=====

Raw thoughts

- Web HomePage shows Deals grouped by Root Category (Like 3 in number)
  - City => deals
  - Fashion => Deals
  - Gadgets => Deals

- Same need to show on Mobile
  - All Deals can't be loaded at once, need to use pagination
  - but need to maintain Category Ordering
  - Load page and show first 10 deals of City Category
  - Swipe and show 10 more
  - We would reach a point where deals returned are less than 10
    - Switching trigger for next category
    - Change category and start pagination for changed category deals
  - Terminate when Root categories list has exhausted 

## Simple Huh !!

- Gotchas
  - We need to be in perfect sync with Number 10 on Backend / FrontEnd
  - If it increases, will not be an issue
  - but decreasing it will result
    - in sending chained requests as data would always be less that 10
    - will terminate when we have exhausted categories
    - all data in one go .. oops !!

- Remove dependency on Number 10 as highly coupled
  - has uncontrolled side-effects (refer above)
- Instead Depend on Data Absence for Switching to Next Category
  - When no results just initiate first pagination request with new category
