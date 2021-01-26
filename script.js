function characterroll() {
    var roll = Math.floor(Math.random() * 1000);
    console.log(roll);
    var star = 0;
    if (roll < 6) {
        star = 5;
    } else if (roll < 57) {
        star = 4;
    } else {
        star = 3;
    }
    return star;
}

function weaponroll() {
    var roll= Math.floor(Math.random() * 1000);
    console.log(roll);
    var star = 0;
    if (roll < 7) {
        star = 5;
    } else if (roll < 67) {
        star = 4;
    } else {
        star = 3;
    }
    return star;
}