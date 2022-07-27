/**
 * Shortens the length of a string that is longer than `10` characters and replacing the middle characters with another character.
 * @param text the string of text to shorten.
 * @returns new string with hidden characters inbetween.
 */
export default function shortenText(text: string) {
  return text.length > 10 ? `${text.slice(0, 4)}...${text.slice(-4)}` : text;
}
