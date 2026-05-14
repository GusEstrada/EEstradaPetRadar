import { Body, Controller, Post, Get, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { LostPetsService } from './lost-pets.service';
import type { LostPetCDto } from 'src/core/models/lost-pet.model';

@Controller('lost-pets')
export class LostPetsController {
  constructor(private readonly lostPetsService: LostPetsService) {}

  @Post()
  async createLostPet(@Body() lostPet: LostPetCDto) {
    return this.lostPetsService.createLostPet(lostPet);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('active_lost_pets')
  @Get()
  async getActiveLostPets() {
    return this.lostPetsService.findAllActive();
  }
}
