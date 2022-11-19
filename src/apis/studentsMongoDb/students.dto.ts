import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, MinLength } from 'class-validator';

/* This class is used to validate the data that is sent to the API when creating a new tipoSolicitud */
export class studentDTO {
  @ApiProperty()
  @IsString({ message: 'El nombre debe ser una cadena.' })
  @IsDefined({ message: 'El nombre es obligatorio.' })
  @MinLength(1, { message: 'El nombre debe contener al menos 1 caracter.' })
  nombre: string;
}
