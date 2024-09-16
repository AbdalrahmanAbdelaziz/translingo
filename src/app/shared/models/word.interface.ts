import { FlagEnum } from "./flag.enum";

export interface Word {
    id: number;
    title: string;
    arabic: string;
    english: string;
    synonyms: string[];
    examples?: string[];
    pageNumber: number;
    pageSize: number; 
    flag: FlagEnum;
    
  }
  