function createSmoke(name, label, color) {
    elements[name] = {
        color: color,
        behavior: behaviors.WALL,
        state: "solid",
        density: 900,
        category: FLARE_CATEGORY,
        desc: label + " - kolorowy efekt dymny.",

        tick: function(pixel) {

            // Nieaktywny dopóki nie dotknie ognia
            if (!pixel.active) {

                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {

                        let x = pixel.x + dx;
                        let y = pixel.y + dy;

                        if (outOfBounds(x, y)) continue;

                        let other = pixelMap[x][y];

                        if (other && other.element === "fire") {
                            pixel.active = true;
                            pixel.life = 2400; // około 120 sekund
                            pixel.color = color;
                        }
                    }
                }

                return;
            }

            // Odliczanie czasu
            pixel.life--;

            if (pixel.life <= 0) {
                deletePixel(pixel.x, pixel.y);
                return;
            }

            // Świecenie
            pixel.color = color;

            // Kolorowy dym
            if (Math.random() < 0.75) {

                let x = pixel.x + Math.floor(Math.random() * 5) - 2;
                let y = pixel.y - 1;

                if (!outOfBounds(x, y) && isEmpty(x, y)) {

                    createPixel("flare_neutral_smoke", x, y);

                    let smoke = pixelMap[x][y];

                    if (smoke) {
                        smoke.color = color;
                        smoke.life = 100 + Math.random() * 100;
                    }
                }
            }
        }
    };
}


function createGlow(name, label, color) {
    elements[name] = {
        color: color,
        behavior: behaviors.WALL,
        state: "solid",
        density: 900,
        category: FLARE_CATEGORY,
        desc: label + " - kolorowe swiatlo i neutralny dym.",

        tick: function(pixel) {

            // Nieaktywny dopóki nie dotknie ognia
            if (!pixel.active) {

                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {

                        let x = pixel.x + dx;
                        let y = pixel.y + dy;

                        if (outOfBounds(x, y)) continue;

                        let other = pixelMap[x][y];

                        if (other && other.element === "fire") {
                            pixel.active = true;
                            pixel.life = 2400; // około 120 sekund
                            pixel.color = color;
                        }
                    }
                }

                return;
            }

            pixel.life--;

            if (pixel.life <= 0) {
                deletePixel(pixel.x, pixel.y);
                return;
            }

            // Kolorowe światło
            pixel.color = color;

            // Bezbarwny dym
            if (Math.random() < 0.55) {

                let x = pixel.x + Math.floor(Math.random() * 5) - 2;
                let y = pixel.y - 1;

                if (!outOfBounds(x, y) && isEmpty(x, y)) {

                    createPixel("flare_neutral_smoke", x, y);

                    let smoke = pixelMap[x][y];

                    if (smoke) {
                        smoke.color = "#b5b5b5";
                        smoke.life = 100 + Math.random() * 100;
                    }
                }
            }
        }
    };
}
