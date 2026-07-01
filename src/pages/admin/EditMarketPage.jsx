import { useEffect, useState } from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../firebase/firebase"; // Adjust path if needed

import "./addMarketPage.css";

function EditMarketPage() {

  const { marketId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

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

    latestResult: {},

  });

  /* ==========================================
      TIME FORMAT
  ========================================== */

  const formatTime = (time) => {

    if (!time) return "";

    const [hour, minute] = time.split(":");

    let h = parseInt(hour, 10);

    const ampm = h >= 12 ? "PM" : "AM";

    h %= 12;

    if (h === 0) h = 12;

    return `${String(h).padStart(2, "0")}:${minute} ${ampm}`;

  };

  /* ==========================================
      CONVERT 04:00 PM -> 16:00
  ========================================== */

  const convertToInputTime = (time) => {

    if (!time) return "";

    const [clock, ampm] = time.split(" ");

    let [hour, minute] = clock.split(":");

    hour = parseInt(hour);

    if (ampm === "PM" && hour !== 12) {

      hour += 12;

    }

    if (ampm === "AM" && hour === 12) {

      hour = 0;

    }

    return `${String(hour).padStart(2, "0")}:${minute}`;

  };

  /* ==========================================
      LOAD MARKET
  ========================================== */

  useEffect(() => {

    loadMarket();

  }, []);

  async function loadMarket() {

    try {

      const snap = await getDoc(
        doc(db, "markets", marketId)
      );

      if (!snap.exists()) {

        alert("Market not found");

        navigate("/admin/markets");

        return;

      }

      const data = snap.data();

      setMarket({

        ...data,

        openTime: convertToInputTime(data.openTime),

        closeTime: convertToInputTime(data.closeTime),

      });

    } catch (e) {

      console.log(e);

    } finally {

      setLoading(false);

    }

  }
    /* ==========================================
      UPDATE MARKET
  ========================================== */

  async function updateMarket() {

    if (!market.name.trim()) {

      alert("Please enter market name.");

      return;

    }

    try {

      setSaving(true);

      await updateDoc(

        doc(db, "markets", marketId),

        {

          name: market.name,

          slug: market.slug,

          openTime: formatTime(market.openTime),

          closeTime: formatTime(market.closeTime),

          displayOrder: Number(market.displayOrder),

          sortOrder: Number(market.sortOrder),

          viewers: Number(market.viewers),

          isActive: market.isActive,

          isFeatured: market.isFeatured,

          favorite: market.favorite,

          updatedAt: serverTimestamp(),

        }

      );

      alert("Market Updated Successfully ✅");

      navigate("/admin/markets");

    } catch (error) {

      console.error(error);

      alert(error.message);

    } finally {

      setSaving(false);

    }

  }

  /* ==========================================
      LOADING
  ========================================== */

  if (loading) {

    return (

      <div className="add-market-page">

        <div className="add-market-container">

          <h2>Loading Market...</h2>

        </div>

      </div>

    );

  }

  return (

    <div className="add-market-page">

      <div className="add-market-container">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="add-market-header">

         

          <div>

            <h1>

              Edit Market

            </h1>

            <p>

              Update market information.

            </p>

          </div>

        </div>

        <div className="market-form-card">
            <div className="form-section">

  <h2>Market Details</h2>

  <div className="form-grid">

    <div className="form-group">

      <label>Market Name</label>

      <input
        type="text"
        value={market.name}
        onChange={(e) =>

          setMarket({

            ...market,

            name: e.target.value,

          })

        }
      />

    </div>

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

    <div className="form-group">

      <label>Display Order</label>

      <input
        type="number"
        value={market.displayOrder}
        onChange={(e) =>

          setMarket({

            ...market,

            displayOrder:Number(e.target.value),

          })

        }
      />

    </div>

    <div className="form-group">

      <label>Sort Order</label>

      <input
        type="number"
        value={market.sortOrder}
        onChange={(e) =>

          setMarket({

            ...market,

            sortOrder:Number(e.target.value),

          })

        }
      />

    </div>

    <div className="form-group">

      <label>Viewers</label>

      <input
        type="number"
        value={market.viewers}
        onChange={(e) =>

          setMarket({

            ...market,

            viewers:Number(e.target.value),

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
                  Display on homepage.
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

        {/* ==========================================
            ACTION BUTTONS
        ========================================== */}

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
            onClick={updateMarket}
            disabled={saving}
          >

            {saving
              ? "Updating..."
              : "Update Market"}

          </button>

        </div>

      </div>

    </div>

  </div>

);

}

export default EditMarketPage;