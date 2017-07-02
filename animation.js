const Animation = function animation_constructor(frame_sequence, frame_delay_sequence)
{
  if(frame_sequence.length != frame_delay_sequence.length){
    throw 'Both sequences have to be of the same length! (animation_constructor)';
  }

  this.sequence = [];
  for(let i=0;i<frame_sequence.length;i++)
    this.sequence.push({
      sprite_id: frame_sequence[i],
      delay: frame_delay_sequence[i]
    });
}
