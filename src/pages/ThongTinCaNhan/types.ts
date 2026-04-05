export interface ProfileData {
  id: number;
  ho_ten: string;
  tieu_su: string;
  chuc_danh: string;
  avatar: string;
  email: string;
  so_dien_thoai: string;
  dia_chi: string;
  cv_file: string;
}

export interface SkillData {
  id: number;
  ten: string;
  muc_do: number;
  loai?: string;
  thu_tu: number;
}

export interface ExperienceData {
  id: number;
  chuc_vu: string;
  cong_ty: string;
  mo_ta: string;
  bat_dau: string;
  ket_thuc: string;
  dang_lam_viec: boolean;
  thu_tu: number;
}

export interface EducationData {
  id: number;
  bang_cap: string;
  truong_hoc: string;
  mo_ta: string;
  bat_dau: string;
  ket_thuc: string;
  thu_tu: number;
}

export interface SocialLinkData {
  id: number;
  nen_tang: string;
  url: string;
  bieu_tuong: string;
  thu_tu: number;
}

export interface FullProfileData {
  profile: ProfileData;
  skills: SkillData[];
  experiences: ExperienceData[];
  education: EducationData[];
  socialLinks: SocialLinkData[];
}
