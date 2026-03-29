import { ProductType } from '@cart-app/types';
import { SortOrder } from '@enums/sort-order.enum';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, ProductVariant } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { paginate } from '@utils/paginate.util';
import { PaginatedResponse } from 'src/common/response/paginated-response.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductsDto } from './dto/find-products.dto';
import { ProductActionResponseDto, ProductListDto, ProductResponseDto } from './dto/response.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import mapToImageDto from './helpers/map-to-image-dto.helper';
import mapToVariantDto from './helpers/map-to-variant-dto.helper';

type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    images: true;
    favorites: true;
    variants: true;
  };
}>;

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductDto): Promise<ProductActionResponseDto> {
    const { variants, images, ...otherFields } = dto;

    for (const v of variants) {
      if (dto.type === ProductType.CLOTHING && v.shoeSize !== undefined)
        throw new BadRequestException('Clothing products cannot have shoe size in variants');

      if (dto.type === ProductType.SHOES && v.shirtSize !== undefined)
        throw new BadRequestException('Shoe products cannot have shirt size in variants');
    }

    const product = await this.prisma.product.create({
      data: {
        ...otherFields,
        variants: {
          create: variants.map((v) => ({
            shirtSize: v.shirtSize,
            shoeSize: v.shoeSize,
            stock: v.stock,
          })),
        },
        images: {
          create: images.map((img) => ({
            url: img.url,
            color: img.color,
          })),
        },
      },
      include: {
        variants: true,
        images: true,
      },
    });

    return { id: product.id, message: 'Product created successfully' };
  }

  async update(productId: string, dto: UpdateProductDto): Promise<ProductActionResponseDto> {
    const { variants, images, ...otherFields } = dto;

    const existingProduct = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) throw new NotFoundException(`Product with id ${productId} not found`);

    const type = existingProduct.type;

    for (const v of variants ?? []) {
      if (type === ProductType.CLOTHING && v.shoeSize !== undefined)
        throw new BadRequestException('Clothing products cannot have shoe size in variants');
      if (type === ProductType.SHOES && v.shirtSize !== undefined)
        throw new BadRequestException('Shoe products cannot have shirt size in variants');
    }

    const updatedProduct = await this.prisma.product.update({
      where: { id: productId },
      data: {
        ...otherFields,
        variants: variants?.length
          ? {
              update: variants.map((v) => ({
                where: { id: v.id, productId },
                data: {
                  shirtSize: v.shirtSize,
                  shoeSize: v.shoeSize,
                  stock: v.stock,
                },
              })),
            }
          : undefined,
        images: images?.length
          ? {
              update: images.map((img) => ({
                where: { id: img.id, productId },
                data: {
                  url: img.url,
                  color: img.color,
                },
              })),
            }
          : undefined,
      },
      include: { variants: true, images: true },
    });

    return { id: updatedProduct.id, message: 'Product created successfully' };
  }
  async findProducts(
    query: FindProductsDto,
    userId: string | null,
  ): Promise<PaginatedResponse<ProductListDto>> {
    const where: any = {};

    if (query.search) where.name = { contains: query.search, mode: 'insensitive' };
    const orderBy = { name: query.sortOrder || SortOrder.ASC };

    if (query.inStock === true) where.variants = { some: { stock: { gt: 0 } } };
    else if (query.inStock === false) where.variants = { none: { stock: { gt: 0 } } };

    if (query.categoryId) where.categoryId = query.categoryId;

    const paginated = await paginate({
      model: this.prisma.product,
      where,
      orderBy,
      page: query.pageNumber,
      limit: query.limit,
      include: { images: true, variants: true, favorites: userId ? { where: { userId } } : false },
    });

    let favoriteIds = new Set<string>();
    if (userId) {
      const favorites = await this.prisma.favorite.findMany({
        where: {
          userId,
          productId: { in: paginated.results.map((p: ProductWithRelations) => p.id) },
        },
        select: { productId: true },
      });

      favoriteIds = new Set(favorites.map((f) => f.productId));
    }

    const resultsWithFavorite = paginated.results.map((p: ProductWithRelations) => ({
      id: p.id,
      name: p.name,
      price: Number(p.price),
      images: p.images.map((img) => mapToImageDto(img)),
      ...(userId ? { isFavorite: favoriteIds.has(p.id) } : {}),
      variants: p.variants.map((v: ProductVariant) => mapToVariantDto(v)),
    }));

    return {
      ...paginated,
      results: resultsWithFavorite,
    };
  }

  async findOne(productId: string, userId: string): Promise<ProductResponseDto> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: { images: true, variants: true },
    });

    if (!product) throw new NotFoundException(`Product with ${productId} not found`);

    let isFavorite = false;
    if (userId) {
      const favorite = await this.prisma.favorite.findUnique({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      });
      isFavorite = !!favorite;
    }

    const variants = product.variants.map((v: ProductVariant) => mapToVariantDto(v));

    return {
      id: product.id,
      name: product.name,
      price: Number(product.price),
      description: product.description,
      brand: product.brand,
      type: product.type as ProductType,
      images: product.images.map((img) => mapToImageDto(img)),
      ...(userId ? { isFavorite } : {}),
      variants,
    };
  }

  async remove(productId: string): Promise<ProductActionResponseDto> {
    const deletedProduct = await this.prisma.product.delete({
      where: { id: productId },
    });

    return {
      id: deletedProduct.id,
      message: 'Product deleted successfully',
    };
  }
}
