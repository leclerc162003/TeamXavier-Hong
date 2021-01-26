
function main() {

    var Star5CharacterArray = ["Albedo","Diluc","Ganyu","Jean","Keqing","Klee","Mona","Qiqi","Tartaglia","Venti","Xiao","Zhongli"];
    var Star4CharacterArray = ["Amber","Barbara","Beidou","Bennett","Chongyun","Diona","Fischl","Kaeya","Lisa","Nigguang","Noelle","Razor","Sucrose","Xiangling","Xingqiu","Xinyan"];
    var Star5WeaponArray = ["AmosBow","AquilaFavonia","LostPrayertotheSacredWinds","MemoryofDust","PrimordialJadeWingedSpear","SkywardAtlas","SkywardBlade","SkywardHarp","SkywardPride","SkywardSpine","SummitShaper","TheUnforged","VortexVanquisher","WolfsGravestone"];
    var Star4WeaponArray = ["CompoundBow","CrescentPike","DragonsBane","EyeofPerception","FavoniusCodex","FavoniusGreatsword","FavoniusLance","FavoniusSword","FavoniusSword","FavoniusWarbow","IronSting","LionsRoar","MappaMare","PrototypeAmber","PrototypeArchaic","PrototypeCrescent","PrototypeRancour","PrototypeStarglitter","Rainslasher","RoyalGrimoire","RoyalLongsword","RoyalSpear","Rust","SacrificialBow","SacrificialFragments","SacrificialGreatsword","SacrificalSword","SwordofDescension","TheBell","TheFlute","TheStringless","TheWidsith","Whiteblind"];
    var Star3WeaponArray = ["BlackTassel","BloodtaintedGreatsword","CoolSteel","DarkIronSword","DebateClub","EmeraldOrb","FerrousShadow","FilletBlade","Halberd","HarbingerofDawn","MagicGuide","Messenger","Ravenbow","RecurveBow","SharpshootersOath","SkyriderGreatsword","SkyriderSword","Slingshot","ThrillingTalesofDragonSlayers","TravelersHandySword","TwinNephrite","WhiteIronGreatsword","WhiteTassel"];

    var CharacterArray = [Star5CharacterArray, Star4CharacterArray, Star3WeaponArray];
    var WeaponArray = [Star5WeaponArray, Star4WeaponArray, Star3WeaponArray];

    function characterroll() {
        var roll = Math.floor(Math.random() * 1000);
        var star = 3;
        if (roll < 6) {
            star = 0;
        } else if (roll < 57) {
            star = 2;
        } else {
            star = 1;
        }
        return star;
    }
    
    function weaponroll() {
        var roll= Math.floor(Math.random() * 1000);
        var star = 3;
        if (roll < 7) {
            star = 0;
        } else if (roll < 67) {
            star = 2;
        } else {
            star = 1;
        }
        return star;
    }
}