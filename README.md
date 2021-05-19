# AceBook

CRUD login

login --> session params user id

form
email: email@mail.com
password: originalpassword
button(login)

find user id by email
create session (params user id)

log out
delete (destroy session)

--> post : user id
--> commenting
--> likes

CRUD signup

C - creating a user
R - display user
U - edit profile
D - deleting profile

## Quickstart

First, clone this repository. Then:

```bash
> bundle install
> bin/rails db:create
> bin/rails db:migrate

> bundle exec rspec # Run the tests to ensure it works
> bin/rails server # Start the server at localhost:3000
```

## Troubleshooting

If you don't have Node.js installed yet, you might run into this error when running rspec:

```
ExecJS::RuntimeUnavailable:
  Could not find a JavaScript runtime. See https://github.com/rails/execjs for a list of available runtimes.
```

Rails requires a Javascript runtime to work. The easiest way is to install Node by running `brew install node` - and then run `bundle exec rspec` again
