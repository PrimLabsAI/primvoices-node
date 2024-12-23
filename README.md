# Prim Voices API Client

A TypeScript client for interacting with the Prim Voices API.

## Installation

```bash
npm install primvoices
```

## Usage

```typescript
import { Client } from 'primvoices';

// Initialize the client
const client = new Client({
  apiKey: 'your-api-key',
  // Optional: override the base URL
  // baseURL: 'https://custom-api-url.com'
});

// Working with Voices
async function voiceExamples() {
  // List all voices
  const voices = await client.voices.list();
  console.log('Your voices:', voices.data);

  // List public voices
  const publicVoices = await client.voices.listPublic();
  console.log('Public voices:', publicVoices.data);

  // Create a new voice
  const newVoice = await client.voices.create({
    name: 'My Custom Voice',
    sampleUrl: 'https://example.com/sample.wav'
  });
  console.log('Created voice:', newVoice.data);

  // Get a specific voice
  const voice = await client.voices.retrieve('voice_id');
  console.log('Voice details:', voice.data);

  // Get a public voice
  const publicVoice = await client.voices.retrievePublic('public_voice_id');
  console.log('Public voice details:', publicVoice.data);
}

// Working with Generations
async function generationExamples() {
  // List all generations
  const generations = await client.generations.list();
  console.log('All generations:', generations.data);

  // Create a new text-to-speech generation
  const newGeneration = await client.generations.create({
    voiceId: 'voice_id',
    text: 'Hello, this is a test generation.',
    quality: 'high',
    notes: 'Read in a friendly tone'
  });
  console.log('Created generation:', newGeneration.data);

  // Create a voice cloning generation
  const voiceClone = await client.generations.create({
    voiceId: 'voice_id',
    sourceUrl: 'https://example.com/source-audio.wav',
    quality: 'voice'
  });
  console.log('Created voice clone:', voiceClone.data);
```

## API Resources

### Voices

- `client.voices.list()` - List all voices for the authenticated user
- `client.voices.listPublic()` - List all public voices
- `client.voices.create(params)` - Create a new voice
- `client.voices.retrieve(voiceId)` - Get a specific voice
- `client.voices.retrievePublic(voiceId)` - Get a specific public voice
- `client.voices.delete(voiceId)` - Delete a voice

### Generations

- `client.generations.list()` - List all generations
- `client.generations.create(params)` - Create a new generation
- `client.generations.retrieve(generationId)` - Get a specific generation
- `client.generations.delete(generationId)` - Delete a generation

## Development

1. Clone the repository

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the package:
   ```bash
   npm run build
   ```

4. Run tests:
   ```bash
   npm test
   ```

## License

MIT 
