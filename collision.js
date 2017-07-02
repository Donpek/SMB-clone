const RectCollider = function rectangular_collider_constructor(x,y,w,h){
  this.nw = {x: x*TILE_W, y: y*TILE_H};
  this.ne = {x: (x + w)*TILE_W, y: y*TILE_H};
  this.sw = {x: x*TILE_W, y: (y + h)*TILE_H};
  this.se = {x: (x + w)*TILE_W, y: (y + h)*TILE_H};
}

const coll = function collision_with_corner_of_entitys_collider(entity, corner) {
  const tile_coords = px2tiles(
    entity.x + entity.coll[corner].x + entity.dx,
    entity.y + entity.coll[corner].y + entity.dy
  );
  throw 'TO-DO collision_with_corner_of_entitys_collider';
  /*const resulting_entity = current_map.layers[0][xy2i(tile_coords.x,tile_coords.y,Game.width/TILE_W)];

  return resulting_entity.type;*/
}
