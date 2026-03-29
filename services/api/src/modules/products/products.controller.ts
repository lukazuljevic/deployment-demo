import { RolesAuth } from '@decorators/auth.decorator';
import { OptionalTokenGuard } from '@guards/optional-token.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { SwaggerPaginatedApiResponse } from 'src/common/response/paginated-response.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductsDto } from './dto/find-products.dto';
import { ProductActionResponseDto, ProductListDto, ProductResponseDto } from './dto/response.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @RolesAuth(Role.ADMIN)
  @Post()
  @ApiCreatedResponse({
    description: 'Returns id if product is successfuly created',
    type: () => ProductActionResponseDto,
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(OptionalTokenGuard)
  @Post('search')
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOkResponse({
    type: SwaggerPaginatedApiResponse(ProductListDto, 'ProductListDto'),
    description: 'Returns a paginated list of products matching the search and filter criteria',
  })
  findAll(@Body() dto: FindProductsDto, @Req() req) {
    const userId = req.user?.sub;
    return this.productsService.findProducts(dto, userId);
  }

  @UseGuards(OptionalTokenGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => ProductResponseDto,
    description: 'Returns detailed information for a single product',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    const userId = req.user?.sub;
    return this.productsService.findOne(id, userId);
  }

  @RolesAuth(Role.ADMIN)
  @Put(':id')
  @ApiOkResponse({
    description: 'Returns id if product is successfuly updated',
    type: () => ProductActionResponseDto,
  })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @RolesAuth(Role.ADMIN)
  @Delete(':id')
  @ApiOkResponse({
    description: 'Returns id if product is successfuly deleted',
    type: () => ProductActionResponseDto,
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
