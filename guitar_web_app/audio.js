var context = new AudioContext();
var analyser = context.createAnalyser();
// fftSize is unsigned long value representing the size of the 
// FFT to be used to determine the frequency domain
analyser.fftSize = 512;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

var canvas = document.getElementById('visualizer');
var canvasCtx = canvas.getContext("2d");
var WIDTH = canvas.width;
var HEIGHT = canvas.height;

function playNote(override, note_id) {
  if (ExerciseState.exercise_in_progress || override) {
    // make oscillator
    let osc = context.createOscillator();
    osc.type = "square";
    let frequency = frequencies[note_id];
    osc.frequency.value = frequency
    // connect it to analyzer
    osc.connect(analyser);
    osc.connect(context.destination);
    // play sound
    osc.start(0);
    setInterval(() => {osc.stop()}, 500);
  }
}

(function draw() {
  drawVisual = requestAnimationFrame(draw);

  // Copies current frequency data into 'dataArray'.
  analyser.getByteFrequencyData(dataArray);

  canvasCtx.fillStyle = '#FFDEAD';
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

  var barWidth = (WIDTH / bufferLength) * 2.5;
  var barHeight;
  var x = 0;
  
  for(let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];

    canvasCtx.fillStyle = 'rgba(' + (barHeight+100) + ',50,50, 0.75)';
    canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight);

    x += barWidth + 1;
  }
})();