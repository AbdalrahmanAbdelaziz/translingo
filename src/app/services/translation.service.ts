import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Word } from '../shared/models/word.interface';
import { RANDOM_WORDS_URL, TRANSLATE_WORD_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private http: HttpClient) {}

  getPaginatedWords(page: number, pageSize: number): Observable<Word[]> {
    const url = RANDOM_WORDS_URL(page, pageSize);
    return this.http.get<Word[]>(url).pipe(
      catchError(() => of([]))
    );
  }

  translate(word: string): Observable<Word | { error: string }> {
    const url = TRANSLATE_WORD_URL(word);
    return this.http.get<Word>(url).pipe(
      catchError(() => of({ error: 'Translation not found' }))
    );
  }
}
