import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { TaxController } from './tax.controller';
import { Tax } from './tax.model';
import { TaxService } from './tax.service';

describe('TaxController', () => {
    let taxController: TaxController;
    let spyService: TaxService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [TaxController],
            providers: [
                TaxService,
                {
                    provide: getRepositoryToken(Tax),
                    useValue: {},
                },
            ],
        }).compile();

        spyService = module.get<TaxService>(TaxService);
        taxController = module.get<TaxController>(TaxController);
    });

    describe('findAll', () => {
        it('should return an array of taxes', async () => {

            const result: Tax[] = [{
                id: 1,
                percentage: 20,
                type: 'test',
            }];

            jest.spyOn(spyService, 'findAll').mockImplementation(() => Promise.resolve(result));

            expect(await taxController.getTaxs()).toBe(result);
        });
    });

    describe('findOne', () => {
        it('should return a single tax', async () => {
            const result: Tax = {
                id: 1,
                percentage: 20,
                type: 'test',
            };

            jest.spyOn(spyService, 'findOne').mockImplementation(() => Promise.resolve(result));

            expect(await taxController.findTax(1)).toBe(result);
        });
    });

});
