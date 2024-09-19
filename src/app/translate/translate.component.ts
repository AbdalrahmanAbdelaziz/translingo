import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslationService } from '../services/translation.service';
import { Word } from '../shared/models/word.interface';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {
  translateForm!: FormGroup;
  translatedWord: string = ''; 
  synonyms: string[] = []; 
  examples: string[] = []; 
  
  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    this.translateForm = new FormGroup({
      word: new FormControl('')
    });
  }

  onTranslate(): void {
    const word = this.translateForm.get('word')?.value; 
    if (word) {
      this.translationService.translate(word).subscribe((result: { data: Word[] } | { error: string }) => {
        if ('error' in result) {
          this.translatedWord = result.error;
          this.synonyms = [];
          this.examples = [];
        } else if (result.data.length > 0) {
          const wordData = result.data[0];
          this.translatedWord = wordData.arabic || 'Translation not found';
          this.synonyms = wordData.synonyms || [];
          this.examples = wordData.examples || [];
        } else {
          this.translatedWord = 'Translation not found';
          this.synonyms = [];
          this.examples = [];
        }
      });
    } else {
      this.translatedWord = 'Please enter a word to translate.';
      this.synonyms = [];
      this.examples = [];
    }
  }
}
