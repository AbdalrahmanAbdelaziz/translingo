import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WordService } from '../services/word.service';
import { Word } from '../shared/models/word.interface';
import { FlagEnum } from '../shared/models/flag.enum';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.css']
})
export class AddWordComponent implements OnInit {
  addWordForm!: FormGroup;

  constructor(
    private wordService: WordService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.addWordForm = new FormGroup({
      title: new FormControl('', Validators.required),
      translation: new FormControl('', Validators.required),
      synonyms: new FormControl(''),
      description: new FormControl(''),
      examples: new FormControl(''),
    });
  }

  onSubmit(): void {
    if (this.addWordForm.valid) {
      const newWord: Word = {
        id: 0,
        title: this.addWordForm.get('title')?.value,
        arabic: this.addWordForm.get('translation')?.value,
        english: this.addWordForm.get('description')?.value,
        synonyms: this.addWordForm.get('synonyms')?.value.split(',').map(s => s.trim()),
        example: this.addWordForm.get('examples')?.value || '',
        flag: FlagEnum.None,
        pageNumber: 1,
        pageSize: 10
      };

      this.wordService.addWord(newWord).subscribe(
        (response) => {
          this.snackBar.open('✅ Word added successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.addWordForm.reset();
        },
        (error) => {
          this.snackBar.open('❌ Failed to add word. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      );
    } else {
      this.snackBar.open('⚠️ Please fill in all required fields.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }
}
