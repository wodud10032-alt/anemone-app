import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { createConsulting } from "../api";

export default function ConsultingFormPage() {
  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    address: "",
    type: "",
    design: "",
    color: "",
    glass: "",
    handle: "",
    width: "",
    height: "",
    memo: "",
  });
  const navigate = useNavigate();

  const onChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      width: form.width ? Number(form.width) : null,
      height: form.height ? Number(form.height) : null,
    };
    await createConsulting(payload);
    navigate("/consultings");
  };

  return (
    <Layout>
      <form className="detail-form" onSubmit={onSubmit}>
        <section className="card">
          <h3>고객 정보</h3>
          <div className="grid-2">
            <label>
              이름
              <input
                value={form.customer_name}
                onChange={(e) => onChange("customer_name", e.target.value)}
              />
            </label>
            <label>
              연락처
              <input
                value={form.phone}
                onChange={(e) => onChange("phone", e.target.value)}
              />
            </label>
          </div>
          <label>
            주소
            <input
              value={form.address}
              onChange={(e) => onChange("address", e.target.value)}
            />
          </label>
        </section>

        <section className="card">
          <h3>제품 사양</h3>
          <div className="grid-2">
            <label>
              종류
              <input
                value={form.type}
                onChange={(e) => onChange("type", e.target.value)}
              />
            </label>
            <label>
              디자인
              <input
                value={form.design}
                onChange={(e) => onChange("design", e.target.value)}
              />
            </label>
          </div>
          <div className="grid-2">
            <label>
              색상
              <input
                value={form.color}
                onChange={(e) => onChange("color", e.target.value)}
              />
            </label>
            <label>
              유리
              <input
                value={form.glass}
                onChange={(e) => onChange("glass", e.target.value)}
              />
            </label>
          </div>
          <label>
            손잡이
            <input
              value={form.handle}
              onChange={(e) => onChange("handle", e.target.value)}
            />
          </label>
        </section>

        <section className="card">
          <h3>시공 실측표</h3>
          <div className="grid-2">
            <label>
              가로(mm)
              <input
                type="number"
                value={form.width}
                onChange={(e) => onChange("width", e.target.value)}
              />
            </label>
            <label>
              세로(mm)
              <input
                type="number"
                value={form.height}
                onChange={(e) => onChange("height", e.target.value)}
              />
            </label>
          </div>
        </section>

        <section className="card">
          <h3>메모</h3>
          <textarea
            rows={4}
            value={form.memo}
            onChange={(e) => onChange("memo", e.target.value)}
          />
        </section>

        <button type="submit" className="primary-btn full-width">
          이 상담 저장하기
        </button>
      </form>
    </Layout>
  );
}
