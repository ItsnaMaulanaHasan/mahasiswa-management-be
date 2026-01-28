import { InferCreationAttributes } from "sequelize";
import { Mahasiswa, MataKuliah, Nilai, sequelize } from "../models";

const seedDatabase = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database seeded!");

    const mahasiswaData: InferCreationAttributes<
      Mahasiswa,
      { omit: "id_mahasiswa" }
    >[] = [
      { nama: "Itsna Maulana", alamat: "Semarang" },
      { nama: "Budi Santoso", alamat: "Jakarta" },
      { nama: "Siti Aminah", alamat: "Bandung" },
    ];

    const mahasiswa = await Mahasiswa.bulkCreate(mahasiswaData);
    console.log("Mahasiswa seeded!");

    const mataKuliahData: InferCreationAttributes<
      MataKuliah,
      { omit: "id_mata_kuliah" }
    >[] = [
      { nama_mata_kuliah: "Matematika" },
      { nama_mata_kuliah: "Fisika" },
      { nama_mata_kuliah: "Pemrograman" },
    ];

    const mataKuliah = await MataKuliah.bulkCreate(mataKuliahData);
    console.log("Mata kuliah seeded!");

    const nilaiData: InferCreationAttributes<Nilai, { omit: "id_nilai" }>[] = [
      {
        id_mahasiswa: mahasiswa[0]!.id_mahasiswa,
        id_mata_kuliah: mataKuliah[0]!.id_mata_kuliah,
        nilai: 80,
      },
      {
        id_mahasiswa: mahasiswa[0]!.id_mahasiswa,
        id_mata_kuliah: mataKuliah[1]!.id_mata_kuliah,
        nilai: 90,
      },
      {
        id_mahasiswa: mahasiswa[1]!.id_mahasiswa,
        id_mata_kuliah: mataKuliah[0]!.id_mata_kuliah,
        nilai: 75,
      },
      {
        id_mahasiswa: mahasiswa[1]!.id_mahasiswa,
        id_mata_kuliah: mataKuliah[2]!.id_mata_kuliah,
        nilai: 85,
      },
      {
        id_mahasiswa: mahasiswa[2]!.id_mahasiswa,
        id_mata_kuliah: mataKuliah[1]!.id_mata_kuliah,
        nilai: 95,
      },
    ];

    await Nilai.bulkCreate(nilaiData);
    console.log("Nilai seeded!");

    console.log("Seeder finished successfully!");
  } catch (error) {
    console.error("Seeder error: ", error);
  }
};

seedDatabase();
