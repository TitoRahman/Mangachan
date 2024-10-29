import axios from "axios";

const baseUrl = "https://api.mangadex.org";

/**
 * Fetches the URI for the cover image of a manga.
 * @param {string} id - The ID of the manga.
 * @param {string} coverId - The ID of the cover image.
 * @returns {Promise<string>} - The URI of the cover image.
 */
export const getMangaCoverUri = async (id, coverId, resolution) => {
  try {
    const coverResponse = await axios.get(`${baseUrl}/cover/${coverId}`);
    const fileName = coverResponse.data.data.attributes.fileName;
    if (resolution === 256) {
      return `https://uploads.mangadex.org/covers/${id}/${fileName}.256.jpg`;
    } else if (resolution === 512) {
      return `https://uploads.mangadex.org/covers/${id}/${fileName}.512.jpg`;
    }
    return `https://uploads.mangadex.org/covers/${id}/${fileName}`;
  } catch (error) {
    console.error(`Failed to fetch cover URI for coverId ${coverId}:`, error);
    throw error;
  }
};

/**
 * Fetches the chapters of a manga.
 * @param {string} mangaId - The ID of the manga.
 * @returns {Promise<Array<Object>>} - A list of chapters with their details.
 * Each chapter object contains:
 *   - {string} id - The ID of the chapter.
 *   - {string} title - The title of the chapter.
 *   - {string} chapter - The chapter number.
 *   - {string} volume - The volume number.
 */
export const getChapters = async (mangaId) => {
  try {
    const response = await axios.get(`${baseUrl}/chapter`, {
      params: { manga: mangaId },
    });
    return response.data.data.map((chapter) => ({
      id: chapter.id,
      title: chapter.attributes.title,
      chapter: chapter.attributes.chapter,
      volume: chapter.attributes.volume,
    }));
  } catch (error) {
    console.error(`Failed to fetch chapters for mangaId ${mangaId}:`, error);
    throw error;
  }
};

/**
 * Fetches the URI for the pages of a chapter.
 * @param {string} chapterId - The ID of the chapter.
 * @param {number} [page=-1] - The page number to fetch. If -1, fetches all pages.
 * @returns {Promise<string|string[]>} - The URI of the page or an array of URIs if page is -1.
 */
export const getChapterUri = async (chapterId, page = -1) => {
  try {
    const response = await axios.get(`${baseUrl}/at-home/server/${chapterId}`);
    const chapterHash = response.data.chapter.hash;

    if (page === -1) {
      return response.data.chapter.data.map(
        (c) => `https://uploads.mangadex.org/data/${chapterHash}/${c}`
      );
    } else {
      const pageIndex = page - 1;
      if (pageIndex < 0 || pageIndex >= response.data.chapter.data.length) {
        throw new Error(`Page ${page} is out of range`);
      }
      return `https://uploads.mangadex.org/data/${chapterHash}/${response.data.chapter.data[pageIndex]}`;
    }
  } catch (error) {
    console.error(
      `Failed to fetch chapter URI for chapterId ${chapterId}:`,
      error
    );
    throw error;
  }
};

/**
 * Fetches mangas by title and includes their cover art and chapters.
 * @param {string} title - The title of the manga.
 * @param {number} limit - The number of results to return.
 * @param {number} offset - The number of results to skip.
 * @returns {Promise<Array<Object>>} - A list of mangas with their details.
 * Each manga object contains:
 *   - {string} id - The ID of the manga.
 *   - {string} title - The title of the manga.
 *   - {string} description - The description of the manga.
 *   - {string} coverArt - The URI of the cover art.
 *   - {Array<Object>} chapters - A list of chapters with their details.
 *     Each chapter object contains:
 *       - {string} id - The ID of the chapter.
 *       - {string} title - The title of the chapter.
 *       - {string} chapter - The chapter number.
 *       - {string} volume - The volume number.
 */
export const getMangas = async (
  title = "",
  limit = 10,
  offset = 0,
  resolution
) => {
  try {
    const response = await axios.get(`${baseUrl}/manga`, {
      params: { title: title, limit: limit, offset: offset },
    });
    const mangas = await Promise.all(
      response.data.data.map(async (manga) => {
        const coverArtId = manga.relationships.find(
          (rel) => rel.type === "cover_art"
        ).id;
        const coverArtUri = await getMangaCoverUri(
          manga.id,
          coverArtId,
          resolution
        );
        const chapters = await getChapters(manga.id);
        return {
          id: manga.id,
          title: manga.attributes.title.en,
          description: manga.attributes.description.en,
          coverArt: coverArtUri,
          chapters: chapters,
          total: response.data.total,
        };
      })
    );
    console.log(
      `Fetched successfully ${mangas.length} mangas with title ${title} from offset ${offset}.`
    );
    return mangas;
  } catch (error) {
    console.error(`Failed to fetch mangas with title ${title}:`, error);
    throw error;
  }
};
