# Cowculator3

A calculator for [Milky Way Idle](https://www.milkywayidle.com).

## Notices

Some images used on this website are the copyrighted property of [Milky Way Idle](https://www.milkywayidle.com). All rights belong to their respective owners. These images are used here solely for illustrative purposes and to enhance the user experience. Unauthorized use, reproduction, or distribution of these images is strictly prohibited. Any inquiries regarding the use of these images should be directed to Milky Way Idle.


## Local Development

Requires docker + compose, so get that

Run `docker compose up` inside the project directory, then navigate to `localhost:5173` to view the app


## Updating Client Data

MWI stores all of the game metadata in `localStorage.initClientData`. 
This app uses only some of that data, so we use a script to extract and format it.

To update the data, follow these steps:

1. Create a new file `init-client-data.json` in the root of this repo.
2. Open the browser developer tools in Milky Way Idle
3. Copy the value from `localStorage.initClientData`.
4. Paste the value into the json file.
5. Run `yarn regen-client-data`
