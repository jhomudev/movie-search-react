import { useEffect, useState, useRef } from "react";

export function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);

  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("Escriba la pelicula a buscar");
      return;
    }
    if (search.length < 3) {
      setError("Escriba como mínimo 3 caracteres");
      return;
    }
    if (search.match(/^\d+$/)) {
      setError("No puede buscar con números");
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}
