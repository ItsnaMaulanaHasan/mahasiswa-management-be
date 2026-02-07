import type { Model } from "sequelize";
import { Mahasiswa, Nilai, sequelize } from "../models";
import { MahasiswCreate, MahasiswUpdate } from "../types/mahasiswa.type";

export interface IMahasiswaRepository {
  createMahasiswa(data: MahasiswCreate): Promise<Model>;
  updateMahasiswa(id: number, data: MahasiswUpdate): Promise<Model | null>;
  removeMahasiswa(id: number): Promise<Boolean | null>;
  getAverage(): Promise<Model[]>;
}

export class MahasiswaRepository implements IMahasiswaRepository {
  async createMahasiswa(data: MahasiswCreate): Promise<Model> {
    return await Mahasiswa.create(data);
  }

  async updateMahasiswa(
    id: number,
    data: MahasiswUpdate,
  ): Promise<Model | null> {
    const mahasiswa = await Mahasiswa.findByPk(id);

    if (!mahasiswa) {
      return null;
    }

    return await mahasiswa.update(data);
  }

  async removeMahasiswa(id: number): Promise<Boolean | null> {
    const mahasiswa = await Mahasiswa.findByPk(id);

    if (!mahasiswa) {
      return null;
    }

    await mahasiswa.destroy();
    return true;
  }

  async getAverage(): Promise<Model[]> {
    return await Mahasiswa.findAll({
      include: { model: Nilai, attributes: [] },
      attributes: [
        "nama",
        [sequelize.fn("AVG", sequelize.col("Nilais.nilai")), "rata_rata"],
      ],
      group: ["Mahasiswa.id_mahasiswa"],
    });
  }
}
