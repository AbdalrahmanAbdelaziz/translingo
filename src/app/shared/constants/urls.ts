// const BASE_URL = 'http://studywithmina.runasp.net';


// export const WORDS_URL = BASE_URL + '/api/Words';
// export const TRANSLATE_WORD_URL = (word: string) => `${WORDS_URL}/${word}`;
// export const RANDOM_WORDS_URL = (page: number, pageSize: number) => `${WORDS_URL}?PageNumber=${page}&PageSize=${pageSize}`;

// Use a relative path for API endpoints
const BASE_URL = '/api';

export const WORDS_URL = BASE_URL + '/Words';
export const TRANSLATE_WORD_URL = (word: string) => `${WORDS_URL}/${word}`;
export const RANDOM_WORDS_URL = (page: number, pageSize: number) => `${WORDS_URL}?PageNumber=${page}&PageSize=${pageSize}`;

