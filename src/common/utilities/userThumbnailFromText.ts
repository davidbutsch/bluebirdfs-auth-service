import { DEFAULT_USER_THUMBNAILS_URL } from "@/common";

export const userThumbnailFromText = (text?: string) => {
  const firstLetter = Array.from(text || "")[0].toLowerCase();

  const isEnglishLetter =
    firstLetter && firstLetter.length === 1 && firstLetter.match(/[a-z]/i);

  if (isEnglishLetter)
    return `${DEFAULT_USER_THUMBNAILS_URL}/${firstLetter.toLowerCase()}.svg`;
  else return `${DEFAULT_USER_THUMBNAILS_URL}/default.svg`;
};
