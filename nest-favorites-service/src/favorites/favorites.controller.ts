import { Controller, Get, Post, Delete, Param, Body, Query, NotFoundException, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoriteQueryDto } from './dto/favorite-query.dto';
import { Favorite } from './interfaces/favorite.interface';

@ApiTags('favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Post()
  @ApiOperation({ summary: 'Add a resource to favorites' })
  @ApiResponse({ status: 201, description: 'Resource added to favorites' })
  addFavorite(@Body() createFavoriteDto: CreateFavoriteDto): Favorite {
    return this.favoritesService.addFavorite(
      createFavoriteDto.resourceId,
      createFavoriteDto.userId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all favorites for a user' })
  @ApiResponse({ status: 200, description: 'List of favorites' })
  @ApiQuery({ name: 'userId', required: false, type: String })
  getFavorites(@Query() query: FavoriteQueryDto): Favorite[] {
    return this.favoritesService.getFavorites(query.userId);
  }

  @Get('resource/:resourceId')
  @ApiOperation({ summary: 'Check if a resource is favorite' })
  @ApiResponse({ status: 200, description: 'Favorite found' })
  @ApiResponse({ status: 404, description: 'Resource not in favorites' })
  @ApiParam({ name: 'resourceId', type: String })
  @ApiQuery({ name: 'userId', required: false, type: String })
  checkFavorite(
    @Param('resourceId') resourceId: string,
    @Query('userId') userId?: string,
  ): Favorite {
    const favorite = this.favoritesService.getFavoriteByResourceId(resourceId, userId);
    if (!favorite) {
      throw new NotFoundException('Resource not found in favorites');
    }
    return favorite;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a resource from favorites' })
  @ApiResponse({ status: 204, description: 'Resource removed from favorites' })
  @ApiResponse({ status: 404, description: 'Favorite not found' })
  @ApiParam({ name: 'id', type: String })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeFavorite(@Param('id') id: string): void {
    const deleted = this.favoritesService.removeFavorite(id);
    if (!deleted) {
      throw new NotFoundException('Favorite not found');
    }
  }
}
