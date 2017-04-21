var parkingSpot = {
    parking_spot_id: "",
    status: "",
    physical_serial_label: "",
    parking_patch_id: "",
    order_in_patch: "",
};
var parkingPatch = [{
    parking_patch_id: "",
    center_latitude: 13.739215731339197 + m2Deg(-.29),
    center_longitude: 100.56085735559464 + m2Deg(0),
    elevation: "0",
    theta: -84,
    phi: "0",
    alpha: "0",
    width: "5", // m
    length: "7.5", //m
    number_of_slots_by_the_length: "3",
    offset_angle: 0,
    parking_floor_id: "",
    parkingSpots: [parkingSpot],
}, {
    parking_patch_id: "",
    center_latitude: 13.739416351858535,
    center_longitude: 100.56088417768478 + m2Deg(.85),
    elevation: "0",
    theta: -84 + 90,
    phi: "0",
    alpha: "0",
    width: "5", // m
    length: "7.5", //m
    number_of_slots_by_the_length: "3",
    offset_angle: 0,
    parking_floor_id: "",
    parkingSpots: [parkingSpot],
}, {
    parking_patch_id: "",
    center_latitude: 13.739375967222333,
    center_longitude: 100.56103840470314,
    elevation: "0",
    theta: -84 + 180,
    phi: "0",
    alpha: "0",
    width: "5", // m
    length: 5, //m
    number_of_slots_by_the_length: 2,
    offset_angle: 0,
    parking_floor_id: "",
    parkingSpots: [parkingSpot],
}, {
    parking_patch_id: "",
    center_latitude: 13.739088063646568 + m2Deg(-.1),
    center_longitude: 100.56100755929947,
    elevation: "0",
    theta: -84 + 180,
    phi: "0",
    alpha: "0",
    width: "5", // m
    length: 5, //m
    number_of_slots_by_the_length: 2,
    offset_angle: 0,
    parking_floor_id: "",
    parkingSpots: [parkingSpot],
}, {
    "parking_patch_id": "",
    "center_latitude": 13.739408535477866 - m2Deg(.25),
    "center_longitude": 100.56098341941833 + m2Deg(.25),
    "elevation": "0",
    "theta": -84 + 90, "phi": "0", "alpha": "0",
    "width": "5", "length": 5,
    "number_of_slots_by_the_length": 2,
    "offset_angle": 0, "parking_floor_id": ""
}, {
    "parking_patch_id": "",
    "center_latitude": 13.739282170621118 - m2Deg(.25), "center_longitude": 100.56086272001266,
    "elevation": "0",
    "theta": -84, "phi": "0", "alpha": "0",
    "width": "5", "length": 5,
    "number_of_slots_by_the_length": 2,
    "offset_angle": 0, "parking_floor_id": ""
},
{ "parking_patch_id": "", "center_latitude": 13.739158411159273 - m2Deg(.25), "center_longitude": 100.56085467338562, "elevation": "0", "theta": -84, "phi": "0", "alpha": "0", "width": 6, "length": 3, "number_of_slots_by_the_length": 1, "offset_angle": 0, "parking_floor_id": "" }];

var pPatch = [];
for (var i = 1; i < 6; i++) {
    pPatch.push({
        parking_patch_id: "",
        center_latitude: 13.73908716 + (13.73937597 - 13.73908716) * i / 6,
        center_longitude: 100.5610076 + (100.5610384 - 100.5610076) * i / 6,
        elevation: "0",
        theta: -84 + 180,
        phi: "0",
        alpha: "0",
        width: "5", // m
        length: 5, //m
        number_of_slots_by_the_length: 2,
        offset_angle: 0,
        parking_floor_id: "",
        parkingSpots: [parkingSpot],
    });
}


var mapImage = {
    floor_map_image_id: "",
    url: "./master-floor.png",

    center_latitude: 13.738883272086257,
    center_longitude: 100.56115252956917,
    pixelPerMeter: 0.5 / 0.09065750491789616,
    bearing: -84,
};

var floor = {
    parking_floor_id: "",
    title: "",
    floor: "",
    parkade_id: "",
    floor_map_image_id: "",
    mapImage: mapImage,
    parkingPatches: parkingPatch.concat(pPatch),
};