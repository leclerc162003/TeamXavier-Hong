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

// Lottie

var dotloading = `<lottie-player src=".\\Lottie\\lf30_editor_ykhctrgv.json" background="#0000000"  speed="1"  style="width: 300px; height: 100px;"loop autoplay></lottie-player>`;
var crossloading = `<lottie-player src=".\\Lottie\\lf30_VTQZC6.json" background="#0000000"  speed="1"  style="width: 300px; height: 300px;"loop autoplay></lottie-player>`;
var shootingstar = `<lottie-player src=".\\Lottie\\lf30_editor_kolutnul.json" background="#0000000"  speed="1"  style="width: 300px; height: 300px;"loop autoplay class="center"></lottie-player>`;

/*User profile*/
var username = "";
var password = "";
var star4inventory = "";
var star5inventory = "";
var id = "";
var pulls = 0;

/*Store pull count for pity system*/
var pity10pull = 0;
var pity100pull = 0;

function UpdateProfile() {        // load Profile into database
    var jsondata = {
        "name" : username,
        "password" : password,
        "star4inventory" : star4inventory,
        "star5inventory" : star5inventory,
        "pulls" : pulls,
        "pity10pull" : pity10pull,
        "pity100pull" : pity100pull
    };

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
        $(".btn").prop("disabled", false) // Enable button
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
    pulls += 1;
    if (pulls - pity100pull == 100) {       // If pity hits, 5 star is guranteed
        var r = 0;
    } else if (pulls - pity10pull == 10) {  // If pity hits, 4 star is guranteed
        var r = 1;
    } else {                                // Else roll as usual
        var r = CharacterStarRoll();
    }
    var name = a[r][Math.floor(Math.random()*a[r].length)];
    var roll = name.replace(/ /g, "");  // Remove space from the name of the item
    if (r == 1) {
        pity10pull = pulls;             // Whenever a 4 star gets rolled, the 10 pull pity resets
        star4inventory = star4inventory.concat(`${name},`);     // Add rarer item to 4starinventory after rolling
    } else if (r == 0) {
        pity100pull = pulls;            // Whenever a 5 star gets rolled, the 100 pull pity resets
        star5inventory = (star5inventory).concat(`,${name}`);   // Add rarer item to 5starinventory after rolling
    }
    return [roll, r, name];
}

function WeaponRoll(a) {    // Second Roll to find out in the star or "tier" what item will be chosen
    pulls += 1;
    if (pulls - pity100pull == 100) {       // If pity hits, 5 star is guranteed
        var r = 0;
    } else if (pulls - pity10pull == 10) {  // If pity hits, 4 star is guranteed
        var r = 1;
    } else {                                // Else roll as usual
        var r = WeaponStarRoll();
    }
    var name = a[r][Math.floor(Math.random()*a[r].length)];
    var roll = name.replace(/ /g, "");  // Remove space from the name of the item
    if (r == 1) {
        pity10pull = pulls;             // Whenever a 4 star gets rolled, the 10 pull pity resets
        star4inventory = (star4inventory).concat(`${name},`);   // Add rarer item to 4starinventory after rolling
    } else if (r == 0) {
        pity100pull = pulls;            // Whenever a 5 star gets rolled, the 100 pull pity resets
        star5inventory = (star5inventory).concat(`,${name}`);   // Add rarer item to 5starinventory after rolling
    }
    return [roll, r, name];
}

function CharacterRollx10(a) {
    $(".btn").prop("disabled", true)    // Disable button until UpdateProfile() is complete --> This is to ensure that when a user rolls the button is disabled until the database has been properly update before allowing the user to roll again
    $("#gacha").html('');               // Reset the gacha
    $("#main-header").hide();           // Hide Main
    $("#main-body").hide();             //
    $("body").append(shootingstar);   // Show lottie shooting star
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
    window.setTimeout(function(e) {
        $("#gacha").fadeIn(2000);           // Show gacha
        $("#gacha-back").fadeIn(2000);      // Show gacha-back button
        $("lottie-player").remove();        // Remove lottie
    }, 5000);
}

function WeaponRollx10(a) {
    $(".btn").prop("disabled", true)    // Disable button until UpdateProfile() is complete --> This is to ensure that when a user rolls the button is disabled until the database has been properly update before allowing the user to roll again
    $("#gacha").html('');               // Reset the gacha
    $("#main-header").hide();           // Hide Main
    $("#main-body").hide();             //
    $("body").append(shootingstar);   // Show lottie shooting star
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
    window.setTimeout(function(e) {
        $("#gacha").fadeIn(2000);           // Show gacha
        $("#gacha-back").fadeIn(2000);      // Show gacha-back button
        $("lottie-player").remove();        // Remove lottie
    }, 5000);
}

$("#gacha-back").on("click", function(e) {
    $("#gacha").hide();
    $("#gacha-back").hide();
    $("#main-header").fadeIn(1000);
    $("#main-body").fadeIn(1000);
});

// Start here

$("#gacha-back").hide();        // Hide cross button for gacha
$("#gacha").hide();             // Hide empty gacha
$("#login").hide();             // Hide login
$("#signup").hide();            // Hide Sign Up
$("#main").hide();              // Hide main div
$("#inventory_page").hide();    // Hide inventory page
$("#welcome_page").hide();      // Hide welcome page
$("#profile-settings").hide();  // Hide profile settings
$("#password-change").hide();   // Hide password change form
$("#stats").hide();             // Hide game canvas

// Event Listeners

// Login / Signup Form

$("#btn-login").on("click", function(e) {   // On click show login page and hide welcome page
    $("#welcome_page").hide();
    $("#login").fadeIn(1000);
});

$("#btn-signup").on("click", function(e) {  // On click show signup page and hide welcome page
    $("#welcome_page").hide();
    $("#signup").fadeIn(1000);
});

$("#login-back").on("click", function(e) {  // Back button to hide login page and go back to welcome page
    $("#login").hide();
    $("#welcome_page").fadeIn(1000);
});

$("#signup-back").on("click", function(e) { // Back button to hide signup page and go back to welcome page
    $("#signup").hide();
    $("#welcome_page").fadeIn(1000);
});

$("#signup-submit").on("click", function(e) {   // SIGNUP
    e.preventDefault();                 // Prevent submit button from removing values before retrieving
    $(".btn").prop("disabled", true);   // Disables button after submitting
    $("#signup").append(dotloading);     // Display Lottie while loading
    if ($("#signup-password").val().length < 8) {   // If password is less than 8 char, inform user, renenable button and break
        $("lottie-player").remove();        // Remove lottie
        alert("Your password requires at least 8 characters");
        $(".btn").prop("disabled", false);  // Enable button 
        return;
    }

    var profile = {
        "name" : $("#signup-username").val(),
        "password" : $("#signup-password").val(),
        "star4inventory" : "",
        "star5inventory" : "",
        "pulls" : 0,
        "pity10pull" : 0,
        "pity100pull" : 0
    };

    var settings = {        // Get to compare names
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
        for (var i = 0; i < response.length; i++) {     // Check if name is already taken
            if (response[i].name == $("#signup-username").val()) {
                $("lottie-player").remove();        // Remove lottie
                alert("username has already been taken");
                $(".btn").prop("disabled", false);  // Enable button 
                return;
            } else {
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
                    $("form")[1].reset();               // Reset form contents after submitting     --> Direct user to login page after signing up
                    $(".btn").prop("disabled", false);  // Enable button 
                    $("#signup").hide();                // Hide Signup Page
                    $("#login").show();                 // Show Login Page 
                    $("lottie-player").remove();        // Remove lottie
                    alert("Sign up Successful");
                    console.log(response);
                });
            }
        }
    });
});

$("#login-submit").on("click", function(e) {    // LOGIN
    e.preventDefault();                 // Prevent submit button from removing values before retrieving
    $(".btn").prop("disabled", true);   // Disables button after submitting
    $("#login").append(dotloading);     // Display Lottie while loading

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
                    $("form")[0].reset();                           // Reset form contents after submitting
                    $("lottie-player").remove();                    // Remove lottie
                    alert("Login successful");
                    $(".btn").prop("disabled", false);              // Enable button
                    $("#login").hide()                              // Hide Login
                    $("#main").show();                              // Show Main Gacha
                    username = response[i].name;                    // Retrieve username
                    password = response[i].password                 // Retrieve user's password
                    star4inventory = response[i].star4inventory;    // Retrieve user's inventory
                    star5inventory = response[i].star5inventory;    // Retrieve user's inventory
                    pulls = response[i].pulls;                      // Retrieve user's no. of pulls
                    pity100pull = response[i].pity100pull;          // Retrieve pity pull count for 5 star
                    pity10pull = response[i].pity10pull;            // Retrieve pity pull count for 4 star
                    id = response[i]._id;                           // Retrieve user's id
                    $("#main-username").html(username);
                    return;
                }
            }
        }
        $("lottie-player").remove();                           // Remove lottie
        alert("Username and or Password is incorrect");
        $(".btn").prop("disabled", false);          // Enable button after alerting unsuccesful login
    });
});

// Profile Settings

$("#main-username").on("click", function(e) {       // Profile settings Which includes Logging out, Changing Password and more
    // Hide main-body and open profile settings
    $("#main-body").hide();
    $("#main-header").hide();
    $("#profile-settings").fadeIn(1000);
});

$("#profile-back").on("click", function(e) {        // Return from profile settings back to Main
    // Hide profile settings and open main-body
    $("#profile-settings").hide();
    $("#main-body").fadeIn(1000);
    $("#main-header").fadeIn(1000);
});

$("#btn-password-change").on("click", function(e) {     // Allow user to change password
    $("#profile-settings").hide();
    $("#password-change").fadeIn(1000);
});

$("#password-change-back").on("click", function(e) {    // Exit Password Change
    $("#password-change").hide();
    $("#profile-settings").fadeIn(1000);
});

$("#password-change-submit").on("click", function(e) {  // Change Password
    e.preventDefault();                         // Prevent submit button from removing values before retrieving
    $(".btn").prop("disabled", true);           // Disables button after submitting
    $("#password-change").append(dotloading);   // Show lottie

    var settings = {        // Get user current password to check if old password is valid
        "async": true,
        "crossDomain": true,
        "url": `https://genshingachasim-d09b.restdb.io/rest/profile/${id}`,
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        }
      }
      
      $.ajax(settings).done(function (response) {
        if ($("#password-change-old").val() != response.password) {
            $("lottie-player").remove()                                    // Remove Lottie
            alert("Old password is incorrect");
            $(".btn").prop("disabled", false);                      // Enable Button
        } else if ($("#password-change-new").val().length < 8){     // If password is below 8 char, reject
            $("lottie-player").remove()                                    // Remove Lottie
            alert("New password must be 8 characters or more");
            $(".btn").prop("disabled", false);                      // Enable Button
        } else {                                                    // If all conditions are met, change password
            var jsondata = {
                "name" : username,
                "password" : $("#password-change-new").val(),       // Change password to new
                "star4inventory" : star4inventory,
                "star5inventory" : star5inventory,
                "pulls" : pulls,
                "pity10pull" : pity10pull,
                "pity100pull" : pity100pull
            };
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
                $("lottie-player").remove()                                    // Remove Lottie
                alert("Password has been changed! Please login again"); // Tell user change has been successful
                location.reload();                                      // Reload the document
            });
        }
      });      
})

$("#btn-logout").on("click", function(e) {      // Logout User
    location.reload();
})

$("#btn-delete").on("click", function(e) {      // Delete user account
    $("#btn-delete").attr("onclick", "deleteAccount()");  // Change delete button to confirm delete button
    $("#btn-delete").html("Delete Account (Confirm)");  // Update text for delete button
});

function deleteAccount() {  // Confirm Delete user account
    $("#stats").hide();
    $("body").html(`<div class="center">${crossloading}</div>`)
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://genshingachasim-d09b.restdb.io/rest/profile/${id}`,
        "method": "DELETE",
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
        }
    }
      
    $.ajax(settings).done(function (response) {
        console.log(response);
        location.reload();
    });
};

// Inventory

$("#btn-inventory").on("click", function(e) {
    $("#main").hide();              // Hide main page
    $("#inventory_page").show();    // Show inventory page
    var star4 = star4inventory.split(',');
    var star5 = star5inventory.split(',');
    var name = star5.concat(star4);            // 5 Star gets priority
    $("#inventory").html("");
    for (var i = 1; i < name.length - 1; i++) {     // i=1 as the start has a comma and the first item contains nothing, -1 Is to remove the last item which contains nothing as there is always a comma at the back
        var item = name[i].replace(/ /g, "");
        if ($(`#invent${item}`).length == 0) {  // If the div has not been created, create a new one
            $("#inventory").append(`<div id="invent${item}" class="inventslot"><img src="./Gacha/${item}.png" alt="${item}"><p>${name[i]}</p><p>1</p></div>`);
        } else {    // Else if the div has already been created, add a count
            var count = parseInt($(`#invent${item} p:last-child`).html()) + 1;  // Get number from previous div
            $(`#invent${item} p:last-child`).html(`${count}`);                  // Update div number
        }
    }
});

$("#inventory-back").on("click", function(e) { // Back button to hide signup page and go back to welcome page
    $("#inventory_page").hide();
    $("#main").fadeIn(1000);
});

// Stats

$("#btn-stats").on("click", function(e) {   // Open stats
    $("#main").hide();
    $("#stats").fadeIn(1000);
    $("#stats-pull").html(`You have pulled ${pulls} times`);
    $("#stats-pitypull10").html(`You are ${10 - pulls + pity10pull} pulls away from a guaranteed 4 star`);
    $("#stats-pitypull100").html(`You are ${100 - pulls + pity100pull} pulls away from a guaranteed 5 star`);

    // Leaderboard
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
        var no1name = "";
        var no15star = 0;
        var no2name = "";
        var no25star = 0;
        var no3name = "";
        var no35star = 0;

        for (i = 0; i < response.length; i++) {     // Find number 1
            var numof5star = response[i].star5inventory.split(',').length - 1;
            if (numof5star > no15star) {
                no15star = numof5star;
                no1name = response[i].name;
            }
        }

        for (i=0; i < response.length; i++) {       // Find number 2
            var numof5star = response[i].star5inventory.split(',').length - 1;
            if (numof5star > no25star) {           
                if (response[i].name != no1name) {                  // If user is not number 1
                    no25star = numof5star;
                    no2name = response[i].name;
                }
            }
        }

        for (i=0; i < response.length; i++) {       // Find number 3
            var numof5star = response[i].star5inventory.split(',').length - 1;
            if (numof5star > no35star) {            
                if (response[i].name == no1name || response[i].name == no2name) {     // If user is not number 1 or 2
                } else {
                    no35star = numof5star;
                    no3name = response[i].name;
                }
            }
        }

        $("#no1").html(`#1 ${no1name} <i>${no15star} 5 Star</i>`);
        $("#no2").html(`#2 ${no2name} <i>${no25star} 5 Star</i>`);
        $("#no3").html(`#3 ${no3name} <i>${no35star} 5 Star</i>`);
    });
      
})

$("#stats-back").on("click", function(e) {  // Close Stats
    $("#stats").hide();
    $("#main").fadeIn(1000);
})

// Initiate

$(document).ready(function() {          // On ready, fade in welcome page to greet user
    $("#welcome_page").fadeIn(2000);
});