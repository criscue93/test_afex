import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsString,
  MinLength,
  IsInt,
  MaxLength,
} from 'class-validator';

/* This class is used to validate the data that is sent to the API when creating a new tipoSolicitud */
export class studentDTO {
  @ApiProperty()
  @IsString({ message: 'El nombre debe ser una cadena.' })
  @IsDefined({ message: 'El nombre es obligatorio.' })
  @MinLength(1, { message: 'El nombre debe contener al menos 1 caracter.' })
  @MaxLength(50, {
    message: 'El nombre debe contener como máximo 50 caracteres.',
  })
  nombre: string;

  @ApiProperty()
  @IsString({ message: 'El apellido paterno debe ser una cadena.' })
  @IsDefined({ message: 'El apellido paterno es obligatorio.' })
  @MinLength(1, {
    message: 'El apellido paterno debe contener al menos 1 caracter.',
  })
  @MaxLength(30, {
    message: 'El apellido paterno debe contener como máximo 30 caracteres.',
  })
  paterno: string;

  @ApiProperty()
  @IsString({ message: 'El apellido materno debe ser una cadena.' })
  materno: string;

  @ApiProperty()
  @IsString({ message: 'El número de documento debe ser una cadena.' })
  @IsDefined({ message: 'El número de documento es obligatorio.' })
  @MinLength(1, {
    message: 'El número de documento debe contener al menos 1 caracter.',
  })
  @MaxLength(20, {
    message: 'El número de documento debe contener como máximo 20 caracteres.',
  })
  documento: string;

  @ApiProperty()
  @IsInt({ message: 'El número de documento debe ser una cadena.' })
  @IsDefined({ message: 'El número de documento es obligatorio.' })
  celular: string;

  @ApiProperty()
  @IsString({ message: 'La fecha de nacimiento debe ser una cadena.' })
  @IsDefined({ message: 'La fecha de nacimiento es obligatorio.' })
  @MinLength(1, {
    message: 'La fecha de nacimiento debe contener al menos 1 caracter.',
  })
  @MaxLength(10, {
    message: 'La fecha de nacimiento debe contener como máximo 10 caracteres.',
  })
  nacimiento: string;

  @ApiProperty()
  @IsString({ message: 'La dirección debe ser una cadena.' })
  @IsDefined({ message: 'La dirección es obligatorio.' })
  @MinLength(1, {
    message: 'La dirección debe contener al menos 1 caracter.',
  })
  @MaxLength(40, {
    message: 'La dirección debe contener como máximo 10 caracteres.',
  })
  direccion: string;

  @ApiProperty()
  @IsString({ message: 'El email debe ser una cadena.' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'El sexo debe ser una cadena.' })
  @IsDefined({ message: 'El sexo es obligatorio.' })
  @MinLength(1, {
    message: 'El sexo debe contener al menos 1 caracter.',
  })
  @MaxLength(1, {
    message: 'El sexo debe contener como máximo 20 caracteres.',
  })
  sexo: string;
}
