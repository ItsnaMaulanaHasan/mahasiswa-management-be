import { Request, Response } from "express";
import * as service from "../services/mahasiswa.service";

interface httpError extends Error {
  status?: number;
}

const handleError = (err: unknown, res: Response): void => {
  const error = err as httpError;

  if (error.status) {
    res.status(error.status).json({
      success: false,
      message: error.message,
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const mahasiswa = await service.createMahasiswa(req.body);

    res.status(201).json({
      success: true,
      message: "Mahasiswa berhasil ditambahkan",
      result: mahasiswa,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const mahasiswa = await service.updateMahasiwa(
      Number(req.params.id),
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Mahasiswa berhasl diperbarui",
      result: mahasiswa,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    await service.removeMahasiswa(Number(req.params.id));
    res.status(200).json({
      success: true,
      message: "Mahasiswa berhasil dihapus",
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getAverage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await service.getAverage();

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan nilai rata-rata",
      result: result,
    });
  } catch (error) {
    handleError(error, res);
  }
};
