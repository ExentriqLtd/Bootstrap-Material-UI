(function ($) {
    EqUIDoc.color = {};

    EqUIDoc.color.exentriq_palette = {};
    EqUIDoc.color.material_palette = {};

    // Init
    EqUIDoc.color.init = function() {

        // Build palettes
        EqUIDoc.color.build_palettes();

        // Render in color view
        if(_doc_route.path === "color"){
            // Render UI -> Color palette
            riot.mount('doc-color-palette', { exentriq_palette: EqUIDoc.color.exentriq_palette, material_palette: EqUIDoc.color.material_palette });
        }
    };

    // Update
    EqUIDoc.color.update = function() {
        // ...
    };

    // Build palettes
    EqUIDoc.color.build_palettes = function() {

        // Exentriq palette
        EqUIDoc.color.exentriq_palette = {
            eq_green_turquoise: {
                "50":   "#e8f8f5",
                "100":  "#bbebe1",
                "200":  "#8ddecd",
                "300":  "#67d2bc",
                "400":  "#41c7ac",
                "500":  "#1bbc9b",
                "600":  "#18a588",
                "700":  "#148d74",
                "800":  "#117661",
                "900":  "#0e5e4e",
                "A100": "#bbebe1",
                "A200": "#8ddecd",
                "A400": "#41c7ac",
                "A700": "#148d74"
            },
            eq_deep_blue: {
                "50":   "#eaecee",
                "100":  "#c1c7cd",
                "200":  "#97a1ab",
                "300":  "#74828f",
                "400":  "#526273",
                "500":  "#2f4357",
                "600":  "#293b4c",
                "700":  "#233241",
                "800":  "#1d2a36",
                "900":  "#18222c",
                "A100": "#c1c7cd",
                "A200": "#97a1ab",
                "A400": "#526273",
                "A700": "#233241"
            },
            eq_sea_blue: {
                "50":   "#edf4f5",
                "100":  "#c8dee2",
                "200":  "#a3c9cf",
                "300":  "#84b6bf",
                "400":  "#66a4af",
                "500":  "#47929f",
                "600":  "#3e808b",
                "700":  "#356e77",
                "800":  "#2c5b63",
                "900":  "#244950",
                "A100": "#c8dee2",
                "A200": "#a3c9cf",
                "A400": "#66a4af",
                "A700": "#356e77"
            },
            eq_water_blue: {
                "50":   "#effbfc",
                "100":  "#d0f2f6",
                "200":  "#b1e9f0",
                "300":  "#97e2ea",
                "400":  "#7ddae5",
                "500":  "#63d3e0",
                "600":  "#57b9c4",
                "700":  "#4a9ea8",
                "800":  "#3e848c",
                "900":  "#326a70",
                "A100": "#d0f2f6",
                "A200": "#b1e9f0",
                "A400": "#7ddae5",
                "A700": "#4a9ea8"
            },

            eq_pastel_red: {
                "50":   "#feeeef",
                "100":  "#fbccce",
                "200":  "#f9abae",
                "300":  "#f78e93",
                "400":  "#f57278",
                "500":  "#f3565d",
                "600":  "#d54b51",
                "700":  "#b64146",
                "800":  "#98363a",
                "900":  "#7a2b2f",
                "A100": "#fbccce",
                "A200": "#f9abae",
                "A400": "#f57278",
                "A700": "#b64146"
            },
            eq_medium_grey: {
                "50":   "#f5f5f5",
                "100":  "#e1e1e1",
                "200":  "#cdcdcd",
                "300":  "#bcbcbc",
                "400":  "#acacac",
                "500":  "#9b9b9b",
                "600":  "#888888",
                "700":  "#747474",
                "800":  "#616161",
                "900":  "#4e4e4e",
                "A100": "#e1e1e1",
                "A200": "#cdcdcd",
                "A400": "#acacac",
                "A700": "#747474"
            },
            eq_desert_orange: {
                "50":   "#fff1e7",
                "100":  "#fed5b7",
                "200":  "#fdba88",
                "300":  "#fca260",
                "400":  "#fb8b38",
                "500":  "#fa7410",
                "600":  "#db660e",
                "700":  "#bc570c",
                "800":  "#9c490a",
                "900":  "#7d3a08",
                "A100": "#fed5b7",
                "A200": "#fdba88",
                "A400": "#fb8b38",
                "A700": "#bc570c"
            }
        };

        // Material Palette
        EqUIDoc.color.material_palette = {
            red: {
                "50":   "#FFEBEE",
                "100":  "#FFCDD2",
                "200":  "#EF9A9A",
                "300":  "#E57373",
                "400":  "#EF5350",
                "500":  "#F44336",
                "600":  "#E53935",
                "700":  "#D32F2F",
                "800":  "#C62828",
                "900":  "#B71C1C",
                "A100": "#FF8A80",
                "A200": "#FF5252",
                "A400": "#FF1744",
                "A700": "#D50000"
            },
            pink: {
                "50":   "#fce4ec",
                "100":  "#f8bbd0",
                "200":  "#f48fb1",
                "300":  "#f06292",
                "400":  "#ec407a",
                "500":  "#e91e63",
                "600":  "#d81b60",
                "700":  "#c2185b",
                "800":  "#ad1457",
                "900":  "#880e4f",
                "A100": "#ff80ab",
                "A200": "#ff4081",
                "A400": "#f50057",
                "A700": "#c51162"
            },
            purple: {
                "50":   "#f3e5f5",
                "100":  "#e1bee7",
                "200":  "#ce93d8",
                "300":  "#ba68c8",
                "400":  "#ab47bc",
                "500":  "#9c27b0",
                "600":  "#8e24aa",
                "700":  "#7b1fa2",
                "800":  "#6a1b9a",
                "900":  "#4a148c",
                "A100": "#ea80fc",
                "A200": "#e040fb",
                "A400": "#d500f9",
                "A700": "#aa00ff"
            },
            deep_purple: {
                "50":   "#ede7f6",
                "100":  "#d1c4e9",
                "200":  "#b39ddb",
                "300":  "#9575cd",
                "400":  "#7e57c2",
                "500":  "#673ab7",
                "600":  "#5e35b1",
                "700":  "#512da8",
                "800":  "#4527a0",
                "900":  "#311b92",
                "A100": "#b388ff",
                "A200": "#7c4dff",
                "A400": "#651fff",
                "A700": "#6200ea"
            },
            indigo: {
                "50":   "#e8eaf6",
                "100":  "#c5cae9",
                "200":  "#9fa8da",
                "300":  "#7986cb",
                "400":  "#5c6bc0",
                "500":  "#3f51b5",
                "600":  "#3949ab",
                "700":  "#303f9f",
                "800":  "#283593",
                "900":  "#1a237e",
                "A100": "#8c9eff",
                "A200": "#536dfe",
                "A400": "#3d5afe",
                "A700": "#304ffe"
            },
            blue: {
                "50":   "#E3F2FD",
                "100":  "#BBDEFB",
                "200":  "#90CAF9",
                "300":  "#64B5F6",
                "400":  "#42A5F5",
                "500":  "#2196F3",
                "600":  "#1E88E5",
                "700":  "#1976D2",
                "800":  "#1565C0",
                "900":  "#0D47A1",
                "A100": "#82B1FF",
                "A200": "#448AFF",
                "A400": "#2979FF",
                "A700": "#2962FF"
            },
            light_blue: {
                "50":   "#e1f5fe",
                "100":  "#b3e5fc",
                "200":  "#81d4fa",
                "300":  "#4fc3f7",
                "400":  "#29b6f6",
                "500":  "#03a9f4",
                "600":  "#039be5",
                "700":  "#0288d1",
                "800":  "#0277bd",
                "900":  "#01579b",
                "A100": "#80d8ff",
                "A200": "#40c4ff",
                "A400": "#00b0ff",
                "A700": "#0091ea"
            },
            cyan: {
                "50":   "#e0f7fa",
                "100":  "#b2ebf2",
                "200":  "#80deea",
                "300":  "#4dd0e1",
                "400":  "#26c6da",
                "500":  "#00bcd4",
                "600":  "#00acc1",
                "700":  "#0097a7",
                "800":  "#00838f",
                "900":  "#006064",
                "A100": "#84ffff",
                "A200": "#18ffff",
                "A400": "#00e5ff",
                "A700": "#00b8d4"
            },
            teal: {
                "50":   "#e0f2f1",
                "100":  "#b2dfdb",
                "200":  "#80cbc4",
                "300":  "#4db6ac",
                "400":  "#26a69a",
                "500":  "#009688",
                "600":  "#00897b",
                "700":  "#00796b",
                "800":  "#00695c",
                "900":  "#004d40",
                "A100": "#a7ffeb",
                "A200": "#64ffda",
                "A400": "#1de9b6",
                "A700": "#00bfa5"
            },
            green: {
                "50":   "#E8F5E9",
                "100":  "#C8E6C9",
                "200":  "#A5D6A7",
                "300":  "#81C784",
                "400":  "#66BB6A",
                "500":  "#4CAF50",
                "600":  "#43A047",
                "700":  "#388E3C",
                "800":  "#2E7D32",
                "900":  "#1B5E20",
                "A100": "#B9F6CA",
                "A200": "#69F0AE",
                "A400": "#00E676",
                "A700": "#00C853"
            },
            light_green: {
                "50":   "#f1f8e9",
                "100":  "#dcedc8",
                "200":  "#c5e1a5",
                "300":  "#aed581",
                "400":  "#9ccc65",
                "500":  "#8bc34a",
                "600":  "#7cb342",
                "700":  "#689f38",
                "800":  "#558b2f",
                "900":  "#33691e",
                "A100": "#ccff90",
                "A200": "#b2ff59",
                "A400": "#76ff03",
                "A700": "#64dd17"
            },
            lime: {
                "50":   "#f9fbe7",
                "100":  "#f0f4c3",
                "200":  "#e6ee9c",
                "300":  "#dce775",
                "400":  "#d4e157",
                "500":  "#cddc39",
                "600":  "#c0ca33",
                "700":  "#afb42b",
                "800":  "#9e9d24",
                "900":  "#827717",
                "A100": "#f4ff81",
                "A200": "#eeff41",
                "A400": "#c6ff00",
                "A700": "#aeea00"
            },
            yellow: {
                "50":   "#fffde7",
                "100":  "#fff9c4",
                "200":  "#fff59d",
                "300":  "#fff176",
                "400":  "#ffee58",
                "500":  "#ffeb3b",
                "600":  "#fdd835",
                "700":  "#fbc02d",
                "800":  "#f9a825",
                "900":  "#f57f17",
                "A100": "#ffff8d",
                "A200": "#ffff00",
                "A400": "#ffea00",
                "A700": "#ffd600"
            },
            amber: {
                "50":   "#fff8e1",
                "100":  "#ffecb3",
                "200":  "#ffe082",
                "300":  "#ffd54f",
                "400":  "#ffca28",
                "500":  "#ffc107",
                "600":  "#ffb300",
                "700":  "#ffa000",
                "800":  "#ff8f00",
                "900":  "#ff6f00",
                "A100": "#ffe57f",
                "A200": "#ffd740",
                "A400": "#ffc400",
                "A700": "#ffab00"
            },
            orange: {
                "50":   "#fff3e0",
                "100":  "#ffe0b2",
                "200":  "#ffcc80",
                "300":  "#ffb74d",
                "400":  "#ffa726",
                "500":  "#ff9800",
                "600":  "#fb8c00",
                "700":  "#f57c00",
                "800":  "#ef6c00",
                "900":  "#e65100",
                "A100": "#ffd180",
                "A200": "#ffab40",
                "A400": "#ff9100",
                "A700": "#ff6d00"
            },
            deep_orange: {
                "50":   "#fbe9e7",
                "100":  "#ffccbc",
                "200":  "#ffab91",
                "300":  "#ff8a65",
                "400":  "#ff7043",
                "500":  "#ff5722",
                "600":  "#f4511e",
                "700":  "#e64a19",
                "800":  "#d84315",
                "900":  "#bf360c",
                "A100": "#ff9e80",
                "A200": "#ff6e40",
                "A400": "#ff3d00",
                "A700": "#dd2c00"
            },
            brown: {
                "50":   "#efebe9",
                "100":  "#d7ccc8",
                "200":  "#bcaaa4",
                "300":  "#a1887f",
                "400":  "#8d6e63",
                "500":  "#795548",
                "600":  "#6d4c41",
                "700":  "#5d4037",
                "800":  "#4e342e",
                "900":  "#3e2723"
            },
            blue_grey: {
                "50":   "#eceff1",
                "100":  "#cfd8dc",
                "200":  "#b0bec5",
                "300":  "#90a4ae",
                "400":  "#78909c",
                "500":  "#607d8b",
                "600":  "#546e7a",
                "700":  "#455a64",
                "800":  "#37474f",
                "900":  "#263238"
            },
            grey: {
                "50":   "#fafafa",
                "100":  "#f5f5f5",
                "200":  "#eeeeee",
                "300":  "#e0e0e0",
                "400":  "#bdbdbd",
                "500":  "#9e9e9e",
                "600":  "#757575",
                "700":  "#616161",
                "800":  "#424242",
                "900":  "#212121"
            },
            shades: {
                "black":        "#000000",
                "white":        "#FFFFFF",
                "transparent":  "transparent"
            }
        };
    };

    // Get class -> Background
    EqUIDoc.color.get_class_background = function(key,cod) {
        var _key = key.replace(/_/g, "-");
        return _key+'-'+cod;
    };

    // Get class -> Color
    EqUIDoc.color.get_class_color = function(key,cod) {
        var _key = key.replace(/_/g, "-");
        return _key+'-text-'+cod;
    };

    // Get color label
    EqUIDoc.color.get_color_label = function(cod) {
        var _cod = cod.replace("A", "");
        if(_cod < 500 || _cod === "white" || _cod === "transparent"){
            return '#000000';
        }
        if(_cod >= 500 || _cod === "black"){
            return '#ffffff';
        }
    };

    $(document).ready(function() {
        // Init
        EqUIDoc.color.init();

        // Update
        EqUIDoc.color.update();

        // Resize
        $(window).resize( function() {

            EqUIDoc.color.update();

        });
    });
}( jQuery ));