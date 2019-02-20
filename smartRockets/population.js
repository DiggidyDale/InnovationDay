function Population(mutationRate, populationSize, lifetime) {

    this.mutationRate = mutationRate;
    this.population = this.populate(populationSize);
    this.matingPool = [];
    this.generations = 0;
    

    this.populate = function(size, lifetime){
        for(let i = 0; i < size; i++){
            let initialPosition = createVector(width/2, height - 5);
            let dna = new Dna();
            dna.createNew(lifetime);
            let rocket = new Rocket(initialPosition, dna);
            this.population.push()
        }
    }

    this.live = function(){
        // this function  should tell your population to run/update
    }

    this.fitness = function(){
        //lets clear the mating pool;
        this.matingPool = [];

        let maxFitness = this.getMaxFitness();
        // Here you should calculate fitness for each member of the population (scaled to value between 0 and 1)
        // Based on fitness, each member will get added to the mating pool a certain number of times
        // A higher fitness = more entries to mating pool = more likely to be picked as a parent
        // A lower fitness = fewer entries to mating pool = less likely to be picked as a parent
    }

    this.getMaxFitness = function(){
        let record = 0;
        for(let i = 0; i < this.population.length; i++){
            if(this.population[i].getFitness() > record){
                record = population[i].getFitness();
            }
        }
        return record;
    }
}