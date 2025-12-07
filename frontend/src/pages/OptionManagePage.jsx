import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { fetchOptions, createOption, deleteOption } from "../api";

export default function OptionManagePage() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name: "", value: "" });

  const load = async () => {
    const { data } = await fetchOptions();
    setList(data);
  };

  useEffect(() => {
    load();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) return;
    await createOption(form);
    setForm({ name: "", value: "" });
    load();
  };

  return (
    <Layout>
      <section className="card">
        <h3>단일 옵션 추가</h3>
        <form className="grid-2" onSubmit={onSubmit}>
          <label>
            옵션명
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label>
            값
            <input
              value={form.value}
              onChange={(e) => setForm({ ...form, value: e.target.value })}
            />
          </label>
          <button type="submit" className="primary-btn">
            옵션 추가하기
          </button>
        </form>
      </section>

      <section className="card">
        <h3>등록된 옵션 목록</h3>
        {list.length === 0 ? (
          <p>등록된 옵션이 없습니다.</p>
        ) : (
          <ul className="option-list">
            {list.map((o) => (
              <li key={o.id}>
                <span>
                  {o.name} : {o.value}
                </span>
                <button
                  className="link-btn"
                  onClick={() => {
                    if (!window.confirm("삭제할까요?")) return;
                    deleteOption(o.id).then(load);
                  }}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Layout>
  );
}
