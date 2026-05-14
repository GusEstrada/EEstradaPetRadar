import { Body, Controller, Post, Get, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { FoundPetsService } from './found-pets.service';

@Controller('found-pets')
export class FoundPetsController {
  constructor(private readonly foundPetsService: FoundPetsService) {}

  @Post()
  async createFoundPet(@Body() foundPet: any) {
    const result = await this.foundPetsService.createFoundPet(foundPet);

    return {
      success: result,
      message: 'Found pet report created successfully',
    };
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('all_found_pets')
  @CacheTTL(60) 
  @Get()
  async getFoundPets() {
    return this.foundPetsService.findAll();
  }
}