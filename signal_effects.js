/*
====================================================
 FLARES FX
 Sandboxels 1.12
====================================================

 Elementy:
   Colored Smoke
   Colored Glow

 Mechanika:
   - po postawieniu są nieruchome
   - po osiągnięciu wysokiej temperatury aktywują się
   - działają około 120 sekund
   - Smoke = kolorowy dym + światło
   - Glow  = kolorowe światło + bezbarwny dym
====================================================
*/

(function () {

    const CATEGORY = "flares";

    const ACTIVATION_TEMP = 100;

    const ACTIVE_TIME = 2400;

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


    /*
    ====================================================
    NEUTRALNY DYM
    ====================================================
    */

    elements.flare_neutral_smoke = {

        color: "#b5b5b5",

        behavior: behaviors.GAS,

        state: "gas",

        density: 0.3,

        category: CATEGORY,

        hidden: true,

        tick: function (pixel) {

            if (pixel.life === undefined) {
                pixel.life = 130;
            }

            pixel.life--;

            if (pixel.life <= 0) {
                deletePixel(pixel.x, pixel.y);
            }
        }
    };


    /*
    ====================================================
    KOLOROWY DYM
    ====================================================
    */

    function createSmoke(name, label, color) {

        elements[name] = {

            name: label,

            color: color,

            behavior: behaviors.WALL,

            state: "solid",

            density: 1000,

            category: CATEGORY,

            desc: "Fikcyjny efekt kolorowego dymu.",

            tick: function (pixel) {

                /*
                ----------------------------------------
                NIEAKTYWNY
                ----------------------------------------
                */

                if (!pixel.active) {

                    if (pixel.temp >= ACTIVATION_TEMP) {

                        pixel.active = true;

                        pixel.life = ACTIVE_TIME;

                    } else {

                        return;
                    }
                }


                /*
                ----------------------------------------
                AKTYWNY
                ----------------------------------------
                */

                pixel.life--;

                if (pixel.life <= 0) {

                    deletePixel(
                        pixel.x,
                        pixel.y
                    );

                    return;
                }


                /*
                ----------------------------------------
                KOLOROWY DYM
                ----------------------------------------
                */

                if (Math.random() < 0.8) {

                    const x =
                        pixel.x +
                        Math.floor(Math.random() * 5) - 2;

                    const y =
                        pixel.y - 1;

                    if (
                        !outOfBounds(x, y) &&
                        isEmpty(x, y)
                    ) {

                        createPixel(
                            "flare_colored_smoke",
                            x,
                            y
                        );

                        const smoke =
                            pixelMap[x][y];

                        if (smoke) {

                            smoke.color = color;

                            smoke.life =
                                100 +
                                Math.random() * 100;
                        }
                    }
                }


                /*
                ----------------------------------------
                LEKKA POŚWIATA
                ----------------------------------------
                */

                pixel.color = color;
            }
        };
    }


    /*
    ====================================================
    CZĄSTECZKA KOLOROWEGO DYMU
    ====================================================
    */

    elements.flare_colored_smoke = {

        color: "#999999",

        behavior: behaviors.GAS,

        state: "gas",

        density: 0.3,

        category: CATEGORY,

        hidden: true,

        tick: function (pixel) {

            if (pixel.life === undefined) {

                pixel.life =
                    100 +
                    Math.random() * 100;
            }

            pixel.life--;

            if (pixel.life <= 0) {

                deletePixel(
                    pixel.x,
                    pixel.y
                );
            }
        }
    };


    /*
    ====================================================
    KOLOROWE ŚWIATŁO + BEZBARWNY DYM
    ====================================================
    */

    function createGlow(name, label, color) {

        elements[name] = {

            name: label,

            color: color,

            behavior: behaviors.WALL,

            state: "solid",

            density: 1000,

            category: CATEGORY,

            desc: "Fikcyjny efekt światła i neutralnego dymu.",

            tick: function (pixel) {

                /*
                ----------------------------------------
                NIEAKTYWNY
                ----------------------------------------
                */

                if (!pixel.active) {

                    if (pixel.temp >= ACTIVATION_TEMP) {

                        pixel.active = true;

                        pixel.life = ACTIVE_TIME;

                    } else {

                        return;
                    }
                }


                /*
                ----------------------------------------
                AKTYWNY
                ----------------------------------------
                */

                pixel.life--;

                if (pixel.life <= 0) {

                    deletePixel(
                        pixel.x,
                        pixel.y
                    );

                    return;
                }


                /*
                ----------------------------------------
                KOLOROWA POŚWIATA
                ----------------------------------------
                */

                pixel.color = color;


                /*
                ----------------------------------------
                BEZBARWNY DYM
                ----------------------------------------
                */

                if (Math.random() < 0.65) {

                    const x =
                        pixel.x +
                        Math.floor(Math.random() * 5) - 2;

                    const y =
                        pixel.y - 1;

                    if (
                        !outOfBounds(x, y) &&
                        isEmpty(x, y)
                    ) {

                        createPixel(
                            "flare_neutral_smoke",
                            x,
                            y
                        );

                        const smoke =
                            pixelMap[x][y];

                        if (smoke) {

                            smoke.life =
                                100 +
                                Math.random() * 100;
                        }
                    }
                }
            }
        };
    }


    /*
    ====================================================
    TWORZENIE ELEMENTÓW
    ====================================================
    */

    createSmoke(
        "flare_red_smoke",
        "Red Smoke",
        COLORS.red
    );

    createSmoke(
        "flare_orange_smoke",
        "Orange Smoke",
        COLORS.orange
    );

    createSmoke(
        "flare_yellow_smoke",
        "Yellow Smoke",
        COLORS.yellow
    );

    createSmoke(
        "flare_green_smoke",
        "Green Smoke",
        COLORS.green
    );

    createSmoke(
        "flare_blue_smoke",
        "Blue Smoke",
        COLORS.blue
    );

    createSmoke(
        "flare_purple_smoke",
        "Purple Smoke",
        COLORS.purple
    );

    createSmoke(
        "flare_pink_smoke",
        "Pink Smoke",
        COLORS.pink
    );

    createSmoke(
        "flare_cyan_smoke",
        "Cyan Smoke",
        COLORS.cyan
    );

    createSmoke(
        "flare_white_smoke",
        "White Smoke",
        COLORS.white
    );


    /*
    ====================================================
    GLOW
    ====================================================
    */

    createGlow(
        "flare_red_glow",
        "Red Glow",
        COLORS.red
    );

    createGlow(
        "flare_orange_glow",
        "Orange Glow",
        COLORS.orange
    );

    createGlow(
        "flare_yellow_glow",
        "Yellow Glow",
        COLORS.yellow
    );

    createGlow(
        "flare_green_glow",
        "Green Glow",
        COLORS.green
    );

    createGlow(
        "flare_blue_glow",
        "Blue Glow",
        COLORS.blue
    );

    createGlow(
        "flare_purple_glow",
        "Purple Glow",
        COLORS.purple
    );

    createGlow(
        "flare_pink_glow",
        "Pink Glow",
        COLORS.pink
    );

    createGlow(
        "flare_cyan_glow",
        "Cyan Glow",
        COLORS.cyan
    );

    createGlow(
        "flare_white_glow",
        "White Glow",
        COLORS.white
    );


    console.log(
        "Flares FX loaded successfully!"
    );

})();
