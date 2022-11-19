import { Injectable } from '@nestjs/common';
import { verificarVariable } from '../../helper/verifyVariable.helper';
import { IResponse } from '../../interfaces/IResponse';
import { queryService } from '../../services/querys.service';
import { StudentMongoDbQueryService } from './students-query.service';
import { studentDTO } from './students.dto';

@Injectable()
export class StudentMongoDbService {
  constructor(
    private readonly queryServiceData: StudentMongoDbQueryService,
    private readonly query: queryService,
  ) {}

  async list(): Promise<IResponse> {
    /** Inicialización de Variables **/
    let response = {
      error: true,
      message:
        'Existen problemas con el servicio de listar todos los datos de la tabla.',
      response: {},
      status: 500,
    };

    /** Operación **/
    try {
      response = await this.queryServiceData.list();
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

  async listFilter(body: any) {
    /** Inicialización de Variables **/
    let response = {
      error: true,
      message:
        'Existen problemas con el servicio de listar todos los datos de la tabla con filtros.',
      response: {},
      status: 500,
    };

    /** Operación **/
    const fields = [
      {
        key: 'createdAt',
        value: 'createdAt',
      },
      {
        key: 'nombreGenero',
        value: 'nombreGenero',
      },
      {
        key: 'estadoGenero',
        value: 'estadoGenero',
      },
    ];

    let fiel = 'gen.id';
    let type = 'DESC';

    if (body.sort) {
      if (body.sort.length > 0) {
        if (body.sort[0].type !== 'none') {
          const fielFind = fields.find((f) => f.key === body.sort[0].field);

          if (fielFind) {
            fiel = fielFind.value;
            type = body.sort[0].type.toUpperCase();
          }
        }
      }
    }

    const data = {
      where: 'TRUE',
      whereValue: {},
      sortField: fiel,
      sortType: type,
      page: body.page || 1,
      perPage: body.perPage || 5,
      skip: 5,
    };

    data.skip = data.perPage * (data.page - 1);
    let where = '';

    if (body.columnFilters) {
      if (verificarVariable(body.columnFilters.nombreGenero)) {
        where += ' AND gen.nombreGenero LIKE :nombreGenero';
        data.whereValue = {
          ...data.whereValue,
          ...{
            nombreGenero: `%${body.columnFilters.nombreGenero}%`,
          },
        };
      }

      if (verificarVariable(body.columnFilters.estadoGenero)) {
        where += ' AND gen.estadoGenero >= :estadoGenero';
        data.whereValue = {
          ...data.whereValue,
          ...{
            estadoGenero: body.columnFilters.estadoGenero,
          },
        };
      }
    }

    data.where += where;
    response = await this.queryServiceData.listFilter(data);

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
      response = await this.query.selectWhereQuery({
        table: 'vict_cat_genero',
        alias: 'gen',
        select: 'DISTINCT(gen.id)',
        where: {
          where: 'gen.nombre = :nombre',
          values: { nombre: data.nombre },
        },
      });

      if (response.response['total'] === 1) {
        response.error = true;
        response.message = `El nombre ${data.nombre} ya se encuentra registrado.`;
        response.response = {
          errors: {
            solicitud: [`El nombre ${data.nombre} ya se encuentra registrado.`],
          },
        };
        response.status = 422;
      } else {
        response = await this.queryServiceData.insert(data);
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
      response = await this.queryServiceData.update(data, id);
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

  async status(id: number): Promise<IResponse> {
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
      response = await this.query.selectWhereQuery({
        table: 'vict_cat_genero',
        alias: 'gen',
        select: 'DISTINCT(gen.id), gen.nombre, gen.estado',
        where: {
          where: 'gen.id = :id',
          values: { id },
        },
      });

      let estado = response.response['data'][0].estado;
      if (estado === 1) {
        estado = 0;
      } else if (estado === 0) {
        estado = 1;
      }

      response = await this.queryServiceData.status(id, estado);
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
      response = await this.queryServiceData.delete(id);
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
