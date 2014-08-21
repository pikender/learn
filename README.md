learn
=====

Raw thoughts

Conditionals like:

```
if Rails.env.production?
else
end
```

Cases Based on environment
=========================

- On/Off features
  - Enable Validation
- Different String or Other Defaults 
  - Different Subject Line in Emails 
  - Different Promotional Lists on SendGrid
- Different Execution of Code
  - Send Email in Production
  - Just Log that Mail would be sent without sending it
- Migrations referring to different database and tables
  - Api Logs captured in Different DB Tables
  - Creating Different Database for ApiLogs other than test
  - Using Different connection for ApiLog other than test
  
Possible Solutions
=================

- On/Off features
  - Defining Constants in Environment Files
  - Using configurable (table storing configurations)
    - different DB for different environments, set individually 
  - settings.yml and `Class Setting` converting keys to values - Use
    Setting.key or Setting[key]
  - secrets.yml (Rails.secret) - Rails 4.2
- Different String or Other Defaults 
  - Mocking/Stubbing can be used to override values in different
    environments
  - System similar as Internationalization for interpolating strings 
  - A simple method taking actual and default value as paramters
    - For production return actual value, otherwise default :)
  - secrets.yml can be used here too 
- Different Execution of Code
  - alias_method_chain
  - Load different files based on environment having different
    implementations
  - override the methods behaviour based on environment
    - Hit Api but Log in Test Env https://github.com/collectiveidea/sunspot_test 
- Migrations referring to different database and tables
  - Use Elastic Search as DB for storing Api Responses and Querying it
    :)


Email Overrides
=============== 

- mail_trap gem
- email interceptor
