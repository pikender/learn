learn
=====

Raw thoughts

Better is to quote the problem using code sample.

```ruby
# columns => area:string, state:string
class ShippingAddress < ActiveRecord:Base
  def shipping_charge
    Area.where(name: area).first.total_shipping_charge
  end
end

# columns => name:string, shipping_charge:decimal, state_id:integer
class Area < ActiveRecord:Base
  belongs_to :state

  def total_shipping_charge
    shipping_charge + state.shipping_charge
  end
end

# columns => name:string, shipping_charge:decimal
class State < ActiveRecord:Base
  has_many :areas
end
```

Above implementation will result in lot of queries when we need to show
lot of shipping addresses with the shipping charge applicable to it as area is always looked up to find
`shipping_charge`

By not referencing area by id and by name gave the benefit that we dont
have to load `area` and `state` to show shipping_address but introduced
performance problem

By closely evaluating, we found that problem would have been easier if
we had association of area and state with shipping address which we
could have eager loaded and avoided tooo many queries problem

But whats stopping us now, Rails shine in such situations by allowing
configuration to create an association still

```ruby
# columns => area:string, state:string
class ShippingAddress < ActiveRecord:Base
  belongs_to :shipping_area, class_name: 'Area', primary_key: 'name',
foreign_key: 'area'

  def shipping_charge
    shipping_area.total_shipping_charge
  end
end

# columns => name:string, shipping_charge:decimal, state_id:integer
class Area < ActiveRecord:Base
  belongs_to :state

  def total_shipping_charge
    shipping_charge + state.shipping_charge
  end
end

# columns => name:string, shipping_charge:decimal
class State < ActiveRecord:Base
  has_many :areas
end
```

Now, use eager loading like `user.shipping_addresses.includes(shipping_area: :state).all`

Calling `shipping_charge` on shipping_address would get the
`shipping_charge` from area and state from memory now and not executing
query always
