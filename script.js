var APIKEY = '6018fac06adfba69db8b6c85';

/*Arrays for Gacha*/
var Star5CharacterArray = ["Albedo","Diluc","Ganyu","Jean","Keqing","Klee","Mona","Qiqi","Tartaglia","Venti","Xiao","Zhongli"];
var Star4CharacterArray = ["Amber","Barbara","Beidou","Bennett","Chongyun","Diona","Fischl","Kaeya","Lisa","Ningguang","Noelle","Razor","Sucrose","Xiangling","Xingqiu","Xinyan"];
var Star5WeaponArray = ["Amos Bow","Aquila Favonia","Lost Prayer to the Sacred Winds","Memory of Dust","Primordial Jade Winged Spear","Skyward Atlas","Skyward Blade","Skyward Harp","Skyward Pride","Skyward Spine","Summit Shaper","The Unforged","Vortex Vanquisher","Wolfs Gravestone"];
var Star4WeaponArray = ["Compound Bow","Crescent Pike","Dragons Bane","Eye of Perception","Favonius Codex","Favonius Greatsword","Favonius Lance","Favonius Sword","Favonius Warbow","Iron Sting","Lions Roar","Mappa Mare","Prototype Amber","Prototype Archaic","Prototype Crescent","Prototype Rancour","Prototype Starglitter","Rainslasher","Royal Grimoire","Royal Longsword","Royal Spear","Rust","Sacrificial Bow","Sacrificial Fragments","Sacrificial Greatsword","Sacrificial Sword","Sword of Descension","The Bell","The Flute","The Stringless","The Widsith","Whiteblind"];
var Star3WeaponArray = ["Black Tassel","Bloodtainted Greatsword","Cool Steel","Dark Iron Sword","Debate Club","Emerald Orb","Ferrous Shadow","Fillet Blade","Halberd","Harbinger of Dawn","Magic Guide","Messenger","RavenBow","Recurve Bow","Sharpshooters Oath","Skyrider Greatsword","Skyrider Sword","Slingshot","Thrilling Tales of Dragon Slayers","Travelers Handy Sword","Twin Nephrite","White Iron Greatsword","White Tassel"];

/*Array to sort tiers*/
var CharacterArray = [Star5CharacterArray, Star4CharacterArray, Star3WeaponArray];
var WeaponArray = [Star5WeaponArray, Star4WeaponArray, Star3WeaponArray];

/*User profile*/
var username = "";
var password = "";
var inventory = "";
var id = "";
var pulls = 0;

function UpdateProfile() {        // load Profile into database
    var jsondata = {
        "name" : username,
        "password" : password,
        "inventory" : inventory,
        "pulls" : pulls};

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://genshingachasim-d09b.restdb.io/rest/profile/${id}`,
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata)
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

function CharacterStarRoll() {  // First Roll to find out what star or "tier" the item will be
    var roll = Math.floor(Math.random() * 1000);
    var star = 3;
    if (roll < 6) {
        star = 0;       // 5 Star Character
    } else if (roll < 57) {
        star = 1;       // 4 Star Character
    } else {
        star = 2;       // 3 Star Weapon
    }
    return star;
}

function WeaponStarRoll() { // First Roll to find out what star or "tier" the item will be
    var roll= Math.floor(Math.random() * 1000);
    var star = 3;
    if (roll < 7) {
        star = 0;       // 5 Star Weapon
    } else if (roll < 67) {
        star = 1;       // 4 Star Weapon
    } else {
        star = 2;       // 3 Star Weapon
    }
    return star;
}

function CharacterRoll(a) { // Second Roll to find out in the star or "tier" what item will be chosen. Returns 1) Name of PNG image of the item 2) No. of star the weapon has 3) Name of the item with spacing
    var r = CharacterStarRoll();
    var name = a[r][Math.floor(Math.random()*a[r].length)];
    var roll = name.replace(/ /g, "");  // Remove space from the name of the item
    if (r == 2) {
        inventory = inventory.concat(`,${name}`);       // Add item to back of inventory after rolling
    } else {
        inventory = (`,${name}`).concat(inventory);     // Add rarer item to front of inventory after rolling
    }
    return [roll, r, name];
}

function WeaponRoll(a) {    // Second Roll to find out in the star or "tier" what item will be chosen
    var r = WeaponStarRoll();
    var name = a[r][Math.floor(Math.random()*a[r].length)];
    var roll = name.replace(/ /g, "");  // Remove space from the name of the item
    if (r == 2) {
        inventory = inventory.concat(`,${name}`);       // Add item to back of inventory after rolling
    } else {
        inventory = (`,${name}`).concat(inventory);     // Add rarer item to front of inventory after rolling
    }
    return [roll, r, name];
}

function CharacterRollx10(a) {
    $("#gacha").html('');   // Reset the gacha
    $(".gacha").show();     // Show gacha
    for (let i = 0; i < 10; i++) {
        var temproll = CharacterRoll(a);
        var roll = temproll[0];     // Name of the png image of item
        var star = temproll[1];     // No. of star the item has
        var name = temproll[2];     // Name of the item with spacing
        console.log(star);
        if (star == 2) {
            $('#gacha').append(`<div id="roll${i}" class="gacha"><img src="./Gacha/${roll}.png" alt="${roll}" class="img-gacha"><p>${name}</p></div>`);     // Common item gets added to the back of the list
        } else {
            $('#gacha').prepend(`<div id="roll${i}" class="gacha"><img src="./Gacha/${roll}.png" alt="${roll}" class="img-gacha"><p>${name}</p></div>`);    // Rarer item is added to the front of the list so its the first to show up
        }
    }
    UpdateProfile();
}

function WeaponRollx10(a) {
    $("#gacha").html('');   // Reset the gacha
    $(".gacha").show();     // Show gacha
    for (let i = 0; i < 10; i++) {
        var temproll = WeaponRoll(a);
        var roll = temproll[0];     // Name of the png image of item
        var star = temproll[1];     // No. of star the item has
        var name = temproll[2];     // Name of the item with spacing
        if (star == 2) {
            $('#gacha').append(`<div id="roll${i}" class="gacha"><img src="./Gacha/${roll}.png" alt="${roll}" class="img-gacha"><p>${name}</p></div>`);     // Common item gets added to the back of the list
        } else {
            $('#gacha').prepend(`<div id="roll${i}" class="gacha"><img src="./Gacha/${roll}.png" alt="${roll}" class="img-gacha"><p>${name}</p></div>`);    // Rarer item is added to the front of the list so its the first to show up
        }
    }
    UpdateProfile();
}

// Start here

$(".gacha").hide();     // Hide empty gacha
$("#login").hide();     // Hide login
$("#signup").hide();    // Hide Sign Up
$("#main").hide();      // Hide main div

// Event Listeners

$("#btn-login").on("click", function(e) {   // On click show login page and hide welcome page
    $("#welcome_page").hide();
    $("#login").show();
});

$("#btn-signup").on("click", function(e) {  // On click show signup page and hide welcome page
    $("#welcome_page").hide();
    $("#signup").show();
});

$("#login-back").on("click", function(e) {  // Back button to hide login page and go back to welcome page
    $("#login").hide();
    $("#welcome_page").show();
});

$("#signup-back").on("click", function(e) { // Back button to hide signup page and go back to welcome page
    $("#signup").hide();
    $("#welcome_page").show();
});

$("#signup-submit").on("click", function(e) {   // SIGNUP
    e.preventDefault();                 // Prevent submit button from removing values before retrieving
    $(".btn").prop("disabled", true);   // Disables button after submitting

    var profile = {
        "name": $("#signup-username").val(),
        "password": $("#signup-password").val()
    };
    
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://genshingachasim-d09b.restdb.io/rest/profile",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(profile)
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
    
    $("form")[1].reset();               // Reset form contents after submitting     --> Direct user to login page after signing up
    $(".btn").prop("disabled", false);  // Enable button 
    $("#signup").hide();                // Hide Signup Page
    $("#login").show();                 // Show Login Page 
});

$("#login-submit").on("click", function(e) {    // LOGIN
    e.preventDefault();                 // Prevent submit button from removing values before retrieving
    $(".btn").prop("disabled", true);   // Disables button after submitting

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://genshingachasim-d09b.restdb.io/rest/profile",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
        }
    }
      
    $.ajax(settings).done(function (response) {

        for (var i = 0; i < response.length; i++) {
            if (response[i].name == $("#login-username").val())             // Check is username matches database
            {
                if (response[i].password == $("#login-password").val())     // Check if password matches username
                {
                    console.log("Login successful");
                    $("form")[0].reset();               // Reset form contents after submitting
                    alert("Login successful");
                    $(".btn").prop("disabled", false);  // Enable button
                    $("#login").hide()                  // Hide Login
                    $("#main").show();                  // Show Main Gacha
                    username = response[i].name;        // Retrieve username
                    password = response[i].password     // Retrieve user's password
                    inventory = response[i].inventory;  // Retrieve user's inventory
                    pulls = response[i].pulls;          // Retrieve user's no. of pulls
                    id = response[i]._id;               // Retrieve user's id
                    $("#main-username").html(username);
                    return;
                }
            }
        }
        alert("Username and or Password is incorrect");
    $(".btn").prop("disabled", false);          // Enable button after alerting unsuccesful login
    });
});