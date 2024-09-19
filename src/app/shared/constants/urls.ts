// const BASE_URL = 'http://studywithmina.runasp.net';


// export const WORDS_URL = BASE_URL + '/api/Words';
// export const TRANSLATE_WORD_URL = (word: string) => `${WORDS_URL}/${word}`;
// export const RANDOM_WORDS_URL = (page: number, pageSize: number) => `${WORDS_URL}?PageNumber=${page}&PageSize=${pageSize}`;


export const WORDS_URL = '/api/Words';  // Removed BASE_URL for relative path
export const TRANSLATE_WORD_URL = (word: string) => `${WORDS_URL}/${word}`;
export const RANDOM_WORDS_URL = (page: number, pageSize: number) => `${WORDS_URL}?PageNumber=${page}&PageSize=${pageSize}`;

