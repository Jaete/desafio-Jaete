import { Animal, Gazelle, Hipopotamus, Lion, Monkey } from "./Animals";
import { Biomes } from "./Biomes";
import { Enclosure } from "./Enclosure";
import { Errors } from "./Errors";
import { EnclosureHandlers } from "./EnclosureHandlers";
import { AnimalNames } from "./AnimalNames";

class RecintosZoo {

    enclosures = [
        new Enclosure(
            1, 
            10, 
            [Biomes.SAVANNA], 
            [new Monkey(),
            new Monkey(),
            new Monkey()]
        ),
        new Enclosure(
            2, 
            5, 
            [Biomes.FOREST], 
            []
        ),
        new Enclosure(
            3, 
            7, 
            [Biomes.SAVANNA, Biomes.RIVER], 
            [new Gazelle()]
        ),
        new Enclosure(
            4, 
            8, 
            [Biomes.RIVER], 
            []
        ),
        new Enclosure(
            5, 
            9, 
            [Biomes.SAVANNA],
            [new Lion()]
        )];

    analisaRecintos(animalName, quantity) {
        let result = {
            erro: "",
            recintosViaveis: [],
        }
        if(!EnclosureHandlers.isValidAnimal(animalName))
        {
            result.erro = Errors.INVALID_ANIMAL;
            result.recintosViaveis = null;
            return result;
        }
        if(!EnclosureHandlers.isValidQuantity(quantity))
        {
            result.erro = Errors.INVALID_QUANTITY;
            result.recintosViaveis = null;
            return result;
        }
        let animal = EnclosureHandlers.getAnimal(animalName);

        let foundEnclosure = false;
        for(let enclosure of this.enclosures)
        {
            if(!EnclosureHandlers.enclosureHasAdequateBiome(enclosure, animal)){
                continue;
            }
            if(animal.diet === Animal.CARNIVORE)
            {
                if(!EnclosureHandlers.enclosureHasSameSpeciesOnly(enclosure, animal)){
                    continue;
                }
                if(!EnclosureHandlers.enclosureHasSpace(enclosure, animal, quantity, false)){
                    continue;
                }
                result.erro = null;
                result.recintosViaveis.push(EnclosureHandlers.allocateAnimal(enclosure, animal.size, quantity, false));
                foundEnclosure = true;
            }
            else if(animal.name != AnimalNames.HIPOPOTAMUS)
            {
                if(!EnclosureHandlers.enclosureHasAdequateBiome(enclosure, animal)){
                    continue;
                }
                if(!EnclosureHandlers.enclosureHasSpace(enclosure, animal, quantity, false)){
                    continue;
                }
                if(EnclosureHandlers.enclosureHasAnyCarnivore(enclosure)){
                    continue;
                };
                if(EnclosureHandlers.enclosureHasAnyHipopotamus(enclosure) && !EnclosureHandlers.enclosureIsSavannaAndRiver()){
                    continue;
                }
                if(animal.name === AnimalNames.MONKEY && quantity === 1 && EnclosureHandlers.enclosureIsEmpty(enclosure)){
                    continue;
                }
                if(!EnclosureHandlers.enclosureHasSameSpeciesOnly(enclosure, animal) && !EnclosureHandlers.enclosureHasSpace(enclosure, animal, quantity, true)){
                    continue;
                }
                if(!EnclosureHandlers.enclosureHasSameSpeciesOnly(enclosure, animal) && EnclosureHandlers.enclosureHasSpace(enclosure, animal, quantity, true)){
                    result.recintosViaveis.push(EnclosureHandlers.allocateAnimal(enclosure, animal.size, quantity, true));
                }
                else if(EnclosureHandlers.enclosureHasSameSpeciesOnly(enclosure, animal) && EnclosureHandlers.enclosureHasSpace(enclosure, animal, quantity, false))
                {
                    result.recintosViaveis.push(EnclosureHandlers.allocateAnimal(enclosure, animal.size, quantity, false));
                }
                result.erro = null;
                foundEnclosure = true;
            }
            else{
                if(!EnclosureHandlers.enclosureHasAdequateBiome(enclosure, animal)){
                    continue;
                }
                if(EnclosureHandlers.enclosureHasAnyCarnivore(enclosure)){
                    continue;
                };
                if(!EnclosureHandlers.enclosureHasSameSpeciesOnly(enclosure, animal)){
                    if(!EnclosureHandlers.enclosureIsSavannaAndRiver(enclosure)){
                        continue; 
                    }
                    if(!EnclosureHandlers.enclosureHasSpace(enclosure, animal, quantity, true)){
                        continue;
                    }
                    else
                    {
                        result.recintosViaveis.push(EnclosureHandlers.allocateAnimal(enclosure, animal.size, quantity, true));
                    }
                }
                else
                {
                    if(!EnclosureHandlers.enclosureHasSpace(enclosure, animal, quantity, false)){
                        continue;
                    }
                    else
                    {
                        result.recintosViaveis.push(EnclosureHandlers.allocateAnimal(enclosure, animal.size, quantity, false));
                    }
                }
                result.erro = null;
                foundEnclosure = true;
            }
        }
        if(!foundEnclosure){
            result.erro = Errors.NO_VIABLE_ENCLOSURE;
            result.recintosViaveis = null;
        }
        return result;
    }

}

export { RecintosZoo as RecintosZoo };
