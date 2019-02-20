// The DNA should contain an array of vectors
// these vectors are the force of a single frame
// think of it like a snapshot of what each thruster
// is doing.

function Rocket(initialPosition, dna) {

    this.position = initialPosition;
    this.dna = dna;
    this.fitness;
    this.hitTarget = false;

    // limit for speed
    this.maxSpeed = 5;

    this.acceleration = createVector(0,0);
    this.velocity = createVector(0,0);
    
    // size of the rocket
    this.radius = 5;
    
    this.fitness = function(targetPosition){
        let dist = this.position.dist(targetPosition);
        this.fitness = Math.pow(1/dist, 2);
    }

    this.display = function(){
        let angle = this.velocity.heading()+PI/2;

        push();
        translate(this.position.x, this.position.y);
        rotate(angle);
        let col = 155;
        fill(col);
        stroke(col);
        beginShape();
        vertex(0, -this.radius*2);
        vertex(-this.radius, this.radius*2);
        vertex(this.radius, this.radius*2);
        endShape(CLOSE);
        pop();
    }

    this.applyForce = function(force) {
        this.acceleration.add(force);
    }

    this.getFitness = function(){
        return this.fitness;
    }

    this.getDna = function() {
        return this.dna;
    }

    this.update = function(){
        // here we should be applying physics
        // so we will increase velocity, update our position and reset acceleration
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed)
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    this.checkTarget = function(targetPosition){
        let dist = this.position.dist(targetPosition);
        if(dist < 10){
            this.hitTarget = true;
        }
    }

    this.run = function(targetPosition){
        this.checkTarget(targetPosition);
        if(!hitTarget){
            for(let i = 0; i < this.dna.genes.length(); i ++){
                this.applyForce(dna.genes[i]);
                this.update();
            }
        }
        this.display();
    }


}