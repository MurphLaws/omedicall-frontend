// Modelos que reflejan los DTOs del backend (a través del gateway).

export interface UserDto {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
}

export interface LoginResponse {
  accessToken: string;
  expiresAt: string;
  user: UserDto;
}

export interface Specialty {
  id: string;
  name: string;
  description: string;
  iconKey: string;
}

export interface LocationDto {
  id: string;
  name: string;
  address?: string;
  city?: string;
  isVirtual: boolean;
  phone?: string;
}

export interface DoctorSummary {
  id: string;
  fullName: string;
  primarySpecialtyName: string;
  locationName: string;
  ratingAverage: number;
  consultationFee: number;
  photoUrl: string;
  isAcceptingPatients: boolean;
}

export interface ArticleSummary {
  id: string;
  title: string;
  slug: string;
  summary: string;
  featuredImageUrl: string;
  category: string;
  authorName: string;
  publishedAt: string;
}

export interface ArticleDetail extends ArticleSummary {
  body: string;
}

export interface NotificationDto {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
