var CHROMATIC_SCALE = ['A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab'];

// returns a scale given the key, the number of unique notes in the scale
// and the distance between each successive note starting from the root
function getScale(key, jumps) {
  // put root in scale, which contains notes user must try and find
  let scale = [key];
  let j = CHROMATIC_SCALE.indexOf(key);
  // contains ids of notes we want to make less opaque
  ExerciseState.note_ids.push('n' + (j + 1));
  for (let i = 0; i < jumps.length; i++) {
    // get next note in scale given distance from previous note in scale
    j = (j + jumps[i]) % 12;
    scale.push(CHROMATIC_SCALE[j]);
    ExerciseState.note_ids.push('n' + (j + 1));
  }
  updateChromaticScale('1');
  return scale;
}

function updateChromaticScale(opacity) {
  for (let i = 0; i < ExerciseState.note_ids.length; i++) {
    document.getElementById(ExerciseState.note_ids[i]).style.opacity = opacity;
  }
}

function getMajorScale(key) {
  ExerciseState.total_correct_notes = 42;
  return getScale(key, [2, 2, 1, 2, 2, 2])
}

function getMinorScale(key) {
  ExerciseState.total_correct_notes = 42;
  return getScale(key, [2, 1, 2, 2, 1, 2])
}

function getMajorPentatonicScale(key) {
  ExerciseState.total_correct_notes = 30;
  return getScale(key, [2, 2, 3, 2]);
}

function getMinorPentatonicScale(key) {
  ExerciseState.total_correct_notes = 30;
  return getScale(key, [3, 2, 2, 3]);
}

function getMajorChord(key) {
  ExerciseState.total_correct_notes = 18;
  return getScale(key, [4, 3])
}

function getMinorChord(key) {
  ExerciseState.total_correct_notes = 18;
  return getScale(key, [3, 4])
}
