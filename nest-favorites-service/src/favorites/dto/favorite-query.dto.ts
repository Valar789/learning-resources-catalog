import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FavoriteQueryDto {
  @ApiProperty({
    description: 'ID of the user to filter favorites',
    example: 'testUser123',
    required: false,
  })
  @IsOptional()
  @IsString()
  userId?: string;
}
