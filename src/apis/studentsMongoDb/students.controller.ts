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
  Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { validate } from 'class-validator';
import { Response } from 'express';
import { sanitizeString } from '../../helper/sanatize.helper';
import { IResponse } from '../../interfaces/IResponse';
import { studentDTO } from './students.dto';
import { StudentMongoDbService } from './students.service';

@ApiTags('CRUD STUDENTS MONGODB')
@ApiBearerAuth()
@Controller('api')
export class StudentMongoDbController {
  constructor(private readonly serviceData: StudentMongoDbService) {}

  @Version('1')
  @Get('students/mongodb/list')
  @ApiOperation({
    summary: 'Servicio para obtener toda la información de la tabla.',
  })
  async list(@Res() res: Response) {
    /** Inicialización de Variables **/
    let response: IResponse;
    response = {
      error: true,
      message:
        'Existen problemas con el servicio de listar todos los datos de la tabla.',
      response: {},
      status: 500,
    };

    /** Operación **/
    response = await this.serviceData.list();

    /** Respuesta **/
    return res.status(response.status).json(response);
  }

  @Version('1')
  @Post('students/mongodb/listFilter')
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
        'Existen problemas con el servicio de listar todos los datos de la tabla.',
      response: {},
      status: 500,
    };

    /** Operación **/
    response = await this.serviceData.listFilter(body);

    /** Respuesta **/
    return res.status(response.status).json(response);
  }

  @Version('1')
  @Post('students/mongodb/insert')
  @ApiOperation({
    summary: 'Servicio para insertar nuevos datos a la tabla.',
  })
  @ApiBody({
    schema: {
      properties: {
        nombre: { type: 'string', example: 'Nombre del genero' },
      },
    },
  })
  async insertData(@Res() res: Response, @Body() body: studentDTO) {
    /** Inicialización de Variables **/
    let response: IResponse;
    response = {
      error: true,
      message:
        'Existen problemas con el servicio de listar todos los datos de la tabla.',
      response: {},
      status: 500,
    };

    /** Operación **/
    const data = new studentDTO();
    data.nombre = sanitizeString(body.nombre);

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
  @Put('students/mongodb/update/:id')
  @ApiOperation({
    summary: 'Servicio para editar los datos de una tupla.',
  })
  @ApiBody({
    schema: {
      properties: {
        nombre: { type: 'string', example: 'Nombre del genero' },
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
        'Existen problemas con el servicio de listar todos los datos de la tabla.',
      response: {},
      status: 500,
    };

    /** Operación **/
    const data = new studentDTO();
    data.nombre = sanitizeString(body.nombre);

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
  @Patch('students/mongodb/status/:id')
  @ApiOperation({
    summary: 'Servicio para cambiar el estado de una tupla.',
  })
  async statusData(@Res() res: Response, @Param('id') id: number) {
    /** Inicialización de Variables **/
    let response: IResponse;
    response = {
      error: true,
      message:
        'Existen problemas con el servicio de listar todos los datos de la tabla.',
      response: {},
      status: 500,
    };

    /** Operación **/
    response = await this.serviceData.status(id);

    /** Respuesta **/
    return res.status(response.status).json(response);
  }

  @Version('1')
  @Delete('students/mongodb/delete/:id')
  @ApiOperation({
    summary: 'Servicio para eliminar una tupla.',
  })
  async deleteData(@Res() res: Response, @Param('id') id: number) {
    /** Inicialización de Variables **/
    let response: IResponse;
    response = {
      error: true,
      message:
        'Existen problemas con el servicio de listar todos los datos de la tabla.',
      response: {},
      status: 500,
    };

    /** Operación **/
    response = await this.serviceData.delete(id);

    /** Respuesta **/
    return res.status(response.status).json(response);
  }
}
