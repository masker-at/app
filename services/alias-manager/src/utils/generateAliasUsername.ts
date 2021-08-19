const characters = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];
const NUM_ALIAS_CHARACTERS = 15;

export default function generateAliasUsername(): string {
  let username = '';
  for (let i = 0; i < NUM_ALIAS_CHARACTERS; i += 1) {
    const index = Math.floor(Math.random() * characters.length);
    username += characters[index];
  }
  return username;
}
