import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private http = inject(HttpClient);
  private geminiAPIUrl = environment.geminiAPIUrl;

  getAiSummary(movieTitle: string): Observable<string> {
    const prompt = `Provide a short, insightful summary (2-3 sentences) for the movie: "${movieTitle}". Focus on the theme and tone, not just the plot.`;
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };
    return this.http.post<GeminiResponse>(this.geminiAPIUrl, requestBody).pipe(
      map((response) => {
        try {
          return response.candidates[0].content.parts[0].text;
        } catch (error) {
          console.error('Error parsing AI response:', error);
          throw new Error('Failed to parse AI summary.');
        }
      })
    );
  }
  searchWithAI(query: string): Observable<string[]> {
    const prompt = `Provide a list of movie titles related to the following query: "${query}". Return only the titles in a comma-separated format.`;
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };
    return this.http.post<GeminiResponse>(this.geminiAPIUrl, requestBody).pipe(
      map((response) => {
        try {
          const text = response.candidates[0].content.parts[0].text;
          return text.split(',').map((title) => title.trim());
        } catch (error) {
          console.error('Error parsing AI response:', error);
          throw new Error('Failed to parse AI search results.');
        }
      })
    );
  }
}
