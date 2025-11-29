import { useEffect, useState } from "react";

export default function Introductions() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    document.title = "Student Introductions";

    fetch("https://dvonb.xyz/api/2025-fall/itis-3135/students?full=1")
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error loading students:", err));
  }, []);

  // Helper to properly format student names
  function formatName(nameObj) {
    if (!nameObj) return "Unnamed Student";

    if (nameObj.preferred) return nameObj.preferred;

    return `${nameObj.first || ""} ${nameObj.middleInitial || ""} ${nameObj.last || ""}`
      .replace(/\s+/g, " ")
      .trim();
  }
  function formatLinkLabel(label) {
    const mapping = {
        github: "GitHub",
        githubio: "github.io",
        itis3135: "ITIS3135",
        codecademy: "Codecademy",
        linkedin: "LinkedIn",
        freecodecamp: "FreeCodeCamp",
        webpages: "WebPages"
    };
    return mapping[label.toLowerCase()] || label;
  }

  return (
    <div className="front-introduction">
      <main>
        <h1 className="center">Student Introductions</h1>

        {students.length === 0 ? (
          <p className="center">Loading student data...</p>
        ) : (
          students.map((s) => (
            <section
              key={s.prefix}
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
              <h2 className="center">{formatName(s.name)}</h2>

              <p className="center"><strong>Acknowledgement:</strong> {s.acknowledgement} <span style={{ fontStyle: "italic" }}>{s.acknowledgementDate}</span></p>

              {/* MASCOT */}
              <h3 className="center">{s.mascot}</h3>

              {/* IMAGE */}
              {s.media?.hasImage && (
                <>
                <img
                    src={`https://dvonb.xyz${s.media.src}`}
                    alt={s.media.caption}
                    style={{
                        width: "200px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        display: "block",
                        margin: "10px auto",
                    }}
                />
                  <p className="center">
                    <i>{s.media.caption}</i>
                  </p>
                </>
              )}

              {/* PERSONAL BACKGROUND */}
              <h4>Personal Background</h4>
              <p>{s.backgrounds?.personal}</p>

              {/* ACADEMIC BACKGROUND */}
              <h4>Academic Background</h4>
              <p>{s.backgrounds?.academic}</p>

              {/* PROFESSIONAL BACKGROUND */}
              <h4>Professional Background</h4>
              <p>{s.backgrounds?.professional}</p>

              {/* COURSES */}
              <h4>Courses</h4>
              <ul>
                {s.courses?.map((c, i) => (
                  <li key={i}>
                    <strong>
                      {c.dept} {c.num} – {c.name}:
                    </strong>{" "}
                    {c.reason}
                  </li>
                ))}
              </ul>

              {/* QUOTE */}
              {s.quote?.text && (
                <p className="center" style={{ fontStyle: "italic" }}>
                  "{s.quote.text}" — {s.quote.author}
                </p>
              )}

              {/* FUN FACT */}
              {s.funFact && (
                <p>
                  <strong>Fun Fact:</strong> {s.funFact}
                </p>
              )}

              {/* LINKS */}
            <h4>Links</h4>

            <div className="center links-line">
            {Object.entries(s.links || {}).map(([label, url], index, arr) => (
                <span key={label}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    {formatLinkLabel(label)}
                </a>
                {index < arr.length - 1 && " | "}
                </span>
            ))}
            </div>
            </section>
          ))
        )}
      </main>
    </div>
  );
}
