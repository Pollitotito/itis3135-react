import { useEffect, useState } from "react";

export default function Introductions() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const perPage = 10;

  // CHECKBOX STATES
  const [showName, setShowName] = useState(true);
  const [showMascot, setShowMascot] = useState(true);
  const [showImage, setShowImage] = useState(true);
  const [showStatement, setShowStatement] = useState(true);
  const [showBackgrounds, setShowBackgrounds] = useState(true);
  const [showClasses, setShowClasses] = useState(true);
  const [showQuote, setShowQuote] = useState(true);
  const [showFunFact, setShowFunFact] = useState(true);
  const [showLinks, setShowLinks] = useState(true);

  useEffect(() => {
    document.title = "Student Introductions";

    fetch("https://dvonb.xyz/api/2025-fall/itis-3135/students?full=1")
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error loading students:", err));
  }, []);

  // FORMAT NAME
  function formatName(nameObj) {
    if (!nameObj) return "Unnamed Student";
    if (nameObj.preferred) return nameObj.preferred;
    return `${nameObj.first || ""} ${nameObj.middleInitial || ""} ${nameObj.last || ""}`
      .replace(/\s+/g, " ")
      .trim();
  }

  // FORMAT LINK LABELS
  function formatLinkLabel(label) {
    const mapping = {
      github: "GitHub",
      githubio: "github.io",
      itis3135: "ITIS3135",
      codecademy: "Codecademy",
      linkedin: "LinkedIn",
      freecodecamp: "FreeCodeCamp",
      webpages: "WebPages",
      charlotte: "CLT Web"
    };
    return mapping[label.toLowerCase()] || label;
  }

  // SEARCH FILTER
  const filtered = students.filter((s) =>
    formatName(s.name).toLowerCase().includes(search.toLowerCase())
  );

  const start = page * perPage;
  const end = start + perPage;
  const visibleStudents = filtered.slice(start, end);

  function nextPage() {
    if (end < filtered.length) setPage(page + 1);
  }

  function prevPage() {
    if (page > 0) setPage(page - 1);
  }

  return (
    <div className="front-introduction">
      <main>
        <h1 className="center">Student Introductions</h1>

        {/* SEARCH */}
        <div className="center">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            style={{ padding: "8px", width: "60%", marginBottom: "10px" }}
          />
        </div>

        {/* COUNTER */}
        <p className="center">
          <strong>{filtered.length}</strong> student(s) found
        </p>

        {/* CHECKBOXES */}
        <div style={{ maxWidth: "420px", margin: "auto" }}>
          <label><input type="checkbox" checked={showName} onChange={() => setShowName(!showName)} /> Name</label><br />
          <label><input type="checkbox" checked={showMascot} onChange={() => setShowMascot(!showMascot)} /> Mascot</label><br />
          <label><input type="checkbox" checked={showImage} onChange={() => setShowImage(!showImage)} /> Image</label><br />
          <label><input type="checkbox" checked={showBackgrounds} onChange={() => setShowBackgrounds(!showBackgrounds)} /> Backgrounds</label><br />
          <label><input type="checkbox" checked={showClasses} onChange={() => setShowClasses(!showClasses)} /> Classes</label><br />
          <label><input type="checkbox" checked={showStatement} onChange={() => setShowStatement(!showStatement)} /> Personal Statement</label><br />
          <label><input type="checkbox" checked={showQuote} onChange={() => setShowQuote(!showQuote)} /> Quote</label><br />
          <label><input type="checkbox" checked={showFunFact} onChange={() => setShowFunFact(!showFunFact)} /> Fun Fact</label><br />
          <label><input type="checkbox" checked={showLinks} onChange={() => setShowLinks(!showLinks)} /> Links</label>
        </div>

        {/* PAGINATION */}
        <div className="center" style={{ margin: "15px 0" }}>
          <button onClick={prevPage} disabled={page === 0}>
            ⬅ Previous
          </button>

          <span style={{ margin: "0 10px" }}>
            Page {page + 1} of {Math.ceil(filtered.length / perPage)}
          </span>

          <button onClick={nextPage} disabled={end >= filtered.length}>
            Next ➡
          </button>
        </div>

        {/* STUDENT DISPLAY */}
        {visibleStudents.length === 0 ? (
          <p className="center">No students found.</p>
        ) : (
          visibleStudents.map((s) => (
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
              {showName && (
                <h2 className="center">{formatName(s.name)}</h2>
              )}

              {showMascot && (
                <h3 className="center">{s.mascot}</h3>
              )}

              {showImage && s.media?.hasImage && (
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

              {showStatement && s.personalStatement && (
                <>
                  <h4>Personal Statement</h4>
                  <p>{s.personalStatement}</p>
                </>
              )}

              {showBackgrounds && (
                <>
                  <h4>Personal Background</h4>
                  <p>{s.backgrounds?.personal}</p>

                  <h4>Academic Background</h4>
                  <p>{s.backgrounds?.academic}</p>

                  <h4>Professional Background</h4>
                  <p>{s.backgrounds?.professional}</p>
                </>
              )}

              {showClasses && (
                <>
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
                </>
              )}

              {showQuote && s.quote?.text && (
                <p className="center" style={{ fontStyle: "italic" }}>
                  "{s.quote.text}" — {s.quote.author}
                </p>
              )}

              {showFunFact && s.funFact && (
                <p>
                  <strong>Fun Fact:</strong> {s.funFact}
                </p>
              )}

              {showLinks && (
                <>
                  <h4>Links</h4>
                  <div className="center links-line">
                    {Object.entries(s.links || {}).map(
                      ([label, url], i, arr) => (
                        <span key={label}>
                          <a href={url} target="_blank" rel="noopener noreferrer">
                            {formatLinkLabel(label)}
                          </a>
                          {i < arr.length - 1 && " | "}
                        </span>
                      )
                    )}
                  </div>
                </>
              )}
            </section>
          ))
        )}
      </main>
    </div>
  );
}
