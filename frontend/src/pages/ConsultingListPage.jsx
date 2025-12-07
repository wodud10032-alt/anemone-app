import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { fetchConsultings, deleteConsulting } from "../api";

export default function ConsultingListPage() {
  const [list, setList] = useState([]);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const load = async (keyword = "") => {
    const { data } = await fetchConsultings(keyword);
    setList(data);
  };

  useEffect(() => {
    load();
  }, []);

  const onSearch = async (e) => {
    e.preventDefault();
    await load(q);
  };

  const onDelete = async (id) => {
    if (!window.confirm("정말 삭제할까요?")) return;
    await deleteConsulting(id);
    load(q);
  };

  return (
    <Layout>
      <section className="list-header">
        <div className="list-header-left">
          <h2>중문 시공 상담 관리</h2>
          <form onSubmit={onSearch}>
            <input
              placeholder="고객명, 전화번호, 주소로 검색"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </form>
        </div>
        <button
          className="primary-btn"
          onClick={() => navigate("/consultings/new")}
        >
          + 새 상담
        </button>
      </section>

      <section className="list-body">
        {list.length === 0 ? (
          <div className="empty-state">
            <p>등록된 상담 기록이 없습니다.</p>
          </div>
        ) : (
          <table className="consulting-table">
            <thead>
              <tr>
                <th>고객명</th>
                <th>연락처</th>
                <th>주소</th>
                <th>종류</th>
                <th>등록일</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => navigate(`/consultings/${c.id}`)}
                >
                  <td>{c.customer_name}</td>
                  <td>{c.phone}</td>
                  <td>{c.address}</td>
                  <td>{c.type}</td>
                  <td>
                    {c.created_at &&
                      new Date(c.created_at).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      className="link-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(c.id);
                      }}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </Layout>
  );
}
