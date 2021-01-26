
function main() {

    var Star5CharacterArray = ["Albedo","Diluc","Ganyu","Jean","Keqing","Klee","Mona","Qiqi","Tartaglia","Venti","Xiao","Zhongli"];
    var Star4CharacterArray = ["Amber","Barbara","Beidou","Bennett","Chongyun","Diona","Fischl","Kaeya","Lisa","Ningguang","Noelle","Razor","Sucrose","Xiangling","Xingqiu","Xinyan"];
    var Star5WeaponArray = ["AmosBow","AquilaFavonia","LostPrayertotheSacredWinds","MemoryofDust","PrimordialJadeWingedSpear","SkywardAtlas","SkywardBlade","SkywardHarp","SkywardPride","SkywardSpine","SummitShaper","TheUnforged","VortexVanquisher","WolfsGravestone"];
    var Star4WeaponArray = ["CompoundBow","CrescentPike","DragonsBane","EyeofPerception","FavoniusCodex","FavoniusGreatsword","FavoniusLance","FavoniusSword","FavoniusSword","FavoniusWarbow","IronSting","LionsRoar","MappaMare","PrototypeAmber","PrototypeArchaic","PrototypeCrescent","PrototypeRancour","PrototypeStarglitter","Rainslasher","RoyalGrimoire","RoyalLongsword","RoyalSpear","Rust","SacrificialBow","SacrificialFragments","SacrificialGreatsword","SacrificalSword","SwordofDescension","TheBell","TheFlute","TheStringless","TheWidsith","Whiteblind"];
    var Star3WeaponArray = ["BlackTassel","BloodtaintedGreatsword","CoolSteel","DarkIronSword","DebateClub","EmeraldOrb","FerrousShadow","FilletBlade","Halberd","HarbingerofDawn","MagicGuide","Messenger","Ravenbow","RecurveBow","SharpshootersOath","SkyriderGreatsword","SkyriderSword","Slingshot","ThrillingTalesofDragonSlayers","TravelersHandySword","TwinNephrite","WhiteIronGreatsword","WhiteTassel"];

    var CharacterArray = [Star5CharacterArray, Star4CharacterArray, Star3WeaponArray];
    var WeaponArray = [Star5WeaponArray, Star4WeaponArray, Star3WeaponArray];

    function CharacterStarRoll() {
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
    
    function WeaponStarRoll() {
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

    function CharacterRoll(a) {
        var r = CharacterStarRoll();
        return [`${a[r][Math.floor(Math.random()*a[r].length)]}`,`${r}`];
    }

    function WeaponRoll(a) {
        var r = WeaponStarRoll();
        return [`${a[r][Math.floor(Math.random()*a[r].length)]}`,`${r}`];
    }

    function CharacterRollx10(a) {
        $('#gacha').html(''); // Reset the gacha
        for (let i = 0; i < 10; i++) {
            var temproll = CharacterRoll(a);
            var roll = temproll[0];
            var star = temproll[1];
            console.log(star);
            if (star == 2) {
                $('#gacha').append(`<div id="roll${i}" class="gacha"><img src="./Gacha/${roll}.png" alt="${roll}"></div>`);
            } else {
                $('#gacha').prepend(`<div id="roll${i}" class="gacha"><img src="./Gacha/${roll}.png" alt="${roll}"></div>`);
            }
        }
    }

    CharacterRollx10(CharacterArray);
}