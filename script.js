
var Star5CharacterArray = ["Albedo","Diluc","Ganyu","Jean","Keqing","Klee","Mona","Qiqi","Tartaglia","Venti","Xiao","Zhongli"];
var Star4CharacterArray = ["Amber","Barbara","Beidou","Bennett","Chongyun","Diona","Fischl","Kaeya","Lisa","Ningguang","Noelle","Razor","Sucrose","Xiangling","Xingqiu","Xinyan"];
var Star5WeaponArray = ["Amos Bow","Aquila Favonia","Lost Prayer to the Sacred Winds","Memory of Dust","Primordial Jade Winged Spear","Skyward Atlas","Skyward Blade","Skywar Harp","Skyward Pride","Skyward Spine","Summit Shaper","The Unforged","Vortex Vanquisher","Wolfs Gravestone"];
var Star4WeaponArray = ["Compound Bow","Crescent Pike","Dragons Bane","Eye of Perception","Favonius Codex","Favonius Greatsword","Favonius Lance","Favonius Sword","Favonius Warbow","Iron Sting","Lions Roar","Mappa Mare","Prototype Amber","Prototype Archaic","Prototype Crescent","Prototype Rancour","Prototype Starglitter","Rainslasher","Royal Grimoire","Royal Longsword","Royal Spear","Rust","Sacrificial Bow","Sacrificial Fragments","Sacrificial Greatsword","Sacrifical Sword","Sword of Descension","The Bell","The Flute","The Stringless","The Widsith","Whiteblind"];
var Star3WeaponArray = ["Black Tassel","Bloodtainted Greatsword","Cool Steel","Dark Iron Sword","Debate Club","Emerald Orb","Ferrous Shadow","Fillet Blade","Halberd","Harbinger of Dawn","Magic Guide","Messenger","Ravenbow","Recurve Bow","Sharpshooters Oath","Skyrider Greatsword","Skyrider Sword","Slingshot","Thrilling Tales of Dragon Slayers","Travelers Handy Sword","Twin Nephrite","White Iron Greatsword","White Tassel"];

var CharacterArray = [Star5CharacterArray, Star4CharacterArray, Star3WeaponArray];
var WeaponArray = [Star5WeaponArray, Star4WeaponArray, Star3WeaponArray];

function CharacterStarRoll() {  // First Roll to find out what star or "tier" the item will be
    var roll = Math.floor(Math.random() * 1000);
    var star = 3;
    if (roll < 6) {
        star = 0;
    } else if (roll < 57) {
        star = 1;
    } else {
        star = 2;
    }
    return star;
}

function WeaponStarRoll() { // First Roll to find out what star or "tier" the item will be
    var roll= Math.floor(Math.random() * 1000);
    var star = 3;
    if (roll < 7) {
        star = 0;
    } else if (roll < 67) {
        star = 1;
    } else {
        star = 2;
    }
    return star;
}

function CharacterRoll(a) { // Second Roll to find out in the star or "tier" what item will be chosen. Returns 1) Name of PNG image of the item 2) No. of star the weapon has 3) Name of the item with spacing
    var r = CharacterStarRoll();
    var name = a[r][Math.floor(Math.random()*a[r].length)];
    var roll = name.replace(/ /g, "");  // Remove space from the name of the item
    return [roll, r, name];
}

function WeaponRoll(a) {    // Second Roll to find out in the star or "tier" what item will be chosen
    var r = WeaponStarRoll();
    var name = a[r][Math.floor(Math.random()*a[r].length)];
    var roll = name.replace(/ /g, "");  // Remove space from the name of the item
    return [roll, r, name];
}

function CharacterRollx10(a) {
    $("#gacha").html(''); // Reset the gacha
    for (let i = 0; i < 10; i++) {
        var temproll = CharacterRoll(a);
        var roll = temproll[0];     // Name of the png image of item
        var star = temproll[1];     // No. of star the item has
        var name = temproll[2];     // Name of the item with spacing
        console.log(star);
        if (star == 2) {
            $('#gacha').append(`<div id="roll${i}" class="gacha"><img src="./Gacha/${roll}.png" alt="${roll}" class="gachaimg"><p>${name}</p></div>`);
        } else {
            $('#gacha').prepend(`<div id="roll${i}" class="gacha"><img src="./Gacha/${roll}.png" alt="${roll}" class="gachaimg"><p>${name}</p></div>`);
        }
    }
}
function WeaponRollx10(a) {
    $("#gacha").html(''); // Reset the gacha
    for (let i = 0; i < 10; i++) {
        var temproll = WeaponRoll(a);
        var roll = temproll[0];     // Name of the png image of item
        var star = temproll[1];     // No. of star the item has
        var name = temproll[2];     // Name of the item with spacing
        console.log(star);
        if (star == 2) {
            $('#gacha').append(`<div id="roll${i}" class="gacha"><img src="./Gacha/${roll}.png" alt="${roll}" class="gachaimg"><p>${name}</p></div>`);
        } else {
            $('#gacha').prepend(`<div id="roll${i}" class="gacha"><img src="./Gacha/${roll}.png" alt="${roll}" class="gachaimg"><p>${name}</p></div>`);
        }
    }
}
CharacterRollx10(CharacterArray);