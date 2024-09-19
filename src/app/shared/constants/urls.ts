// const BASE_URL = "http://studywithmina.runasp.net";

// export const WORDS_URL = BASE_URL + '/api/Words';  // Removed BASE_URL for relative path
// export const TRANSLATE_WORD_URL = (word: string) =>  + `${WORDS_URL}/${word}`;
// export const RANDOM_WORDS_URL = (page: number, pageSize: number) =>  BASE_URL +  `${WORDS_URL}?PageNumber=${page}&PageSize=${pageSize}`;



const BASE_URL = "https://studywithmina.runasp.net";

export const WORDS_URL = BASE_URL + '/api/Words';  // Removed BASE_URL for relative path
export const TRANSLATE_WORD_URL = (word: string) =>  `${WORDS_URL}/${word}`;
export const RANDOM_WORDS_URL = (page: number, pageSize: number) =>  `${WORDS_URL}?PageNumber=${page}&PageSize=${pageSize}`;

