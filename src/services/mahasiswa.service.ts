import { Model } from "sequelize";
import * as repository from "../repositories/mahasiswa.repository";
import { MahasiswCreate, MahasiswUpdate } from "../types/mahasiswa.type.js";

export const createMahasiswa = async (data: MahasiswCreate): Promise<Model> => {
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

  return await repository.createMahasiswa(data);
};

export const updateMahasiwa = async (
  id: number,
  data: MahasiswUpdate,
): Promise<Model> => {
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

  const mahasiswa = await repository.updateMahasiswa(id, data);

  if (!mahasiswa) {
    throw {
      status: 404,
      message: "Mahasiswa tidak ditemukan!",
    };
  }

  return mahasiswa;
};

export const removeMahasiswa = async (id: number): Promise<Boolean> => {
  const result = await repository.removeMahasiswa(id);
  if (!result) {
    throw {
      status: 404,
      message: "Mahasiswa tidak ditemukan!",
    };
  }

  return result;
};

export const getAverage = async (): Promise<Model[]> => {
  return await repository.getAverage();
};
