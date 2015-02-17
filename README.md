learn
=====

Raw thoughts

## Assertion

State Machine is apt-choice when

- lot of transitions are happening to track a workflow
- business logic is tied to final state in transition

## Example

- Voucher Code
  - has expiry date

- Rules
  - should get redeemed only once
  - should not redeem
    - if cancelled 
    - if expiry date is crossed
    - if already redeemed

By loooking at cancelled, redeemed and a state other than this, we
decided to use state_machine

After implementing state_machine, we got in the fix that errors were not
reported as per stated Rules though data sanity was maintained as none
of the stated rules were violated.

Being a user-end feature, error messages were critical

When trying to integrate errors, we used state_machine feature to define
validations in states of state_machine as show below

```ruby
class VoucherCode < ActiveRecord::Base
  state_machine :status, :initial => :new do
    event :redeem do
      transition any => :redeemed
    end

    event :cancel do
      transition any => :cancelled
    end

    state :redeemed, :value => STATUS[:redeemed] do
      validate :ensure_not_expired, :ensure_valid_redeemable_state
    end

    state :cancelled, :value => STATUS[:cancelled] do
      validate :ensure_valid_cancellation_state
    end

    state :new, :value => STATUS[:new]
  end

  def ensure_valid_redeemable_state
    case status_was
    when STATUS[:cancelled]
      errors.add(:base, 'Sorry!! The voucher is cancelled and cannot be
redeemed')
    when STATUS[:redeemed]
      errors.add(:base, 'Sorry!! The voucher is already redeemed')
    end
  end

  def ensure_valid_cancellation_state
    case status_was
    when STATUS[:cancelled]
      errors.add(:base, 'The voucher is already cancelled')
    when STATUS[:redeemed]
      errors.add(:base, 'Voucher code cannot be cancelled as its already
redeemed')
    end
  end

  def ensure_not_expired
    if expired?
      errors.add(:base, 'Sorry!! The voucher code has expired')
    end
  end

  def redeem(user)
    self.user = user
    #super is called to call the redeem method of state machine
    super
  end

  def expired?
    expiry_date < Date.current
  end
end
```

To integrate errors, we need to check the state from which transition
happened and also need to allow transitions from `any` state to redeemed
to trigger the validations which looks wrong as state_machine
restriction is lifted-off to get errors

*Note*: Redeem method is overridden to allow user assignment before
 calling StatMachine Redeem Event

Although, state_machine really shined in Order where picked_up
shipping_status is allowed only if driver is present
Also, tracking lot of transitions in workflow

```ruby
class Order
  state_machine :shipping_status, initial: :new do
    state :picked_up do
      validates :driver_id, presence: true
    end
  end
end
```

*Pending*: [Event with Bang tell Reasons for failure
 too](http://www.rubydoc.info/github/pluginaweek/state_machine/master/StateMachine/Integrations/ActiveModel#ValidationErrors)
