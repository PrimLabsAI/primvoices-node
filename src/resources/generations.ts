import { AxiosInstance } from "axios";

import { APIResponse, GenerationResponse, GenerationCreateParams, PaginationParams, ErrorResponse } from "../types";

export class GenerationsAPI {
  constructor(private readonly client: AxiosInstance) {}

  /**
   * List all generations for the authenticated user
   * GET /v1/generations
   */
  async list(params?: PaginationParams): Promise<APIResponse<GenerationResponse[]>> {
    const response = await this.client.get("/v1/generations", { params });
    return {
      data: response.data.data,
      status: response.status,
      success: true
    };
  }

  /**
   * Get a specific generation by ID
   * GET /v1/generations/:id
   */
  async retrieve(generationId: string): Promise<APIResponse<GenerationResponse>> {
    const response = await this.client.get(`/v1/generations/${generationId}`);
    return {
      data: response.data.data,
      status: response.status,
      success: true
    };
  }

  /**
   * Create a new generation
   * POST /v1/generations
   * 
   * @param params.voiceId - ID of the voice to use
   * @param params.text - Text to generate (required for low/medium/high quality)
   * @param params.sourceUrl - Source audio URL (required for voice quality)
   * @param params.notes - Optional notes for generation style
   * @param params.quality - Quality level (low/medium/high/voice)
   * 
   * @throws {ErrorResponse} When:
   * - quality is not provided
   * - voiceId is not provided
   * - text is not provided for low/medium/high quality
   * - sourceUrl is not provided for voice quality
   * - voice is not found
   * - insufficient balance
   */
  async create(params: GenerationCreateParams): Promise<APIResponse<GenerationResponse>> {
    // Validate required parameters

    if (!params.quality) {
      throw { error: "quality is required", status: 400, success: false } as ErrorResponse;
    }
    if (!params.voiceId) {
      throw { error: "voiceId is required", status: 400, success: false } as ErrorResponse;
    }
    if (["low", "medium", "high"].includes(params.quality) && !params.text) {
      throw { error: `text is required for quality ${params.quality}`, status: 400, success: false } as ErrorResponse;
    }
    if (params.quality === "voice" && !params.sourceUrl) {
      throw { error: "sourceUrl is required for voice quality", status: 400, success: false } as ErrorResponse;
    }

    const response = await this.client.post("/v1/generations", params);
    return {
      data: response.data.data,
      status: response.status,
      success: true
    };
  }

  /**
   * Delete a generation
   * DELETE /v1/generations/:id
   */
  async delete(generationId: string): Promise<APIResponse<void>> {
    const response = await this.client.delete(`/v1/generations/${generationId}`);
    return {
      data: response.data,
      status: response.status,
      success: true
    };
  }
} 
