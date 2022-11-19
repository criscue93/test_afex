import { Injectable } from '@nestjs/common';
import { verificarVariable } from '../../helper/verifyVariable.helper';
import { IResponse } from '../../interfaces/IResponse';
import { queryService } from '../../services/querys.service';
import { StudentMySqlQueryService } from './students-query.service';
import { studentDTO } from './students.dto';

@Injectable()
export class StudentMySqlService {
  constructor(
    private readonly queryServiceData: StudentMySqlQueryService,
    private readonly query: queryService,
  ) {}

  async list(): Promise<IResponse> {
    /** Inicialización de Variables **/
    let response = {
      error: true,
      message:
        'Existen problemas con el servicio de listar todos los estudiantes.',
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
        errors: { student: [`${error.message}`] },
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
        'Existen problemas con el servicio de listar todos los estudiantes con filtros.',
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
        key: 'nombre',
        value: 'nombre',
      },
      {
        key: 'primerApellido',
        value: 'primerApellido',
      },
      {
        key: 'segundoApellido',
        value: 'segundoApellido',
      },
      {
        key: 'numeroDocumento',
        value: 'numeroDocumento',
      },
      {
        key: 'sexo',
        value: 'sexo',
      },
      {
        key: 'fechaNacimiento',
        value: 'fechaNacimiento',
      },
      {
        key: 'edad',
        value: 'edad',
      },
      {
        key: 'celular',
        value: 'celular',
      },
      {
        key: 'email',
        value: 'email',
      },
      {
        key: 'direccion',
        value: 'direccion',
      },
      {
        key: 'estado',
        value: 'estado',
      },
    ];

    let fiel = 'stud.id';
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
      if (verificarVariable(body.columnFilters.nombre)) {
        where += ' AND stud.nombre LIKE :nombre%';
        data.whereValue = {
          ...data.whereValue,
          ...{
            nombre: `%${body.columnFilters.nombre}%`,
          },
        };
      }

      if (verificarVariable(body.columnFilters.primerApellido)) {
        where += ' AND stud.primerApellido LIKE :primerApellido%';
        data.whereValue = {
          ...data.whereValue,
          ...{
            primerApellido: body.columnFilters.primerApellido,
          },
        };
      }

      if (verificarVariable(body.columnFilters.segundoApellido)) {
        where += ' AND stud.segundoApellido LIKE :segundoApellido%';
        data.whereValue = {
          ...data.whereValue,
          ...{
            segundoApellido: body.columnFilters.segundoApellido,
          },
        };
      }

      if (verificarVariable(body.columnFilters.numeroDocumento)) {
        where += ' AND stud.numeroDocumento >= :numeroDocumento';
        data.whereValue = {
          ...data.whereValue,
          ...{
            numeroDocumento: body.columnFilters.numeroDocumento,
          },
        };
      }

      if (verificarVariable(body.columnFilters.sexo)) {
        where += ' AND stud.sexo = :sexo';
        data.whereValue = {
          ...data.whereValue,
          ...{
            sexo: body.columnFilters.sexo,
          },
        };
      }

      if (verificarVariable(body.columnFilters.fechaNacimiento)) {
        where += ' AND stud.fechaNacimiento = :fechaNacimiento';
        data.whereValue = {
          ...data.whereValue,
          ...{
            fechaNacimiento: body.columnFilters.fechaNacimiento,
          },
        };
      }

      if (verificarVariable(body.columnFilters.edad)) {
        where += ' AND stud.edad = :edad';
        data.whereValue = {
          ...data.whereValue,
          ...{
            edad: body.columnFilters.edad,
          },
        };
      }

      if (verificarVariable(body.columnFilters.celular)) {
        where += ' AND stud.celular = :celular';
        data.whereValue = {
          ...data.whereValue,
          ...{
            celular: body.columnFilters.celular,
          },
        };
      }

      if (verificarVariable(body.columnFilters.email)) {
        where += ' AND stud.email LIKE :email%';
        data.whereValue = {
          ...data.whereValue,
          ...{
            email: body.columnFilters.email,
          },
        };
      }

      if (verificarVariable(body.columnFilters.direccion)) {
        where += ' AND stud.direccion LIKE :direccion%';
        data.whereValue = {
          ...data.whereValue,
          ...{
            direccion: body.columnFilters.direccion,
          },
        };
      }

      if (verificarVariable(body.columnFilters.estado)) {
        where += ' AND stud.estado = :estado';
        data.whereValue = {
          ...data.whereValue,
          ...{
            estado: body.columnFilters.estado,
          },
        };
      }
    }

    data.where += where;
    response = await this.queryServiceData.listFilter(data);

    /** Respuesta **/
    return response;
  }

  async search(body: any) {
    /** Inicialización de Variables **/
    let response = {
      error: true,
      message: 'Existen problemas con el servicio de buscar un estudiante.',
      response: {},
      status: 500,
    };

    /** Operación **/

    const data = {
      where: 'TRUE',
      whereValue: {},
    };

    let where = '';

    if (body.nombreCompleto) {
      where += ` AND stud.nombreCompleto LIKE '%${body.nombreCompleto}%'`;
    }

    data.where += where;
    response = await this.queryServiceData.search(data);

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
      response = await this.query.selectWhereQuery({
        table: 'students',
        alias: 'stud',
        select: 'DISTINCT(stud.id)',
        where: {
          where: 'stud.numeroDocumento = :numeroDocumento',
          values: { numeroDocumento: data.documento },
        },
      });

      if (response.response['total'] > 0) {
        response.error = true;
        response.message = `El numero de documento ${data.documento} ya se encuentra registrado.`;
        response.response = {
          errors: {
            student: [
              `El numero de documento ${data.documento} ya se encuentra registrado.`,
            ],
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
      response = await this.queryServiceData.update(data, id);
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

  async status(id: number): Promise<IResponse> {
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
      response = await this.query.selectWhereQuery({
        table: 'students',
        alias: 'stud',
        select: 'DISTINCT(stud.id), stud.estado',
        where: {
          where: 'stud.id = :id',
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
      response = await this.queryServiceData.delete(id);
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
