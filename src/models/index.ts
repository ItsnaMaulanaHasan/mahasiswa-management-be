import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

export class Mahasiswa extends Model<
  InferAttributes<Mahasiswa>,
  InferCreationAttributes<Mahasiswa>
> {
  declare id_mahasiswa: CreationOptional<number>;
  declare nama: string;
  declare alamat: string;
}

Mahasiswa.init(
  {
    id_mahasiswa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: DataTypes.STRING,
    },
    alamat: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "mahasiswa",
    timestamps: false,
  },
);

export class MataKuliah extends Model<
  InferAttributes<MataKuliah>,
  InferCreationAttributes<MataKuliah>
> {
  declare id_mata_kuliah: CreationOptional<number>;
  declare nama_mata_kuliah: string;
}

MataKuliah.init(
  {
    id_mata_kuliah: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_mata_kuliah: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "mata_kuliah",
    timestamps: false,
  },
);

export class Nilai extends Model<
  InferAttributes<Nilai>,
  InferCreationAttributes<Nilai>
> {
  declare id_nilai: CreationOptional<number>;
  declare id_mahasiswa: number;
  declare id_mata_kuliah: number;
  declare nilai: number;
}

Nilai.init(
  {
    id_nilai: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_mahasiswa: {
      type: DataTypes.INTEGER,
      references: {
        model: Mahasiswa,
        key: "id_mahasiswa",
      },
    },
    id_mata_kuliah: {
      type: DataTypes.INTEGER,
      references: {
        model: MataKuliah,
        key: "id_mata_kuliah",
      },
    },
    nilai: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize,
    tableName: "nilai",
    timestamps: false,
  },
);

Mahasiswa.hasMany(Nilai, { foreignKey: "id_mahasiswa" });
Nilai.belongsTo(Mahasiswa, { foreignKey: "id_mahasiswa" });

MataKuliah.hasMany(Nilai, { foreignKey: "id_mata_kuliah" });
Nilai.belongsTo(MataKuliah, { foreignKey: "id_mata_kuliah" });
