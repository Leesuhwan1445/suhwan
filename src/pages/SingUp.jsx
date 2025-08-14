import axios from "axios";
import { useState } from "react";

const API_BASE = "http://localhost:5050";

const SingUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });
  const [msg, setMsg] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await axios.post(`${API_BASE}/register`, form, {
        headers: { "Content-Type": "application/json" }
      });
      setMsg("회원가입성공 (userId: " + res.data.userId + ")");
    } catch (err) {
      if (err.response) {
        setMsg("x " + (err.response.data?.message || "요청 실패"));
      } else {
        setMsg("x 네트워크 오류");
      }
    }
  };

  return (
    <div className='bg-stone-300'>
      <div className='flex flex-col justify-center items-center gap-10 w-screen h-screen'>
        <form onSubmit={onSubmit} className="w-96 bg-white rounded-xl p-6 space-y-4">
          <h1 className='mt-5 text-[50px]'>회원가입</h1>

          <input
            name="name"
            className="pl-3 rounded-md border border-white w-80 h-12 bg-white transition-all duration-300 ease-in-out hover:border-sky-300 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
            type="text"
            placeholder="이름"
            value={form.name}
            onChange={onChange}
          />

          <input
            name="email"
            className="pl-3 rounded-md border border-white w-80 h-12 bg-white transition-all duration-300 ease-in-out hover:border-sky-300 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
            type="email"
            placeholder="이메일"
            value={form.email}
            onChange={onChange}
          />

          <input
            name="password"
            className="pl-3 rounded-md border border-white w-80 h-12 bg-white transition-all duration-300 ease-in-out hover:border-sky-300 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
            type="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={onChange}
          />

          <input
            name="passwordConfirm"
            className="pl-3 rounded-md border border-white w-80 h-12 bg-white transition-all duration-300 ease-in-out hover:border-sky-300 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
            type="password"
            placeholder="비밀번호 확인"
            value={form.passwordConfirm}
            onChange={onChange}
          />

          <button
            className="border border-solid border-gray-500 rounded-md w-80 h-12 bg-gray-500 hover:outline-2 focus:outline-2"
            type="submit"
          >
            회원가입
          </button>

          {msg && <p className="text-sm">{msg}</p>}
        </form>
      </div>
    </div>
  );
};

export default SingUp;