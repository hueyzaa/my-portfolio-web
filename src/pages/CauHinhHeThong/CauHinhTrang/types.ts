export interface CauHinhTrangData {
  id: number;
  key: string;
  value: string;
  mo_ta: string;
  loai: 'text' | 'image' | 'number' | 'boolean';
}

export type CauHinhKey =
  | 'HEADER_LOGO'
  | 'HEADER_TITLE'
  | 'FOOTER_LOGO'
  | 'FOOTER_COPYRIGHT'
  | 'FOOTER_DESCRIPTION'
  | 'CONTACT_EMAIL'
  | 'CONTACT_PHONE'
  | 'CONTACT_ADDRESS';
