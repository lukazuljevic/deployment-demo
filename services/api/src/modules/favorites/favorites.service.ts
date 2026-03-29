import { ProductListDto } from '@cart-app/types';
import { mapProductList } from '@helpers/map-to-product-dto.helper';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { ActionResponseDto } from 'src/common/dto/common';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma:PrismaService){}
  
  async create(userId: string,productId: string): Promise<ActionResponseDto> {
    const favorite=await this.prisma.favorite.create({
      data:{
        userId,
        productId
      }
    });

    return {
      id: favorite.id,
      message: "Product added do favorites"
    }
  }

  async findUserFavorites(userId: string): Promise<ProductListDto[]> {
    const favorites=await this.prisma.favorite.findMany({
      where: {userId},
      include: {product: {include: {images: true,variants: true}}}
    });

    return favorites.map(fav =>
      mapProductList(fav.product, true)
    );
  }

  async remove(userId: string,productId: string): Promise<ActionResponseDto> {
    const favorite=await this.prisma.favorite.delete({
      where:{
        userId_productId: {
          userId,
          productId}
      }
    });

    return {
      id: favorite.id,
      message: "Product removed from favorites"
    }    
  }
}
