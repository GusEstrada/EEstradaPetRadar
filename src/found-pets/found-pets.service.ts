import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FoundPet } from 'src/core/entities/found-pet.entity';
import { LostPet } from 'src/core/entities/lost-pet.entity';
import { EmailService } from 'src/email/email.service';
import { generateFoundPetEmailTemplate } from './templates/found-pet.template';
import type { EmailOptions } from 'src/core/models/email-options.model';
import { envs } from 'src/config/envs';

@Injectable()
export class FoundPetsService {
  constructor(
    @InjectRepository(FoundPet)
    private readonly foundPetRepository: Repository<FoundPet>,

    @InjectRepository(LostPet)
    private readonly lostPetRepository: Repository<LostPet>,

    private readonly emailService: EmailService,
  ) {}

  async createFoundPet(foundPet: any): Promise<boolean> {
    const lon = foundPet.lon;
    const lat = foundPet.lat;

    if (lon === undefined || lat === undefined) {
      console.error(' Error: No se recibieron coordenadas válidas en el body.');
      return false;
    }

    console.log(`📍 Procesando reporte en: [${lon}, ${lat}]`);

    const newFoundPet = this.foundPetRepository.create({
      species: foundPet.species,
      breed: foundPet.breed,
      color: foundPet.color,
      size: foundPet.size,
      description: foundPet.description,
      photo_url: foundPet.photo_url,
      finder_name: foundPet.finder_name,
      finder_email: foundPet.finder_email,
      finder_phone: foundPet.finder_phone,
      address: foundPet.address,
      found_date: foundPet.found_date,
      location: {
        type: 'Point',
        coordinates: [lon, lat],
      },
    });

    await this.foundPetRepository.save(newFoundPet);

    const nearbyLostPets = await this.lostPetRepository.query(
      `
      SELECT *,
        ST_X(location::geometry) as lon,
        ST_Y(location::geometry) as lat,
        ST_Distance(
          location,
          ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography
        ) AS distance
      FROM lost_pets
      WHERE is_active = true
      AND ST_DWithin(
        location,
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
        500
      )
      ORDER BY distance ASC;
      `,
      [lon, lat],
    );

    console.log(
      `🔎 Buscando coincidencias... Encontradas: ${nearbyLostPets.length}`,
    );

    if (nearbyLostPets.length > 0) {
      for (const lostPet of nearbyLostPets) {
        console.log(`🎯 ¡Match! Avisando a: ${lostPet.owner_email}`);

        const lostPetWithCoords = {
          ...lostPet,
          location: {
            type: 'Point',
            coordinates: [parseFloat(lostPet.lon), parseFloat(lostPet.lat)],
          },
        };

        const template = generateFoundPetEmailTemplate(
          foundPet,
          lostPetWithCoords,
        );

        const options: EmailOptions = {
          to: lostPet.owner_email,
          subject: `🐾 Posible coincidencia para ${lostPet.name}`,
          htmlBody: template,
        };

        try {
          await this.emailService.sendEmail(options);
        } catch (error) {
          console.error(
            ` No se pudo enviar el correo a ${lostPet.owner_email}:`,
            error.message,
          );
        }
      }
    } else {
      console.log(
        '--- No hubo coincidencias geográficas cerca de este punto ---',
      );
    }

    return true;
  }

  async findAll() {
    return this.foundPetRepository.find();
  } // build final para entrega (para grabar el video hjeje)
}
