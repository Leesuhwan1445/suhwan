const Mypage = () => {
  const me = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-6">마이페이지</h1>

      <div className="max-w-md rounded-xl bg-neutral-900 p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-xl font-bold">
            {(me.name || me.email || "U").slice(0, 1).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold">{me.name || "이름 없음"}</p>
            <p className="text-sm text-neutral-300">{me.email}</p>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login"; // 로그아웃 후 로그인 페이지로
          }}
          className="w-full px-4 py-2 rounded-md bg-red-600 hover:bg-red-500"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};
export default Mypage;