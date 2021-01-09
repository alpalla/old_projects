'use strict';


// holds the state related to the current exercise
var ExerciseState = {
  target_notes : new Set(),
  total_correct_notes: null,
  exercise_in_progress : false,
  start_time : null,
  correct_notes_set: new Set(),
  timer_m: null,
  timer_s: null,
  timer_cs: null,
  notes_found: [],
  strumming: false,
  chosen_btn_id: null,
  note_ids: []
}


// initializes all variables related to exercise state
function startExercise(button_id) {
  if (!ExerciseState.exercise_in_progress) {
    ExerciseState.exercise_in_progress = true;

    // scales exercise has been selected
    if (button_id == 'scales-start-btn') {
      // get selected key
      let key = document.getElementById('scales-key-selector').value;
      // call function given its name
      let scale = window[document.getElementById('scale-selector').value](key);
      // make all notes in selected scale 'target notes' which must be found by user
      for (let i = 0; i < scale.length; i++) {
        ExerciseState.target_notes.add(scale[i]);
      }
    }
    // notes exercise has been selected
    else if (button_id == 'notes-start-btn') {
      // set target note user must try to find on fretboard
      ExerciseState.target_notes.add(document.getElementById('notes-selector').value);
      // 6 notes must be found
      ExerciseState.total_correct_notes = 6;
    }
    // chords exercise has been selected
    else if (button_id == 'chord-start-btn') {
      // get selected key
      let key = document.getElementById('chord-key-selector').value;
      // call function given its name
      let scale = window[document.getElementById('chord-selector').value](key);
      // make all notes in selected scale 'target notes' which must be found by user
      for (let i = 0; i < scale.length; i++) {
        ExerciseState.target_notes.add(scale[i]);
      }
    }

    // start measuring time
    ExerciseState.start_time = Date.now();
    // display timers for m, s, and cs
    ExerciseState.timer_m = setInterval(updateMinutes, 60000);
    ExerciseState.timer_s = setInterval(updateSeconds, 1000);
    ExerciseState.timer_cs = setInterval(updateCentiseconds, 10);
    document.getElementById('timer-m').innerHTML = 0;
    document.getElementById('timer-s').innerHTML = 0;
    // show 'stop' button
    document.getElementById(button_id).innerHTML = 'Stop';
    ExerciseState.chosen_btn_id = button_id;
  }
  else if (ExerciseState.chosen_btn_id == button_id) {
    stopTimers();
    resetState();
    ExerciseState.exercise_in_progress = false;
  }
}


function resetState() {
  // cleat all visible notes
  for(let i = 0; i < ExerciseState.notes_found.length; i++) {
    document.getElementById(ExerciseState.notes_found[i]).classList.remove('correct-note');
    document.getElementById(ExerciseState.notes_found[i]).classList.remove('incorrect-note');
  }
  // reset variables
  ExerciseState.target_notes.clear()
  ExerciseState.correct_notes_found = 0;
  ExerciseState.notes_found = [];
  updateChromaticScale('0.5');
  ExerciseState.note_ids = [];
  ExerciseState.correct_notes_set.clear();
  // reset button to say 'start'
  document.getElementById(ExerciseState.chosen_btn_id).innerHTML = 'Start';
  ExerciseState.chosen_btn_id = null;
  // clear timers
  document.getElementById('timer-m').innerHTML = "--";
  document.getElementById('timer-s').innerHTML = "--";
  document.getElementById('timer-cs').innerHTML = "--";
}


// updates DOM tags to show elapsed minutes
function updateMinutes() {
  let elapsed_time = Date.now() - ExerciseState.start_time;
  let minutes = Math.trunc(elapsed_time / 60000);
  document.getElementById('timer-m').innerHTML = minutes;
}


// updates DOM tags to show elapsed seconds
function updateSeconds() {
  let elapsed_time = Date.now() - ExerciseState.start_time;
  let seconds = Math.trunc((elapsed_time / 1000) % 60);
  document.getElementById('timer-s').innerHTML = seconds;
}

// updates DOM tags to show elapsed centiseconds
function updateCentiseconds() {
  let elapsed_time = Date.now() - ExerciseState.start_time;
  let centiseconds = Math.trunc((elapsed_time / 10) % 100);
  document.getElementById('timer-cs').innerHTML = centiseconds;
}

function stopTimers() {
  clearInterval(ExerciseState.timer_m);
  clearInterval(ExerciseState.timer_s);
  clearInterval(ExerciseState.timer_cs);
}