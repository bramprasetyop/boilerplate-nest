import {
  BeforeCreate,
  Column,
  DataType,
  Default,
  Model,
  Table,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table({
  tableName: 'claims',
  timestamps: true,
  paranoid: true,
})
export class Claim extends Model<Claim> {
  @BeforeCreate
  static generateUuid(instance: Claim) {
    if (!instance.id) {
      instance.id = uuidv4();
    }
  }

  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    field: 'id',
  })
  id: string;

  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    field: 'no_klaim',
  })
  noKlaim: string;

  @Column({
    type: DataType.STRING(255),
    field: 'no_tertanggung',
  })
  noTertanggung: string;

  @Column({
    type: DataType.STRING(255),
    field: 'nama_tertanggung',
  })
  namaTertanggung: string;

  @Column({
    type: DataType.STRING(255),
    field: 'nama_karyawan',
  })
  namaKaryawan: string;

  @Column({
    type: DataType.ENUM('0', '1', '2', '3'),
    field: 'plan',
  })
  plan: string;

  @Column({
    type: DataType.INTEGER,
    field: 'total_klaim',
  })
  totalKlaim: number;

  @Column({
    type: DataType.ENUM('0', '1'),
    field: 'status_submit',
  })
  statusSubmit: string;

  @Column({
    type: DataType.DATE,
    field: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    field: 'updated_at',
  })
  updatedAt: Date;

  @Column({
    type: DataType.DATE,
    field: 'deleted_at',
  })
  deletedAt: Date;
}
