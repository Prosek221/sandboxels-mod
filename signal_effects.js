/*
=========================================================
 FLARES FX
 Sandboxels 1.12
 Czysto wizualne efekty dymu i światła
=========================================================
*/

(function () {

    // ---------------------------------------------------
    // USTAWIENIA
    // ---------------------------------------------------

    const FLARE_CATEGORY = "flares";

    const COLORS = {
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


    // ---------------------------------------------------
    // POMOCNICZA FUNKCJA
    // ---------------------------------------------------

    function randomBetween(min, max) {
        return min + Math.random() * (max - min);
    }


    // ---------------------------------------------------
    // NEUTRALNY DYM
    // ---------------------------------------------------

    elements.flare_neutral_smoke = {

        color: "#b5b5b5",

        behavior: behaviors.GAS,

        state: "gas",

        density: 0.3,

        category: FLARE_CATEGORY,

        hidden: true,

        desc: "Neutralny dym efektu Flare.",

        tick: function (pixel) {

            if (pixel.life === undefined) {
                pixel.life = randomBetween(80, 150);
            }

            pixel.life--;

            if (pixel.life <= 0) {
                deletePixel(pixel.x, pixel.y);
                return;
            }

            if (Math.random() < 0.08) {
                pixel.color = "#b5b5b5";
            }
        }
    };


    // ---------------------------------------------------
    // KOLOROWY DYM
    // ---------------------------------------------------

    function createSmoke(name, label, color) {

        elements[name] = {

            color: color,

            behavior: behaviors.GAS,

            state: "gas",

            density: 0.25,

            category: FLARE_CATEGORY,

            desc: label + " — kolorowy efekt dymny.",

            tick: function (pixel) {

                if (pixel.life === undefined) {
                    pixel.life = randomBetween(100, 180);
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


    // ---------------------------------------------------
    // KOLOROWE ŚWIATŁO
    // ---------------------------------------------------

    function createGlow(name, label, color) {

        elements[name] = {

            color: color,

            behavior: behaviors.WALL,

            state: "solid",

            density: 900,

            category: FLARE_CATEGORY,

            desc: label + " — kolorowy efekt świetlny.",

            tick: function (pixel) {

                if (pixel.life === undefined) {
                    pixel.life = randomBetween(100, 180);
                }

                pixel.life--;

                if (pixel.life <= 0) {
                    deletePixel(pixel.x, pixel.y);
                    return;
                }

                // Delikatne migotanie
                if (Math.random() < 0.15) {
                    pixel.color = color;
                }

                // Tworzenie neutralnego dymu
                if (Math.random() < 0.12) {

                    const x =
                        pixel.x +
                        Math.floor(Math.random() * 5) -
                        2;

                    const y = pixel.y - 1;

                    if (
                        !outOfBounds(x, y) &&
                        isEmpty(x, y)
                    ) {

                        createPixel(
                            "flare_neutral_smoke",
                            x,
                            y
                        );

                        const smoke = pixelMap[x][y];

                        if (smoke) {
                            smoke.life =
                                randomBetween(70, 130);
                        }
                    }
                }
            }
        };
    }


    // ---------------------------------------------------
    // CZERWONY
    // ---------------------------------------------------

    createSmoke(
        "flare_red_smoke",
        "Red Smoke",
        COLORS.red
    );

    createGlow(
        "flare_red_glow",
        "Red Glow",
        COLORS.red
    );


    // ---------------------------------------------------
    // POMARAŃCZOWY
    // ---------------------------------------------------

    createSmoke(
        "flare_orange_smoke",
        "Orange Smoke",
        COLORS.orange
    );

    createGlow(
        "flare_orange_glow",
        "Orange Glow",
        COLORS.orange
    );


    // ---------------------------------------------------
    // ŻÓŁTY
    // ---------------------------------------------------

    createSmoke(
        "flare_yellow_smoke",
        "Yellow Smoke",
        COLORS.yellow
    );

    createGlow(
        "flare_yellow_glow",
        "Yellow Glow",
        COLORS.yellow
    );


    // ---------------------------------------------------
    // ZIELONY
    // ---------------------------------------------------

    createSmoke(
        "flare_green_smoke",
        "Green Smoke",
        COLORS.green
    );

    createGlow(
        "flare_green_glow",
        "Green Glow",
        COLORS.green
    );


    // ---------------------------------------------------
    // NIEBIESKI
    // ---------------------------------------------------

    createSmoke(
        "flare_blue_smoke",
        "Blue Smoke",
        COLORS.blue
    );

    createGlow(
        "flare_blue_glow",
        "Blue Glow",
        COLORS.blue
    );


    // ---------------------------------------------------
    // FIOLETOWY
    // ---------------------------------------------------

    createSmoke(
        "flare_purple_smoke",
        "Purple Smoke",
        COLORS.purple
    );

    createGlow(
        "flare_purple_glow",
        "Purple Glow",
        COLORS.purple
    );


    // ---------------------------------------------------
    // RÓŻOWY
    // ---------------------------------------------------

    createSmoke(
        "flare_pink_smoke",
        "Pink Smoke",
        COLORS.pink
    );

    createGlow(
        "flare_pink_glow",
        "Pink Glow",
        COLORS.pink
    );


    // ---------------------------------------------------
    // TURKUSOWY
    // ---------------------------------------------------

    createSmoke(
        "flare_cyan_smoke",
        "Cyan Smoke",
        COLORS.cyan
    );

    createGlow(
        "flare_cyan_glow",
        "Cyan Glow",
        COLORS.cyan
    );


    // ---------------------------------------------------
    // BIAŁY
    // ---------------------------------------------------

    createSmoke(
        "flare_white_smoke",
        "White Smoke",
        COLORS.white
    );

    createGlow(
        "flare_white_glow",
        "White Glow",
        COLORS.white
    );


    // ---------------------------------------------------
    // INFORMACJA W KONSOLI
    // ---------------------------------------------------

    console.log(
        "Flares FX loaded successfully."
    );

})();
