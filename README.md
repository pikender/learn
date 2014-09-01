learn
=====

Raw thoughts

- While doing emarsys-newsletter platform integration
  - used emarsys-rb gem
  - Its a nice ruby wrapper around emarsys apis
  - The reponse wrapper was returning the parsed response, if all went
    well
  - else Exception for Bad Request / Unauthorized
  - It meant, if request fails our execution flow would break, if we
    dont catch the exception
  - We wanted to proceed irrespective of error, as we wanted to log the
    reponse whatever it wuld be for debugging purposes.

- Enter the domain of Ruby Open Class (monkey-patching etc)

- Following code added to Rails application

```
# config/application.rb
config.to_prepare do
  # Load application's class overrides from gem
  Dir.glob(Rails.root.join('app', 'overrides',
          '*_override.rb')).each do |c| 
    Rails.configuration.cache_classes ? require(c) : load(c)
  end 
end
```

- A directory added to host the monkey-patched code

```
# app/overrides/emarsys_override.rb
Emarsys::Response.class_eval do
  def result
    self
  end

  def success?
    code == 0
  end
end
```
