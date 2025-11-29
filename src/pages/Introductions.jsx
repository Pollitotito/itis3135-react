import { useEffect, useState } from "react";

export default function Introductions() {
  const [students, setStudents] = useState([]);
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Student Introductions";

    fetch("https://dvonb.xyz/api/2025-fall/itis-3135/students?full=1")
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error loading students:", err));
  }, []);

  // Clean name formatting
  function formatName(nameObj) {
    if (!nameObj) return "Unnamed Student";
    if (nameObj.preferred) return nameObj.preferred;
    return `${nameObj.first || ""} ${nameObj.middleInitial || ""} ${nameObj.last || ""}`
      .replace(/\s+/g, " ")
      .trim();
  }

  const allowedLabels = [
    "github",
    "githubio",
    "itis3135",
    "codecademy",
    "linkedin",
    "freecodecamp",
    "webpages"
  ];

  // SEARCH FILTER
  const filtered = students.filter((s) =>
    formatName(s.name).toLowerCase().includes(search.toLowerCase())
  );

  // Prevent displaying empty
  const current = filtered[index] || null;

  return (
    <div className="front-introduction">
      <main>
        <h1 className="center">Student Introductions</h1>

        {/* SEARCH BAR */}
        <div className="center" style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setIndex(0); // Reset to first result
            }}
            style={{
              padding: "8px",
              width: "60%",
              borderRadius: "6px",
              border: "1px solid #aaa",
            }}
          />
        </div>

        {/* NAVIGATION BUTTONS */}
        {filtered.length > 0 && (
          <div className="center" style={{ marginBottom: "15px" }}>
            <button
              onClick={() =>
                setIndex((index - 1 + filtered.length) % filtered.length)
              }
            >
              ⬅ Previous
            </button>

            <span style={{ margin: "0 10px" }}>
              {index + 1} / {filtered.length}
            </span>

            <button onClick={() => setIndex((index + 1) % filtered.length)}>
              Next ➡
            </button>
          </div>
        )}

        {/* LOADING */}
        {students.length === 0 ? (
          <p className="center">Loading student data...</p>
        ) : !current ? (
          <p className="center">No students found.</p>
        ) : (
          <section
            key={current.prefix}
            style={{
              background: "#fff",
              padding: "20px",
              margin: "20px auto",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              width: "90%",
            }}
          >
            {/* NAME */}
            <h2 className="center">{formatName(current.name)}</h2>

            {/* ACKNOWLEDGEMENT */}
            <p className="center">
              <strong>Acknowledgement:</strong> {current.acknowledgement}{" "}
              <span style={{ fontStyle: "italic" }}>
                {current.acknowledgementDate}
              </span>
            </p>

            {/* MASCOT */}
            <h3 className="center">{current.mascot}</h3>

            {/* IMAGE */}
            {current.media?.hasImage && (
              <>
                <img
                  src={`https://dvonb.xyz${current.media.src}`}
                  alt={current.media.caption}
                  style={{
                    width: "200px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    display: "block",
                    margin: "10px auto",
                  }}
                />
                <p className="center">
                  <i>{current.media.caption}</i>
                </p>
              </>
            )}

            {/* PERSONAL BACKGROUND */}
            <h4>Personal Background</h4>
            <p>{current.backgrounds?.personal}</p>

            {/* ACADEMIC */}
            <h4>Academic Background</h4>
            <p>{current.backgrounds?.academic}</p>

            {/* PROFESSIONAL */}
            <h4>Professional Background</h4>
            <p>{current.backgrounds?.professional}</p>

            {/* COURSES */}
            <h4>Courses</h4>
            <ul>
              {current.courses?.map((c, i) => (
                <li key={i}>
                  <strong>
                    {c.dept} {c.num} – {c.name}:
                  </strong>{" "}
                  {c.reason}
                </li>
              ))}
            </ul>

            {/* QUOTE */}
            {current.quote?.text && (
              <p className="center" style={{ fontStyle: "italic" }}>
                "{current.quote.text}" — {current.quote.author}
              </p>
            )}

            {/* FUN FACT */}
            {current.funFact && (
              <p>
                <strong>Fun Fact:</strong> {current.funFact}
              </p>
            )}

            {/* LINKS */}
            <h4>Links</h4>
            <div className="center">
              {Object.entries(current.links || {})
                .filter(([label]) => allowedLabels.includes(label.toLowerCase()))
                .map(([label, url], i, arr) => (
                  <span key={label}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {label}
                    </a>
                    {i < arr.length - 1 && " | "}
                  </span>
                ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
