import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslationService } from '../services/translation.service';
import { Word } from '../shared/models/word.interface';
import { FlagEnum } from '../shared/models/flag.enum'; // Ensure the path is correct
import { ApiResponseDTO } from '../shared/models/api-response.dto';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {
  translateForm!: FormGroup;
  translatedWord: string = ''; 
  englishMeaning: string = ''; 
  example: string = ''; 
  synonyms: string[] = []; 
  synonymsMessage: string = ''; 
  flag: FlagEnum = FlagEnum.None; // Default flag value
  FlagEnum = FlagEnum; // Expose FlagEnum to the template

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    this.translateForm = new FormGroup({
      word: new FormControl('')
    });
  }

  onTranslate(): void {
    const word = this.translateForm.get('word')?.value; 
    if (word) {
      this.translationService.translate(word).subscribe((response: ApiResponseDTO<Word>) => {
        if (response.succeeded) {
          const wordData = response.data; // Single Word object, not an array
          this.translatedWord = wordData.arabic || 'Translation not found';
          this.englishMeaning = wordData.english || 'English meaning not available'; // Correctly getting the 'description'
          this.synonyms = wordData.synonyms || [];
          this.synonymsMessage = this.synonyms.length > 0 ? '' : 'Synonyms not available';
          this.example = wordData.example || 'Example not available';
          this.flag = wordData.flag || FlagEnum.None; // Handle flag
        } else {
          // Handle the case where the response indicates failure
          this.translatedWord = 'Translation not found';
          this.englishMeaning = 'English meaning not available';
          this.synonyms = [];
          this.synonymsMessage = 'Synonyms not available';
          this.example = 'Example not available';
          this.flag = FlagEnum.None; // Handle error state
        }
      });
    } else {
      this.translatedWord = 'Please enter a word to translate.';
      this.englishMeaning = ''; 
      this.synonyms = [];
      this.synonymsMessage = ''; 
      this.example = ''; 
      this.flag = FlagEnum.None; // Handle no input
    }
  }

  playVoice(): void {
    const word = this.translateForm.get('word')?.value;
    if (word) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  }
}
