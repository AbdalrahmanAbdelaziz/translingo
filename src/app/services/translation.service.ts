import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Word } from '../shared/models/word.interface';
import { RANDOM_WORDS_URL, TRANSLATE_WORD_URL } from '../shared/constants/urls';
import { ApiResponseDTO } from '../shared/models/api-response.dto';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private http: HttpClient) {}

  getPaginatedWords(page: number, pageSize: number): Observable<ApiResponseDTO<Word[]>> {
    const url = RANDOM_WORDS_URL(page, pageSize);
    return this.http.get<ApiResponseDTO<Word[]>>(url).pipe(
      catchError(() => of({ statusCode: 500, succeeded: false, message: 'Error fetching words', data: [] }))
    );
  }

  translate(word: string): Observable<ApiResponseDTO<Word>> {
    const url = TRANSLATE_WORD_URL(word);
    return this.http.get<ApiResponseDTO<Word>>(url).pipe(
      catchError(() => of({ statusCode: 500, succeeded: false, message: 'Translation not found', data: null }))
    );
  }
}
