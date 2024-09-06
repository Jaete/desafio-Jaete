export class Animal {

    static CARNIVORE = 'CARNIVORO';
    static HERBIVORE = 'HERBIVORE';

    constructor( dieta, bioma, tamanho ){
        this.dieta = dieta;
        this.bioma = bioma;
        this.tamanho = tamanho;
    }

}