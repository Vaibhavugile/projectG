import { useState } from "react";

import "./marketFAQ.css";

function MarketFAQ({ market }) {

  if (!market) return null;

  const faqs = [

    {
      question: `What is ${market.name} Matka?`,
      answer: `${market.name} Matka is one of the popular Satta Matka markets where daily results, panel charts, jodi charts and historical records are published for players and visitors.`,
    },

    {
      question: `What is today's ${market.name} result?`,
      answer: `Today's ${market.name} result is updated live as soon as the official market result is declared. You can check today's Open Panna, Jodi and Close Panna on this page.`,
    },

    {
      question: `What time does ${market.name} market open and close?`,
      answer: `${market.name} market opens at ${market.openTime} and closes at ${market.closeTime}. Results are updated immediately after the market closes.`,
    },

    {
      question: `Where can I check the ${market.name} Panel Chart?`,
      answer: `You can view the latest weekly panel chart along with historical panel charts by opening the Panel Chart section on this page.`,
    },

    {
      question: `Where can I check old ${market.name} results?`,
      answer: `Visit the Old Results section to browse previous daily results, panel charts, jodi charts and historical records.`,
    },

    {
      question: `How often is ${market.name} updated?`,
      answer: `Results, charts and market information are updated immediately whenever new official results become available.`,
    },

    {
      question: `Can I check previous week's charts?`,
      answer: `Yes. You can browse previous weeks using the navigation arrows available inside the chart preview sections.`,
    },

    {
      question: `Is this ${market.name} result updated live?`,
      answer: `Yes. Whenever the official result is published, this page updates automatically with the latest Open Panna, Jodi and Close Panna.`,
    },

  ];

  const [openIndex, setOpenIndex] =
    useState(0);

  const toggleFAQ = (index) => {

    setOpenIndex(

      openIndex === index

        ? -1

        : index

    );

  };

  return (

    <section className="market-faq">

      <div className="faq-header">

        <span className="faq-tag">

          ❓ FREQUENTLY ASKED QUESTIONS

        </span>

        <h2>

          {market.name} FAQ

        </h2>

        <p>

          Everything you need to know about {market.name},
          today's result,
          panel chart,
          jodi chart,
          timings and historical records.

        </p>

      </div>

      <div className="faq-list">
                {faqs.map((item, index) => (

          <div
            key={item.question}
            className={`faq-item ${
              openIndex === index ? "active" : ""
            }`}
          >

            <button
              type="button"
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >

              <span>

                {item.question}

              </span>

              <div className="faq-icon">

                {openIndex === index ? "−" : "+"}

              </div>

            </button>

            <div
              className={`faq-answer-wrapper ${
                openIndex === index ? "open" : ""
              }`}
            >

              <div className="faq-answer">

                {item.answer}

              </div>

            </div>

          </div>

        ))}

      </div>

      <div className="faq-footer">

        <p>

          Still have questions about{" "}

          <strong>

            {market.name}

          </strong>

          ?

        </p>

        <a
          href="#top"
          className="faq-top-btn"
        >

          ↑ Back to Top

        </a>

      </div>

    </section>

  );

}

export default MarketFAQ;