import { FlagEnum } from "./flag.enum";

export interface Word {
  id: number;
  title: string;
  arabic: string;
  english: string;
  example: string; 
  synonyms: string[];
  flag: FlagEnum;
  pageNumber: number;
  pageSize: number;
}


