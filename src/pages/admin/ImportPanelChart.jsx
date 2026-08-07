import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  collection,
  getDocs,
  writeBatch,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./importPanelChart.css";

const ALL_DAYS = [
  {
    day: "Mon",
    open: 1,
    jodi: 2,
    close: 3,
  },
  {
    day: "Tue",
    open: 4,
    jodi: 5,
    close: 6,
  },
  {
    day: "Wed",
    open: 7,
    jodi: 8,
    close: 9,
  },
  {
    day: "Thu",
    open: 10,
    jodi: 11,
    close: 12,
  },
  {
    day: "Fri",
    open: 13,
    jodi: 14,
    close: 15,
  },
  {
    day: "Sat",
    open: 16,
    jodi: 17,
    close: 18,
  },
  {
    day: "Sun",
    open: 19,
    jodi: 20,
    close: 21,
  },
];

function ImportPanelChart() {
  const [market, setMarket] = useState("");

  const [markets, setMarkets] = useState([]);

  const [loadingMarkets, setLoadingMarkets] =
    useState(true);

  const [fileName, setFileName] =
    useState("");

  const [weeks, setWeeks] =
    useState([]);
const [workingDays, setWorkingDays] =
  useState("mon-sat");
  const [loadingFile, setLoadingFile] =
    useState(false);

  const [importing, setImporting] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  useEffect(() => {
    loadMarkets();
  }, []);

  const loadMarkets = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "markets")
      );

      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      list.sort((a, b) =>
        (a.name || "").localeCompare(
          b.name || ""
        )
      );

      setMarkets(list);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMarkets(false);
    }
  };

const excelDateToJS = (value) => {
  if (typeof value !== "number") {
    return null;
  }

  const date = new Date(
    Date.UTC(1899, 11, 30)
  );

  date.setUTCDate(
    date.getUTCDate() + value
  );

  return date;
};

  const formatDate = (date) => {
  return date
    .toISOString()
    .split("T")[0];
};

  const addDays = (
    date,
    days
  ) => {
    const d = new Date(date);

    d.setDate(
      d.getDate() + days
    );

    return d;
  };

  const cleanValue = (
    value
  ) => {
    if (
      value === undefined ||
      value === null
    ) {
      return "";
    }

    return value
      .toString()
      .trim();
  };

  const formatJodi = (
    value
  ) => {
    value = cleanValue(value);

    if (!value) {
      return "";
    }

    if (
      value === "*" ||
      value === "**"
    ) {
      return value;
    }

    if (
      /^\d+$/.test(value)
    ) {
      return value.padStart(
        2,
        "0"
      );
    }

    return value;
  };

  const buildPanel = (
    top,
    middle,
    bottom
  ) => {
    top = cleanValue(top);
    middle = cleanValue(middle);
    bottom = cleanValue(bottom);

    if (
      top.includes("*") ||
      middle.includes("*") ||
      bottom.includes("*")
    ) {
      return "***";
    }

    if (
      top === "" &&
      middle === "" &&
      bottom === ""
    ) {
      return "";
    }

    return `${top}${middle}${bottom}`;
  };
 const parseWeeks = (rows) => {
  const parsed = [];
  let weekNumber = 1;

  for (let row = 1; row < rows.length; row += 3) {
    const top = rows[row];
    const middle = rows[row + 1];
    const bottom = rows[row + 2];

    if (!top || !middle || !bottom) continue;
    if (!top[0]) continue;

    const startDate = excelDateToJS(top[0]);

    if (!startDate) continue;

    let dayColumns = [];
    let endOffset = 5;

    switch (workingDays) {
      case "mon-fri":
        dayColumns = ALL_DAYS.slice(0, 5);
        endOffset = 4;
        break;

      case "mon-sat":
        dayColumns = ALL_DAYS.slice(0, 6);
        endOffset = 5;
        break;

      case "all":
        dayColumns = ALL_DAYS;
        endOffset = 6;
        break;

      default:
        dayColumns = ALL_DAYS.slice(0, 6);
        endOffset = 5;
    }

    const endDate = addDays(startDate, endOffset);

    const days = [];

    dayColumns.forEach((config, index) => {
      const date = addDays(startDate, index);

      days.push({
        date: formatDate(date),
        day: config.day,

        open: buildPanel(
          top[config.open],
          middle[config.open],
          bottom[config.open]
        ),

        jodi: formatJodi(
          top[config.jodi]
        ),

        close: buildPanel(
          top[config.close],
          middle[config.close],
          bottom[config.close]
        ),
      });
    });

    const year = startDate.getFullYear();

    const docId = `week_${year}_${String(
      weekNumber
    ).padStart(3, "0")}`;

    parsed.push({
      docId,
      year,
      week: weekNumber,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      days,
    });

    weekNumber++;
  }

  return parsed;
};

  const handleFile = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (!market) {
      alert("Please select a market first.");
      event.target.value = "";
      return;
    }

    setLoadingFile(true);
    setFileName(file.name);

    try {
      const buffer = await file.arrayBuffer();

      const workbook = XLSX.read(buffer, {
  type: "array",
});

const sheet =
  workbook.Sheets[
    workbook.SheetNames[0]
  ];

const rows = XLSX.utils.sheet_to_json(sheet, {
  header: 1,
  raw: true,
  defval: "",
});

console.log(rows[1][0], typeof rows[1][0]);

      const parsed =
        parseWeeks(rows);

      console.log(parsed);

      setWeeks(parsed);
    } catch (error) {
      console.error(error);

      alert(
        "Failed to read Excel file."
      );
    } finally {
      setLoadingFile(false);
    }
  };
  const importWeeks = async () => {
  if (!market) {
    alert("Please select a market.");
    return;
  }

  if (weeks.length === 0) {
    alert("Please upload an Excel file.");
    return;
  }

  if (
    !window.confirm(
      `Import ${weeks.length} weeks into ${market}?`
    )
  ) {
    return;
  }

  try {
    setImporting(true);
    setProgress(0);

    const chunkSize = 450;

    for (
      let start = 0;
      start < weeks.length;
      start += chunkSize
    ) {
      const batch = writeBatch(db);

      const chunk = weeks.slice(
        start,
        start + chunkSize
      );

      chunk.forEach((week) => {
        const ref = doc(
          db,
          "markets",
          market,
          "panelCharts",
          week.docId
        );

        batch.set(
  ref,
  {
    year: week.year,
    week: week.week,
    startDate: week.startDate,
    endDate: week.endDate,
    days: week.days,
    updatedAt: serverTimestamp(),
  },
  {
    merge: true,
  }
);
      });

      await batch.commit();

      setProgress(
        Math.round(
          ((start + chunk.length) /
            weeks.length) *
            100
        )
      );
    }

    alert(
      `${weeks.length} weeks imported successfully.`
    );
  } catch (e) {
    console.error(e);
    alert("Import failed.");
  } finally {
    setImporting(false);
  }
};
    return (
    <div className="import-page">

      <div className="import-card">

        <div className="page-header">

          <h1>
            📥 Import Panel Charts
          </h1>

          <p>
            Upload historical panel chart Excel files.
          </p>

        </div>

        <div className="form-group">

          <label>
            Select Market
          </label>

          <select
            value={market}
            disabled={loadingMarkets}
            onChange={(e) =>
              setMarket(e.target.value)
            }
          >

            <option value="">

              {loadingMarkets
                ? "Loading Markets..."
                : "Select Market"}

            </option>

            {markets.map((item) => (

              <option
                key={item.id}
                value={item.slug}
              >

                {item.name}

              </option>

            ))}

          </select>

        </div>
        <div className="form-group">

  <label>
    Working Days
  </label>

  <select
    value={workingDays}
    onChange={(e) =>
      setWorkingDays(e.target.value)
    }
  >
    <option value="mon-fri">
      Monday - Friday
    </option>

    <option value="mon-sat">
      Monday - Saturday
    </option>

    <option value="all">
      Monday - Sunday
    </option>

  </select>

</div>

        <div className="form-group">

          <label>

            Excel File

          </label>

          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFile}
          />

        </div>

        {fileName && (

          <div className="selected-file">

            📄 {fileName}

          </div>

        )}

        {loadingFile && (

          <div className="loading-box">

            Reading Excel...

          </div>

        )}

        {weeks.length > 0 && (

          <div className="summary-card">

            <h2>

              Preview

            </h2>

            <div className="summary-grid">

              <div>

                <strong>
                  Market
                </strong>

                <br />

                {market}

              </div>

              <div>

                <strong>
                  Total Weeks
                </strong>

                <br />

                {weeks.length}

              </div>

            </div>

          </div>

        )}

        {weeks.slice(0,3).map((week)=>(

          <div
            key={week.week}
            className="week-preview"
          >

            <div className="week-title">

              Week {week.week}

            </div>

            <div className="week-dates">

              <span>

                Start :
                {week.startDate}

              </span>

              <span>

                End :
                {week.endDate}

              </span>

            </div>

            <table className="preview-table">

              <thead>

                <tr>

                  <th>Day</th>

                  <th>Date</th>

                  <th>Open</th>

                  <th>Jodi</th>

                  <th>Close</th>

                </tr>

              </thead>

              <tbody>

                {week.days.map((day)=>(

                  <tr
                    key={day.date}
                  >

                    <td>

                      {day.day}

                    </td>

                    <td>

                      {day.date}

                    </td>

                    <td>

                      {day.open}

                    </td>

                    <td>

                      {day.jodi}

                    </td>

                    <td>

                      {day.close}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>
  

          </div>

        ))}
          {weeks.length > 0 && (
  <div
    style={{
      marginTop: 30,
      textAlign: "center",
    }}
  >
    <button
      onClick={importWeeks}
      disabled={importing}
      style={{
        padding: "14px 28px",
        background: "#16a34a",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "600",
      }}
    >
      {importing
        ? `Importing... ${progress}%`
        : `Import ${weeks.length} Weeks`}
    </button>
  </div>
)}
      </div>

    </div>
  );
}

export default ImportPanelChart;