import React, { useState } from "react";
import Layout from "../components/Layout";
import { uploadExcel } from "../api";

export default function ExcelUploadPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const { data } = await uploadExcel(file);
    setResult(data);
  };

  return (
    <Layout>
      <section className="card">
        <h3>엑셀 업로드</h3>
        <form onSubmit={onSubmit}>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit" className="primary-btn">
            엑셀 업로드
          </button>
        </form>
        {result && (
          <p>
            총 {result.total}건 중 {result.inserted}건이 등록되었습니다.
          </p>
        )}
      </section>
    </Layout>
  );
}
