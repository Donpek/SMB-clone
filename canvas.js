const HTML_Canvas = function html_canvas_constructor(canvas_id, width, height, context_type)
{
  this.width = width;
  this.height = height;

  this.widthInTiles = width/TILE_W;
  this.heightInTiles = height/TILE_H;

  this.canvas = document.getElementById(canvas_id);
  this.ctx = this.canvas.getContext(context_type);

  $('#'+canvas_id).attr({width: width, height: height});
  $('#'+canvas_id).css({width:width+'px', height:height+'px'});
}
