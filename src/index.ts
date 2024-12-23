import axios, { AxiosInstance } from "axios";
import { ClientConfig, ErrorResponse } from "./types";
import { VoicesAPI } from "./resources/voices";
import { GenerationsAPI } from "./resources/generations";

export * from "./types";
export * from "./resources/voices";
export * from "./resources/generations";

export class Client {
  private client: AxiosInstance;
  private readonly config: ClientConfig;

  public readonly voices: VoicesAPI;
  public readonly generations: GenerationsAPI;

  constructor(config: ClientConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: "https://api.primvoices.com",
      headers: {
        "Authorization": `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
    });

    // Initialize API resources
    this.voices = new VoicesAPI(this.client);
    this.generations = new GenerationsAPI(this.client);

    // Add error handling interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        throw this.handleError(error);
      }
    );
  }

  private handleError(error: any): ErrorResponse {
    return {
      error: error.response?.data?.message || error.message,
      status: error.response?.status || 500,
      success: false,
    };
  }
} 
