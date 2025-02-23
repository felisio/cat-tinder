import { useState, useEffect } from "react";

export type CatImage = {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds?: Array<{
    id: string;
    name: string;
    description: string;
    temperament: string;
    origin: string;
    cat_friendly: number;
  }>;
};

type UseCatAPIReturn = {
  cats: CatImage[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  voteCat: (id: string, value: number) => Promise<void>;
};

const API_KEY =
  "live_Yq1h7jayZgDD5kmu3sFkI6qTqhfVbyPmO7bw8dt7LDG2w3QkgHU9rSONqpQ3NtUj";

const API_URL = "https://api.thecatapi.com/v1/";

export function useCatAPI(): UseCatAPIReturn {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const url = `${API_URL}images/search?limit=10&breed_ids=beng&api_key=${API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch cats");
      }

      const data = await response.json();
      setCats(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setIsLoading(false);
    }
  };

  const voteCat = async (id: string, value: number) => {
    const url = `${API_URL}votes`;
    await fetch(url, {
      method: "POST",
      headers: { "x-api-key": API_KEY },
      body: JSON.stringify({
        image_id: id,
        value: value,
      }),
    });
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return {
    cats,
    isLoading,
    error,
    refetch: fetchCats,
    voteCat,
  };
}
