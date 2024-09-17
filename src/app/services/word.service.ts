import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Word } from '../shared/models/word.interface';
import { WORDS_URL } from '../shared/constants/urls';
import { ApiResponseDTO } from '../shared/models/api-response.dto';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private apiUrl = WORDS_URL;

  constructor(private http: HttpClient) {}


  
  addWord(word: Word): Observable<ApiResponseDTO<string>> {
    return this.http.post<ApiResponseDTO<string>>(this.apiUrl, word);
  }
}
