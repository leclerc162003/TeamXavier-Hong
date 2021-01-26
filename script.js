var Star5CharacterArray = ["Albedo","Diluc","Ganyu","Jean","Keqing","Klee","Mona","Qiqi","Tartaglia","Venti","Xiao","Zhongli"];
var Star4CharacterArray = ["Amber","Barbara","Beidou","Bennett","Chongyun","Diona","Fischl","Kaeya","Lisa","Nigguang","Noelle","Razor","Sucrose","Xiangling","Xingqiu","Xinyan"];
var Star5WeaponArray = ["AmosBow","AquilaFavonia","LostPrayertotheSacredWinds","MemoryofDust","PrimordialJadeWingedSpear","SkywardAtlas","SkywardBlade","SkywardHarp","SkywardPride","SkywardSpine","SummitShaper","TheUnforged","VortexVanquisher","WolfsGravestone"];
var Star4WeaponArray = ["CompoundBow","CrescentPike","DragonsBane","EyeofPerception","FavoniusCodex","FavoniusGreatsword","FavoniusLance","FavoniusSword","FavoniusSword","FavoniusWarbow","IronSting","LionsRoar","MappaMare","PrototypeAmber","PrototypeArchaic","PrototypeCrescent","PrototypeRancour","PrototypeStarglitter","Rainslasher","RoyalGrimoire","RoyalLongsword","RoyalSpear","Rust","SacrificialBow","SacrificialFragments","SacrificialGreatsword","SacrificalSword","SwordofDescension","TheBell","TheFlute","TheStringless","TheWidsith","Whiteblind"];
var Star3WeaponArray = ["BlackTassel","BloodtaintedGreatsword","CoolSteel","DarkIronSword","DebateClub","EmeraldOrb","FerrousShadow","FilletBlade","Halberd","HarbingerofDawn","MagicGuide","Messenger","Ravenbow","RecurveBow","SharpshootersOath","SkyriderGreatsword","SkyriderSword","Slingshot","ThrillingTalesofDragonSlayers","TravelersHandySword","TwinNephrite","WhiteIronGreatsword","WhiteTassel"];

function characterroll() {
    var roll = Math.floor(Math.random() * 1000);
    var star = 0;
    if (roll < 6) {
        star = 5;
    } else if (roll < 57) {
        star = 4;
    } else {
        star = 3;
    }
    console.log(roll);
    console.log(star);
    return star;
}

function weaponroll() {
    var roll= Math.floor(Math.random() * 1000);
    var star = 0;
    if (roll < 7) {
        star = 5;
    } else if (roll < 67) {
        star = 4;
    } else {
        star = 3;
    }
    console.log(roll);
    console.log(star);
    return star;
}