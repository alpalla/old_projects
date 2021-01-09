'use strict';

// every note maps to the next note 1/2 step above
var adjacent_notes = {
  'A': 'A#/Bb',
  'A#/Bb': 'B',
  'B': 'C',
  'C': 'C#/Db',
  'C#/Db': 'D',
  'D': 'D#/Eb',
  'D#/Eb': 'E',
  'E': 'F',
  'F': 'F#/Gb',
  'F#/Gb': 'G',
  'G': 'G#/Ab',
  'G#/Ab': 'A'
}


function GenerateTuning(note) {
  let notes = [];
  notes.push(note);
  var next_note = adjacent_notes[note]
  for(let i = 0; i < 11; i++) {
    notes.push(next_note);
    var next_note = adjacent_notes[next_note];
  }
  return notes;
}

function toggleNote(clicked) {
  if (ExerciseState.exercise_in_progress) {
    // remember that this note was clicked on
    ExerciseState.notes_found.push(this.id);
    if (ExerciseState.target_notes.has(this.innerHTML)) {
      
      if (!ExerciseState.correct_notes_set.has(this.id)) {
        // add id of found note to set of found correct notes
        ExerciseState.correct_notes_set.add(this.id)
        // reaveal correct note
        this.classList.add('correct-note');
      }
      if (ExerciseState.correct_notes_set.size == ExerciseState.total_correct_notes) {
        // stop exercise
        ExerciseState.exercise_in_progress = false;        
        // stop timers
        stopTimers();
        if (document.getElementById('timer-m').innerHTML != "0" ) {
          setTimeout(() => {
            alert('You completed this exercise in ' 
            + document.getElementById('timer-m').innerHTML + 'm '
            + document.getElementById('timer-s').innerHTML + '.'
            + document.getElementById('timer-cs').innerHTML + 's'
          )}, 750);
        }
        else {
          setTimeout(() => {
            alert('You completed this exercise in ' 
            + document.getElementById('timer-s').innerHTML + '.'
            + document.getElementById('timer-cs').innerHTML + 's'
          )}, 750);
        }
        // reset state
        setTimeout(resetState, 1000);
      }
    }
    else {
      // reveal incorrect note
      this.classList.add('incorrect-note');
    }
  }
}

// Generates the divs representing the guitar strings
(function GenerateNotes(props) {
  // holds string for note for every note on fretboard
  var tuning = [];
  tuning = tuning.concat(    
    GenerateTuning('E'),
    GenerateTuning('B'),
    GenerateTuning('G'),
    GenerateTuning('D'),
    GenerateTuning('A'),
    GenerateTuning('E')
  );

  var nid = 0;
  for (let i = 0; i < 6; i++) {
    // make div that will contain all notes for a string
    let string_notes = document.createElement("div");
    string_notes.id = "string-notes-" + i;
    string_notes.classList.add("notes");
    for(let j = 0; j < 12; j++) {
      // generate individual note for every string
      let note = document.createElement("div");
      note.innerHTML = tuning[nid];
      note.id = nid;
      note.va
      note.classList.add("guitar-note");

      // listener that reveals note when clicked on
      note.addEventListener("click", toggleNote);
      // listener that plays note when clicke on
      let note_id = nid;
      note.addEventListener("click", () => {playNote(false, note_id)});

      // append note to its respective string
      string_notes.appendChild(note);

      nid++;
    }
    // append string of notes to container
    document.getElementById("notes").appendChild(string_notes);
  }
})();


// The following two functions are used to make a list
// which can be indexed to find the frequency of any
// note on the fretboard.

// returns frequency of all notes on a string 
// given the open tuning of the string
function getFrequencies(tuning) {
  let frequencies = [];
  frequencies.push(tuning);
  for(let i = 0; i < 11; i++) {
    // a half-step has a frequency ratio of 2^(1/12)
    tuning *= 1.0595;
    frequencies.push(tuning);
  }
  return frequencies;
}

var frequencies = [];
(function generateNoteFrequencies() {
    // holds number for frequency of every note on fretboard
    frequencies = frequencies.concat(
      getFrequencies(noteValues['E4']),
      getFrequencies(noteValues['B3']),
      getFrequencies(noteValues['G3']),
      getFrequencies(noteValues['D3']),
      getFrequencies(noteValues['A2']),
      getFrequencies(noteValues['E2']),
    );
})();

// strum open
(function strumOpenNotes() {
  setTimeout(() => (playNote(true, 60)), 0);
  setTimeout(() => (playNote(true, 48)), 200);
  setTimeout(() => (playNote(true, 36)), 400);
  setTimeout(() => (playNote(true, 24)), 600);
  setTimeout(() => (playNote(true, 12)), 800);
  setTimeout(() => (playNote(true, 0)), 1000);
})();