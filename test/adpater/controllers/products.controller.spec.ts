import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../../src/domain/services/product.service';
import { ProductController } from '../../../src/adapter/controllers/product.controller';

describe('ProductConroller', () => {
  let app: TestingModule;
  let sut: ProductController;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            list: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    sut = app.get<ProductController>(ProductController);
  });

  it('should list all products', async () => {
    const indexSpy = jest.spyOn(sut, 'index');
    const response = await sut.index();
    expect(indexSpy).toBeCalled();
    expect(response).toMatchSnapshot();
  });

  it('should created product and return product', async () => {
    const product = {
      name: 'Product',
      description: 'description product',
      price: 12,
    };
    const createSpy = jest.spyOn(sut, 'create');
    await sut.create(product);
    expect(createSpy).toBeCalled();
  });
});
