import { splitFileExtension } from '@/common/utils';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { closeSync, openSync, renameSync } from 'fs';
import { FileStorageResult, FileStorageService } from './file-storage.service';

@Injectable()
export class LocalFileStorageService implements FileStorageService {
  constructor(private configService: ConfigService) {}

  async writeFile(
    file: Express.Multer.File,
  ): Promise<FileStorageResult | undefined> {
    if (file.size <= 0) {
      return undefined;
    }

    const fileName = await this.createUniqueFile(file);
    const baseUrl = 'http://localhost:3080/images';
    const relativePath = file.destination
  .replace(/\\/g, '/') // Chuyển dấu gạch chéo ngược thành gạch chéo xuôi
  .split('/images')[1]; // Lấy phần sau "/images"

// Loại bỏ dấu `/` dư thừa ở đầu relativePath nếu có
const cleanRelativePath = relativePath.replace(/^\/+/, '');

    return {
      fileName: fileName,
      url: `${baseUrl}/${cleanRelativePath}/${fileName}`,
    };
  }

  private async createUniqueFile(file: Express.Multer.File): Promise<string> {
    let index = 0;
    let fileName: string | undefined = undefined;
    const originalname = file.originalname;
    const splittedName = splitFileExtension(originalname);
    const destination = file.destination;

    while (!fileName) {
      try {
        const name =
          index > 0
            ? `${splittedName.name}-${index}${splittedName.extension ?? ''}`
            : originalname;
        const dest = `${destination}/${name}`;

        // wx flag to fail on file exists
        closeSync(openSync(dest, 'wx'));

        renameSync(file.path, dest);

        fileName = name;
      } catch (error) {
        await new Promise((resolve) => setTimeout(() => resolve(true), 500));
        index += 1;
      }
    }

    return fileName;
  }
}
