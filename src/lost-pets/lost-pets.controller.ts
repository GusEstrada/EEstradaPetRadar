import { Body, Controller, Post, Get, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { LostPetsService } from './lost-pets.service';

@Controller('lost-pets')
export class LostPetsController {
  constructor(private readonly lostPetsService: LostPetsService) {}

  @Post()
  async createLostPet(@Body() lostPet: any) {
    return this.lostPetsService.createLostPet(lostPet);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('active_lost_pets')
  @CacheTTL(60) 
  @Get()
  async getActiveLostPets() {
    return this.lostPetsService.findAllActive();
  }
}