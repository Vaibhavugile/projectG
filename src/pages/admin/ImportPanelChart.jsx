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
const [futurePreview, setFuturePreview] = useState([]);
const [loadingPreview, setLoadingPreview] = useState(false);
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
const generateFutureWeeksForAllMarkets = async () => {
  try {
    setLoadingFile(true);

    console.log(
      "Starting future week generation for all markets..."
    );

    // ==========================================
    // GET ALL MARKETS
    // ==========================================

    const marketsSnapshot = await getDocs(
      collection(db, "markets")
    );

    if (marketsSnapshot.empty) {
      alert("No markets found.");
      return;
    }

    let totalCreated = 0;

    // ==========================================
    // PROCESS EACH MARKET
    // ==========================================

    for (const marketDoc of marketsSnapshot.docs) {
      const marketId = marketDoc.id;
      const marketData = marketDoc.data();

      console.log(
        `Processing market: ${
          marketData.name || marketId
        }`
      );

      // ========================================
      // GET EXISTING WEEKS
      // ========================================

      const weeksRef = collection(
        db,
        "markets",
        marketId,
        "panelCharts"
      );

      const weeksSnapshot = await getDocs(
        weeksRef
      );

      // ========================================
      // FIND LATEST WEEK
      // ========================================

      let latestWeek = null;

      weeksSnapshot.forEach((weekDoc) => {
        const data = weekDoc.data();

        if (
          !data.startDate ||
          !data.week
        ) {
          return;
        }

        if (!latestWeek) {
          latestWeek = {
            docId: weekDoc.id,
            week: Number(data.week),
            startDate: data.startDate,
            endDate: data.endDate,
            year: Number(data.year),
          };

          return;
        }

        // Compare dates
        const currentDate =
          new Date(data.startDate);

        const latestDate =
          new Date(latestWeek.startDate);

        if (currentDate > latestDate) {
          latestWeek = {
            docId: weekDoc.id,
            week: Number(data.week),
            startDate: data.startDate,
            endDate: data.endDate,
            year: Number(data.year),
          };
        }
      });

      // ========================================
      // IF MARKET HAS NO EXISTING WEEKS
      // ========================================

      if (!latestWeek) {
        console.warn(
          `No existing weeks found for ${
            marketData.name || marketId
          }`
        );

        continue;
      }

      console.log(
        `${
          marketData.name || marketId
        } latest week:`,
        latestWeek.week,
        latestWeek.startDate,
        latestWeek.endDate
      );

      // ========================================
      // START FROM NEXT MONDAY
      // ========================================

      const latestStartDate =
        parseStoredDate(
          latestWeek.startDate
        );

      const nextMonday = addDays(
        latestStartDate,
        7
      );

      // ========================================
      // 5 MONTH END DATE
      // ========================================

      const generationEndDate =
        new Date(nextMonday);

      generationEndDate.setMonth(
        generationEndDate.getMonth() + 5
      );

      // ========================================
      // GENERATE WEEKS
      // ========================================

      let currentMonday =
        new Date(nextMonday);

      let weekNumber =
        latestWeek.week + 1;

      let batch = writeBatch(db);

      let batchCount = 0;

      while (
        currentMonday < generationEndDate
      ) {
        // --------------------------------------
        // Sunday = Monday + 6 days
        // --------------------------------------

        const currentSunday =
          addDays(
            currentMonday,
            6
          );

        const year =
          currentMonday.getFullYear();

        // --------------------------------------
        // DOCUMENT ID
        // --------------------------------------

        const docId =
          `week_${year}_${String(
            weekNumber
          ).padStart(3, "0")}`;

        const weekRef = doc(
          weeksRef,
          docId
        );

        // --------------------------------------
        // CHECK IF DOCUMENT ALREADY EXISTS
        // --------------------------------------

        const alreadyExists =
          weeksSnapshot.docs.some(
            (existingDoc) =>
              existingDoc.id === docId
          );

        if (!alreadyExists) {
          // ------------------------------------
          // CREATE 7 DAYS
          // ------------------------------------

          const days = [];

          for (
            let dayIndex = 0;
            dayIndex < 7;
            dayIndex++
          ) {
            const date = addDays(
              currentMonday,
              dayIndex
            );

            days.push({
              date: formatStoredDate(
                date
              ),

              day:
                [
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                  "Sun",
                ][dayIndex],

              open: "",

              jodi: "",

              close: "",
            });
          }

          // ------------------------------------
          // CREATE WEEK
          // ------------------------------------

          batch.set(
            weekRef,
            {
              docId,

              year,

              week: weekNumber,

              startDate:
                formatStoredDate(
                  currentMonday
                ),

              endDate:
                formatStoredDate(
                  currentSunday
                ),

              days,

              createdAt:
                new Date(),

              updatedAt:
                new Date(),
            }
          );

          batchCount++;
          totalCreated++;

          console.log(
            `Creating ${
              marketData.name ||
              marketId
            } - Week ${
              weekNumber
            } - ${
              formatStoredDate(
                currentMonday
              )
            } to ${
              formatStoredDate(
                currentSunday
              )
            }`
          );

          // Firestore batch max = 500
          if (batchCount >= 450) {
            await batch.commit();

            batch =
              writeBatch(db);

            batchCount = 0;
          }
        }

        // --------------------------------------
        // NEXT WEEK
        // --------------------------------------

        currentMonday =
          addDays(
            currentMonday,
            7
          );

        weekNumber++;
      }

      // ========================================
      // COMMIT REMAINING BATCH
      // ========================================

      if (batchCount > 0) {
        await batch.commit();
      }

      console.log(
        `Finished market: ${
          marketData.name ||
          marketId
        }`
      );
    }

    alert(
      `Future weeks generated successfully.\n\nTotal new weeks: ${totalCreated}`
    );

    console.log(
      "Total future weeks created:",
      totalCreated
    );

  } catch (error) {
    console.error(
      "Error generating future weeks:",
      error
    );

    alert(
      "Failed to generate future weeks. Check the console."
    );
  } finally {
    setLoadingFile(false);
  }
};
const parseStoredDate = (value) => {
  if (!value) return null;

  const parts = value
    .split("-")
    .map(Number);

  if (parts.length !== 3) {
    return null;
  }

  const [
    year,
    month,
    day,
  ] = parts;

  return new Date(
    year,
    month - 1,
    day
  );
};
const formatStoredDate = (date) => {
  const year =
    date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
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

  const addDays = (date, days) => {
  const result = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  result.setDate(
    result.getDate() + days
  );

  return result;
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
  const previewFutureWeeksForAllMarkets = async () => {
  try {
    setLoadingPreview(true);

    const marketsSnapshot = await getDocs(
      collection(db, "markets")
    );

    if (marketsSnapshot.empty) {
      alert("No markets found.");
      return;
    }

    const preview = [];

    for (const marketDoc of marketsSnapshot.docs) {
      const marketId = marketDoc.id;
      const marketData = marketDoc.data();

      const weeksRef = collection(
        db,
        "markets",
        marketId,
        "panelCharts"
      );

      const weeksSnapshot = await getDocs(
        weeksRef
      );

      let latestWeek = null;

      weeksSnapshot.forEach((weekDoc) => {
        const data = weekDoc.data();

        if (
          data.week === undefined ||
          !data.startDate
        ) {
          return;
        }

        const weekNumber = Number(data.week);

        const startDate =
          parseStoredDate(data.startDate);

        if (!startDate) {
          return;
        }

        if (
          !latestWeek ||
          startDate > latestWeek.startDate
        ) {
          latestWeek = {
            docId: weekDoc.id,
            week: weekNumber,
            startDate,
            endDate: data.endDate
              ? parseStoredDate(data.endDate)
              : null,
          };
        }
      });

      // ----------------------------------------
      // MARKET HAS NO WEEKS
      // ----------------------------------------

      if (!latestWeek) {
        preview.push({
          marketId,
          marketName:
            marketData.name || marketId,

          hasExistingWeeks: false,

          latestWeek: null,

          weeks: [],
        });

        continue;
      }

      // ----------------------------------------
      // NEXT WEEK
      // ----------------------------------------

      let currentMonday = addDays(
        latestWeek.startDate,
        7
      );

      let weekNumber =
        latestWeek.week + 1;

      // ----------------------------------------
      // 5 MONTH END
      // ----------------------------------------

      const generationEndDate =
        new Date(currentMonday);

      generationEndDate.setMonth(
        generationEndDate.getMonth() + 5
      );

      const futureWeeks = [];

      // ----------------------------------------
      // GENERATE PREVIEW ONLY
      // ----------------------------------------

      while (
        currentMonday < generationEndDate
      ) {
        const currentSunday =
          addDays(
            currentMonday,
            6
          );

        const days = [];

        for (
          let dayIndex = 0;
          dayIndex < 7;
          dayIndex++
        ) {
          const date = addDays(
            currentMonday,
            dayIndex
          );

          days.push({
            date:
              formatStoredDate(date),

            day:
              [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun",
              ][dayIndex],

            open: "",
            jodi: "",
            close: "",
          });
        }

        futureWeeks.push({
          week: weekNumber,

          startDate:
            formatStoredDate(
              currentMonday
            ),

          endDate:
            formatStoredDate(
              currentSunday
            ),

          days,
        });

        currentMonday = addDays(
          currentMonday,
          7
        );

        weekNumber++;
      }

      // ----------------------------------------
      // ADD MARKET PREVIEW
      // ----------------------------------------

      preview.push({
        marketId,

        marketName:
          marketData.name || marketId,

        hasExistingWeeks: true,

        latestWeek: {
          week: latestWeek.week,

          startDate:
            formatStoredDate(
              latestWeek.startDate
            ),

          endDate:
            latestWeek.endDate
              ? formatStoredDate(
                  latestWeek.endDate
                )
              : "",
        },

        firstNewWeek:
          futureWeeks.length > 0
            ? futureWeeks[0].week
            : null,

        lastNewWeek:
          futureWeeks.length > 0
            ? futureWeeks[
                futureWeeks.length - 1
              ].week
            : null,

        totalWeeks:
          futureWeeks.length,

        weeks: futureWeeks,
      });
    }

    console.log(
      "Future weeks preview:",
      preview
    );

    setFuturePreview(preview);

  } catch (error) {
    console.error(
      "Error creating future weeks preview:",
      error
    );

    alert(
      "Failed to create preview. Check the console."
    );
  } finally {
    setLoadingPreview(false);
  }
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
<button
  type="button"
  onClick={
    generateFutureWeeksForAllMarkets
  }
  disabled={loadingFile}
  className="generate-future-btn"
>
  {loadingFile
    ? "Generating Future Weeks..."
    : "Generate Future Weeks for All Markets"}
</button>
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