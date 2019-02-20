// Smart Rockets w/ Genetic Algorithms

// Each Rocket's DNA is an array of Vectors
// Each Vector acts as a force for each frame of animation
// Imagine an booster on the end of the rocket that can point in any direction
// and fire at any strength every frame

// The Rocket's fitness is a function of how close it gets to the target as well as how fast it gets there

let lifetime;
let population;
let lifeCounter;
let target;

function setup(){
    createCanvas(600,400);
    lifetime = height;
    lifeCounter = 0;
    target = createVector(width/2, 25);
    let infoContainer = createP("");

    let mutationRate = 0.01;
    let populationSize = 20;
    // population = new population(mutationRate, populationSize);
}

function draw(){
    background(51);
    this.drawTarget(target, 10);
}

this.drawTarget = function(targetVector, radius){
    fill(240);
    noStroke();
    ellipse(targetVector.x, targetVector.y, radius*2, radius*2);
}

this.displayInfo = function(generations, lifetime, lifecounter) {
    infoContainer.html(
        "Generation: " + generations + "/n" +
        "Cycles left: " + (lifetime - lifecounter)
    );
}