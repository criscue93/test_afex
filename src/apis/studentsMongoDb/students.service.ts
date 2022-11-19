import { Inject, Injectable } from '@nestjs/common';
import { IResponse } from '../../interfaces/IResponse';
import { studentDTO } from './students.dto';
import { DateTime } from 'luxon';
import { calculateAge } from 'src/helper/calculateAge.helper';

@Injectable()
export class StudentMongoDbService {
  constructor(
    @Inject('STUDENT_MODEL')
    private studentModel,
  ) {}

  async list(): Promise<IResponse> {
    /** Inicialización de Variables **/
    const response = {
      error: true,
      message:
        'Existen problemas con el servicio de listar todos los estudiantes.',
      response: {},
      status: 500,
    };

    /** Operación **/
    try {
      const respuesta = await this.studentModel.find().exec();

      response.error = false;
      response.message =
        'Se logró obtener la lista de estudiantes correctamente';
      response.response = respuesta;
      response.status = 200;
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

  async search(body: any) {
    /** Inicialización de Variables **/
    const response = {
      error: true,
      message: 'Existen problemas con el servicio de buscar un estudiante.',
      response: {},
      status: 500,
    };

    /** Operación **/
    const respuesta = await this.studentModel.findById(body.id);

    response.error = false;
    response.message =
      'Se logró obtener los datos del estudiante correctamente.';
    response.response = respuesta;
    response.status = 200;

    /** Respuesta **/
    return response;
  }

  async insert(data: studentDTO): Promise<IResponse> {
    /** Inicialización de Variables **/
    const response = {
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

      const dataInsert = {
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
        estado: 1,
      };

      const respuesta = await this.studentModel(dataInsert);
      await respuesta.save();

      response.error = false;
      response.message = `Se logró registrar al estudiante correctamente.`;
      response.response = {};
      response.status = 200;
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

  async update(data: studentDTO, id: string): Promise<IResponse> {
    /** Inicialización de Variables **/
    const response = {
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

      const dataInsert = {
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
        estado: 1,
      };

      await this.studentModel.findByIdAndUpdate(id, dataInsert);

      response.error = false;
      response.message =
        'Se logró editar los datos del estudiante correctamente.';
      response.response = {};
      response.status = 200;
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

  async delete(id: string): Promise<IResponse> {
    /** Inicialización de Variables **/
    const response = {
      error: true,
      message: 'Existen problemas con el servicio de eliminar un estudiante.',
      response: {},
      status: 500,
    };

    /** Operación **/
    try {
      await this.studentModel.deleteOne({ _id: id });

      response.error = false;
      response.message = 'Se logró eliminar al estudiante correctamente.';
      response.response = {};
      response.status = 200;
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
