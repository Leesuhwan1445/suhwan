import { useEffect, useState } from "react";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const Search = () => {
  
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const debounced = useDebounce(keyword, 500);

  useEffect(() => {
    if (!debounced.trim()) {
      setResults([]);
      return;
    }
    axios.get("https://api.themoviedb.org/3/search/movie", {
      params: { api_key: API_KEY, query: debounced, language: "ko-KR" },
    })
    .then((res) => setResults(res.data.results || []))
    .catch(() => setResults([]));
  }, [debounced]);

  return (
    <div style={{ padding: 16 }}>
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="영화 제목을 입력하세요..."
        style={{ width: "100%", height: 40, padding: "0 12px" }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginTop: 16 }}>
        {results.map((m) => (
          <a key={m.id} href={`/Moviedetail/${m.id}`}>
            <img src={m.poster_path ? `https://image.tmdb.org/t/p/w342${m.poster_path}` : ""} alt={m.title} />
            <div>{m.title}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Search;