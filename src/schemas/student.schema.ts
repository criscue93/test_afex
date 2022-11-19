import * as mongoose from 'mongoose';

export const StudentSchema = new mongoose.Schema({
  nombre: String,
  primerApellido: String,
  segundoApellido: String,
  nombreCompleto: String,
  numeroDocumento: String,
  sexo: String,
  fechaNacimiento: Date,
  edad: Number,
  celular: Number,
  email: String,
  direccion: String,
  estado: Number,
  createdAt: Date,
});
