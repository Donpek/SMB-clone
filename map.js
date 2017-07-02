const Entity = function entity_constructor(args){ //draw, coll, ani, flag
  const keys = Object.keys(args);
  for(let i=0;i<keys.length;i++){
      this[keys[i]] = args[keys[i]];
  }
}

const Map = function map_constructor(json){
  this.json = json;
  this.entities = [];
  this.player = null;

  /* INITIALIZATION */
  let i = 0;
  for(let y=0;y<json.height;y++){

    for(let x=0;x<json.width;x++,i++){
      let id = json.layers[0].data[i];
      let ent;

      switch(id){

        case TILE_IDS.GROUND:
          ent = new Entity({
            x: Map.UNIT_WIDTH*x, y: Map.UNIT_HEIGHT*y,
            w: Map.UNIT_WIDTH, h: Map.UNIT_HEIGHT,
            frame: TILE_IDS.GROUND - 1,
            solid: true,
          });
          ent.draw = new Drawable(sprites.main_sheet, ent);
          this.entities.push(ent);
        break;

        case TILE_IDS.BRICK:
          ent = new Entity({
            x: Map.UNIT_WIDTH*x, y: Map.UNIT_HEIGHT*y,
            w: Map.UNIT_WIDTH, h: Map.UNIT_HEIGHT,
            frame: TILE_IDS.BRICK - 1,
            solid: true,
          });
          ent.draw = new Drawable(sprites.main_sheet, ent);
          this.entities.push(ent);
        break;

        case TILE_IDS.BOX_COIN:
          ent = new Entity({
            x: Map.UNIT_WIDTH*x, y: Map.UNIT_HEIGHT*y,
            w: Map.UNIT_WIDTH, h: Map.UNIT_HEIGHT,
            frame: TILE_IDS.BOX_MYSTERY - 1,
            flag: 'box_coin',
            solid: true,
          });
          ent.draw = new Drawable(sprites.main_sheet, ent);
          this.entities.push(ent);
        break;

        case TILE_IDS.BOX_RED_SHROOM:
          ent = new Entity({
            x: Map.UNIT_WIDTH*x, y: Map.UNIT_HEIGHT*y,
            w: Map.UNIT_WIDTH, h: Map.UNIT_HEIGHT,
            frame: TILE_IDS.BOX_MYSTERY - 1,
            flag: 'box_red_shroom',
            solid: true,
          });
          ent.draw = new Drawable(sprites.main_sheet, ent);
          this.entities.push(ent);
        break;

        case TILE_IDS.PIPE_TOP:
          let destination_level_name, destination_tile_index;
          for(let a=1;a<json.layers.length;a++){
            if(json.layers[a].name === 'pipe' && json.layers[a].data[i] > 0){
              destination_level_name = json.layers[a].properties.level_name;
              destination_tile_index = json.layers[a].properties.tile_index;
              break;
            }
          }
          ent = new Entity({
            x: Map.UNIT_WIDTH*x, y: Map.UNIT_HEIGHT*y,
            w: Map.UNIT_WIDTH*2, h: Map.UNIT_HEIGHT*2,
            frame: TILE_IDS.PIPE_TOP - 1,
            destination_level_name: destination_level_name,
            destination_tile_index: destination_tile_index,
            flag: 'pipe_top',
            coll: new RectCollider(0.25,0,1.5,0.25),
            solid: true,
          });
          ent.draw = new Drawable(sprites.main_sheet, ent);
          this.entities.push(ent);
        break;

        case TILE_IDS.MARIO:
          this.player = new Entity({
            x: Map.UNIT_WIDTH*x, y: Map.UNIT_HEIGHT*y,
            w: Map.UNIT_WIDTH, h: Map.UNIT_HEIGHT,
            run_speed: 5,
            sprint_speed: 10,
            coll: coll_1x1,
            flag: 'player',
          });
          this.player.draw = new Drawable(sprites.mario_sheet, this.player);
        break;

        case TILE_IDS.GOOMBA:
          ent = new Entity({
            x: Map.UNIT_WIDTH*x, y: Map.UNIT_HEIGHT*y,
            w: Map.UNIT_WIDTH, h: Map.UNIT_HEIGHT,
            mov_speed: 3,
            coll: coll_1x1,
            flag: 'goomba',
            ani: ani_goomba_walk,
          });
          ent.draw = new Drawable(sprites.goomba_sheet, ent);
          this.entities.push(ent);
        break;
      }
    }
  }
  /**/

  this.render = function render_map(){
    for(let i=0;i<this.entities.length;i++){
      if(this.entities[i].frame !== undefined){

        this.entities[i].draw.sheet(this.entities[i].frame);
      }else if(this.entities[i].ani !== undefined){

        this.entities[i].draw.ani(this.entities[i].ani);
      }
    }
  }
}

const Init_Maps = function initialize_maps(file_paths, container, callback){
  $.getJSON(file_paths[0], json => {
    file_paths.shift();
    container[json.properties.name] = new Map(json);

    if(file_paths.length > 0){
      Init_Maps(file_paths, container, callback);
    }else{
      console.log('Done initializing maps.');
      callback();
    }
  });
}
