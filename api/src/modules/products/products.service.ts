import { SortOrder } from '@enums/sort-order.enum';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, ProductType, ProductVariant } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { paginate } from '@utils/paginate.util';
import { PaginatedResponse } from 'src/common/response/paginated-response.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductResponseDto } from './dto/create-product.response.dto';
import { FindProductsDto } from './dto/find-products.dto';
import { ProductListDto } from './dto/product-list.dto';
import { ProductResponseDto } from './dto/product-response.dto';
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

  async create(dto: CreateProductDto): Promise<CreateProductResponseDto> {
    const { variants, images, ...otherFields } = dto;

    for (const v of variants) {
      if (dto.type === ProductType.CLOTHING && v.shoeSize !== undefined)
        throw new BadRequestException('Clothing products cannot have shoe size in variants');

      if (dto.type === ProductType.SHOES && v.shirtSize !== undefined)
        throw new BadRequestException('Shoe products cannot have shirt size in variants');
    }

    return this.prisma.product.create({
      data: {
        ...otherFields,
        variants: {
          create: variants.map((v) => ({
            shirtSize: v.shirtSize ?? undefined,
            shoeSize: v.shoeSize ?? undefined,
            stock: v.stock,
          })),
        },
        images: {
          create: images.map((img) => ({
            url: img.url,
            color: img.color ?? undefined,
          })),
        },
      },
      include: {
        variants: true,
        images: true,
      },
    });
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
      isFavorite: favoriteIds.has(p.id),
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
      type: product.type,
      images: product.images.map((img) => mapToImageDto(img)),
      isFavorite,
      variants,
    };
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
