import { Body, Controller, Post } from '@nestjs/common';
import { FoundPetsService } from './found-pets.service';
import type { FoundPetCDto } from 'src/core/models/found-pet.model';

@Controller('found-pets')
export class FoundPetsController {

  constructor(
    private readonly foundPetsService: FoundPetsService
  ) {}

  @Post()
  async createFoundPet(@Body() foundPet: FoundPetCDto) {
    
    const result = await this.foundPetsService.createFoundPet(foundPet);

    return {
      success: result,
      message: 'Found pet report created successfully'
    };
    
  }

}