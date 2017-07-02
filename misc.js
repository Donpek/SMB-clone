const TO_RADIANS = Math.PI / 180;

const rand = function random_integer_from_range(min, max) {
  return min + Math.floor(Math.random() * max); // [max; min)
}

const xy2i = function coordinates_to_index(x, y, map_width){
  return y * map_width + x;
}

const i2xy = function index_to_coordinates(i, map_width) {
  return {
    x: (i % map_width),
    y: (Math.floor(i / map_width) )
  };
}

const px2tiles = function pixel_coordinates_to_tile_coordinates(px_x, px_y) {
  return {
    x: Math.floor(px_x/TILE_W),
    y: Math.floor(px_y/TILE_H)
  };
}
