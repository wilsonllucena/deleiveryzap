import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProductDTO } from 'dtos/product.dto';
import { Product } from '../../../src/domain/entities/product.entities';
import { ProductService } from '../../../src/domain/services/product.service';

const productStub = {
  id: 'any_id',
  name: 'any_name',
  description: 'any_description',
  price: 12.0,
} as Product;

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
            all: () => jest.fn(),
            create: () => jest.fn(),
            find: () => jest.fn(),
            update: () => jest.fn(),
            remove: () => jest.fn(),
          },
        },
      ],
    }).compile();

    sut = app.get<ProductService>(ProductService);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
  describe('list', () => {
    it('should return list products', async () => {
      const listSpy = jest.spyOn(sut, 'list');
      await sut.list();
      expect(listSpy).toBeCalled();
    });
  });

  describe('find', () => {
    it('should return product', async () => {
      const findSpy = jest.spyOn(sut, 'find');
      await sut.find('any_id');
      expect(findSpy).toBeCalledTimes(1);
      expect(findSpy).toBeCalled();
    });
  });

  describe('create', () => {
    it('should return product created', async () => {
      const createSpy = jest.spyOn(sut, 'create');

      const res = await sut.create(productStub);
      expect(createSpy).toBeCalled();
      expect(res).toMatchSnapshot();
      createSpy.mockClear();
    });
  });
  describe('update', () => {
    it('should return success when product update', async () => {
      const updateSpy = jest.spyOn(sut, 'update');
      const productData: UpdateProductDTO = {
        name: 'any_name_edit',
        description: 'any_description_edit',
        price: 12,
      };
      const res = await sut.update('any_id', productData);
      expect(updateSpy).toBeCalledTimes(1);

      expect(updateSpy).toBeCalled();
      expect(res).toMatchSnapshot();

      updateSpy.mockRestore();
    });

    it('should return throw error Product not found', () => {
      jest.spyOn(sut, 'update').mockRejectedValue('Product not found');

      expect(sut.update('any_id', productStub)).rejects.toEqual(
        'Product not found',
      );
    });
  });

  describe('delete', () => {
    it('should return success empty', async () => {
      const deleteSpy = jest.spyOn(sut, 'remove');

      await sut.remove('any_id');

      expect(deleteSpy).toBeCalledTimes(1);
      expect(deleteSpy).toBeCalled();
    });

    it('should return throw error Product not found', () => {
      jest.spyOn(sut, 'remove').mockRejectedValue('Product not found');

      expect(sut.remove('any_id')).rejects.toEqual('Product not found');
    });
  });
});
