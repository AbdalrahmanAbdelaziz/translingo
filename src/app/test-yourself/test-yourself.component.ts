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

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.loadQuizQuestions();
  }

  loadQuizQuestions(): void {
    this.translationService.getPaginatedWords(this.currentPage, this.pageSize).subscribe({
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
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    return questions;
  }

  playWord(word: string): void {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }

  submitQuiz(): void {
    this.score = this.quizQuestions.reduce((total, question, index) => {
      return total + (this.userAnswers[index].toLowerCase() === question.title.toLowerCase() ? 1 : 0);
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
    this.translationService.getPaginatedWords(this.currentPage + 1, this.pageSize).subscribe({
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
    const isCorrect = this.userAnswers[index].toLowerCase() === this.quizQuestions[index].title.toLowerCase();
    return isCorrect ? 'correct-answer' : 'incorrect-answer';
  }

  getFlagClass(flag: FlagEnum): string {
    switch (flag) {
      case FlagEnum.Green:
        return 'green';
      case FlagEnum.Orange:
        return 'orange';
      case FlagEnum.Purple:
        return 'purple';
      case FlagEnum.Red:
        return 'red';
      default:
        return '';
    }
  }

  isQuizSubmitted(): boolean {
    return this.quizSubmitted;
  }
}
