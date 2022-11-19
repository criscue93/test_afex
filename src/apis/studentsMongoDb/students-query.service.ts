import { Injectable } from '@nestjs/common';
import { IResponse } from '../../interfaces/IResponse';
import { queryService } from '../../services/querys.service';
import { studentDTO } from './students.dto';

@Injectable()
export class StudentMongoDbQueryService {
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
        table: 'vict_cat_genero',
        alias: 'gen',
        select: 'DISTINCT(gen.id) AS idGenero, gen.nombre AS nombreGenero',
        where: {
          where: 'gen.estado = :estado',
          values: { estado: 1 },
        },
      });

      if (response.error === false) {
        response.error = false;
        response.message = 'Se logró obtener todos los datos.';
        response.response = response.response['data'];
        response.status = 201;
      }
    } catch (error) {
      response.error = true;
      response.message = 'No se pudo realizar la solicitud.';
      response.response = {
        errors: { solicitud: [`${error.message}`] },
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
        table: 'vict_cat_genero',
        alias: 'gen',
        select:
          'DISTINCT(gen.id) AS idGenero, gen.nombre AS nombreGenero, gen.estado AS estadoGenero',
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

      if (response.error === false) {
        response.error = false;
        response.message = 'Se logró obtener todos los datos.';
        response.response = {
          records: response.response['data'],
          total: response.response['total'],
        };
        response.status = 201;
      }
    } catch (error) {
      response.error = true;
      response.message = 'No se pudo realizar la solicitud.';
      response.response = {
        errors: { solicitud: [`${error.message}`] },
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
        'Existen problemas con el servicio de registrar nuevos datos a la tabla.',
      response: {},
      status: 500,
    };

    /** Operación **/
    try {
      response = await this.query.insertQuery({
        table: 'vict_cat_genero',
        values: {
          nombre: data.nombre,
        },
      });
    } catch (error) {
      response.error = true;
      response.message = 'No se pudo realizar la solicitud.';
      response.response = {
        errors: { solicitud: [`${error.message}`] },
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
        'Existen problemas con el servicio de editar los datos de una tupla.',
      response: {},
      status: 500,
    };

    /** Operación **/
    try {
      response = await this.query.updateQuery({
        table: 'vict_cat_genero',
        set: {
          nombre: data.nombre,
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
        errors: { solicitud: [`${error.message}`] },
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
        'Existen problemas con el servicio de cambiar el estado de una tupla.',
      response: {},
      status: 500,
    };

    /** Operación **/
    try {
      response = await this.query.updateQuery({
        table: 'vict_cat_genero',
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
        errors: { solicitud: [`${error.message}`] },
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
      message: 'Existen problemas con el servicio de eliminar una tupla.',
      response: {},
      status: 500,
    };

    /** Operación **/
    try {
      response = await this.query.deleteQuery({
        table: 'vict_cat_genero',
        where: {
          where: 'id = :id',
          values: { id },
        },
      });
    } catch (error) {
      response.error = true;
      response.message = 'No se pudo realizar la solicitud.';
      response.response = {
        errors: { solicitud: [`${error.message}`] },
      };
      response.status = 422;
    }

    /** Respuesta **/
    return response;
  }
}
