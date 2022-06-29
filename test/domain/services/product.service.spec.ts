import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../../src/domain/services/product.service';

describe('ProductService', () => {
  let sut: ProductService;

  beforeAll(async () => {
    let app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        ProductService,
        {
          provide: 'PRODUCT_REPOSITORY',
          useValue: {
            all:  jest.fn,
            create: jest.fn
          },
        },
      ],
    }).compile();

    sut = app.get<ProductService>(ProductService);
  });
  it('list products success', async () => {
    const listSpy = jest.spyOn(sut, 'list');
    await sut.list();
    expect(listSpy).toBeCalled();
  });

});
