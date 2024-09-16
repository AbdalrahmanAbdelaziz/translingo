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
  
  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    this.translateForm = new FormGroup({
      word: new FormControl('')
    });
  }

  onTranslate(): void {
    const word = this.translateForm.get('word')?.value; 
    if (word) {
      this.translationService.translate(word).subscribe((result: Word | { error: string }) => {
        if ('error' in result) {
          this.translatedWord = result.error;
          this.synonyms = [];
        } else {
          this.translatedWord = result.arabic || 'Translation not found';
          this.synonyms = result.synonyms || [];
        }
      });
    } else {
      this.translatedWord = 'Please enter a word to translate.';
      this.synonyms = [];
    }
  }
}
