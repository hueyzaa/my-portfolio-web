export enum LienHeStatus {
  CHUA_DOC = 'CHUA_DOC',
  DA_LIEN_HE = 'DA_LIEN_HE',
  LUU_TRU = 'LUU_TRU'
}

export interface LienHeEntity {
  id: number;
  hoTen: string;
  email: string;
  soDienThoai?: string;
  chuDe?: string;
  noiDung: string;
  trangThai: LienHeStatus;
  createdAt: string;
  updatedAt: string;
}
