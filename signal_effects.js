// ========================================
// FLARES FX
// Fikcyjne efekty wizualne Sandboxels
// ========================================

const flareColors = {
    red: "#ff3030",
    orange: "#ff8a20",
    yellow: "#ffe34a",
    green: "#35e66b",
    blue: "#389cff",
    purple: "#a45cff",
    pink: "#ff5fbd",
    cyan: "#35e5e5",
    white: "#eeeeee"
};

// ----------------------------------------
// KOLOROWY DYM
// ----------------------------------------

function makeColoredSmoke(name, displayName, color) {
    elements[name] = {
        name: displayName,
        color: color,
        behavior: behaviors.GAS,
        category: "flares",
        state: "gas",
        density: 0.7,
        desc: "Fikcyjny kolorowy efekt dymny.",

        tick: function(pixel) {
            if (pixel.life === undefined) {
                pixel.life = 100 + Math.random() * 80;
            }

            pixel.life--;

            if (pixel.life <= 0) {
                deletePixel(pixel.x, pixel.y);
                return;
            }

            pixel.color = color;
        }
    };
}

// ----------------------------------------
// ŚWIATŁO + BEZBARWNY DYM
// ----------------------------------------

function makeGlow(name, displayName, color) {
    elements[name] = {
        name: displayName,
        color: color,
        behavior: behaviors.WALL,
        category: "flares",
        state: "solid",
        desc: "Fikcyjny kolorowy efekt świetlny.",

        tick: function(pixel) {

            if (pixel.life === undefined) {
                pixel.life = 80 + Math.random() * 80;
            }

            pixel.life--;

            if (pixel.life <= 0) {
                deletePixel(pixel.x, pixel.y);
                return;
            }

            // lekka zmiana koloru daje efekt migotania
            if (Math.random() < 0.15) {
                pixel.color = color;
            }

            // bezbarwna chmura efektu
            if (Math.random() < 0.20) {

                let x = pixel.x + Math.floor(Math.random() * 5) - 2;
                let y = pixel.y - 1;

                if (!outOfBounds(x, y) && isEmpty(x, y)) {

                    createPixel("flare_neutral_smoke", x, y);

                    let smoke = pixelMap[x][y];

                    if (smoke) {
                        smoke.life = 80 + Math.random() * 80;
                    }
                }
            }
        }
    };
}

// ----------------------------------------
// BEZBARWNY DYM
// ----------------------------------------

elements.flare_neutral_smoke = {
    name: "Neutral Smoke",
    color: "#b8b8b8",
    behavior: behaviors.GAS,
    category: "flares",
    state: "gas",
    density: 0.5,
    hidden: true,

    tick: function(pixel) {

        if (pixel.life === undefined) {
            pixel.life = 100 + Math.random() * 80;
        }

        pixel.life--;

        if (pixel.life <= 0) {
            deletePixel(pixel.x, pixel.y);
        }
    }
};


// ========================================
// KOLOROWE EFEKTY DYMNE
// ========================================

makeColoredSmoke(
    "flare_red_smoke",
    "Red Smoke",
    flareColors.red
);

makeColoredSmoke(
    "flare_orange_smoke",
    "Orange Smoke",
    flareColors.orange
);

makeColoredSmoke(
    "flare_yellow_smoke",
    "Yellow Smoke",
    flareColors.yellow
);

makeColoredSmoke(
    "flare_green_smoke",
    "Green Smoke",
    flareColors.green
);

makeColoredSmoke(
    "flare_blue_smoke",
    "Blue Smoke",
    flareColors.blue
);

makeColoredSmoke(
    "flare_purple_smoke",
    "Purple Smoke",
    flareColors.purple
);

makeColoredSmoke(
    "flare_pink_smoke",
    "Pink Smoke",
    flareColors.pink
);

makeColoredSmoke(
    "flare_cyan_smoke",
    "Cyan Smoke",
    flareColors.cyan
);

makeColoredSmoke(
    "flare_white_smoke",
    "White Smoke",
    flareColors.white
);


// ========================================
// KOLOROWE ŚWIATŁO + NEUTRALNY DYM
// ========================================

makeGlow(
    "flare_red_glow",
    "Red Glow",
    flareColors.red
);

makeGlow(
    "flare_orange_glow",
    "Orange Glow",
    flareColors.orange
);

makeGlow(
    "flare_yellow_glow",
    "Yellow Glow",
    flareColors.yellow
);

makeGlow(
    "flare_green_glow",
    "Green Glow",
    flareColors.green
);

makeGlow(
    "flare_blue_glow",
    "Blue Glow",
    flareColors.blue
);

makeGlow(
    "flare_purple_glow",
    "Purple Glow",
    flareColors.purple
);

makeGlow(
    "flare_pink_glow",
    "Pink Glow",
    flareColors.pink
);

makeGlow(
    "flare_cyan_glow",
    "Cyan Glow",
    flareColors.cyan
);

makeGlow(
    "flare_white_glow",
    "White Glow",
    flareColors.white
);
