import type { Model } from "sequelize";
import { Mahasiswa, Nilai, sequelize } from "../models";
import { MahasiswCreate, MahasiswUpdate } from "../types/mahasiswa.type";

export const createMahasiswa = async (data: MahasiswCreate): Promise<Model> => {
  return await Mahasiswa.create(data);
};

export const updateMahasiswa = async (
  id: number,
  data: MahasiswUpdate,
): Promise<Model | null> => {
  const mahasiswa = await Mahasiswa.findByPk(id);

  if (!mahasiswa) {
    return null;
  }

  return await mahasiswa.update(data);
};

export const removeMahasiswa = async (id: number): Promise<Boolean | null> => {
  const mahasiswa = await Mahasiswa.findByPk(id);

  if (!mahasiswa) {
    return null;
  }

  await mahasiswa.destroy();
  return true;
};

export const getAverage = async (): Promise<Model[]> => {
  return await Mahasiswa.findAll({
    include: { model: Nilai, attributes: [] },
    attributes: [
      "nama",
      [sequelize.fn("AVG", sequelize.col("Nilais.nilai")), "rata_rata"],
    ],
    group: ["Mahasiswa.id_mahasiswa"],
  });
};
