import { ProductImageResponseDto } from '@cart-app/types';
import { ProductImage } from '@prisma/client';

const mapToImageDto = (img: ProductImage): ProductImageResponseDto => {
  return {
    id: img.id,
    url: img.url,
    color: img.color ?? undefined,
  };
};

export default mapToImageDto;