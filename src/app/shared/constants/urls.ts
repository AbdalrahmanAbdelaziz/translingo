const BASE_URL = 'http://localhost:5000';



export const WORDS_URL = BASE_URL + '/api/words';
export const TRANSLATE_WORD_URL = (word: string) => `${WORDS_URL}/${word}`;
export const RANDOM_WORDS_URL = (page: number, pageSize: number) => `${WORDS_URL}?page=${page}&pageSize=${pageSize}`;
