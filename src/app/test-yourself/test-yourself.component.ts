import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { Word } from '../shared/models/word.interface';
import { FlagEnum } from '../shared/models/flag.enum';
import { ApiResponseDTO } from '../shared/models/api-response.dto';

@Component({
  selector: 'app-test-yourself',
  templateUrl: './test-yourself.component.html',
  styleUrls: ['./test-yourself.component.css']
})
export class TestYourselfComponent implements OnInit {
  quizQuestions: Word[] = [];
  userAnswers: string[] = [];
  score: number = 0;
  quizSubmitted: boolean = false;
  currentPage: number = 1;
  pageSize: number = 5;
  answeredPages: { [page: number]: string[] } = {};
  nextPageAvailable: boolean = false;
  selectedFlag: FlagEnum = FlagEnum.None;
  flags = FlagEnum;

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.loadQuizQuestions();
  }

  loadQuizQuestions(): void {
    this.translationService.getPaginatedWords(this.currentPage, this.pageSize, this.selectedFlag).subscribe({
      next: (response: ApiResponseDTO<Word[]>) => {
        if (response.succeeded && Array.isArray(response.data)) {
          this.quizQuestions = this.shuffleQuestions(response.data);
          this.userAnswers = this.answeredPages[this.currentPage] || Array(this.quizQuestions.length).fill('');
          this.checkNextPageAvailability();
        } else {
          console.error("Error response:", response.message);
        }
      },
      error: (error) => {
        console.error("Error fetching quiz questions", error);
      }
    });
  }

  shuffleQuestions(questions: Word[]): Word[] {
    return questions.sort(() => Math.random() - 0.5);
  }

  playWord(word: string): void {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }

  submitQuiz(): void {
    this.score = this.quizQuestions.reduce((total, question, index) => {
      const userAnswer = this.userAnswers[index].trim().toLowerCase();
      return total + (userAnswer === question.title.toLowerCase() ? 1 : 0);
    }, 0);
    this.quizSubmitted = true;
    this.answeredPages[this.currentPage] = [...this.userAnswers];
  }

  nextPage(): void {
    this.answeredPages[this.currentPage] = [...this.userAnswers];
    this.currentPage++;
    this.loadQuizQuestions();
    this.quizSubmitted = false;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.answeredPages[this.currentPage] = [...this.userAnswers];
      this.currentPage--;
      this.loadQuizQuestions();
      this.quizSubmitted = false;
    }
  }

  checkNextPageAvailability(): void {
    this.translationService.getPaginatedWords(this.currentPage + 1, this.pageSize, this.selectedFlag).subscribe({
      next: (response: ApiResponseDTO<Word[]>) => {
        this.nextPageAvailable = response.succeeded && Array.isArray(response.data) && response.data.length > 0;
      },
      error: (error) => {
        console.error("Error checking next page availability", error);
      }
    });
  }

  getAnswerClass(index: number): string {
    if (!this.quizSubmitted) return '';
    return this.userAnswers[index].trim().toLowerCase() === this.quizQuestions[index].title.toLowerCase()
      ? 'correct-answer' : 'incorrect-answer';
  }

  isQuizSubmitted(): boolean {
    return this.quizSubmitted;
  }

  onFlagChange(): void {
    this.currentPage = 1;
    this.loadQuizQuestions();
  }

  getFlagClass(flag: FlagEnum): string {
    const classes = {
      [FlagEnum.Green]: 'flag-green',
      [FlagEnum.Orange]: 'flag-orange',
      [FlagEnum.Purple]: 'flag-purple',
      [FlagEnum.Red]: 'flag-red',
    };
    return classes[flag] || '';
  }
}
