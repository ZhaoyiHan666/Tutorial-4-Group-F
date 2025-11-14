//  Iteration 4 – update on Version 3:

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noLoop(); 
}

function draw() {
  background("#1e2c3a");
  
  // how many circles we want to draw on the screen
  let circleCount = 15;
  randomSeed(20251114); 

  // store placed circles to reduce overlap
  let placed = [];

  for (let i = 0; i < circleCount; i++) {

    // random size for each circle
    let size = random(180, 320);

    // keep circles away from the edges
    let margin = size * 0.7;
    let x, y;
    let ok = false;
    let tries = 0;

    // try a few times to avoid heavy overlap
    while (!ok && tries < 200) {
      x = random(margin, width - margin);
      y = random(margin, height - margin);
      ok = true;

      for (let c of placed) {
        let d = dist(x, y, c.x, c.y);
        let minDist = (size * 0.5 + c.size * 0.5) * 0.9;
        if (d < minDist) {
          ok = false;
          break;
        }
      }

      tries++;
    }

    // only draw if we found a reasonable position
    if (ok) {
      placed.push({ x, y, size });
      drawCircle(x, y, size);
    }
  }
}

// draw one circle with many patterns
function drawCircle(x, y, size) {
  push();
  translate(x, y);

  // Background glow – use soft light instead of dark circle
  noStroke();
  fill(255, 255, 255, 35); 
  ellipse(0, 0, size * 1.18);

  // main circle
  fill(randomMainColor()); 
  ellipse(0, 0, size);

  // scattered small colourful dots inside the big circle
  let scatterDots = 30; 
  for (let i = 0; i < scatterDots; i++) {
    let r = random(size * 0.05, size * 0.40); // stay inside the main disc
    let a = random(360);
    let px = cos(a) * r;
    let py = sin(a) * r;
    noStroke();
    fill(randomScatterDotColor());
    ellipse(px, py, size * 0.035);
  }

  // ring lines around the circle
  stroke(randomRingColor()); 
  strokeWeight(2);
  noFill();
  for (let r = size * 0.55; r < size * 0.92; r += size * 0.07) {
    ellipse(0, 0, r);
  }

  // inside dots – colourful 
  stroke(255);
  strokeWeight(1.4);
  let insideDots = 16;

  for (let i = 0; i < insideDots; i++) {
    let angle = i * (360 / insideDots);
    let px = cos(angle) * (size * 0.38);
    let py = sin(angle) * (size * 0.38);
    fill(randomInnerDotColor());
    ellipse(px, py, size * 0.09);
  }

  // outside dots – keep halo, with some warm colour variation
  noStroke();
  let outsideDots = 32;

  for (let i = 0; i < outsideDots; i++) {
    let angle = i * (360 / outsideDots);
    let px = cos(angle) * (size * 0.58);
    let py = sin(angle) * (size * 0.58);
    fill(randomOuterDotColor());
    ellipse(px, py, size * 0.045);
  }

  // 8 lines like wheel spokes
  stroke("#FFFFFF");
  strokeWeight(2);
  for (let i = 0; i < 8; i++) {
    let angle = i * 45;
    let px = cos(angle) * (size * 0.43);
    let py = sin(angle) * (size * 0.43);
    line(0, 0, px, py);
  }

  // center dots – no dark circle, lighter ring + colourful centre
  fill("#FAFAFA");
  stroke("#FFFFFF");
  strokeWeight(2);
  ellipse(0, 0, size * 0.15);

  noStroke();
  fill(randomCenterDotColor());
  ellipse(0, 0, size * 0.07);

  pop();
}

// random color for the main big circle
function randomMainColor() {
  let colors = ["#8BC34A", "#81D4FA", "#F48FB1", "#CE93D8", "#FFCC80", "#AED581"];
  return random(colors);
}

// random color for ring lines
function randomRingColor() {
  let colors = ["#FFB300", "#FF7043", "#FDD835", "#FF8F00"];
  return random(colors);
}

// medium-rich colour set for inner dots 
function randomInnerDotColor() {
  let colors = [
    "#FFE082", "#FFAB91", "#FF80AB",
    "#80DEEA", "#C5E1A5", "#B39DDB",
    "#FFF59D", "#90CAF9"
  ];
  return random(colors);
}

// medium-rich warm colours for outer halo
function randomOuterDotColor() {
  let colors = [
    "#FF8A80", "#FFB74D", "#FFD54F",
    "#FF80AB", "#FFAB91", "#F48FB1"
  ];
  return random(colors);
}

// centre dot colours
function randomCenterDotColor() {
  let colors = [
    "#FFD740", "#FF6F00", "#F06292",
    "#4FC3F7", "#81C784", "#BA68C8"
  ];
  return random(colors);
}

// colours for scattered internal dots
function randomScatterDotColor() {
  let colors = [
    "#FFFFFF",
    "#FFEB3B",
    "#FF7043",
    "#EC407A",
    "#29B6F6",
    "#66BB6A",
    "#F48FB1",
    "#C5E1A5"
  ];
  return random(colors);
}