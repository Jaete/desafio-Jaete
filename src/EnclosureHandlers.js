import { Animal, Crocodile, Gazelle, Hipopotamus, Leopard, Lion, Monkey } from "./Animals";
import { AnimalNames } from "./AnimalNames";
import { Biomes } from "./Biomes";

export class EnclosureHandlers {

    static isValidAnimal(animal){
        if(!Animal.VALID_ANIMALS.includes(animal)){
            return false
        }
        return true
    }

    static isValidQuantity(quantity){
        if(quantity <= 0){
            return false;
        }
        return true;
    }

    static getAnimal(animal) {
        switch(animal){
            case AnimalNames.GAZELLE:
                return new Gazelle();
            case AnimalNames.LION:
                return new Lion();
            case AnimalNames.MONKEY:
                return new Monkey();
            case AnimalNames.CROCODILE:
                return new Crocodile();
            case AnimalNames.HIPOPOTAMUS:
                return new Hipopotamus();
            case AnimalNames.LEOPARD:
                return new Leopard();
        }
    }

    static enclosureHasAdequateBiome(enclosure, animal){
        return enclosure.biome.some(biome => {return animal.biome.includes(biome);}) ? true : false;
    }

    static enclosureHasSpace(enclosure, animal, quantity, multipleSpecies){
        let occupiedSpace = this.getOccupiedSpace(enclosure, multipleSpecies)
        let hasSpace = false;
        if((occupiedSpace + (animal.size * quantity)) <= enclosure.capacity){
            hasSpace = true;
        }
        return hasSpace;
    }

    static enclosureHasSameSpeciesOnly(enclosure, animal){
        return enclosure.startingAnimals.every(startAnimal => startAnimal instanceof animal.constructor) ? true : false;
    }

    static enclosureIsEmpty(enclosure){
        return enclosure.startingAnimals.length === 0 ? true : false;
    }

    static enclosureHasAnyCarnivore(enclosure){
        return enclosure.startingAnimals.some(animal => {return animal.diet === Animal.CARNIVORE});
    }

    static enclosureHasAnyHipopotamus(enclosure){
        return enclosure.startingAnimals.some(animal => {return animal.name === AnimalNames.HIPOPOTAMUS});
    }

    static enclosureIsSavannaAndRiver(enclosure){
        const targetBiomes = [Biomes.SAVANNA, Biomes.RIVER];
        return enclosure.biome.length === targetBiomes.length &&
           targetBiomes.every(biome => enclosure.biome.includes(biome));;
    }

    static getOccupiedSpace(enclosure, multipleSpecies){
        let occupiedSpace = 0;
        if(multipleSpecies){
            occupiedSpace++;
        }
        enclosure.startingAnimals.forEach(startingAnimal => {
            occupiedSpace += startingAnimal.size;
        });
        return occupiedSpace;
    }

    static allocateAnimal(enclosure, animalSize, quantity, multipleSpecies){
        let occupiedSpace = this.getOccupiedSpace(enclosure, multipleSpecies);
        return `Recinto ${enclosure.number} (espaço livre: ${enclosure.capacity - occupiedSpace - (animalSize * quantity)} total: ${enclosure.capacity})`
    }

}