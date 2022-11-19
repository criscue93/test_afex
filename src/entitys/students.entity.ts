import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class students {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  primerApellido: string;

  @Column({ type: 'varchar', length: 50 })
  segundoApellido: string;

  @Column({ type: 'varchar', length: 150 })
  nombreCompleto: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  numeroDocumento: string;

  @Column({ type: 'varchar', length: 2 })
  sexo: string;

  @Column({ type: 'date', nullable: true })
  fechaNacimiento: Date;

  @Column({ type: 'int', nullable: true })
  edad: number;

  @Column({ type: 'varchar', length: 15, default: null })
  celular: string;

  @Column({ type: 'varchar', length: 70 })
  email: string;

  @Column({ type: 'varchar', length: 200 })
  direccion: string;

  @Column({
    default: 1,
    type: 'tinyint',
    unsigned: true,
    comment: '0 = INACTIVO - 1 = ACTIVO',
  })
  estado: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
