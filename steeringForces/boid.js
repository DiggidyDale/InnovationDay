function Boid(x, y, mutationRate, attraction) {
	this.mutationRate = mutationRate;
	//the boid needs a position, velocity and acceleration
	this.pos = createVector(x, y);
	this.vel = createVector(0, -1);
	this.acc = createVector(0, 0);

	// the size of the boid
	this.r = 4;
	this.health = 1;

	// limits for speed and acc
	this.maxForce = 0.5;
	this.maxSpeed = 5;
	//attraction to food/poison
	this.attraction = [];

	if(attraction === undefined){
		//food attraction
		this.attraction[0] = random(-2,2);
		//poison attraction
		this.attraction[1] = random(-2,2);
	}else{
    	this.attraction[0] = attraction[0];
    	if (random(1) < this.mutationRate) {
      		this.attraction[0] += random(-0.1, 0.1);
    	}
    	this.attraction[1] = attraction[1];
    	if (random(1) < this.mutationRate) {
      		this.attraction[1] += random(-0.1, 0.1);
  		}
  	}


//display function
this.display = function(){
	// create boid as a triagle facing the direction of moevement
	let angle = this.vel.heading()+PI/2;
	push();
	translate(this.pos.x, this.pos.y);
	rotate(angle);
    let gr = color(0, 255, 0);
    let rd = color(255, 0, 0);
    let col = lerpColor(rd, gr, this.health);
    fill(col)
	stroke(col);
	strokeWeight(1);
	beginShape();
	vertex(0, -this.r * 2);
	vertex(-this.r, this.r * 2);
	vertex(this.r, this.r * 2);
	endShape(CLOSE);
	pop();
}
this.update = function(){
	this.health -= 0.005;
	//increase vel by acc
	this.vel.add(this.acc);
	// limit vel
	this.vel.limit(this.maxSpeed);
	//move the boid
	this.pos.add(this.vel);
	// reset acc
	this.acc.mult(0);
	this.boundries();
}

this.applyForce = function(force){
	this.acc.add(force);
}

this.boundries = function(){
	if(this.pos.x < 0 || this.pos.x > width){
		this.pos.x = width/2;
		this.pos.y = height/2;

	}
	if(this.pos.y < 0 || this.pos.y > height){
		this.pos.y = height/2;
		this.pos.x = width/2;

	}
}
this.behavoir = function(food, poison){
	let steerG = this.desire(food, 0.1);
	let steerB = this.desire(poison, -0.02);
	steerG.mult(this.attraction[0]);
	steerB.mult(this.attraction[1]);
	this.applyForce(steerG);
	this.applyForce(steerB);
}

this.desire = function(list, nutrition){
	let record = Infinity;
	let closest = null;
	for(let i = list.length - 1; i >= 0; i--){
		let d = this.pos.dist(list[i]);
		if(d < this.maxSpeed){
			list.splice(i, 1);
			this.health += nutrition;
		} else{
			if(d < record){
				record = d;
				closest = list[i];
			}
		}
	}


	if(closest != null){
		return this.seek(closest);
	}
	return createVector(0,0);
}
this.seek = function(target){
	let desired = p5.Vector.sub(target, this.pos);
	desired.setMag(this.maxSpeed);
	let steer = p5.Vector.sub(desired, this.vel);
	steer.limit(this.maxForce);
	return steer;
}
this.dead = function(){
	return(this.health < 0);
}
this.clone = function(birth, mutation) {
    if (random(1) < birth) {
      return new Boid(this.pos.x, this.pos.y, mutation, this.attraction);
    } else {
      return null;
    }
  }
}