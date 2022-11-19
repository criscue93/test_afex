import { Inject, Injectable } from '@nestjs/common';
import { queryDTO, querySelectDTO, ResponseDTO } from 'src/dto/query.dto';

@Injectable()
export class queryService {
  constructor(
    @Inject('CONNECT_REPOSITORY')
    private testRepository,
  ) {}

  async selectQuery(data: querySelectDTO): Promise<ResponseDTO> {
    // === INICIALIZACION DE VARIABLES ===
    const response: ResponseDTO = {
      error: true,
      message: 'Existe problemas con selectQuery.',
      response: {},
      status: 422,
    };

    // === OPERACION ===
    try {
      const queryReturn = await this.testRepository
        .createQueryBuilder()
        .select(data.select)
        .from(data.table, data.alias)
        .execute();

      if (queryReturn.length > 0) {
        response.error = false;
        response.message = `Se logró obtener ${queryReturn.length} resultados de la tabla ${data.table}.`;
        response.response = { data: queryReturn, total: queryReturn.length };
        response.status = 200;
      } else if (queryReturn.length === 0) {
        response.error = false;
        response.message = `Se logró obtener ${queryReturn.length} resultados de la tabla ${data.table}.`;
        response.response = { data: queryReturn, total: queryReturn.length };
        response.status = 200;
      }
    } catch (error) {
      response.message = 'No se logró realizar la Consulta.';
      response.response = {
        errors: { query: [`${error.message}`] },
      };
      response.status = 500;
    }

    // === RESPUESTAS ===
    return response;
  }

  async selectWhereQuery(data: querySelectDTO): Promise<ResponseDTO> {
    // === INICIALIZACION DE VARIABLES ===
    const response: ResponseDTO = {
      error: true,
      message: 'Existe problemas con selectQuery.',
      response: {},
      status: 422,
    };

    // === OPERACION ===
    try {
      const queryReturn = await this.testRepository
        .createQueryBuilder()
        .select(data.select)
        .from(data.table, data.alias)
        .where(data.where.where, data.where.values)
        .execute();

      if (queryReturn.length > 0) {
        response.error = false;
        response.message = `Se logró obtener ${queryReturn.length} resultados de la tabla ${data.table}.`;
        response.response = { data: queryReturn, total: queryReturn.length };
        response.status = 200;
      } else if (queryReturn.length === 0) {
        response.error = false;
        response.message = `Se logró obtener ${queryReturn.length} resultados de la tabla ${data.table}.`;
        response.response = { data: queryReturn, total: queryReturn.length };
        response.status = 200;
      }
    } catch (error) {
      response.message = 'No se logró realizar la Consulta.';
      response.response = {
        errors: { query: [`${error.message}`] },
      };
      response.status = 500;
    }

    // === RESPUESTAS ===
    return response;
  }

  async selectFilterQuery(data: querySelectDTO): Promise<ResponseDTO> {
    // === INICIALIZACION DE VARIABLES ===
    const response: ResponseDTO = {
      error: true,
      message: 'Existe problemas con selectQuery.',
      response: {},
      status: 422,
    };

    // === OPERACION ===
    try {
      const queryReturn = await this.testRepository
        .createQueryBuilder()
        .select(data.select)
        .from(data.table, data.alias)
        .where(data.where.where, data.where.values)
        .orderBy(data.order.sortField, data.order.sortType)
        .offset(data.order.skip)
        .limit(data.order.limit)
        .execute();

      if (queryReturn.length > 0) {
        response.error = false;
        response.message = `Se logró obtener ${queryReturn.length} resultados de la tabla ${data.table}.`;
        response.response = { data: queryReturn, total: queryReturn.length };
        response.status = 200;
      } else if (queryReturn.length === 0) {
        response.error = false;
        response.message = `Se logró obtener ${queryReturn.length} resultados de la tabla ${data.table}.`;
        response.response = { data: queryReturn, total: queryReturn.length };
        response.status = 200;
      }
    } catch (error) {
      response.message = 'No se logró realizar la Consulta.';
      response.response = {
        errors: { query: [`${error.message}`] },
      };
      response.status = 500;
    }

    // === RESPUESTAS ===
    return response;
  }

  async insertQuery(data: queryDTO): Promise<ResponseDTO> {
    // === INICIALIZACION DE VARIABLES ===
    const response: ResponseDTO = {
      error: true,
      message: 'Existe problemas con insertQuery.',
      response: {},
      status: 422,
    };

    // === OPERACION ===
    try {
      const queryReturn = await this.testRepository
        .createQueryBuilder()
        .insert()
        .into(data.table)
        .values(data.values)
        .execute();

      response.error = false;
      response.message = 'Se lograron registrar los datos correctamente.';
      response.response = queryReturn.identifiers[0].id;
      response.status = 200;
    } catch (error) {
      response.message = 'No se lograron registrar los datos.';
      response.response = {
        errors: { query: [`${error.message}`] },
      };
      response.status = 500;
    }

    // === RESPUESTAS ===
    return response;
  }

  async updateQuery(data: queryDTO): Promise<ResponseDTO> {
    // === INICIALIZACION DE VARIABLES ===
    const response: ResponseDTO = {
      error: true,
      message: 'Existe problemas con updateQuery.',
      response: {},
      status: 422,
    };

    // === OPERACION ===
    try {
      const queryReturn = await this.testRepository
        .createQueryBuilder()
        .update(data.table)
        .set(data.set)
        .where(data.where.where, data.where.values)
        .execute();

      response.error = false;
      response.message = 'Se lograron modificar los datos correctamente.';
      response.response = queryReturn.affected;
      response.status = 200;
    } catch (error) {
      response.message = 'No se logró modificar los datos.';
      response.response = {
        errors: { query: [`${error.message}`] },
      };
      response.status = 500;
    }

    // === RESPUESTAS ===
    return response;
  }

  async deleteQuery(data: queryDTO): Promise<ResponseDTO> {
    // === INICIALIZACION DE VARIABLES ===
    const response: ResponseDTO = {
      error: true,
      message: 'Existe problemas con deleteQuery.',
      response: {},
      status: 422,
    };

    // === OPERACION ===
    try {
      const queryReturn = await this.testRepository
        .createQueryBuilder()
        .delete()
        .from(data.table)
        .where(data.where.where, data.where.values)
        .execute();

      response.error = false;
      response.message = 'Se lograron eliminar los datos correctamente.';
      response.response = queryReturn.affected;
      response.status = 200;
    } catch (error) {
      response.message = 'No se lograron eliminar los datos.';
      response.response = {
        errors: { query: [`${error.message}`] },
      };
      response.status = 500;
    }

    // === RESPUESTAS ===
    return response;
  }
}
