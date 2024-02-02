import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ClaimUpdateRequest {
  @IsInt()
  id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  noTertanggung: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  namaTertanggung: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  namaKaryawan: string;

  @IsString()
  @IsNotEmpty()
  plan: string;

  @IsInt()
  totalKlaim: number;
}