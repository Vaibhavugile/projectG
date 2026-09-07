import {
  useMemo,
  useState,
  useRef,
} from "react";

import {
  usePanelChart,
} from "../../context/PanelChartContext";

import html2canvas from "html2canvas";

import { jsPDF } from "jspdf";

import "./monthlyChartTable.css";


function MonthlyChartTable({

  variant = "jodi",

}) {

  const {

    loading,

    weeks = [],

  } = usePanelChart();


  /* ==========================================
      ALL HOOKS FIRST
  ========================================== */

  const chartRef = useRef(null);

  const today = new Date();

  const [selectedMonth, setSelectedMonth] =
    useState(today.getMonth());

  const [selectedYear, setSelectedYear] =
    useState(today.getFullYear());

  const [downloading, setDownloading] =
    useState(false);


  /* ==========================================
      MONTHS
  ========================================== */

  const months = [

    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",

  ];


  /* ==========================================
      AVAILABLE YEARS
  ========================================== */

  const availableYears = useMemo(() => {

    return [

      ...new Set(
        weeks.map((week) => week.year)
      ),

    ].sort((a, b) => b - a);

  }, [weeks]);


  /* ==========================================
      FILTER MONTH
  ========================================== */

  const monthWeeks = useMemo(() => {

    return weeks

      .filter((week) => {

        const startDate =
          week.startDate?.toDate
            ? week.startDate.toDate()
            : new Date(week.startDate);

        const endDate =
          week.endDate?.toDate
            ? week.endDate.toDate()
            : new Date(week.endDate);

        return (

          (

            startDate.getMonth() === selectedMonth ||

            endDate.getMonth() === selectedMonth

          ) &&

          (

            startDate.getFullYear() === selectedYear ||

            endDate.getFullYear() === selectedYear

          )

        );

      })

      .sort((a, b) => a.week - b.week);

  }, [

    weeks,
    selectedMonth,
    selectedYear,

  ]);


  /* ==========================================
      WEEK DAYS
  ========================================== */

  const weekDays = [

    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",

  ];


  /* ==========================================
      MONTH NAVIGATION
  ========================================== */

  const previousMonth = () => {

    if (selectedMonth === 0) {

      setSelectedMonth(11);

      setSelectedYear((year) => year - 1);

    } else {

      setSelectedMonth((month) => month - 1);

    }

  };


  const nextMonth = () => {

    if (selectedMonth === 11) {

      setSelectedMonth(0);

      setSelectedYear((year) => year + 1);

    } else {

      setSelectedMonth((month) => month + 1);

    }

  };


  /* ==========================================
      DOWNLOAD PDF
  ========================================== */

const downloadPDF = async () => {

  if (!chartRef.current) return;

  let tempContainer = null;

  try {

    setDownloading(true);


    const originalTable =
      chartRef.current;


    /* ==========================================
       CREATE TEMPORARY FULL TABLE
    ========================================== */

    tempContainer =
      document.createElement("div");


    const clonedTable =
      originalTable.cloneNode(true);


    /* ==========================================
       TEMP CONTAINER STYLE
    ========================================== */

    tempContainer.style.position =
      "fixed";

    tempContainer.style.left =
      "-99999px";

    tempContainer.style.top =
      "0";

    tempContainer.style.background =
      "#ffffff";

    tempContainer.style.padding =
      "0";

    tempContainer.style.margin =
      "0";

    tempContainer.style.overflow =
      "visible";

    tempContainer.style.direction =
      "ltr";


    tempContainer.setAttribute(
      "dir",
      "ltr"
    );


    /* ==========================================
       TABLE SIZE
    ========================================== */

    tempContainer.style.width =
      `${originalTable.scrollWidth}px`;


    clonedTable.style.width =
      `${originalTable.scrollWidth}px`;

    clonedTable.style.minWidth =
      `${originalTable.scrollWidth}px`;

    clonedTable.style.maxWidth =
      "none";


    /* ==========================================
       FORCE CORRECT COLUMN ORDER

       WEEK → MON → TUE → WED → THU → FRI
       → SAT → SUN
    ========================================== */

    clonedTable.style.direction =
      "ltr";


    clonedTable.setAttribute(
      "dir",
      "ltr"
    );


    clonedTable.style.tableLayout =
      "fixed";


    /* Force all table elements LTR */

    clonedTable
      .querySelectorAll(
        "thead, tbody, tr, th, td"
      )
      .forEach((element) => {

        element.style.direction =
          "ltr";


        element.setAttribute(
          "dir",
          "ltr"
        );


        /* Remove unwanted positioning */

        const computed =
          window.getComputedStyle(element);


        if (
          computed.position === "sticky"
        ) {

          element.style.position =
            "static";

        }


        /* Remove right sticky positioning */

        element.style.right =
          "auto";


        /* Make sure left positioning works */

        if (
          element.classList.contains(
            "week-number"
          )
        ) {

          element.style.left =
            "auto";

        }

      });


    /* ==========================================
       APPEND CLONED TABLE
    ========================================== */

    tempContainer.appendChild(
      clonedTable
    );


    document.body.appendChild(
      tempContainer
    );


    /* ==========================================
       WAIT FOR RENDERING
    ========================================== */

    await new Promise(
      (resolve) => {

        setTimeout(
          resolve,
          300
        );

      }
    );


    /* ==========================================
       GET COMPLETE TABLE SIZE
    ========================================== */

    const tableWidth =
      clonedTable.scrollWidth;


    const tableHeight =
      clonedTable.scrollHeight;


    /* ==========================================
       CAPTURE COMPLETE TABLE
    ========================================== */

    const canvas =
      await html2canvas(
        clonedTable,
        {

          scale: 2,

          useCORS: true,

          backgroundColor:
            "#ffffff",

          width:
            tableWidth,

          height:
            tableHeight,

          windowWidth:
            tableWidth,

          windowHeight:
            tableHeight,

          scrollX: 0,

          scrollY: 0,

        }
      );


    /* ==========================================
       REMOVE TEMP TABLE
    ========================================== */

    if (
      tempContainer &&
      tempContainer.parentNode
    ) {

      tempContainer.parentNode.removeChild(
        tempContainer
      );

      tempContainer = null;

    }


    /* ==========================================
       PDF SETTINGS
    ========================================== */

    const margin =
      10;


    const pdfWidth =
      297;


    /* Calculate chart ratio */

    const chartRatio =
      canvas.height /
      canvas.width;


    const imageWidth =
      pdfWidth -
      (margin * 2);


    const imageHeight =
      imageWidth *
      chartRatio;


    const pdfHeight =
      imageHeight +
      (margin * 2);


    /* ==========================================
       CREATE SINGLE PDF PAGE
    ========================================== */

    const pdf =
      new jsPDF({

        orientation:
          "landscape",

        unit:
          "mm",

        format: [

          pdfWidth,

          pdfHeight,

        ],

      });


    /* ==========================================
       CREATE IMAGE
    ========================================== */

    const imageData =
      canvas.toDataURL(
        "image/png",
        1.0
      );


    /* ==========================================
       ADD COMPLETE CHART
    ========================================== */

    pdf.addImage(

      imageData,

      "PNG",

      margin,

      margin,

      imageWidth,

      imageHeight,

      undefined,

      "FAST"

    );


    /* ==========================================
       FILE NAME
    ========================================== */

    const chartName =

      variant === "jodi"

        ? "Jodi-Chart"

        : "Panel-Chart";


    /* ==========================================
       SAVE PDF
    ========================================== */

    pdf.save(

      `${chartName}-${months[selectedMonth]}-${selectedYear}.pdf`

    );


  } catch (error) {

    console.error(

      "PDF download failed:",

      error

    );


  } finally {


    /* ==========================================
       CLEANUP TEMP ELEMENT
    ========================================== */

    if (
      tempContainer &&
      tempContainer.parentNode
    ) {

      tempContainer.parentNode.removeChild(
        tempContainer
      );

    }


    setDownloading(false);

  }

};

  /* ==========================================
      LOADING AFTER ALL HOOKS
  ========================================== */

  if (loading) {

    return null;

  }


  /* ==========================================
      JSX
  ========================================== */

  return (

    <section className="monthly-chart-table">


      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="monthly-chart-header">


        <div>

          <span className="monthly-tag">

            {variant === "jodi"

              ? "🎯 MONTHLY JODI CHART"

              : "📊 MONTHLY PANEL CHART"

            }

          </span>


          <h2>

            {months[selectedMonth]} {selectedYear}

          </h2>


          <p>

            Browse complete monthly historical charts.

          </p>

        </div>


        <div className="monthly-filters">


          <button

            className="month-nav"

            onClick={previousMonth}

          >

            ←

          </button>


          <select

            value={selectedMonth}

            onChange={(e) =>

              setSelectedMonth(
                Number(e.target.value)
              )

            }

          >

            {months.map((month, index) => (

              <option

                key={month}

                value={index}

              >

                {month}

              </option>

            ))}

          </select>


          <select

            value={selectedYear}

            onChange={(e) =>

              setSelectedYear(
                Number(e.target.value)
              )

            }

          >

            {availableYears.map((year) => (

              <option

                key={year}

                value={year}

              >

                {year}

              </option>

            ))}

          </select>


          <button

            className="month-nav"

            onClick={nextMonth}

          >

            →

          </button>




        </div>

          <button

            className="download-chart-btn"

            onClick={downloadPDF}

            disabled={downloading}

          >

            {downloading

              ? "⏳ Preparing..."

              : "📥 Download PDF"

            }

          </button>
      </div>


      {/* ==========================================
          TABLE
      ========================================== */}

      <div className="monthly-table-wrapper">


        <table

          ref={chartRef}

          className="monthly-table"

        >


          <thead>

            <tr>

              <th>

                Week

              </th>


              {weekDays.map((day) => (

                <th key={day}>

                  {day}

                </th>

              ))}

            </tr>

          </thead>


          <tbody>


            {monthWeeks.length === 0 && (

              <tr>

                <td

                  colSpan={8}

                  className="monthly-empty"

                >

                  No chart available for this month.

                </td>

              </tr>

            )}


            {monthWeeks.map((week) => (

              <tr key={week.id}>


                {/* WEEK */}

                <td className="week-number">

                  <strong>

                    Week {week.week}

                  </strong>


                  <small>

                    {(() => {

                      const start =

                        week.startDate?.toDate

                          ? week.startDate.toDate()

                          : new Date(
                              week.startDate
                            );


                      const end =

                        week.endDate?.toDate

                          ? week.endDate.toDate()

                          : new Date(
                              week.endDate
                            );


                      return `${start.toLocaleDateString("en-GB")} - ${end.toLocaleDateString("en-GB")}`;

                    })()}

                  </small>

                </td>


                {/* DAYS */}

                {weekDays.map((dayName) => {


                  const day =

                    (week.days || []).find((item) => {


                      const currentDay =

                        item.day

                          ?.toLowerCase()

                          .substring(0, 3);


                      return (

                        currentDay ===

                        dayName.toLowerCase()

                      );

                    });


                  return (

                    <td

                      key={dayName}

                      className="monthly-cell"

                    >


                      {!day && (

                        <span className="empty-cell">

                          --

                        </span>

                      )}


                      {/* JODI */}

                      {day &&

                        variant === "jodi" && (

                          <div className="jodi-pill">

                            <strong>

                              {day.jodi}

                            </strong>

                          </div>

                        )}


                      {/* PANEL */}

                      {day &&

                        variant === "panel" && (

                          <div className="panel-chart-values">


                            <div className="panel-open">

                              {day.open}

                            </div>


                            <div className="panel-jodii">

                              {day.jodi}

                            </div>


                            <div className="panel-close">

                              {day.close}

                            </div>


                          </div>

                        )}

                    </td>

                  );

                })}


              </tr>

            ))}


          </tbody>

        </table>

      </div>


    </section>

  );

}


export default MonthlyChartTable;