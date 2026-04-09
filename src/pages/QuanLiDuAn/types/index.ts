export interface ProjectEntity {
  id: number;
  title: string;
  mo_ta_ngan?: string;
  mo_ta_chi_tiet?: string;
  thumbnail?: string;
  gallery?: string[];
  category_id?: number;
  tools?: string[];
  tool_details?: ToolDetail[];
  status: 'published' | 'draft';
  order: number;
  ngay_tao?: string;
  ngay_cap_nhat?: string;
}

export interface ToolDetail {
  id: number;
  ten: string;
  ten_cong_nghe?: string; // Add this as optional to be safe
}

export interface ProjectFormValues {
  title: string;
  mo_ta_ngan?: string;
  mo_ta_chi_tiet?: string;
  vai_tro?: string;
  dich_vu?: string;
  tieu_de_phu?: string;
  thumbnail?: any;
  gallery?: any;
  tools?: string[];
  status: boolean;
  order: number;
}
