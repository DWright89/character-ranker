# Character Ranker
#### Made by: [Denny Wright](https://github.com/DWright89), [Susan Roberts](https://github.com/susanroberts), [James Brown](https://github.com/JimBrown64), and [Henry Wiest](https://github.com/henryw110).

This app allows a user to post, view, vote on, and comment on video game characters.

Some of the core features include:
- Submitting a character
- Voting on characters
- Commenting on characters
- A ranked list showing the top 5 up-voted characters
- A shame zone showing the lowest-rated character

This app is available to view [here](https://character-ranker.herokuapp.com), or you can download this repository and view on your machine by typing the below commands in your terminal and navigating to localhost:3000 in your browser:

```
yarn install
createdb character-ranker_development
cd server
yarn run migrate:latest
yarn run db:seed
cd ..
yarn run dev
```