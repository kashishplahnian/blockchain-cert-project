
import "./App.css";
import { useState } from "react";

function App() {
  const [certId, setCertId] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState("");

  const verifyCertificate = async () => {
    setError("");
    setCertificate(null);

    try {
      const response = await fetch(
        `http://localhost:7000/api/certificates/${certId}`
      );

      if (!response.ok) {
        throw new Error("Certificate not found");
      }

      const data = await response.json();
      setCertificate(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Certificate Verification System</h1>

      <input
        type="text"
        placeholder="Enter Certificate ID"
        value={certId}
        onChange={(e) => setCertId(e.target.value)}
      />

      <button onClick={verifyCertificate} style={{ marginLeft: "10px" }}>
        Verify
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {certificate && (
        <div style={{ marginTop: "20px" }}>
          <p><b>Name:</b> {certificate.studentName}</p>
          <p><b>Course:</b> {certificate.course}</p>
          <p><b>Grade:</b> {certificate.grade}</p>
          <p><b>Valid:</b> {certificate.isValid ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
}

export default App;
