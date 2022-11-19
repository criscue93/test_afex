import { Injectable } from '@nestjs/common';
import { calculateAge } from 'src/helper/calculateAge.helper';
import { IResponse } from '../../interfaces/IResponse';
import { queryService } from '../../services/querys.service';
import { studentDTO } from './students.dto';
import { DateTime } from 'luxon';

@Injectable()
export class StudentMySqlQueryService {
  constructor(private readonly query: queryService) {}

  async list(): Promise<IResponse> {
    /** Inicialización de Variables **/
    let response = {
      error: true,
      message:
        'Existen problemas con el servicio de listar todos los datos de la tabla con filtros.',
      response: {},
      status: 500,
    };

    /** Operación **/
    try {
      response = await this.query.selectWhereQuery({
        table: 'students',
        alias: 'stud',
        select: 'DISTINCT(stud.id), stud.nombreCompleto',
        where: {
          where: 'stud.estado = :estado',
          values: { estado: 1 },
        },
      });

      if (response.error === false) {
        response.error = false;
        response.message = 'Se logró obtener la lista de estudiantes activos.';
        response.response = response.response['data'];
        response.status = 201;
      }
    } catch (error) {
      response.error = true;
      response.message = 'No se pudo realizar la solicitud.';
      response.response = {
        errors: { student: [`${error.message}`] },
      };
      response.status = 422;
    }

    /** Respuesta **/
    return response;
  }

  async listFilter(data: any): Promise<IResponse> {
    /** Inicialización de Variables **/
    let response = {
      error: true,
      message:
        'Existen problemas con el servicio de listar todos los datos de la tabla con filtros.',
      response: {},
      status: 500,
    };

    /** Operación **/
    try {
      let where = data.where;
      if (data.where === 'TRUE') {
        where = '';
      }

      response = await this.query.selectFilterQuery({
        table: 'students',
        alias: 'stud',
        select: `DISTINCT(stud.id), 
          stud.nombre,
          stud.primerApellido,
          stud.segundoApellido,
          stud.numeroDocumento,
          stud.sexo,
          stud.fechaNacimiento,
          stud.edad,
          stud.celular,
          stud.email,
          stud.direccion,
          stud.estado`,
        where: {
          where,
          values: data.whereValue,
        },
        order: {
          sortField: data.sortField,
          sortType: data.sortType,
          skip: data.skip,
          limit: data.perPage,
        },
      });

      let condi = 0;
      const dataReturn = [];
      while (response.response['data'][condi] != undefined) {
        const data = {
          id: response.response['data'][condi].id,
          nombre: response.response['data'][condi].nombre,
          primerApellido: response.response['data'][condi].primerApellido,
          segundoApellido: response.response['data'][condi].segundoApellido,
          numeroDocumento: response.response['data'][condi].numeroDocumento,
          sexo: response.response['data'][condi].sexo,
          fechaNacimiento: DateTime.fromJSDate(
            response.response['data'][condi].fechaNacimiento,
          ).toFormat('yyyy-MM-dd'),
          edad: response.response['data'][condi].edad,
          celular: response.response['data'][condi].celular,
          email: response.response['data'][condi].email,
          direccion: response.response['data'][condi].direccion,
          estado: response.response['data'][condi].estado,
        };

        dataReturn.push(data);
        condi++;
      }

      if (response.error === false) {
        response.error = false;
        response.message = 'Se logró obtener la lista de estudiantes.';
        response.response = {
          records: dataReturn,
          total: response.response['total'],
        };
        response.status = 201;
      }
    } catch (error) {
      response.error = true;
      response.message = 'No se pudo realizar la solicitud.';
      response.response = {
        errors: { student: [`${error.message}`] },
      };
      response.status = 422;
    }

    /** Respuesta **/
    return response;
  }

  async search(data: any): Promise<IResponse> {
    /** Inicialización de Variables **/
    let response = {
      error: true,
      message:
        'Existen problemas con el servicio de listar todos los datos de la tabla con filtros.',
      response: {},
      status: 500,
    };

    /** Operación **/
    try {
      let where = data.where;
      if (data.where === 'TRUE') {
        where = '';
      }

      response = await this.query.selectWhereQuery({
        table: 'students',
        alias: 'stud',
        select: `DISTINCT(stud.id), 
          stud.nombre,
          stud.primerApellido,
          stud.segundoApellido,
          stud.numeroDocumento,
          stud.sexo,
          stud.fechaNacimiento,
          stud.edad,
          stud.celular,
          stud.email,
          stud.direccion,
          stud.estado`,
        where: {
          where,
          values: data.whereValue,
        },
      });

      let condi = 0;
      const dataReturn = [];
      while (response.response['data'][condi] != undefined) {
        const data = {
          id: response.response['data'][condi].id,
          nombre: response.response['data'][condi].nombre,
          primerApellido: response.response['data'][condi].primerApellido,
          segundoApellido: response.response['data'][condi].segundoApellido,
          numeroDocumento: response.response['data'][condi].numeroDocumento,
          sexo: response.response['data'][condi].sexo,
          fechaNacimiento: DateTime.fromJSDate(
            response.response['data'][condi].fechaNacimiento,
          ).toFormat('yyyy-MM-dd'),
          edad: response.response['data'][condi].edad,
          celular: response.response['data'][condi].celular,
          email: response.response['data'][condi].email,
          direccion: response.response['data'][condi].direccion,
          estado: response.response['data'][condi].estado,
        };

        dataReturn.push(data);
        condi++;
      }

      if (response.error === false) {
        response.error = false;
        response.message = 'Se logró obtener la lista de estudiantes.';
        response.response = {
          records: dataReturn,
          total: response.response['total'],
        };
        response.status = 201;
      }
    } catch (error) {
      response.error = true;
      response.message = 'No se pudo realizar la solicitud.';
      response.response = {
        errors: { student: [`${error.message}`] },
      };
      response.status = 422;
    }

    /** Respuesta **/
    return response;
  }

  async insert(data: studentDTO): Promise<IResponse> {
    /** Inicialización de Variables **/
    let response = {
      error: true,
      message:
        'Existen problemas con el servicio de registrar un nuevo estudiante.',
      response: {},
      status: 500,
    };

    /** Operación **/
    try {
      let nombreCompleto = `${data.nombre} ${data.paterno}`;
      if (data.materno != '') {
        nombreCompleto = `${data.nombre} ${data.paterno} ${data.materno}`;
      }

      const edadCalculate = await calculateAge(
        DateTime.fromISO(data.nacimiento).toFormat('dd-MM-yyyy'),
      );

      response = await this.query.insertQuery({
        table: 'students',
        values: {
          nombre: data.nombre,
          primerApellido: data.paterno,
          segundoApellido: data.materno || '',
          nombreCompleto,
          numeroDocumento: data.documento,
          celular: data.celular,
          fechaNacimiento: data.nacimiento,
          edad: edadCalculate,
          direccion: data.direccion,
          email: data.email || '',
          sexo: data.sexo,
        },
      });
    } catch (error) {
      response.error = true;
      response.message = 'No se pudo realizar la solicitud.';
      response.response = {
        errors: { student: [`${error.message}`] },
      };
      response.status = 422;
    }

    /** Respuesta **/
    return response;
  }

  async update(data: studentDTO, id: number): Promise<IResponse> {
    /** Inicialización de Variables **/
    let response = {
      error: true,
      message:
        'Existen problemas con el servicio de editar los datos de un estudiante.',
      response: {},
      status: 500,
    };

    /** Operación **/
    try {
      let nombreCompleto = `${data.nombre} ${data.paterno}`;
      if (data.materno != '') {
        nombreCompleto = `${data.nombre} ${data.paterno} ${data.materno}`;
      }

      const edadCalculate = await calculateAge(
        DateTime.fromISO(data.nacimiento).toFormat('dd-MM-yyyy'),
      );

      response = await this.query.updateQuery({
        table: 'students',
        set: {
          nombre: data.nombre,
          primerApellido: data.paterno,
          segundoApellido: data.materno || '',
          nombreCompleto,
          numeroDocumento: data.documento,
          celular: data.celular,
          fechaNacimiento: data.nacimiento,
          edad: edadCalculate,
          direccion: data.direccion,
          email: data.email || '',
          sexo: data.sexo,
        },
        where: {
          where: 'id = :id',
          values: { id },
        },
      });
    } catch (error) {
      response.error = true;
      response.message = 'No se pudo realizar la solicitud.';
      response.response = {
        errors: { student: [`${error.message}`] },
      };
      response.status = 422;
    }

    /** Respuesta **/
    return response;
  }

  async status(id: number, estado: number): Promise<IResponse> {
    /** Inicialización de Variables **/
    let response = {
      error: true,
      message:
        'Existen problemas con el servicio de cambiar el estado de un estudiante.',
      response: {},
      status: 500,
    };

    /** Operación **/
    try {
      response = await this.query.updateQuery({
        table: 'students',
        set: {
          estado,
        },
        where: {
          where: 'id = :id',
          values: { id },
        },
      });
    } catch (error) {
      response.error = true;
      response.message = 'No se pudo realizar la solicitud.';
      response.response = {
        errors: { student: [`${error.message}`] },
      };
      response.status = 422;
    }

    /** Respuesta **/
    return response;
  }

  async delete(id: number): Promise<IResponse> {
    /** Inicialización de Variables **/
    let response = {
      error: true,
      message: 'Existen problemas con el servicio de eliminar un estudiante.',
      response: {},
      status: 500,
    };

    /** Operación **/
    try {
      response = await this.query.deleteQuery({
        table: 'students',
        where: {
          where: 'id = :id',
          values: { id },
        },
      });
    } catch (error) {
      response.error = true;
      response.message = 'No se pudo realizar la solicitud.';
      response.response = {
        errors: { student: [`${error.message}`] },
      };
      response.status = 422;
    }

    /** Respuesta **/
    return response;
  }
}
