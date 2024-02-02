export class ClaimResponse {
  readonly id: string;
  readonly noKlaim: string;
  readonly noTertanggung: string;
  readonly namaTertanggung: string;
  readonly namaKaryawan: string;
  readonly plan: string;
  readonly totalKlaim: number;
  readonly statusSubmit: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
}
