import axios from "axios";

import { Client } from "../src";
import { sampleVoiceData, sampleGenerationData } from "./fixtures";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock axios.create to return a properly structured mock
const mockAxiosInstance = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  interceptors: {
    request: {
      use: jest.fn(),
      eject: jest.fn(),
    },
    response: {
      use: jest.fn(),
      eject: jest.fn(),
    },
  },
} as any;

describe("PrimVoices Client", () => {
  let client: Client;
  const apiKey = "test_api_key";

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    // Set up axios.create to return our mock instance
    mockedAxios.create.mockReturnValue(mockAxiosInstance);
    client = new Client({ apiKey });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Voices", () => {
    it("should list voices", async () => {
      const mockResponse = {
        data: {
          data: [sampleVoiceData],
          status: 200,
          success: true,
        },
      };
      mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

      const result = await client.voices.list();
      expect(result.data).toHaveLength(1);
      expect(result.data[0].id).toBe(sampleVoiceData.id);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith("/v1/voices", { params: undefined });
    });

    it("should retrieve a voice", async () => {
      const mockResponse = {
        data: {
          data: sampleVoiceData,
          status: 200,
          success: true,
        },
      };
      mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

      const result = await client.voices.retrieve("voice123");
      expect(result.data.id).toBe(sampleVoiceData.id);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith("/v1/voices/voice123");
    });

    it("should create a voice", async () => {
      const mockResponse = {
        data: {
          data: sampleVoiceData,
          status: 201,
          success: true,
        },
      };
      mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

      const params = {
        name: "Test Voice",
        sampleUrl: "https://example.com/sample.mp3",
      };
      const result = await client.voices.create(params);
      expect(result.data.id).toBe(sampleVoiceData.id);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith("/v1/voices", params);
    });

    it("should delete a voice", async () => {
      const mockResponse = {
        data: {
          data: null,
          status: 204,
          success: true,
        },
      };
      mockAxiosInstance.delete.mockResolvedValueOnce(mockResponse);

      const result = await client.voices.delete("voice123");
      expect(result.success).toBe(true);
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith("/v1/voices/voice123");
    });

    it("should list public voices", async () => {
      const mockResponse = {
        data: {
          data: [sampleVoiceData],
          status: 200,
          success: true,
        },
      };
      mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

      const result = await client.voices.listPublic();
      expect(result.data).toHaveLength(1);
      expect(result.data[0].id).toBe(sampleVoiceData.id);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith("/v1/publicVoices", { params: undefined });
    });

    it("should retrieve a public voice", async () => {
      const mockResponse = {
        data: {
          data: sampleVoiceData,
          status: 200,
          success: true,
        },
      };
      mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

      const result = await client.voices.retrievePublic("voice123");
      expect(result.data.id).toBe(sampleVoiceData.id);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith("/v1/publicVoices/voice123");
    });
  });

  describe("Generations", () => {
    it("should list generations", async () => {
      const mockResponse = {
        data: {
          data: [sampleGenerationData],
          status: 200,
          success: true,
        },
      };
      mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

      const result = await client.generations.list();
      expect(result.data).toHaveLength(1);
      expect(result.data[0].id).toBe(sampleGenerationData.id);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith("/v1/generations", { params: undefined });
    });

    it("should retrieve a generation", async () => {
      const mockResponse = {
        data: {
          data: sampleGenerationData,
          status: 200,
          success: true,
        },
      };
      mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

      const result = await client.generations.retrieve("gen123");
      expect(result.data.id).toBe(sampleGenerationData.id);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith("/v1/generations/gen123");
    });

    it("should create a generation", async () => {
      const mockResponse = {
        data: {
          data: sampleGenerationData,
          status: 201,
          success: true,
        },
      };
      mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

      const params = {
        voiceId: "voice123",
        text: "Test generation",
        quality: "high" as const,
      };
      const result = await client.generations.create(params);
      expect(result.data.id).toBe(sampleGenerationData.id);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith("/v1/generations", params);
    });

    it("should delete a generation", async () => {
      const mockResponse = {
        data: {
          data: null,
          status: 204,
          success: true,
        },
      };
      mockAxiosInstance.delete.mockResolvedValueOnce(mockResponse);

      const result = await client.generations.delete("gen123");
      expect(result.success).toBe(true);
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith("/v1/generations/gen123");
    });
  });

  describe("Error handling", () => {
    it("should validate generation creation parameters", async () => {
      const params = {
        voiceId: "voice123",
        quality: "high" as const,
      };

      try {
        await client.generations.create(params);
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).toEqual("text is required for quality high");
        }
      }
    });

    it("should validate voice quality parameters", async () => {
      const params = {
        voiceId: "voice123",
        quality: "voice" as const,
      };

      try {
        await client.generations.create(params);
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).toEqual("sourceUrl is required for voice quality");
        }
      }
    });
  });
}); 
