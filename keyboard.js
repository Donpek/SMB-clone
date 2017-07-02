const Keys =
{
  left: false,
  up: false,
  right: false,
  down: false,

  a: false,
  w: false,
  d: false,
  s: false,

  shift: false
};

const Keyboard = function start_tracking_keyboard_input()
{
  $(document).on('keydown', function(e){
    switch(e.keyCode){
      case 37: Keys.left = true; break;
      case 38: Keys.up = true; break;
      case 39: Keys.right = true; break;
      case 40: Keys.down = true; break;
      case 65: Keys.a = true; break;
      case 87: Keys.w = true; break;
      case 68: Keys.d = true; break;
      case 83: Keys.s = true; break;
      case 16: Keys.shift = true; break;
      default: console.log('KeyCode not recognized.');
    }
  });

  $(document).on('keyup', function(e){
    switch(e.keyCode){
      case 37: Keys.left = false; break;
      case 38: Keys.up = false; break;
      case 39: Keys.right = false; break;
      case 40: Keys.down = false; break;
      case 65: Keys.a = false; break;
      case 87: Keys.w = false; break;
      case 68: Keys.d = false; break;
      case 83: Keys.s = false; break;
      case 16: Keys.shift = false; break;
      default: console.log('KeyCode not recognized.');
    }
  });
}
