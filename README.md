# TeamXavier-Hong

github link - https://leclerc162003.github.io/TeamXavier-Hong/
Our Project is called Genshin Gacha Simulator. It is a Gacha Simulator for Genshin Impact fans to capture their favourite characters and weapons without spending money in game. Through this Gacha Simulator, players can immerse themselves in an amazing experience by rolling the gacha and obtaining different weapons and heroes. They are also capable of storing their progress by creating an account. Furthermore, for players who would like to compare their gacha, there is a leaderboard for players to see who is the best among them. Genshin Gacha Simulator is also embedded with sleek and modern animations to enrich user experience while on our website.

## Design Process
We created Genshin Gacha Simulator for Genshin Impact players who are looking for the satisfaction of pulling their favourite characters and weapons from the gacha system without spending money. Through this website, we hope to capture the same experience from the game where users anticipate what their next pulls would be, including the pity system from the actual game. Genshin Gacha Simulator allows you to create your own account and save the items that you have pulled from the Gacha. You will be able to view in your inventory what you have pulled in the past and how many copies you have pulled. You will also be able to see and compete with top players on the leaderboard to put YOUR name on the leaderboard.

### Welcome page

When you first step into our website, you will be greeted by the login / signup page with Ganyu, a character from Genshin Impact as the background.

- As a new user, you can select signup and will be able to create an account with a unique name and a password requiring at least 8 characters.

- As a user who already has an account, you can select login and enter your unique username and password to log into said account. In addition, you are given a choice to select the Remember Me option, to automatically log into your account the next time you enter the website.

- As a user who has selected the remember me option, you will be signed into your account after entering the website without entering your details.

- As a user type, I want to be able to see items that I have pulled, so that I can count how many 5 star items I have obtained.

### Gacha

The main focus of our website is the gacha system, this is the main feature of our website and user's interaction with this feature will be almost addicting.

- As a user who want to pull a Character, I would select the Character Roll x10 for a guaranteed chance to get a 4 star character and a small chance to get a 5 star character.

- As a user who want to pull a Weapon, I would select the Weapon ROll x10 for a guaranteed chance to get a 4 star weapon and a small chance to get a 5 star weapon.

### Inventory

The Inventory system collects user's gacha rolls and displays it for the user to view again

- As a user who wants to see how many copies of Venti (5 Star Character), I would select Inventory from the top right icon and scroll to see if I have Venti and see how many copies I have collected.

### Profile Settings

Users can enter the profile setting by clicking their name from the main page, the profile settings includes the following options: Change Password, Logout and Delete Account.

- As a user who wants to change my password, I would go into the profile settings, click on change password, enter my old password and a new password I want to change to which is required to be 8 characters and then click Enter. The website will then alert you if the change has been made and if so, redirect you to the login page.

- As a user who wants to logout, I would go into the profile settings and click on logout.

- As a user who wants to delete my account, I would go into the profile settings, select delete account and afterwards select confirm.

### Stats / Leaderboard

Users are able to view their total pulls, number of pulls to 4 star / 5 star pity and the leaderboard

## Features
### Welcome page
- Option to Login / Signup
- Has a background image of Ganyu to fill the otherwise plain background
- TBA link to github for users looking for instructions

### Sign Up
- Cross button to go back to Welcome page
- Enter New Unique Username (Website will inform you if username is already taken)
- Enter Password (Requires at least 8 characters, website will reject your password if it does not meet the criteria)
- Submit Button that will be disabled upon submission until the user's action is processed
- Dot loading lottie animation to show users the website is loading their input
- Username and password is stored in [RestDB](https://restdb.io/)

### Login
- Cross button to go back to Welcome page
- Enter their Username & Password (Website will inform them if username / password is incorrect)
- Remember me checkbox button that will save the user's ID into the local storage after a succesful login which will be used to automatically login user from then onwards
- Submit Button that will be disabled upon submission until the user's action is processed
- Dot loading lottie animation to show users the website is loading their input
- Website retrieves users from [RestDB](https://restdb.io/) and compares if username and password matches

### Gacha System
Genshin Gacha Simulator has the following Gacha System:

**Character Banner**

Character rolls are calculated as followed
```Javascript
var roll = Math.floor(Math.random() * 1000);
    var star = 3;
    if (roll < 6) {
        star = 0;       // 5 Star Character
    } else if (roll < 57) {
        star = 1;       // 4 Star Character
    } else {
        star = 2;       // 3 Star Weapon
    }
```
> 5 Star character probability : 0.6%

> 4 Star character probability : 5.1%

> 3 Star weapon probability    : 94.3%

**Weapon Banner**

Weapon rolls are calculated as followed
```Javascript
var roll= Math.floor(Math.random() * 1000);
    var star = 3;
    if (roll < 7) {
        star = 0;       // 5 Star Weapon
    } else if (roll < 67) {
        star = 1;       // 4 Star Weapon
    } else {
        star = 2;       // 3 Star Weapon
    }
```
> 5 Star weapon probability : 0.7%

> 4 Star weapon probability : 6.0%

> 3 Star weapon probability : 93.3%

In addition, the Gacha System includes a pity system, where if a user has pulled x amount of rolls and hasn't gotten x star character / weapon, the following pull will guarantee a x star character / weapon.
```Javascript
if (pulls - pity100pull == 100) {           // If pity hits, 5 star is guranteed
        var r = 0;
    } else if (pulls - pity10pull == 10) {  // If pity hits, 4 star is guranteed
        var r = 1;
    } else {                                // Else roll as usual
        var r = CharacterStarRoll();
    }
```

After a user pulls, what characters / weapon they recieve, the total number of pulls they did, when was the last 4 star and 5 star character they recieved (To calculate pity pull) is stored on [RestDB](https://restdb.io/).

When a user rolls the gacha, a [Shooting Star Lottie](https://lottiefiles.com/5040-shooting-star) will be played as in Genshin Impact, their Gacha system also shows shooting stars while rolling, keeping to the theme.

The characters / weapons name will be displayed at the bottom of their respective images along with a colour scheme to identify the number of stars they are.

> 5 Star : Yellow

> 4 Star : Purple

> 3 Star : Aqua

###  Inventory
The inventory displays the characters / weapon the user has. For the sake of less clutter, 3 star weapons are not shown or saved in the inventory due to their sheer volume and insignificance in the gacha other than being a filler item.

When the Inventory is opened, the website requests the user's 2 inventory list from [RestDB](https://restdb.io/) 5 Star Inventory and 4 Star Inventory, and displays on the website their items, sorted with 5 stars at the top followed by 4 stars.

TBA 5 Star characters / weapon can be identified by their yellow names while 4 Star characters / weapons with purple names

### Profile Settings
The Profile Settings has 3 options, Change Password, Logout & Delete Account.

**Change Password**


## Credits
- Genshin Impact
- Lottie Animaton
### Gacha
All artworks and images are from miHoYo and were taken from 

https://genshin.mihoyo.com/en/home

https://genshin-impact.fandom.com/wiki/Genshin_Impact_Wiki

### Font
Google Fonts 

https://fonts.google.com/specimen/Noto+Serif+SC?preview.text=Genshin%20Impact%20B&preview.text_type=custom&sidebar.open=true&selection.family=Noto+Serif+SC:wght@500;900

### Lottie
https://lottiefiles.com/5040-shooting-star

https://lottiefiles.com/22711-cross-button

https://lottiefiles.com/890-loading-animation

## Acknowledgement
