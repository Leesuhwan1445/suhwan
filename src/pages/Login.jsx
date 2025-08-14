// Login.jsx — 로그인 페이지

// 라이브러리/훅/도구 임포트
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// 서버 기본 URL (백엔드 Express 주소)
const API_BASE = "http://localhost:5050"

const Login = () => {
  // 폼 상태 (이메일/비밀번호)
  const [form, setForm] = useState({
    email : "",
    password : ""
  })   

  // 라우팅 이동 훅
  const navigate = useNavigate()

  // 입력 핸들러: 이메일 
  const onChangeEmail = (e) => {
    setForm(prev => ({...prev, email:e.target.value}))
  }

  // 입력 핸들러: 비밀번호 
  const onChangePassword = (e) => {
    setForm(prev => ({...prev, password:e.target.value}))
  }

  // 제출 핸들러: 로그인 API 호출 → 성공 시 유저 저장/이벤트 발사/이동
  const onSubmit = async (e) => {
    e.preventDefault()
    try{
      // 서버에 로그인 요청 (POST /login, JSON 바디)
      const {data} = await axios.post(`${API_BASE}/login`, form, {
        headers : {"Content-Type" : "application/json"}
      })

      // 서버 응답 ok면 로그인 성공 처리
      if(data?.ok) {
        // 1) 유저정보 보관 (새로고침에도 유지)
        localStorage.setItem("user", JSON.stringify(data.user))

        // 2) 전역 이벤트 발사 → Header 등에서 로그인 상태 즉시 반영
        window.dispatchEvent(new Event("authchange"))

        // 3) 다음 틱에 마이페이지로 이동 (타이밍 안정화)
        setTimeout(() => {
          navigate("/Mypage", { replace: true })
        }, 0)

        // 4) 안내
        alert("로그인 성공 ^^V")

      } else {
        // 서버가 실패 메시지 준 경우
        alert(data?.message || "로그인 실패")
      }
    } catch(err) {
      // 네트워크/서버 오류
      alert(err.response?.data?.message || "로그인 실패!")
      console.error(err)
    }
  }

  return (
    <div className='bg-stone-300'>
      <div className='flex flex-col justify-center items-center gap-10 w-screen h-screen'>

        {/* 로그인 폼 */}
        <form onSubmit={onSubmit} className='flex flex-col gap-5 w-96 bg-white rounded-xl p-6 space-y-4'>

          {/* 타이틀 */}
          <h1 className='flex justify-center items-center mt-5 text-[50px]' name="Login">로그인</h1>

          {/* 이메일 입력 */}
          <input
            className="flex pl-3 rounded-md border border-white w-80 h-12 bg-white transition-all duration-300 ease-in-out hover:border-sky-300 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
            type="email"
            placeholder="이메일" 
            name='email'
            value={form.email}
            onChange={onChangeEmail}
          />

          {/* 비밀번호 입력 */}
          <input
            className="flex pl-3 rounded-md border border-white w-80 h-12 bg-white transition-all duration-300 ease-in-out hover:border-sky-300 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
            type="password"
            placeholder="비밀번호"
            name='password'
            value={form.password}
            onChange={onChangePassword}
          />

          {/* 제출 버튼 */}
          <button className='flex justify-center items-center border border-solid border-gray-500 rounded-md w-80 h-12 bg-gray-500 hover:outline-2 focus:outline-2 text-[27px]'>
            로그인
          </button>
        </form>

        <Link to="/signup">여기가 처음이신분 …</Link>
      </div>
    </div>
  )
}

export default Login