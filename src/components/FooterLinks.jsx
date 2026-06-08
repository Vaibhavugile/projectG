import "../styles/footerLinks.css";

const links = [
  "Kalyan Result",
  "Main Bazar Result",
  "Milan Day Result",
  "Rajdhani Night Result",
  "Time Bazar Result",
  "Sridevi Result",
  "Madhur Day Result",
  "Kalyan Night Result",
  "Kalyan Jodi Chart",
  "Main Bazar Jodi Chart",
  "Panel Chart",
  "Old Jodi Chart",
  "Matka Charts",
  "Starline Result",
  "Jackpot Result",
  "Matka Result Today",
];

function FooterLinks() {
  return (
    <section className="footer-links">

      <div className="footer-links-header">

        <h2>
          🔗 Popular Result Links
        </h2>

        <p>
          Quick access to popular markets, charts
          and daily results.
        </p>

      </div>

      <div className="footer-links-grid">

        {links.map((item) => (
          <a
            href="/"
            key={item}
            className="footer-link-card"
          >
            {item}
          </a>
        ))}

      </div>

    </section>
  );
}

export default FooterLinks;