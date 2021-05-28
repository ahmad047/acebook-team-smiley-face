# BookFace

A full-stack web app inspired by the functionality of FaceBook. The web app allows the user to sign up, add friends, and make a post, message and more.

**Visit the website [here](https://stormy-beach-31437.herokuapp.com/)**

The features built in this project are based on [user stories.](./resources/user_stories.md)

Design, layout, functionality, and features were inspired by Facebook.

## Screenshots

![Sign-up](resources/signup.png)

![Feed](resources/feed.png)

![Sign-in](resources/signin.png)

## 🏁 Getting Started

To get started with the app, clone the repo then install the required gems:

```sh
bundle install --without production
```

Next, migrate the database:

```sh
rails db:create
rails db:migrate
```

Run the test suite to verify that everything is working correctly.

```sh
rspec
```

If the test suite passes, run the app in a local server:

```sh
rails server
```

## Features

- Create an account
- Sign in with created account
- Add a user profile picture
- Make a post to the feed
- Post a picture
- View all post peeps on the main feed
- View own posts on the profile feed
- View posts of the chosen user's feed
- View other user profiles
- Add a comment
- Add a reaction (👍 💖 🔥)
- Instant-messenging chat-rooms
- Log out

## Built Using

- HTML
- CSS (Bootstrap)
- JavaScript
- jQuery
- Ruby
- Ruby on Rails
- PostgreSQL
