import {
  useMemo,
  useState,
} from "react";

import {
  usePanelChart,
} from "../../context/PanelChartContext";

import "./monthlyChartTable.css";

function MonthlyChartTable({

  variant = "jodi",

}) {

  const {

    loading,

    weeks,

  } = usePanelChart();

  if (loading) {

    return null;

  }

  /* ==========================================
      TODAY
  ========================================== */

  const today = new Date();

  const [selectedMonth, setSelectedMonth] =
    useState(today.getMonth());

  const [selectedYear, setSelectedYear] =
    useState(today.getFullYear());

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

        weeks.map(

          week => week.year

        )

      ),

    ].sort((a, b) => b - a);

  }, [weeks]);

  /* ==========================================
      FILTER MONTH
  ========================================== */

  const monthWeeks = useMemo(() => {

    return weeks

  .filter((week) => {

    const startDate = week.startDate?.toDate
  ? week.startDate.toDate()
  : new Date(week.startDate);

const endDate = week.endDate?.toDate
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
    JSX
========================================== */

return (

  <section className="monthly-chart-table">

    <div className="monthly-chart-header">

      <div>

        <span className="monthly-tag">

          {variant === "jodi"

            ? "🎯 MONTHLY JODI CHART"

            : "📊 MONTHLY PANEL CHART"}

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

    </div>
        {/* ==========================================
        TABLE
    ========================================== */}

    <div className="monthly-table-wrapper">

      <table className="monthly-table">

        <thead>

          <tr>

            <th>Week</th>

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

              <td className="week-number">

  <strong>

    Week {week.week}

  </strong>

  <small>

    {(() => {

      const start = week.startDate?.toDate
        ? week.startDate.toDate()
        : new Date(week.startDate);

      const end = week.endDate?.toDate
        ? week.endDate.toDate()
        : new Date(week.endDate);

      return `${start.toLocaleDateString("en-GB")} - ${end.toLocaleDateString("en-GB")}`;

    })()}

  </small>

</td>

              {weekDays.map((dayName) => {

                const day = (week.days || []).find((item) => {

  const currentDay =

    item.day

      ?.toLowerCase()

      .substring(0, 3);

  return currentDay ===

    dayName.toLowerCase();

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

                    {day && variant === "jodi" && (
<div className="jodi-pill">

  <strong>

    {day.jodi}

  </strong>

</div>

                    )}

                    {day && variant === "panel" && (

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