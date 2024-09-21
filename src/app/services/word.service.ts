import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Word } from '../shared/models/word.interface';
import { DELETE_WORD_URL, RANDOM_WORDS_URL, UPDATE_WORD_URL, WORDS_URL } from '../shared/constants/urls';
import { ApiResponseDTO } from '../shared/models/api-response.dto';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(private http: HttpClient) {}

  addWord(word: Word): Observable<ApiResponseDTO<string>> {
    return this.http.post<ApiResponseDTO<string>>(WORDS_URL, word);
  }

  getAllWords(page: number, pageSize: number): Observable<ApiResponseDTO<Word[]>> {
    return this.http.get<ApiResponseDTO<Word[]>>(RANDOM_WORDS_URL(page, pageSize));
  }

  updateWord(id: number, updateWord: Word): Observable<ApiResponseDTO<any>> {
    return this.http.put<ApiResponseDTO<any>>(UPDATE_WORD_URL(id), updateWord);
  }

  deleteWord(id: number): Observable<ApiResponseDTO<any>> {
    return this.http.delete<ApiResponseDTO<any>>(DELETE_WORD_URL(id));
  }

  
}
