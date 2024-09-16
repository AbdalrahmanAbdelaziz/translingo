import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WordService } from '../services/word.service';
import { Word } from '../shared/models/word.interface';
import { FlagEnum } from '../shared/models/flag.enum';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.css']
})
export class AddWordComponent implements OnInit {
  addWordForm!: FormGroup;
  successMessage?: string;
  errorMessage?: string;

  flagOptions = [
    { label: 'None', value: FlagEnum.None },
    { label: 'Green', value: FlagEnum.Green },
    { label: 'Orange', value: FlagEnum.Orange },
    { label: 'Purple', value: FlagEnum.Purple },
    { label: 'Red', value: FlagEnum.Red },
  ];

  constructor(private wordService: WordService, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.addWordForm = new FormGroup({
      word: new FormControl('', [Validators.required, Validators.minLength(2)]),
      translation: new FormControl('', Validators.required),
      synonyms: new FormControl('', Validators.required),
      description: new FormControl(''),
      examples: new FormControl(''),
      flag: new FormControl(FlagEnum.None, Validators.required),
      pageNumber: new FormControl('', Validators.required),
      pageSize: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    if (this.addWordForm.valid) {
      const newWord: Word = {
        id: 0,
        title: this.addWordForm.get('title')?.value,
        english: this.addWordForm.get('word')?.value,
        arabic: this.addWordForm.get('translation')?.value,
        synonyms: this.addWordForm.get('synonyms')?.value.split(',').map(s => s.trim()),
        examples: this.addWordForm.get('examples')?.value ? this.addWordForm.get('examples')?.value.split(';') : [],
        flag: FlagEnum.None,  
        pageNumber: this.addWordForm.get('pageNumber')?.value,  
        pageSize: this.addWordForm.get('pageSize')?.value      
      };
  
      this.wordService.addWord(newWord).subscribe(
        (response) => {
          this.successMessage = 'Word added successfully!';
          this.errorMessage = undefined;
          this.addWordForm.reset();
        },
        (error) => {
          this.errorMessage = 'Failed to add word. Please try again.';
          this.successMessage = undefined;
        }
      );
    }
  }
  

  navigateHome(): void {
    this.router.navigate(['/']);
  }
}
