const coll = function collision_with_corner_of_entitys_collider(entity, corner) {
  const x = entity.x + entity.coll[corner].x + entity.dx;
  const y = entity.y + entity.coll[corner].y + entity.dy;
  for(let i=0;i<curr_map.ents.length;i++){
    if(
      x >= curr_map.ents[i].x &&
      x <= curr_map.ents[i].x + curr_map.ents[i].w &&
      y >= curr_map.ents[i].y &&
      y <= curr_map.ents[i].y + curr_map.ents[i].h
    ){
      return curr_map.ents[i];
    }
  }
  return null;
}

const RectCollider = function rectangular_collider_constructor(x,y,w,h){
  this.nw = {x: x*TILE_W, y: y*TILE_H};
  this.ne = {x: (x + w)*TILE_W, y: y*TILE_H};
  this.sw = {x: x*TILE_W, y: (y + h)*TILE_H};
  this.se = {x: (x + w)*TILE_W, y: (y + h)*TILE_H};
}
