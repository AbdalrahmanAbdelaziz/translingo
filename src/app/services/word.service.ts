import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Word } from '../shared/models/word.interface';
import { WORDS_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private apiUrl = WORDS_URL;

  constructor(private http: HttpClient) {}


  
  addWord(word: Word): Observable<Word> {
    return this.http.post<Word>(this.apiUrl, word);
  }
}
