import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../../src/domain/services/product.service';
import { ProductController } from '../../../src/adapter/controllers/product.controller';
import { Product } from '../../../src/domain/entities/product.entities';
import { UpdateProductDTO } from 'dtos/product.dto';

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
            find: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    sut = app.get<ProductController>(ProductController);
  });

  it('should list all products', async () => {
    const indexSpy = jest.spyOn(sut, 'list');
    const response = await sut.list();
    expect(indexSpy).toBeCalled();
    expect(response).toMatchSnapshot();
  });

  it('should update product', async () => {
    const updateSpy = jest.spyOn(sut, 'update');
    const productData: UpdateProductDTO = {
      name: 'any_name_edit',
      description: 'any_description_edit',
      price: 12,
    };
    const response = await sut.update('any_id', productData);
    expect(updateSpy).toBeCalled();
    expect(response).toMatchSnapshot();
  });

  it('should find product', async () => {
    const updateSpy = jest.spyOn(sut, 'find');

    const response = await sut.find('any_id');
    expect(updateSpy).toBeCalled();
    expect(response).toMatchSnapshot();
  });

  it('should remove product success', async () => {
    const updateSpy = jest.spyOn(sut, 'remove');

    const response = await sut.remove('any_id');
    expect(updateSpy).toBeCalled();
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
