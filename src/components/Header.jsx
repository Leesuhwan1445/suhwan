import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [user, setUser] = useState(null);
  const debounced = useDebounce(keyword, 500);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const navigate = useNavigate();
  const location = useLocation()

//페이지 전환으로 최신상태로 가져오는 코드
useEffect(() => {
  try {
    const updated = localStorage.getItem("user")
    setUser(updated ? JSON.parse(updated) : null)
  } catch {
    setUser(null)
  }
},[location])

  // 로그인 / 로그아웃 감지
  useEffect(() => {
    const storeUser = localStorage.getItem("user");
    if (storeUser) setUser(JSON.parse(storeUser));

    const handler = () => {
      const updated = localStorage.getItem("user");
      setUser(updated ? JSON.parse(updated) : null);
    };

    window.addEventListener("authchange", handler);
    return () => window.removeEventListener("authchange", handler);
  }, []);

  //검색기능
  useEffect(() => {
    if (!debounced.trim()) {
      setResults([]);
      return;
    }
    axios
      .get("https://api.themoviedb.org/3/search/movie", {
        params: { api_key: API_KEY, query: debounced, language: "ko-KR" },
      })
      .then((res) => setResults(res.data.results || []))
      .catch(() => setResults([]));
  }, [debounced, API_KEY]);


  //로그아웃
  const handleLogout = () => {
    localStorage.removeItem("user")
    window.dispatchEvent(new Event("authchange"))
    navigate("/Login")
  }


  return (
    <div className="flex justify-between items-center h-20 px-5 bg-black text-white relative min-w-0">
      <Link to="/" className="text-3xl font-bold">Home</Link>

    <div className="hidden md:block flex-1 min-w-0 px-4">
      <input
        name="영화검색"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="영화 검색..."
        className="w-full max-w-xs h-10 px-3 rounded-md border border-gray-600 bg-black text-white"
      />
    </div>

  <div className="flex gap-3 ml-0">
        {user ? (
     <>
     <Link
       to="/Mypage"
       className="text-white text-2xl border border-green-300 bg-green-500 px-4 py-2 rounded-2xl flex-shrink-0 whitespace-nowrap"
     >
       마이페이지
     </Link>
     <button
       onClick={handleLogout}
       className="text-white text-2xl border border-red-300 bg-red-500 px-4 py-2 rounded-2xl flex-shrink-0 whitespace-nowrap"
     >
       로그아웃
     </button>
   </>
    ) : (
      <>
      <Link to="/Login" className="text-white text-2xl border border-blue-300 bg-blue-500 px-4 py-2 rounded-2xl flex-shrink-0 whitespace-nowrap">
        로그인
      </Link>
      <Link to="/SingUp" className="text-white text-2xl border border-blue-300 bg-blue-500 px-4 py-2 rounded-2xl flex-shrink-0 whitespace-nowrap">
        회원가입
      </Link>
      </>
    )}
 </div>

        {/* 검색부분 */}
      {keyword && results.length > 0 && (
        <div className="absolute left-0 right-0 top-20 z-50 bg-white text-black shadow">
          {results.map((m) => (
            <button
              name="search"
              key={m.id}
              onClick={() => { setKeyword(""); setResults([]); navigate(`/Moviedetail/${m.id}`); }}
              className="block w-full text-left p-3 hover:bg-gray-200">{m.title}
            </button>
          ))}
        </div>

        
      )}
    </div>
  );
};

export default Header;