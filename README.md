learn
=====

Raw thoughts

When making an optional field mandatory, migration of existing data
could be tricky

- Default Value for Not Present Values in Old Data
- avoiding validations for old records for the above field
  - setting allowed default value can save us w/o much work

When setting the value is linked to other tasks, ideal way is to
differentiate b/w ported data and new valid data

We got a situation where we wanted to differentiate ported w/ new data.

Values allowed were 1,2,3
Old Data could have value 0 (default)

At first, we decided to treat 0 as default value but we get into the fix
where 
  - 0 might represent value which is waiting to get changed to 1,2,3 *OR* 
  - its actually ported DATA.

For old records, we started getting validation failures with 0 values

Its time to add one very ODD value to differentiate visually Ported vs
BAD data which should change.

We immediately picked 999 as ported value

Now, allowed values will be 1,2,3 and 999

Wait, but you can escape w/ setting new records as ported by choosing
999

So, we should guard against this possibility

This needed understanding, what does Old record meant in context of 999
to treat as ported.

Answering this helped us adding guard to not allow 999 for new records.

Once they satisfy old critria, we wont allow their change keeping the
new records never get the chnance to set as 999

We did the migration for old records by-passing validation and allowing
validation to pass when old records updated as ported 999 value is
allowed value

**Before**
```ruby
class Order
  validates :payment_mode, presence: true, inclusion: {in: [1,2,3]}
end
```

**After**
```ruby
class Order
  ## Allow Legacy Value
  validates :payment_mode, presence: true, inclusion: {in: [1,2,3, 999]}
  ## Restrict Legacy Value As desired
  validate :legacy_payment_mode, if: [:not_old_record?]
  ## Restrict the Value Change
  validate :no_change_in_payment_mode, if: [:old_record?]

  def legacy_payment_mode
    errors.add(:payment_mode, "#{PaymentMode[:legacy]} Only Allowed for
Old Records")
  end

  def no_change_in_payment_mode
    errors.add(:payment_mode, "Change Not Allowed for
Old Records")
  end
end
```

Phew!!
