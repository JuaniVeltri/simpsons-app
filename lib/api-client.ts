import type {
  Character,
  Episode,
  Location,
  CharacterFilters,
  EpisodeFilters,
  LocationFilters,
  ApiResponse,
  PaginatedResponse,
} from "@/types/simpsons";

const API_BASE_URL = "https://thesimpsonsapi.com/api";
const CDN_BASE_URL = "https://cdn.thesimpsonsapi.com";
const ITEMS_PER_PAGE = 20;

class SimpsonsAPIClient {
  // Cache for all data to avoid repeated API calls
  private charactersCache: Character[] | null = null;
  private episodesCache: Episode[] | null = null;
  private locationsCache: Location[] | null = null;

  /**
   * Fetch all characters from API and cache them
   */
  private async fetchAllCharacters(): Promise<Character[]> {
    if (this.charactersCache) return this.charactersCache;

    try {
      const allCharacters: Character[] = [];
      let page = 1;
      let totalPages = 1;

      // Fetch first page to get total pages count
      const firstResponse = await fetch(`${API_BASE_URL}/characters?page=1`);
      if (!firstResponse.ok) throw new Error("Failed to fetch characters");

      const firstData: ApiResponse<Character> = await firstResponse.json();
      allCharacters.push(...(firstData.results || []));
      totalPages = firstData.pages || 1;

      // Fetch remaining pages
      const promises = [];
      for (let p = 2; p <= totalPages; p++) {
        promises.push(
          fetch(`${API_BASE_URL}/characters?page=${p}`)
            .then(res => res.json())
            .then((data: ApiResponse<Character>) => data.results || [])
        );
      }

      const remainingResults = await Promise.all(promises);
      remainingResults.forEach(results => allCharacters.push(...results));

      this.charactersCache = allCharacters;
      return allCharacters;
    } catch (error) {
      console.error("Error fetching all characters:", error);
      return [];
    }
  }

  /**
   * Fetch characters with optional filters and pagination
   */
  async getCharacters(filters?: CharacterFilters): Promise<PaginatedResponse<Character>> {
    try {
      // Get all characters from cache or API
      let characters = await this.fetchAllCharacters();

      // Apply client-side filters
      if (filters?.gender) {
        characters = characters.filter(
          (c) => c.gender.toLowerCase() === filters.gender?.toLowerCase()
        );
      }

      if (filters?.status) {
        characters = characters.filter(
          (c) => c.status.toLowerCase() === filters.status?.toLowerCase()
        );
      }

      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        characters = characters.filter((c) =>
          c.name.toLowerCase().includes(searchLower)
        );
      }

      // Calculate pagination
      const page = filters?.page || 1;
      const totalPages = Math.ceil(characters.length / ITEMS_PER_PAGE);
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const paginatedData = characters.slice(startIndex, endIndex);

      return {
        data: paginatedData,
        count: characters.length,
        pages: totalPages > 0 ? totalPages : 1,
        currentPage: page,
      };
    } catch (error) {
      console.error("Error fetching characters:", error);
      return {
        data: [],
        count: 0,
        pages: 1,
        currentPage: 1,
      };
    }
  }

  /**
   * Fetch single character by ID
   */
  async getCharacter(id: number): Promise<Character | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/characters/${id}`);
      if (!response.ok) throw new Error("Failed to fetch character");

      return await response.json();
    } catch (error) {
      console.error(`Error fetching character ${id}:`, error);
      return null;
    }
  }

  /**
   * Fetch all episodes from API and cache them
   */
  private async fetchAllEpisodes(): Promise<Episode[]> {
    if (this.episodesCache) {
      return this.episodesCache;
    }

    try {
      const allEpisodes: Episode[] = [];

      // Fetch first page to get total pages count
      const firstResponse = await fetch(`${API_BASE_URL}/episodes?page=1`);

      if (!firstResponse.ok) throw new Error("Failed to fetch episodes");

      const firstData: ApiResponse<Episode> = await firstResponse.json();

      allEpisodes.push(...(firstData.results || []));
      const totalPages = firstData.pages || 1;

      // Fetch remaining pages in parallel
      const promises = [];
      for (let p = 2; p <= totalPages; p++) {
        promises.push(
          fetch(`${API_BASE_URL}/episodes?page=${p}`)
            .then(res => res.json())
            .then((data: ApiResponse<Episode>) => data.results || [])
        );
      }

      const remainingResults = await Promise.all(promises);
      remainingResults.forEach(results => allEpisodes.push(...results));

      this.episodesCache = allEpisodes;
      return allEpisodes;
    } catch (error) {
      console.error("❌ Error fetching all episodes:", error);
      return [];
    }
  }

  /**
   * Fetch episodes with optional filters and pagination
   */
  async getEpisodes(filters?: EpisodeFilters): Promise<PaginatedResponse<Episode>> {
    try {
      // Get all episodes from cache or API
      let episodes = await this.fetchAllEpisodes();

      // Apply client-side filters
      if (filters?.season) {
        episodes = episodes.filter((e) => e.season === filters.season);
      }

      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        episodes = episodes.filter((e) =>
          e.name.toLowerCase().includes(searchLower)
        );
      }

      // Calculate pagination
      const page = filters?.page || 1;
      const totalPages = Math.ceil(episodes.length / ITEMS_PER_PAGE);
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const paginatedData = episodes.slice(startIndex, endIndex);

      return {
        data: paginatedData,
        count: episodes.length,
        pages: totalPages > 0 ? totalPages : 1,
        currentPage: page,
      };
    } catch (error) {
      console.error("❌ Error in getEpisodes:", error);
      return {
        data: [],
        count: 0,
        pages: 1,
        currentPage: 1,
      };
    }
  }

  /**
   * Fetch single episode by ID
   */
  async getEpisode(id: number): Promise<Episode | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/episodes/${id}`);
      if (!response.ok) throw new Error("Failed to fetch episode");

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`❌ Error fetching episode ${id}:`, error);
      return null;
    }
  }

  /**
   * Fetch all locations from API and cache them
   */
  private async fetchAllLocations(): Promise<Location[]> {
    if (this.locationsCache) {
      return this.locationsCache;
    }

    try {
      const allLocations: Location[] = [];

      // Fetch first page to get total pages count
      const firstResponse = await fetch(`${API_BASE_URL}/locations?page=1`);

      if (!firstResponse.ok) throw new Error("Failed to fetch locations");

      const firstData: ApiResponse<Location> = await firstResponse.json();

      allLocations.push(...(firstData.results || []));
      const totalPages = firstData.pages || 1;

      // Fetch remaining pages in parallel
      const promises = [];
      for (let p = 2; p <= totalPages; p++) {
        promises.push(
          fetch(`${API_BASE_URL}/locations?page=${p}`)
            .then(res => res.json())
            .then((data: ApiResponse<Location>) => data.results || [])
        );
      }

      const remainingResults = await Promise.all(promises);
      remainingResults.forEach(results => allLocations.push(...results));

      this.locationsCache = allLocations;
      return allLocations;
    } catch (error) {
      console.error("❌ Error fetching all locations:", error);
      return [];
    }
  }

  /**
   * Fetch locations with optional filters and pagination
   */
  async getLocations(filters?: LocationFilters): Promise<PaginatedResponse<Location>> {
    try {
      // Get all locations from cache or API
      let locations = await this.fetchAllLocations();

      // Apply client-side filters
      if (filters?.type) {
        locations = locations.filter(
          (l) => l.use.toLowerCase() === filters.type?.toLowerCase()
        );
      }

      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        locations = locations.filter((l) =>
          l.name.toLowerCase().includes(searchLower)
        );
      }

      // Calculate pagination
      const page = filters?.page || 1;
      const totalPages = Math.ceil(locations.length / ITEMS_PER_PAGE);
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const paginatedData = locations.slice(startIndex, endIndex);

      return {
        data: paginatedData,
        count: locations.length,
        pages: totalPages > 0 ? totalPages : 1,
        currentPage: page,
      };
    } catch (error) {
      console.error("❌ Error in getLocations:", error);
      return {
        data: [],
        count: 0,
        pages: 1,
        currentPage: 1,
      };
    }
  }

  /**
   * Fetch single location by ID
   */
  async getLocation(id: number): Promise<Location | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/locations/${id}`);
      if (!response.ok) throw new Error("Failed to fetch location");

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`❌ Error fetching location ${id}:`, error);
      return null;
    }
  }

  /**
   * Get optimized image URL from CDN
   */
  getImageUrl(path: string, size: number = 500): string {
    if (!path) {
      return "/placeholder.webp";
    }

    // Remove leading slash if present
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `${CDN_BASE_URL}/${size}/${cleanPath}`;
  }

  /**
   * Get all characters (for stats) - uses cache
   */
  async getAllCharacters(): Promise<Character[]> {
    return this.fetchAllCharacters();
  }

  /**
   * Get all episodes (for stats) - uses cache
   */
  async getAllEpisodes(): Promise<Episode[]> {
    return this.fetchAllEpisodes();
  }

  /**
   * Get all locations (for stats) - uses cache
   */
  async getAllLocations(): Promise<Location[]> {
    return this.fetchAllLocations();
  }
}

// Export singleton instance
export const simpsonsApi = new SimpsonsAPIClient();
