
var parkingPatch = [
  {
    "id": "",
    "center_latitude": 13.739213123715835,
    "center_longitude": 100.56085735559464,
    "elevation": "0",
    "theta": -84,
    "phi": "0",
    "alpha": "0",
    "width": "5",
    "length": "7.5",
    "number_of_slots_by_the_length": "3",
    "offset_angle": 0,
    "parking_floor_id": ""
  },
  {
    "id": "",
    "center_latitude": 13.739416351858535,
    "center_longitude": 100.56089182071878,
    "elevation": "0",
    "theta": 6,
    "phi": "0",
    "alpha": "0",
    "width": "5",
    "length": "7.5",
    "number_of_slots_by_the_length": "3",
    "offset_angle": 0,
    "parking_floor_id": ""
  },
  {
    "id": "",
    "center_latitude": 13.739375967222333,
    "center_longitude": 100.56103840470314,
    "elevation": "0",
    "theta": 96,
    "phi": "0",
    "alpha": "0",
    "width": "5",
    "length": 5,
    "number_of_slots_by_the_length": 2,
    "offset_angle": 0,
    "parking_floor_id": ""
  },
  {
    "id": "",
    "center_latitude": 13.739087164466099,
    "center_longitude": 100.56100755929947,
    "elevation": "0",
    "theta": 96,
    "phi": "0",
    "alpha": "0",
    "width": "5",
    "length": 5,
    "number_of_slots_by_the_length": 2,
    "offset_angle": 0,
    "parking_floor_id": ""
  },
  {
    "id": "",
    "center_latitude": 13.739406287526693,
    "center_longitude": 100.56098566736951,
    "elevation": "0",
    "theta": 6,
    "phi": "0",
    "alpha": "0",
    "width": "5",
    "length": 5,
    "number_of_slots_by_the_length": 2,
    "offset_angle": 0,
    "parking_floor_id": ""
  },
  {
    "id": "",
    "center_latitude": 13.739279922669946,
    "center_longitude": 100.56086272001266,
    "elevation": "0",
    "theta": -84,
    "phi": "0",
    "alpha": "0",
    "width": "5",
    "length": 5,
    "number_of_slots_by_the_length": 2,
    "offset_angle": 0,
    "parking_floor_id": ""
  },
  {
    "id": "",
    "center_latitude": 13.7391561632081,
    "center_longitude": 100.56085467338562,
    "elevation": "0",
    "theta": -84,
    "phi": "0",
    "alpha": "0",
    "width": 6,
    "length": 3,
    "number_of_slots_by_the_length": 1,
    "offset_angle": 0,
    "parking_floor_id": ""
  },
  {
    "id": "",
    "center_latitude": 13.739135295,
    "center_longitude": 100.56101273333333,
    "elevation": "0",
    "theta": 96,
    "phi": "0",
    "alpha": "0",
    "width": "5",
    "length": 5,
    "number_of_slots_by_the_length": 2,
    "offset_angle": 0,
    "parking_floor_id": ""
  },
  {
    "id": "",
    "center_latitude": 13.73918343,
    "center_longitude": 100.56101786666666,
    "elevation": "0",
    "theta": 96,
    "phi": "0",
    "alpha": "0",
    "width": "5",
    "length": 5,
    "number_of_slots_by_the_length": 2,
    "offset_angle": 0,
    "parking_floor_id": ""
  },
  {
    "id": "",
    "center_latitude": 13.739231565,
    "center_longitude": 100.561023,
    "elevation": "0",
    "theta": 96,
    "phi": "0",
    "alpha": "0",
    "width": "5",
    "length": 5,
    "number_of_slots_by_the_length": 2,
    "offset_angle": 0,
    "parking_floor_id": ""
  },
  {
    "id": "",
    "center_latitude": 13.739279699999999,
    "center_longitude": 100.56102813333334,
    "elevation": "0",
    "theta": 96,
    "phi": "0",
    "alpha": "0",
    "width": "5",
    "length": 5,
    "number_of_slots_by_the_length": 2,
    "offset_angle": 0,
    "parking_floor_id": ""
  },
  {
    "id": "",
    "center_latitude": 13.739327835,
    "center_longitude": 100.56103326666667,
    "elevation": "0",
    "theta": 96,
    "phi": "0",
    "alpha": "0",
    "width": "5",
    "length": 5,
    "number_of_slots_by_the_length": 2,
    "offset_angle": 0,
    "parking_floor_id": ""
  }
];



var mapImage = {
    "id": "2",
    "url": "./ground-floor.png",
    "center_latitude": 13.739023967213983, 
    "center_longitude": 100.56100500807335+0.000004046312112505814,
    "pixelPerMeter": 8.750921631067984*.97, 
    "bearing": -83.75
};


var floor = {
  id: "2",
  label: "Ground Floor",
  floor_map_image_id: "2",
  parking_garage_id: "1",
};


var floor = {
  id: "2",
  label: "Ground Floor",
  floor_map_image_id: "2",
  parking_garage_id: "1",
  mapImage:mapImage,
  parkingPatches:parkingPatch
};
