import { Component, OnInit } from '@angular/core';
import { Word } from '../shared/models/word.interface';
import { WordService } from '../services/word.service';
import { ApiResponseDTO } from '../shared/models/api-response.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {
  words: Word[] = [];
  wordToEdit: Word | null = null;
  editMode: boolean = false;
  showModal: boolean = false; // New property
  wordToDeleteId: number | null = null; // Store ID of the word to delete

  constructor(private wordService: WordService, private router: Router) { }

  ngOnInit(): void {
    this.loadAllWords();
  }

  loadAllWords(): void {
    this.wordService.getAllWords(1, 1000).subscribe({
      next: (response: ApiResponseDTO<Word[]>) => {
        if (response.succeeded && Array.isArray(response.data)) {
          this.words = response.data;
        } else {
          console.error("Error fetching words:", response.message);
        }
      },
      error: (error) => {
        console.error("Error fetching words", error);
      }
    });
  }

  editWord(word: Word): void {
    this.wordToEdit = { ...word };
    this.editMode = true;
  }

  saveUpdatedWord(): void {
    if (this.wordToEdit) {
      this.wordService.updateWord(this.wordToEdit.id, this.wordToEdit).subscribe({
        next: (response) => {
          if (response.succeeded) {
            const index = this.words.findIndex(w => w.id === this.wordToEdit!.id);
            if (index !== -1) {
              this.words[index] = { ...this.wordToEdit! };
            }
            this.cancelEdit();
          } else {
            console.error("Error updating word:", response.message);
          }
        },
        error: (error) => {
          console.error("Error updating word", error);
        }
      });
    }
  }

  cancelEdit(): void {
    this.wordToEdit = null;
    this.editMode = false;
  }

  confirmDelete(id: number): void {
    this.wordToDeleteId = id;
    this.showModal = true; // Show the modal
  }

  deleteWord(): void {
    if (this.wordToDeleteId) {
      this.wordService.deleteWord(this.wordToDeleteId).subscribe({
        next: (response) => {
          if (response.succeeded) {
            this.words = this.words.filter(word => word.id !== this.wordToDeleteId);
            this.closeModal(); // Close the modal
          } else {
            console.error("Error deleting word:", response.message);
          }
        },
        error: (error) => {
          console.error("Error deleting word", error);
        }
      });
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.wordToDeleteId = null; // Reset the ID
  }

  navigateHome(): void {
    this.router.navigate(['/home']);
  }
}
