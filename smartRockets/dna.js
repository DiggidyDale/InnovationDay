//DNA will be an array of vectors
function DNA(){

    this.genes = [];
    this.maxForce = 0.1;

    this.createNew = function(lifetime){
        for(let i = 0; i < lifetime; i++){
            let angle = random(PI*2);
            let gene = createVector(cos(angle), sin(angle));
            gene.mult(random(0,maxForce))
            genes.push(gene)
        }
    }

    this.clone = function(newGenes) {
        this.genes = newGenes;
        
    }

    this.crossOver = function(otherDna){
        //cross over should take an existing dna and combine half
        // of it with the current dna to product a child

    }

    this.mutate = function(mutationRate){
        //mutate should cycle through the genes and randomly replace
        // a single gene with a new one.
    }
}