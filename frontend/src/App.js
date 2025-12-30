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
    <div className="container">
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
        <div className="certificate">
        <div className="watermark">BLOCKCHAIN VERIFIED</div>

          <div className="seal">VERIFIED</div>

          <h2>CERTIFICATE OF COMPLETION</h2>
          <div className="center-text">
          <p className="subtitle">This is to certify that</p>

          <h3>{certificate.studentName}</h3>

          <p className="subtitle">
            has successfully completed the course
          </p>
          </div>

          <h3>{certificate.course}</h3>

          <div className="certificate-details">
            <p><b>Grade:</b> {certificate.grade}</p>
            <p><b>Issue Date:</b> {certificate.issueDate}</p>
            <p>
              <b>Status:</b>{" "}
              <span className={certificate.isValid ? "valid" : "invalid"}>
                {certificate.isValid
                  ? "VALID CERTIFICATE"
                  : "INVALID CERTIFICATE"}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
