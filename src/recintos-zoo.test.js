import { AnimalNames } from "./AnimalNames.js";
import { Errors } from "./Errors.js";
import { RecintosZoo } from "./recintos-zoo.js";

/* CASOS ONDE CADA INSTÂNCIA DO ZOO É REFEITA ENTRE OS TESTES */ 
describe('Recintos do Zoologico', () => {

    test('Deve rejeitar animal inválido', () => {
        const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1);
        expect(resultado.erro).toBe(Errors.INVALID_ANIMAL);
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve rejeitar quantidade inválida', () => {
        const resultado = new RecintosZoo().analisaRecintos(AnimalNames.MONKEY, 0);
        expect(resultado.erro).toBe(Errors.INVALID_QUANTITY);
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recintos para 10 macacos', () => {
        const resultado = new RecintosZoo().analisaRecintos(AnimalNames.MONKEY, 10);
        expect(resultado.erro).toBe(Errors.NO_VIABLE_ENCLOSURE);
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve encontrar recintos para 2 macacos', () => {
        const resultado = new RecintosZoo().analisaRecintos(AnimalNames.MONKEY, 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)');
        expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 2 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(3);
    });

    test('Deve encontrar recinto para 1 macaco', () => {
        const resultado = new RecintosZoo().analisaRecintos(AnimalNames.MONKEY, 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 6 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 3 (espaço livre: 3 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(2);
    });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = new RecintosZoo().analisaRecintos(AnimalNames.CROCODILE, 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Deve encontrar recinto para 2 crocodilos', () => {
        const resultado = new RecintosZoo().analisaRecintos(AnimalNames.CROCODILE, 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 2 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });
    
    test('Não deve encontrar recinto para 3 crocodilos', () => {
        const resultado = new RecintosZoo().analisaRecintos(AnimalNames.CROCODILE, 3);
        expect(resultado.erro).toBe(Errors.NO_VIABLE_ENCLOSURE);
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve encontrar recinto para 1 hipopótamo', () => {
        const resultado = new RecintosZoo().analisaRecintos(AnimalNames.HIPOPOTAMUS, 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 3 (espaço livre: 0 total: 7)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 4 (espaço livre: 4 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(2);
    });

    test('Deve encontrar recinto para 2 hipopótamos', () => {
        const resultado = new RecintosZoo().analisaRecintos(AnimalNames.HIPOPOTAMUS, 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 0 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Não deve encontrar recinto para 3 hipopótamos', () => {
        const resultado = new RecintosZoo().analisaRecintos(AnimalNames.HIPOPOTAMUS, 3);
        expect(resultado.erro).toBe(Errors.NO_VIABLE_ENCLOSURE);
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve encontrar recinto para 2 leões', () => {
        const resultado = new RecintosZoo().analisaRecintos(AnimalNames.LION, 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 5 (espaço livre: 0 total: 9)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Não deve encontrar recinto para 3 leões', () => {
        const resultado = new RecintosZoo().analisaRecintos(AnimalNames.LION, 3);
        expect(resultado.erro).toBe(Errors.NO_VIABLE_ENCLOSURE);
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve encontrar recinto para 2 gazelas', () => {
        const resultado = new RecintosZoo().analisaRecintos(AnimalNames.GAZELLE, 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 2 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 3 (espaço livre: 1 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(2);
    });

    test('Deve encontrar recinto para 3 gazelas', () => {
        const resultado = new RecintosZoo().analisaRecintos(AnimalNames.GAZELLE, 3);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 0 total: 10)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Não deve encontrar recinto para 4 gazelas', () => {
        const resultado = new RecintosZoo().analisaRecintos(AnimalNames.GAZELLE, 4);
        expect(resultado.erro).toBe(Errors.NO_VIABLE_ENCLOSURE);
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recinto para leopardos', () => {
        const resultado = new RecintosZoo().analisaRecintos(AnimalNames.LEOPARD, 1);
        expect(resultado.erro).toBe(Errors.NO_VIABLE_ENCLOSURE);
        expect(resultado.recintosViaveis).toBeFalsy();
    });
});

