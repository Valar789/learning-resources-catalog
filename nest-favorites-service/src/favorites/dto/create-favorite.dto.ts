import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty({
    description: 'ID of the resource to be marked as favorite',
    example: '1',
  })
  @IsNotEmpty()
  @IsString()
  resourceId: string;

  @ApiProperty({
    description: 'ID of the user marking the resource as favorite',
    example: 'testUser123',
    required: false,
  })
  @IsString()
  userId?: string;
}
