export const sampleVoiceData = {
  id: 'voice123',
  userId: 'user123',
  name: 'Test Voice',
  sampleUrl: 'https://example.com/sample.mp3',
  previewUrl: 'https://example.com/preview.mp3',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const sampleGenerationData = {
  id: 'gen123',
  userId: 'user123',
  voiceId: 'voice123',
  text: 'Test generation',
  sourceUrl: 'https://example.com/source',
  notes: 'Test notes',
  audioUrl: 'https://example.com/audio.mp3',
  quality: 'high',
  cost: 1.0,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
}; 
