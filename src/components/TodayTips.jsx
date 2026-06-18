import { useState } from "react";

import "../styles/todayTips.css";

function TodayTips() {

  const [tips] = useState({

    goldenAnk: "7",

    luckyAnk: [
      "1",
      "4",
      "7",
      "8",
      "9",
    ],

    luckyJodi: [
      "18",
      "47",
      "66",
      "78",
    ],

    hotPanna: [
      "128",
      "459",
      "367",
    ],

  });

  return (

    <section className="today-tips">

      <div className="tips-header">

        <h2>
          ⭐ Today's Lucky Numbers
        </h2>

        <p>
          Daily Golden Ank & Lucky Jodi
        </p>

      </div>

      <div className="tips-grid">

        <div className="tip-card golden">

          <span className="tip-label">
            GOLDEN ANK
          </span>

          <div className="golden-number">
            {tips.goldenAnk}
          </div>

        </div>

        <div className="tip-card">

          <span className="tip-label">
            LUCKY ANK
          </span>

          <div className="tip-list">

            {tips.luckyAnk.map(
              (item) => (

                <span
                  key={item}
                  className="tip-pill"
                >
                  {item}
                </span>

              )
            )}

          </div>

        </div>

        <div className="tip-card">

          <span className="tip-label">
            LUCKY JODI
          </span>

          <div className="tip-list">

            {tips.luckyJodi.map(
              (item) => (

                <span
                  key={item}
                  className="tip-pill"
                >
                  {item}
                </span>

              )
            )}

          </div>

        </div>

        <div className="tip-card">

          <span className="tip-label">
            HOT PANNA
          </span>

          <div className="tip-list">

            {tips.hotPanna.map(
              (item) => (

                <span
                  key={item}
                  className="tip-pill"
                >
                  {item}
                </span>

              )
            )}

          </div>

        </div>

      </div>

    </section>

  );

}

export default TodayTips;