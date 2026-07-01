import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "../../firebase/firebase"; // Adjust path if needed

import "./addMarketPage.css";

function AddMarketPage() {

  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);

  const [market, setMarket] = useState({

    name: "",

    slug: "",

    openTime: "",

    closeTime: "",

    displayOrder: 1,

    sortOrder: 1,

    viewers: 0,

    isActive: true,

    isFeatured: false,

    favorite: false,

  });

  /* ==========================================
      AUTO GENERATE SLUG
  ========================================== */

  const handleNameChange = (e) => {

    const name = e.target.value;

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "");

    setMarket((prev) => ({
      ...prev,
      name,
      slug,
    }));

  };
  /* ==========================================
    FORMAT TIME
========================================== */

const formatTime = (time) => {

  if (!time) return "";

  const [hour, minute] = time.split(":");

  let h = parseInt(hour, 10);

  const ampm = h >= 12 ? "PM" : "AM";

  h = h % 12;

  if (h === 0) h = 12;

  return `${String(h).padStart(2, "0")}:${minute} ${ampm}`;

};

  /* ==========================================
      SAVE MARKET
  ========================================== */

  const saveMarket = async () => {

    if (!market.name.trim()) {

      alert("Please enter market name.");

      return;

    }

    if (!market.slug.trim()) {

      alert("Slug is required.");

      return;

    }

    try {

      setSaving(true);

      await setDoc(

        doc(db, "markets", market.slug),

        {

          ...market,

    openTime: formatTime(market.openTime),

    closeTime: formatTime(market.closeTime),

          latestResult: {

            openPanna: "***",

            openAnk: "*",

            jodi: "**",

            closePanna: "***",

            closeAnk: "*",

            resultDate: "",

          },

          createdAt: serverTimestamp(),

          updatedAt: serverTimestamp(),

        }

      );

      alert("Market Added Successfully ✅");

      navigate("/admin/markets");

    } catch (error) {

      console.error(error);

      alert(error.message);

    } finally {

      setSaving(false);

    }

  };
  return (

  <div className="add-market-page">

    <div className="add-market-container">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="add-market-header">

       

        <div>

          <h1>
            Add New Market
          </h1>

          <p>
            Create a new matka market.
          </p>

        </div>

      </div>

      {/* ==========================================
          FORM CARD
      ========================================== */}

      <div className="market-form-card">

        <div className="form-section">

          <h2>Market Details</h2>

          <div className="form-grid">

            {/* Market Name */}

            <div className="form-group">

              <label>Market Name</label>

              <input
                type="text"
                placeholder="Kalyan"
                value={market.name}
                onChange={handleNameChange}
              />

            </div>

            {/* Slug */}

            <div className="form-group">

              <label>Slug</label>

              <input
                type="text"
                value={market.slug}
                onChange={(e) =>
                  setMarket({
                    ...market,
                    slug: e.target.value,
                  })
                }
              />

            </div>

            {/* Open Time */}

            <div className="form-group">

              <label>Open Time</label>

              <input
                type="time"
                value={market.openTime}
                onChange={(e) =>
                  setMarket({
                    ...market,
                    openTime: e.target.value,
                  })
                }
              />

            </div>

            {/* Close Time */}

            <div className="form-group">

              <label>Close Time</label>

              <input
                type="time"
                value={market.closeTime}
                onChange={(e) =>
                  setMarket({
                    ...market,
                    closeTime: e.target.value,
                  })
                }
              />

            </div>

            {/* Display Order */}

            <div className="form-group">

              <label>Display Order</label>

              <input
                type="number"
                value={market.displayOrder}
                onChange={(e) =>
                  setMarket({
                    ...market,
                    displayOrder: Number(e.target.value),
                  })
                }
              />

            </div>

            {/* Sort Order */}

            <div className="form-group">

              <label>Sort Order</label>

              <input
                type="number"
                value={market.sortOrder}
                onChange={(e) =>
                  setMarket({
                    ...market,
                    sortOrder: Number(e.target.value),
                  })
                }
              />

            </div>

            {/* Initial Viewers */}

            <div className="form-group">

              <label>Initial Viewers</label>

              <input
                type="number"
                value={market.viewers}
                onChange={(e) =>
                  setMarket({
                    ...market,
                    viewers: Number(e.target.value),
                  })
                }
              />

            </div>

          </div>

        </div>

        <div className="form-divider" />
                {/* ==========================================
            MARKET SETTINGS
        ========================================== */}

        <div className="form-section">

          <h2>Market Settings</h2>

          <div className="settings-grid">

            {/* Active */}

            <label className="setting-card">

              <div>

                <h4>Active Market</h4>

                <p>
                  Show this market on the website.
                </p>

              </div>

              <input
                type="checkbox"
                checked={market.isActive}
                onChange={(e) =>
                  setMarket({
                    ...market,
                    isActive: e.target.checked,
                  })
                }
              />

            </label>

            {/* Featured */}

            <label className="setting-card">

              <div>

                <h4>Featured Market</h4>

                <p>
                  Show on homepage.
                </p>

              </div>

              <input
                type="checkbox"
                checked={market.isFeatured}
                onChange={(e) =>
                  setMarket({
                    ...market,
                    isFeatured: e.target.checked,
                  })
                }
              />

            </label>

            {/* Favorite */}

            <label className="setting-card">

              <div>

                <h4>Favorite Market</h4>

                <p>
                  Mark as favourite market.
                </p>

              </div>

              <input
                type="checkbox"
                checked={market.favorite}
                onChange={(e) =>
                  setMarket({
                    ...market,
                    favorite: e.target.checked,
                  })
                }
              />

            </label>

          </div>

        </div>

        <div className="form-actions">

          <Link
            to="/admin/markets"
            className="cancel-btn"
          >
            Cancel
          </Link>

          <button
            type="button"
            className="save-btn"
            onClick={saveMarket}
            disabled={saving}
          >

            {saving
              ? "Saving..."
              : "Save Market"}

          </button>

        </div>

      </div>

    </div>

  </div>

);

}

export default AddMarketPage;