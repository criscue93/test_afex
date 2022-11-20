import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Res,
  UseGuards,
  Version,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { validate } from 'class-validator';
import { Response } from 'express';
import { sanitizeString } from '../../helper/sanatize.helper';
import { IResponse } from '../../interfaces/IResponse';
import { studentDTO } from './students.dto';
import { StudentMySqlService } from './students.service';

@ApiTags('CRUD STUDENTS BD RELACIONAL - MYSQL')
@Controller('api/students/mysql/')
export class StudentMySqlController {
  constructor(private readonly serviceData: StudentMySqlService) {}

  @Version('1')
  @Get('list')
  @ApiOperation({
    summary: 'Servicio para obtener toda la información de la tabla.',
  })
  async list(@Res() res: Response) {
    /** Inicialización de Variables **/
    let response: IResponse;
    response = {
      error: true,
      message:
        'Existen problemas con el servicio de listar todos los estudiantes.',
      response: {},
      status: 500,
    };

    /** Operación **/
    response = await this.serviceData.list();

    /** Respuesta **/
    return res.status(response.status).json(response);
  }

  @Version('1')
  @Post('listFilter')
  @ApiOperation({
    summary:
      'Servicio para obtener toda la información de la tabla con filtros.',
  })
  async listFilter(@Res() res: Response, @Body() body: any) {
    /** Inicialización de Variables **/
    let response: IResponse;
    response = {
      error: true,
      message:
        'Existen problemas con el servicio de listar todos los estudiantes con filtros.',
      response: {},
      status: 500,
    };

    /** Operación **/
    response = await this.serviceData.listFilter(body);

    /** Respuesta **/
    return res.status(response.status).json(response);
  }

  @Version('1')
  @Post('search')
  @ApiOperation({
    summary: 'Servicio para buscar un estudiante.',
  })
  @ApiBody({
    schema: {
      properties: {
        nombreCompleto: { type: 'varchar', example: 'Nombre completo' },
      },
    },
  })
  async search(@Res() res: Response, @Body() body: any) {
    /** Inicialización de Variables **/
    let response: IResponse;
    response = {
      error: true,
      message: 'Existen problemas con el servicio de buscar un estudiante.',
      response: {},
      status: 500,
    };

    /** Operación **/
    response = await this.serviceData.search(body);

    /** Respuesta **/
    return res.status(response.status).json(response);
  }

  @Version('1')
  @Post('insert')
  @ApiOperation({
    summary: 'Servicio para registrar un nuevo estudiante.',
  })
  @ApiBody({
    schema: {
      properties: {
        nombre: { type: 'varchar', example: 'Nombres' },
        paterno: { type: 'varchar', example: 'Apellido Paterno' },
        materno: { type: 'varchar', example: 'Apellito Materno' },
        documento: { type: 'varchar', example: 'Número de Documento' },
        celular: { type: 'number', example: 59132456785 },
        nacimiento: { type: 'varchar', example: '1993-08-25' },
        direccion: { type: 'varchar', example: 'Direccion del domicilio' },
        email: { type: 'varchar', example: 'Email - Opcional' },
        sexo: { type: 'varchar', example: 'F o M' },
      },
    },
  })
  async insertData(@Res() res: Response, @Body() body: studentDTO) {
    /** Inicialización de Variables **/
    let response: IResponse;
    response = {
      error: true,
      message:
        'Existen problemas con el servicio de registrar un nuevo estudiante.',
      response: {},
      status: 500,
    };

    /** Operación **/
    const data = new studentDTO();
    data.nombre = sanitizeString(body.nombre);
    data.paterno = sanitizeString(body.paterno);
    data.materno = sanitizeString(body.materno);
    data.documento = body.documento;
    data.celular = body.celular;
    data.nacimiento = body.nacimiento;
    data.direccion = sanitizeString(body.direccion);
    data.email = body.email;
    data.sexo = sanitizeString(body.sexo);

    const valida = await validate(data);
    if (valida.length > 0) {
      const errorArray = valida.map((o) => ({
        [o.property]: Object.values(o.constraints),
      }));
      let condi = 0;
      let errors = [];

      while (errorArray[condi] != undefined) {
        errors = Object.assign(errors, errorArray[condi]);
        condi++;
      }

      response.error = true;
      response.message = 'Error de validación.';
      response.response = { errors: { ...errors } };
      response.status = 422;
    } else {
      response = await this.serviceData.insert(data);
    }

    /** Respuesta **/
    return res.status(response.status).json(response);
  }

  @Version('1')
  @Put('update/:id')
  @ApiOperation({
    summary: 'Servicio para editar los datos de un estudiante.',
  })
  @ApiBody({
    schema: {
      properties: {
        nombre: { type: 'varchar', example: 'Nombres' },
        paterno: { type: 'varchar', example: 'Apellido Paterno' },
        materno: { type: 'varchar', example: 'Apellito Materno' },
        documento: { type: 'varchar', example: 'Número de Documento' },
        celular: { type: 'number', example: 59132456785 },
        nacimiento: { type: 'varchar', example: '1993-08-25' },
        direccion: { type: 'varchar', example: 'Direccion del domicilio' },
        email: { type: 'varchar', example: 'Email - Opcional' },
        sexo: { type: 'varchar', example: 'F o M' },
      },
    },
  })
  async updateData(
    @Res() res: Response,
    @Body() body: studentDTO,
    @Param('id') id: number,
  ) {
    /** Inicialización de Variables **/
    let response: IResponse;
    response = {
      error: true,
      message:
        'Existen problemas con el servicio de editar los datos de un estudiante.',
      response: {},
      status: 500,
    };

    /** Operación **/
    const data = new studentDTO();
    data.nombre = sanitizeString(body.nombre);
    data.paterno = sanitizeString(body.paterno);
    data.materno = sanitizeString(body.materno);
    data.documento = body.documento;
    data.celular = body.celular;
    data.nacimiento = body.nacimiento;
    data.direccion = sanitizeString(body.direccion);
    data.email = body.email;
    data.sexo = sanitizeString(body.sexo);

    const valida = await validate(data);
    if (valida.length > 0) {
      const errorArray = valida.map((o) => ({
        [o.property]: Object.values(o.constraints),
      }));
      let condi = 0;
      let errors = [];

      while (errorArray[condi] != undefined) {
        errors = Object.assign(errors, errorArray[condi]);
        condi++;
      }

      response.error = true;
      response.message = 'Error de validación.';
      response.response = { errors: { ...errors } };
      response.status = 422;
    } else {
      response = await this.serviceData.update(data, id);
    }

    /** Respuesta **/
    return res.status(response.status).json(response);
  }

  @Version('1')
  @Patch('status/:id')
  @ApiOperation({
    summary: 'Servicio para cambiar el estado de un estudiante.',
  })
  async statusData(@Res() res: Response, @Param('id') id: number) {
    /** Inicialización de Variables **/
    let response: IResponse;
    response = {
      error: true,
      message:
        'Existen problemas con el servicio de cambiar el estado de un estudiante.',
      response: {},
      status: 500,
    };

    /** Operación **/
    response = await this.serviceData.status(id);

    /** Respuesta **/
    return res.status(response.status).json(response);
  }

  @Version('1')
  @Delete('delete/:id')
  @UseGuards(AuthGuard('api-key'))
  @ApiOperation({
    summary: 'Servicio para eliminar un estudiante.',
  })
  async deleteData(@Res() res: Response, @Param('id') id: number) {
    /** Inicialización de Variables **/
    let response: IResponse;
    response = {
      error: true,
      message: 'Existen problemas con el servicio de eliminar un estudiante.',
      response: {},
      status: 500,
    };

    /** Operación **/
    response = await this.serviceData.delete(id);

    /** Respuesta **/
    return res.status(response.status).json(response);
  }
}
