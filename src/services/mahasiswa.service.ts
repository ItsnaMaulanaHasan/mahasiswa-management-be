import { Model } from "sequelize";
import { IMahasiswaRepository } from "../repositories/mahasiswa.repository";
import { MahasiswCreate, MahasiswUpdate } from "../types/mahasiswa.type.js";

export interface IMahasiswaService {
  createMahasiswa(data: MahasiswCreate): Promise<Model>;
  updateMahasiwa(id: number, data: MahasiswUpdate): Promise<Model>;
  removeMahasiswa(id: number): Promise<Boolean>;
  getAverage(): Promise<Model[]>;
}

export class MahasiswaService implements IMahasiswaService {
  constructor(private mahasiswaRepository: IMahasiswaRepository) {}

  async createMahasiswa(data: MahasiswCreate): Promise<Model> {
    const validFields = ["nama", "alamat"];

    const invalidKeys = Object.keys(data).filter(
      (key) => !validFields.includes(key),
    );

    if (invalidKeys.length > 0) {
      throw {
        status: 400,
        message: `Field tidak valid: ${invalidKeys.join(", ")}`,
      };
    }

    if (!data.nama || !data.alamat) {
      throw {
        status: 400,
        message: "Harap periksa data yang dikirim!",
      };
    }

    return await this.mahasiswaRepository.createMahasiswa(data);
  }

  async updateMahasiwa(id: number, data: MahasiswUpdate): Promise<Model> {
    if (!data || Object.keys(data).length === 0) {
      throw {
        status: 400,
        message: "Harap kirim setidaknya satu field untuk diupdate!",
      };
    }

    const validFields = ["nama", "alamat"];

    const invalidKeys = Object.keys(data).filter(
      (key) => !validFields.includes(key),
    );

    if (invalidKeys.length > 0) {
      throw {
        status: 400,
        message: `Field tidak valid: ${invalidKeys.join(", ")}`,
      };
    }

    const mahasiswa = await this.mahasiswaRepository.updateMahasiswa(id, data);

    if (!mahasiswa) {
      throw {
        status: 404,
        message: "Mahasiswa tidak ditemukan!",
      };
    }

    return mahasiswa;
  }

  async removeMahasiswa(id: number): Promise<Boolean> {
    const result = await this.mahasiswaRepository.removeMahasiswa(id);
    if (!result) {
      throw {
        status: 404,
        message: "Mahasiswa tidak ditemukan!",
      };
    }

    return result;
  }

  async getAverage(): Promise<Model[]> {
    return await this.mahasiswaRepository.getAverage();
  }
}
