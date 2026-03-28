import { ProductVariant } from '@prisma/client';
import { ProductVariantResponseDto } from '../dto/product-variant-response.dto';

const mapToVariantDto = (variant: ProductVariant): ProductVariantResponseDto => {
  return {
    id: variant.id,
    size: variant.size ?? undefined,
    shoeSize: variant.shoeSize ?? undefined,
    stock: variant.stock,
  };
};

export default mapToVariantDto;
