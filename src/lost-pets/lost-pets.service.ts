import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LostPet } from 'src/core/entities/lost-pet.entity';
import { LostPetCDto } from 'src/core/models/lost-pet.model';
import { Repository } from 'typeorm';

@Injectable()
export class LostPetsService {

  constructor(
    @InjectRepository(LostPet)
    private readonly lostPetRepository: Repository<LostPet>
  ) {}

  async createLostPet(lostPet: LostPetCDto): Promise<boolean> {

    const newLostPet = this.lostPetRepository.create({
      name: lostPet.name,
      species: lostPet.species,
      breed: lostPet.breed,
      color: lostPet.color,
      size: lostPet.size,
      description: lostPet.description,
      photo_url: lostPet.photo_url,
      owner_name: lostPet.owner_name,
      owner_email: lostPet.owner_email,
      owner_phone: lostPet.owner_phone,
      address: lostPet.address,
      lost_date: lostPet.lost_date,
      location: {
        type: 'Point',
        coordinates: [lostPet.lon, lostPet.lat]
      }
    });

    await this.lostPetRepository.save(newLostPet);

    return true;
  }
}