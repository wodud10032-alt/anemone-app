import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(username, password);
      localStorage.setItem("token", data.token);
      navigate("/consultings");
    } catch (err) {
      setError("로그인에 실패했습니다.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>ANEMONE</h1>
        <form onSubmit={onSubmit}>
          <label>
            User
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
            />
          </label>
          {error && <div className="error">{error}</div>}
          <button type="submit" className="primary-btn full-width">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
