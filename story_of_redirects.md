learn
=====

Raw thoughts

Story of Redirects
------------------

- There were urls which used to redirect to a landing page and ask for
emails for marketing.
- User was not allowed to open any other url till he submits the email
  once.
- It was working well but one day a new idea came rushing and
  interrupted the flow.
- It was based on user feedback so couldn't be ignored.
- Idea was to allow users to navigate on site but presenting a pop-up on
  each page asking emails for marketing.
  - Now the user couldn't complain about not able to navigate to site
    and simultaneously forced to provide the email too. Bingo !!
- When the idea was brought fwd to Devs, they studied the old behaviour
  and analyzed the new requirement and tried keeping both (violation of
SRP)
- As the challenges were unkown they started the quest and sufferings of
  long journey with complex routes (assumptions) came hitting.
  - First hurdle of creating pop-up was overcome easily and now the
    redirection challenge came into swing.
  - It throwed Dev on face when implemented as "Redirect Loop" Warriors
    came with full flow and destroyed the hapy homes of dev.
    - A way (special route) was compromised with them for truce. [1]
  - Some new soldiers got recruited, unaware of the compromise/truc
    e with "Redirect Loop" Warriors
    - They were then informed not to violate the truce [2] 
    - They were trained further to memorise the special route to avoid
      "Redirect Loop" Warriors [3]
    - Then some soldiers were lost and never found [4]

Moral of the Story
------------------

Always bring one inconvenience for user to satisfy the business needs
and when asked for more, try to get the sense and make a way for only
one :)

Here inconvenience of redirect was dropped in favor of showing pop-up
(another inconvenience)

[Soldiers were instructed to protect the own land and not leave the
country to conquer other lands till the "Sword to cut Redirect Loop
Warriors" is not yielded]

---- Content -----
 
# [1] Redirect Url and Current Url are same then don't redirect
# [2] Redirect Url = '' [Optional] then redirect to root_url
## Root Url = www.dealdey.com
## Root Url = www.dealdey.com/
### Redirect Url and Current Url are same then don't redirect - Fails
### [3] Strip appending slashes and compare
# We have some url which is not valid and we redirect to root_url
# Redirect Url would be different that Root_Url - again redirect loop
# [4] Redirect Url = www.google.com [Outside the app domain]
## No way to get back to site and break the redirect loop

Redirection is like a inconveniences which we are introducing so that user gives his email for further action
We have changed it to Pop-Up
Inconvenience should be pop-up and not redirection
variable set - show pop-up
First time, we are redirecting and after that we are just showing pop-up and no redirections
