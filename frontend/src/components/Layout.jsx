import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-left">
          <h1>중문 시공 상담 관리</h1>
        </div>
        <nav className="app-nav">
          <Link to="/consultings">상담 리스트</Link>
          <Link to="/consultings/new">새 상담</Link>
          <Link to="/options">옵션 관리</Link>
          <Link to="/excel">엑셀 업로드</Link>
        </nav>
        <button className="ghost-btn" onClick={logout}>
          로그아웃
        </button>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
}
