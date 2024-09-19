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
      title: new FormControl('', Validators.required),
      translation: new FormControl('', Validators.required), // Changed from 'arabic' to 'translation'
      synonyms: new FormControl(''),
      description: new FormControl(''),
      examples: new FormControl(''),
      flag: new FormControl(FlagEnum.None, Validators.required) // Added flag control here
    });
  }

  onSubmit(): void {
    console.log('Form submission initiated');
    console.log('Form valid:', this.addWordForm.valid);
    console.log('Form errors:', this.addWordForm.errors);

    if (this.addWordForm.valid) {
      const newWord: Word = {
        id: 0,
        title: this.addWordForm.get('title')?.value,
        arabic: this.addWordForm.get('translation')?.value,
        english: this.addWordForm.get('english')?.value,
        synonyms: this.addWordForm.get('synonyms')?.value.split(',').map(s => s.trim()),
        example: this.addWordForm.get('examples')?.value || '',
        flag: this.addWordForm.get('flag')?.value, // Use the flag value from the form
        pageNumber: 1, // Set default values if necessary
        pageSize: 10
      };

      console.log('Submitting word:', newWord);

      this.wordService.addWord(newWord).subscribe(
        (response) => {
          console.log('Response:', response);
          this.successMessage = 'Word added successfully!';
          this.errorMessage = undefined;
          this.addWordForm.reset();
        },
        (error) => {
          console.error('Error:', error);
          this.errorMessage = 'Failed to add word. Please try again.';
          this.successMessage = undefined;
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }
}
