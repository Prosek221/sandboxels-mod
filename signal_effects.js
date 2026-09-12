/*
  SIGNAL EFFECTS
  Fikcyjne efekty wizualne do Sandboxels
*/

const signalColors = {
    red: "#ff3030",
    orange: "#ff8a20",
    yellow: "#ffe44a",
    green: "#35e66b",
    blue: "#389cff",
    purple: "#a45cff",
    pink: "#ff5fbd",
    cyan: "#35e5e5",
    white: "#eeeeee",
    black: "#252525"
};

// -----------------------------
// DYM
// -----------------------------

elements.signal_smoke = {
    color: "#aaaaaa",
    state: "gas",
    density: 0.15,
    behavior: behaviors.GAS,
    hidden: true,

    tick: function(pixel) {
        if (pixel.life === undefined) {
            pixel.life = 160 + Math.random() * 100;
        }

        pixel.life--;

        if (pixel.life <= 0) {
            deletePixel(pixel.x, pixel.y);
            return;
        }

        if (Math.random() < 0.08) {
            pixel.color = pixel.color || "#aaaaaa";
        }
    }
};


// -----------------------------
// FUNKCJA TWORZĄCA DYM
// -----------------------------

function signalSmoke(pixel, color, amount) {

    for (let i = 0; i < amount; i++) {

        let x = pixel.x + Math.floor(Math.random() * 5) - 2;
        let y = pixel.y + Math.floor(Math.random() * 3) - 2;

        if (outOfBounds(x, y)) continue;
        if (!isEmpty(x, y)) continue;

        createPixel("signal_smoke", x, y);

        let smoke = pixelMap[x][y];

        if (smoke) {
            smoke.color = color;
            smoke.life = 180 + Math.random() * 120;
        }
    }
}


// -----------------------------
// FUNKCJA EFEKTU
// -----------------------------

function signalEffect(pixel, color, coloredSmoke) {

    if (!pixel.active) {
        pixel.active = true;
        pixel.effectLife = 180;
    }

    pixel.effectLife--;

    // Dym
    if (Math.random() < 0.65) {

        if (coloredSmoke) {
            signalSmoke(pixel, color, 3);
        } else {
            signalSmoke(pixel, "#bdbdbd", 3);
        }
    }

    // Kolorowa poświata
    if (Math.random() < 0.25) {
        pixel.color = color;
    }

    // Koniec efektu
    if (pixel.effectLife <= 0) {
        deletePixel(pixel.x, pixel.y);
    }
}


// -----------------------------
// TWORZENIE ELEMENTÓW
// -----------------------------

function createSignalSmoke(name, color) {

    elements[name] = {
        color: color,
        category: "special",
        state: "solid",
        density: 900,

        tick: function(pixel) {

            // W Sandboxels element aktywuje się
            // po kontakcie z ogniem lub prądem.
            let activated = false;

            if (pixel.charge) {
                activated = true;
            }

            // Sprawdzanie sąsiadujących pól
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {

                    let x = pixel.x + dx;
                    let y = pixel.y + dy;

                    if (outOfBounds(x, y)) continue;

                    let other = pixelMap[x][y];

                    if (!other) continue;

                    if (other.element === "fire") {
                        activated = true;
                    }
                }
            }

            if (activated) {
                signalEffect(pixel, color, true);
            }
        }
    };
}


function createSignalGlow(name, color) {

    elements[name] = {
        color: color,
        category: "special",
        state: "solid",
        density: 900,

        tick: function(pixel) {

            let activated = false;

            if (pixel.charge) {
                activated = true;
            }

            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {

                    let x = pixel.x + dx;
                    let y = pixel.y + dy;

                    if (outOfBounds(x, y)) continue;

                    let other = pixelMap[x][y];

                    if (!other) continue;

                    if (other.element === "fire") {
                        activated = true;
                    }
                }
            }

            if (activated) {
                signalEffect(pixel, color, false);
            }
        }
    };
}


// -----------------------------
// KOLOROWY DYM
// -----------------------------

createSignalSmoke("signal_red", signalColors.red);
createSignalSmoke("signal_orange", signalColors.orange);
createSignalSmoke("signal_yellow", signalColors.yellow);
createSignalSmoke("signal_green", signalColors.green);
createSignalSmoke("signal_blue", signalColors.blue);
createSignalSmoke("signal_purple", signalColors.purple);
createSignalSmoke("signal_pink", signalColors.pink);
createSignalSmoke("signal_cyan", signalColors.cyan);
createSignalSmoke("signal_white", signalColors.white);
createSignalSmoke("signal_black", signalColors.black);


// -----------------------------
// ŚWIATŁO + BEZBARWNY DYM
// -----------------------------

createSignalGlow("signal_glow_red", signalColors.red);
createSignalGlow("signal_glow_orange", signalColors.orange);
createSignalGlow("signal_glow_yellow", signalColors.yellow);
createSignalGlow("signal_glow_green", signalColors.green);
createSignalGlow("signal_glow_blue", signalColors.blue);
createSignalGlow("signal_glow_purple", signalColors.purple);
createSignalGlow("signal_glow_pink", signalColors.pink);
createSignalGlow("signal_glow_cyan", signalColors.cyan);
createSignalGlow("signal_glow_white", signalColors.white);