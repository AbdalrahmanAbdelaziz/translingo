import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { Word } from '../shared/models/word.interface';
import { FlagEnum } from '../shared/models/flag.enum';

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
  currentPage: number = 1; // For paginated quiz questions
  pageSize: number = 5;

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.loadQuizQuestions();
  }

  loadQuizQuestions(): void {
    // Fetch paginated words and shuffle them
    this.translationService.getPaginatedWords(this.currentPage, this.pageSize).subscribe((questions: Word[]) => {
      this.quizQuestions = this.shuffleQuestions(questions);
      this.userAnswers = Array(this.quizQuestions.length).fill('');
    });
  }

  shuffleQuestions(questions: Word[]): Word[] {
    // Shuffle the questions array
    return questions.sort(() => Math.random() - 0.5);
  }

  playWord(word: string): void {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }

  submitQuiz(): void {
    this.score = this.quizQuestions.reduce((total, question, index) => {
      return total + (this.userAnswers[index].toLowerCase() === question.english.toLowerCase() ? 1 : 0);
    }, 0);
    this.quizSubmitted = true;
  }

  nextPage(): void {
    this.currentPage++;
    this.loadQuizQuestions(); // Load new set of questions
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadQuizQuestions(); // Load the previous set of questions
    }
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

  getDifficultyLabel(flag: FlagEnum): string {
    switch (flag) {
      case FlagEnum.Green:
        return 'Easy';
      case FlagEnum.Orange:
        return 'Medium';
      case FlagEnum.Purple:
        return 'Hard';
      case FlagEnum.Red:
        return 'Very Hard';
      default:
        return 'Unknown';
    }
  }
}
