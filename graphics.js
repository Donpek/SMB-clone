const Sprite = function sprite_constructor(file_path)
{
  this.image = null;
  this.widthInTiles = null;
  this.name = file_path.replace('sprites/', '').replace('.png', '');

  //Valid file path?
  if(file_path != null && file_path != undefined && file_path != "")
  {
    this.image = new Image();
    this.image.src = file_path;
  }else{
    console.log('Failed to load ' + file_path);
  }
}

const Drawable = function drawable_constructor(sprite, entity)
{
  this.sprite = sprite;
  this.ent = entity;

  this.whole = function draw_whole_image(){
    Drawable.ctx.drawImage(
      this.sprite.image,
      this.ent.x,
      this.ent.y,
      this.ent.w,
      this.ent.h
    );
  };

  /*
  this.sheet = function draw_from_sheet(x, y, w, h, sprite_id)  {
    const coords = i2xy(sprite_id, this.sprite.widthInTiles);
    Drawable.ctx.drawImage(this.sprite.image, coords.x*TILE_W, coords.y*TILE_H,
      w, h, x, y, w, h);
  };
  */
  this.sheet = function draw_from_sheet(sprite_id)  {
    const coords = i2xy(sprite_id, this.sprite.widthInTiles);
    Drawable.ctx.drawImage(
      this.sprite.image,
      coords.x * Drawable.UNIT_WIDTH,
      coords.y * Drawable.UNIT_HEIGHT,
      this.ent.w,
      this.ent.h,
      this.ent.x,
      this.ent.y,
      this.ent.w,
      this.ent.h
    );
  };

  this.curentFrame = null;
  this.frameDelayCounter = null;
  this.currentFrameIndex = 0;

  /*
  this.ani = function draw_animated(x, y, w, h, animation)  {
    if(this.frameDelayCounter === null)
      this.frameDelayCounter = animation.sequence[this.currentFrameIndex].delay;

    if(this.frameDelayCounter++ == animation.sequence[this.currentFrameIndex].delay){
      this.frameDelayCounter = 0;
      this.currentFrameIndex++;
      if(this.currentFrameIndex == animation.sequence.length)
      {
        this.currentFrameIndex = 0;
      }
      this.currentFrame = animation.sequence[this.currentFrameIndex].sprite_id;
    }
    this.sheet(x, y, w, h, this.currentFrame);
  };
  */
  this.ani = function draw_animated(animation){
    if(this.frameDelayCounter === null)
      this.frameDelayCounter = animation.sequence[this.currentFrameIndex].delay;

    if(this.frameDelayCounter++ === animation.sequence[this.currentFrameIndex].delay){
      this.frameDelayCounter = 0;
      this.currentFrameIndex++;

      if(this.currentFrameIndex === animation.sequence.length){
        this.currentFrameIndex = 0;
      }
      this.currentFrame = animation.sequence[this.currentFrameIndex].sprite_id;
    }
    this.sheet(this.currentFrame);
  };
}

const Load_Sprites = function start_loading_sprites(file_paths, container, callback)
{
  const sprite = new Sprite(file_paths[0]);
  file_paths.shift();
  container[sprite.name] = sprite;

  sprite.image.onload = function()
  {
    /*values that can only be initialized when the image has been loaded*/
    sprite.widthInTiles = sprite.image.width / TILE_W;
    /**/

    if(file_paths.length > 0)
    {
      Load_Sprites(file_paths, container, callback);
    }else{
      console.log('Done loading sprites.');
      callback();
    }
  };
}
