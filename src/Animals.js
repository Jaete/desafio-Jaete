import { AnimalNames } from "./AnimalNames";
import { Biomes } from "./Biomes";

export class Animal {

    static VALID_ANIMALS = [
        AnimalNames.CROCODILE,
        AnimalNames.GAZELLE,
        AnimalNames.HIPOPOTAMUS,
        AnimalNames.LEOPARD,
        AnimalNames.LION,
        AnimalNames.MONKEY
    ];
    static CARNIVORE = 'CARNIVORO';
    static HERBIVORE = 'HERBIVORO';

    constructor(name, diet, biome, size ){
        this.name = name;
        this.diet = diet;
        this.biome = biome;
        this.size = size;
    }

}

export class Monkey extends Animal {
    constructor(){
        super(AnimalNames.MONKEY, Animal.HERBIVORE, [Biomes.SAVANNA, Biomes.FOREST], 1);
    }
}

export class Gazelle extends Animal {
    constructor(){
        super(AnimalNames.GAZELLE, Animal.HERBIVORE, [Biomes.SAVANNA], 2);
    }
}

export class Lion extends Animal {
    constructor(){
        super(AnimalNames.LION, Animal.CARNIVORE, [Biomes.SAVANNA], 3);
    }
}

export class Hipopotamus extends Animal {
    constructor(){
        super(AnimalNames.HIPOPOTAMUS, Animal.HERBIVORE, [Biomes.SAVANNA, Biomes.RIVER], 4);
    }
}

export class Crocodile extends Animal {
    constructor(){
        super(AnimalNames.CROCODILE, Animal.CARNIVORE, [Biomes.RIVER], 3);
    }
}

export class Leopard extends Animal {
    constructor(){
        super(AnimalNames.LEOPARD, Animal.CARNIVORE, [Biomes.SAVANNA], 2);
    }
}