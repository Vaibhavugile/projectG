import { Link } from "react-router-dom";

function MarketQuickNavigation({ slug }) {

  const navigation = [
    {
      title: "Today's Result",
      icon: "🏆",
      url: `/market/${slug}/result`,
    },
    {
      title: "Panel Chart",
      icon: "📊",
      url: `/market/${slug}/panel-chart`,
    },
    {
      title: "Jodi Chart",
      icon: "🎯",
      url: `/market/${slug}/jodi-chart`,
    },
    {
      title: "Weekly Chart",
      icon: "📅",
      url: `/market/${slug}/weekly-chart`,
    },
    {
      title: "Monthly Chart",
      icon: "🗓️",
      url: `/market/${slug}/monthly-chart`,
    },
    {
      title: "Old Results",
      icon: "📜",
      url: `/market/${slug}/old-results`,
    },
  ];

  return (

    <div className="market-quick-nav">

      {navigation.map((item) => (

        <Link
          key={item.title}
          to={item.url}
          className="quick-card"
        >

          <div className="quick-icon">

            {item.icon}

          </div>

          <span>

            {item.title}

          </span>

        </Link>

      ))}

    </div>

  );

}

export default MarketQuickNavigation;