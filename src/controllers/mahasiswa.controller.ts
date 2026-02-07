import { Request, Response } from "express";
import { IMahasiswaService } from "../services/mahasiswa.service";

interface httpError extends Error {
  status?: number;
}

export class MahasiswaController {
  constructor(private service: IMahasiswaService) {}

  private handleError(err: unknown, res: Response): void {
    const error = err as httpError;

    if (error.status) {
      res.status(error.status).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const mahasiswa = await this.service.createMahasiswa(req.body);

      res.status(201).json({
        success: true,
        message: "Mahasiswa berhasil ditambahkan",
        result: mahasiswa,
      });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const mahasiswa = await this.service.updateMahasiwa(
        Number(req.params.id),
        req.body,
      );

      res.status(200).json({
        success: true,
        message: "Mahasiswa berhasl diperbarui",
        result: mahasiswa,
      });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  remove = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.service.removeMahasiswa(Number(req.params.id));
      res.status(200).json({
        success: true,
        message: "Mahasiswa berhasil dihapus",
      });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getAverage = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.service.getAverage();

      res.status(200).json({
        success: true,
        message: "Berhasil mendapatkan nilai rata-rata",
        result: result,
      });
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
