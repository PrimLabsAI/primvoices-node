export interface ClientConfig {
  apiKey: string;
}

export interface APIResponse<T> {
  data: T;
  status: number;
  success: boolean;
}

export interface ErrorResponse {
  error: string;
  status: number;
  success: false;
}

export interface VoiceResponse {
  id: string;
  userId: string;
  name: string;
  sampleUrl: string;
  previewUrl: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface VoiceCreateParams {
  name: string;
  sampleUrl: string;
}

export interface GenerationResponse {
  id: string;
  userId: string;
  voiceId: string;
  text: string;
  sourceUrl: string;
  notes: string;
  audioUrl: string;
  quality: string;
  cost: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface GenerationCreateParams {
  voiceId: string;
  text?: string;
  sourceUrl?: string;
  notes?: string;
  quality: 'low' | 'medium' | 'high' | 'voice';
}

export interface PublicVoiceResponse {
  id: string;
  name: string;
  sampleUrl: string;
  previewUrl: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
} 
