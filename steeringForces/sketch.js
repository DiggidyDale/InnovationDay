let boids= [];
let food = [];
let poison = [];
let birthRate;
let birthInput;
let q;
let poisonInput;
let foodInput;
let poisonRate;
let foodRate;
let mutationInput;

function setup() {
    createCanvas(600, 400);
    //create food
    this.createDot(100, food, 1);
    //create poison
    this.createDot(100, poison, -1);
    
    createP("Birth Rate (Default: 0.002):")
    birthInput =  createInput(0.002);
    createP("Poison Spawn Rate (Default: 0.01):")
    poisonInput = createInput(0.01);
    createP("Food Spawn Rate (Default: 0.05):")
    foodInput = createInput(0.05);
    createP("Mutation Rate (Default: 0.01):")
    mutationInput = createInput(0.01);
    createP("Boid : Health : Food : Poison");
    q = createP("");

    for(let i = 0; i < 10; i++){
    let boid = new Boid(width/2, height/2, mutationInput);
    boids.push(boid);
    }
}

function draw(){
    poisonRate = 0.01;
    foodRate = 0.05;
    if(poisonInput.value() != ''){
        poisonRate = poisonInput.value();
    }
    if(foodInput.value() != ''){
        foodRate = foodInput.value();
    }

    birthRate = 0.002;
    if(birthInput.value() != ''){
        birthRate = birthInput.value();
    }

    background(51);
    for(let i = boids.length - 1; i >= 0; i--){
        boids[i].behavoir(food, poison);
        boids[i].update();
        boids[i].display();
        let newBoid = boids[i].clone(birthRate, mutationInput);
        if(newBoid != null){
            boids.push(newBoid);
        }
        this.boidDies(i);
    }
    this.showBest();
    this.showDot(food, 1);
    this.showDot(poison, -1);
    let rand = random(1);
    if(rand < foodRate){
        this.createDot(5, food, 1);
    }
    if(rand < poisonRate){
        this.createDot(2, poison, -1);
    }

}

this.createDot = function(amount, list, alignment){
    for(let i = 0; i < amount; i++){
        let x = random(width);
        let y = random(height);
        list.push(createVector(x,y));
    }
}

this.showDot = function(list, alignment){
    let col = color(0,0,0);
    if(alignment == 1){
        //food is green
        col = color(0,255,0);
    }else if(alignment == -1){
        //poison is red
        col = color(255,0,0);
    }
    for(let i = 0; i< list.length; i++){
    noStroke();
    fill(col);
    ellipse(list[i].x, list[i].y, 5,5)
    }
}
this.boidDies = function(i){
    let boid = boids[i];
    if(boids[i].dead()){
        let x = boid.pos.x;
        let y = boid.pos.y;
        food.push(createVector(x, y));
        boids.splice(i,1);
    }
}
this.showBest = function(){
    let bestHealth = 0
    let best;
    for(let i = 0; i < boids.length; i++){
        if(boids[i].health > bestHealth){
            best = i;
        }
    }
    if(best != undefined){
        q.html(best + " : " + round(boids[best].health*100)/100 + " : " + round(boids[best].attraction[0] * 100)/100 + " : " + round(boids[best].attraction[1] * 100) / 100);
    }
}