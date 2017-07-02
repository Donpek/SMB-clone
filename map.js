const Entity = function entity_constructor(args){ //draw, coll, ani, flag
  const keys = Object.keys(args);
  for(let i=0;i<keys.length;i++){
      this[keys[i]] = args[keys[i]];
  }
}

const ID = {
  MARIO: 61,
  GOOMBA: 62,
  //KOOPA: 63,
  BRICK: 1,
  GROUND: 31,
  BOX_MYSTERY: 24,
  BOX_COIN: 14,
  BOX_RED_SHROOM: 4,
  PIPE_TOP: 9,
  RED_SHROOM: 51,
};

const Map = function map_constructor(json){
  this.json = json;
  this.entities = [];

  /* INITIALIZATION */
  let i = 0;
  for(let y=0;y<json.height;y++){

    for(let x=0;x<json.width;x++,i++){
      let id = json.layers[0].data[i];

      switch(id){

        case ID.GROUND:
          this.entities.push(new Entity({
            x: TILE_W*x, y: TILE_H*y,
            w: TILE_W, h: TILE_H,
            draw: new Drawable(sprites.main_sheet),
            frame: ID.GROUND - 1,
            flag: 'solid',
          }));
        break;

        case ID.BRICK:
          this.entities.push(new Entity({
            x: TILE_W*x, y: TILE_H*y,
            w: TILE_W, h: TILE_H,
            draw: new Drawable(sprites.main_sheet),
            frame: ID.BRICK - 1,
            flag: 'solid',
          }));
        break;

        case ID.BOX_COIN:
          this.entities.push(new Entity({
            x: TILE_W*x, y: TILE_H*y,
            w: TILE_W, h: TILE_H,
            draw: new Drawable(sprites.main_sheet),
            frame: ID.BOX_MYSTERY - 1,
            flag: 'box_coin',
          }));
        break;

        case ID.BOX_RED_SHROOM:
          this.entities.push(new Entity({
            x: TILE_W*x, y: TILE_H*y,
            w: TILE_W, h: TILE_H,
            draw: new Drawable(sprites.main_sheet),
            frame: ID.BOX_MYSTERY - 1,
            flag: 'box_red_shroom',
          }));
        break;

        case ID.PIPE_TOP:
          let destination_level_name, destination_tile_index;
          for(let a=1;a<json.layers.length;a++){
            if(json.layers[a].name === 'pipe' && json.layers[a].data[i] > 0){
              destination_level_name = json.layers[a].properties.level_name;
              destination_tile_index = json.layers[a].properties.tile_index;
              break;
            }
          }
          this.entities.push(new Entity({
            x: TILE_W*x, y: TILE_H*y,
            w: TILE_W*2, h: TILE_H*2,
            draw: new Drawable(sprites.main_sheet),
            frame: ID.PIPE_TOP - 1,
            destination_level_name: destination_level_name,
            destination_tile_index: destination_tile_index,
            flag: 'pipe_top',
          }));
        break;

        case ID.MARIO:
          player = new Entity({
            x: TILE_W*x, y: TILE_H*y,
            w: TILE_W, h: TILE_H,
            run_speed: 5,
            sprint_speed: 10,
            draw: new Drawable(sprites.mario_sheet),
            coll: coll_1x1,
          });
        break;

        case ID.GOOMBA:
          this.entities.push(new Entity({
            x: TILE_W*x, y: TILE_H*y,
            w: TILE_W, h: TILE_H,
            mov_speed: 3,
            draw: new Drawable(sprites.goomba_sheet),
            coll: coll_1x1,
            flag: 'goomba',
            ani: ani_goomba_walk,
          }));
        break;
      }
    }
  }
  /**/

  this.render = function render_map(){
    for(let i=0;i<this.entities.length;i++){
      if(this.entities[i].frame !== undefined){

        this.entities[i].draw.sheet(
          this.entities[i].x, this.entities[i].y,
          this.entities[i].w, this.entities[i].h,
          this.entities[i].frame
        );
      }else if(this.entities[i].ani !== undefined){

        this.entities[i].draw.ani(
          this.entities[i].x, this.entities[i].y,
          this.entities[i].w, this.entities[i].h,
          this.entities[i].ani
        );
      }
    }
  }

  //throw 'TO-DO map_constructor';
}
