import type { FoundPetCDto } from 'src/core/models/found-pet.model';
import { LostPet } from 'src/core/entities/lost-pet.entity';

export const generateFoundPetEmailTemplate = (
  foundPet: FoundPetCDto,
  lostPet: LostPet
): string => {

  return `
  <div style="font-family: Arial, sans-serif; padding:20px;">
    
    <h2>🐾 Posible coincidencia de mascota encontrada</h2>

    <p>Se ha reportado una mascota encontrada cerca de donde se perdió una mascota registrada.</p>

    <h3>📍 Mascota Perdida</h3>
    <ul>
      <li><b>Nombre:</b> ${lostPet.name}</li>
      <li><b>Especie:</b> ${lostPet.species}</li>
      <li><b>Raza:</b> ${lostPet.breed}</li>
      <li><b>Color:</b> ${lostPet.color}</li>
      <li><b>Tamaño:</b> ${lostPet.size}</li>
      <li><b>Descripción:</b> ${lostPet.description}</li>
    </ul>

    <h3>🐶 Mascota Encontrada</h3>
    <ul>
      <li><b>Especie:</b> ${foundPet.species}</li>
      <li><b>Raza:</b> ${foundPet.breed}</li>
      <li><b>Color:</b> ${foundPet.color}</li>
      <li><b>Tamaño:</b> ${foundPet.size}</li>
      <li><b>Descripción:</b> ${foundPet.description}</li>
      <li><b>Dirección:</b> ${foundPet.address}</li>
    </ul>

    <h3>👤 Contacto de quien encontró la mascota</h3>
    <ul>
      <li><b>Nombre:</b> ${foundPet.finder_name}</li>
      <li><b>Email:</b> ${foundPet.finder_email}</li>
      <li><b>Teléfono:</b> ${foundPet.finder_phone}</li>
    </ul>

    <p style="margin-top:20px;">
      Si crees que esta mascota puede ser la tuya, ponte en contacto con la persona que la encontró.
    </p>

    <hr/>

    <p style="font-size:12px; color:gray;">
      Este correo fue generado automáticamente por PetRadar.
    </p>

  </div>
  `;
};