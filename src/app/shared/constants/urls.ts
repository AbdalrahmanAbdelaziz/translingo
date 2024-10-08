import { FlagEnum } from "../models/flag.enum";

const BASE_URL = "https://studywithmina.runasp.net";

export const WORDS_URL = BASE_URL + '/api/Words';  
export const TRANSLATE_WORD_URL = (word: string) => `${WORDS_URL}/${word}`;
export const RANDOM_WORDS_URL = (page: number, pageSize: number, flag: FlagEnum) => 
  `${WORDS_URL}?PageNumber=${page}&PageSize=${pageSize}&Flag=${flag}`;



export const UPDATE_WORD_URL = (id: number) => `${WORDS_URL}/${id}`;
export const DELETE_WORD_URL = (id: number) => `${WORDS_URL}/${id}`;
