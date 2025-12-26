
import { UserProfile, IdeationData, NormalizedIdea, VoiceExtraction, PersonData } from '../types';

export const llmService = {
  async normalize(data: IdeationData, user: UserProfile, instruction: string): Promise<NormalizedIdea> {
    const response = await fetch('/api/llm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'normalize', data, userEmail: user.email, instruction })
    });
    if (!response.ok) throw new Error("Normalization failed");
    return response.json();
  },

  async processAudio(audioBase64: string, mimeType: string, user: UserProfile, instruction: string): Promise<VoiceExtraction> {
    const response = await fetch('/api/llm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'processAudio', audioBase64, mimeType, instruction })
    });
    if (!response.ok) throw new Error("Audio processing failed");
    return response.json();
  },

  async generateFromPerson(personData: PersonData, instruction: string): Promise<Partial<IdeationData>> {
    const response = await fetch('/api/llm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'generateIdea', personData, instruction })
    });
    if (!response.ok) throw new Error("Generation failed");
    return response.json();
  }
};
