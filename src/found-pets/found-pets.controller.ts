import { Body, Controller, Post, Get, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { FoundPetsService } from './found-pets.service';
import type { FoundPetCDto } from 'src/core/models/found-pet.model';

@Controller('found-pets')
export class FoundPetsController {
  constructor(private readonly foundPetsService: FoundPetsService) {}

  @Post()
  async createFoundPet(@Body() foundPet: FoundPetCDto) {
    const result = await this.foundPetsService.createFoundPet(foundPet);

    return {
      success: result,
      message: 'Found pet report created successfully',
    };
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('all_found_pets')
  @Get()
  async getFoundPets() {
    return this.foundPetsService.findAll();
  }
}
