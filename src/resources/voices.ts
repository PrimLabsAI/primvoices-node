import { AxiosInstance } from 'axios';
import { APIResponse, VoiceResponse, VoiceCreateParams, PaginationParams, PublicVoiceResponse } from '../types';

export class VoicesAPI {
  constructor(private readonly client: AxiosInstance) {}

  /**
   * List all voices for the authenticated user
   * GET /v1/voices
   */
  async list(params?: PaginationParams): Promise<APIResponse<VoiceResponse[]>> {
    const response = await this.client.get('/v1/voices', { params });
    return {
      data: response.data.data,
      status: response.status,
      success: true
    };
  }

  /**
   * Get a specific voice by ID
   * GET /v1/voices/:id
   */
  async retrieve(voiceId: string): Promise<APIResponse<VoiceResponse>> {
    const response = await this.client.get(`/v1/voices/${voiceId}`);
    return {
      data: response.data.data,
      status: response.status,
      success: true
    };
  }

  /**
   * Create a new voice
   * POST /v1/voices
   * 
   * @param params.name - Name of the voice
   * @param params.sampleUrl - URL of the sample audio file
   */
  async create(params: VoiceCreateParams): Promise<APIResponse<VoiceResponse>> {
    const response = await this.client.post('/v1/voices', params);
    return {
      data: response.data.data,
      status: response.status,
      success: true
    };
  }

  /**
   * Delete a voice
   * DELETE /v1/voices/:id
   */
  async delete(voiceId: string): Promise<APIResponse<void>> {
    const response = await this.client.delete(`/v1/voices/${voiceId}`);
    return {
      data: response.data,
      status: response.status,
      success: true
    };
  }

  /**
   * List all public voices
   * GET /v1/publicVoices
   */
  async listPublic(params?: PaginationParams): Promise<APIResponse<PublicVoiceResponse[]>> {
    const response = await this.client.get('/v1/publicVoices', { params });
    return {
      data: response.data.data,
      status: response.status,
      success: true
    };
  }

  /**
   * Get a specific public voice by ID
   * GET /v1/publicVoices/:id
   */
  async retrievePublic(voiceId: string): Promise<APIResponse<PublicVoiceResponse>> {
    const response = await this.client.get(`/v1/publicVoices/${voiceId}`);
    return {
      data: response.data.data,
      status: response.status,
      success: true
    };
  }
} 
