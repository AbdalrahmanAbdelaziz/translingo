import { Component, OnInit } from '@angular/core';
import { Word } from '../shared/models/word.interface';
import { WordService } from '../services/word.service';
import { ApiResponseDTO } from '../shared/models/api-response.dto';
import { Router } from '@angular/router';
import { FlagEnum } from '../shared/models/flag.enum';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {
  words: Word[] = [];
  wordToEdit: Word | null = null;
  editMode: boolean = false;
  showModal: boolean = false;
  wordToDeleteId: number | null = null;
  currentPage: number = 1;
  pageSize: number = 5; 
  totalWords: number = 0;
  paginatedWords: Word[] = [];
  selectedFlag: FlagEnum = FlagEnum.None; // Default flag selection

  // Define the flags mapping
  flags = {
    None: 0,
    Green: 1,
    Orange: 2,
    Purple: 3,
    Red: 4
  };

  constructor(private wordService: WordService, private router: Router) {}

  ngOnInit(): void {
    this.loadAllWords();
  }

  loadAllWords(): void {
    this.wordService.getAllWords(this.currentPage, 1000, this.selectedFlag).subscribe({
      next: (response: ApiResponseDTO<Word[]>) => {
        if (response.succeeded && Array.isArray(response.data)) {
          this.words = response.data;
          this.totalWords = this.words.length;
          this.updatePaginatedWords();
        } else {
          console.error("Error fetching words:", response.message);
        }
      },
      error: (error) => {
        console.error("Error fetching words", error);
      }
    });
  }

  updatePaginatedWords(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedWords = this.words.slice(startIndex, startIndex + this.pageSize);
  }

  onFlagChange(): void {
    this.currentPage = 1; // Reset to the first page when flag changes
    this.loadAllWords(); // Fetch words again with the selected flag
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
            this.updatePaginatedWords(); 
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
    this.showModal = true;
  }

  deleteWord(): void {
    if (this.wordToDeleteId) {
      this.wordService.deleteWord(this.wordToDeleteId).subscribe({
        next: (response) => {
          if (response.succeeded) {
            this.words = this.words.filter(word => word.id !== this.wordToDeleteId);
            this.closeModal();
            this.updatePaginatedWords(); 
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
    this.wordToDeleteId = null;
  }

  navigateHome(): void {
    this.router.navigate(['/home']);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedWords();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedWords();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalWords / this.pageSize);
  }

  updateWordFlag(word: Word): void {
    this.wordService.updateWord(word.id, word).subscribe({
      next: (response) => {
        if (!response.succeeded) {
          console.error("Error updating flag:", response.message);
        }
      },
      error: (error) => {
        console.error("Error updating flag", error);
      }
    });
  }

  getFlagColor(flag: number): string {
    const colors = {
      1: 'green',
      2: 'orange',
      3: 'purple',
      4: 'red'
    };
    return colors[flag] || 'black'; 
  }
}
