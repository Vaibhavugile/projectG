import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../../firebase/firebase"; // Change path if needed
import { Link } from "react-router-dom";
import "./marketsPage.css";

function MarketsPage() {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarkets();
  }, []);

  async function fetchMarkets() {
    try {
      setLoading(true);

      const snapshot = await getDocs(
        collection(db, "markets")
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      data.sort(
        (a, b) =>
          (a.sortOrder || 999) -
          (b.sortOrder || 999)
      );

      setMarkets(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="markets-page">
        <h2>Loading Markets...</h2>
      </div>
    );
  }

  return (
    <div className="markets-page">

      <div className="markets-header">

        <div>

          <h1>Markets</h1>

          <p>
            Manage all matka markets.
          </p>

        </div>

       <Link
  to="/admin/markets/add"
  className="add-market-btn"
>
  + Add Market
</Link>

      </div>

      <div className="markets-table-card">

        <table className="markets-table">

         <thead>

<tr>

<th>#</th>

<th>Market</th>

<th>Slug</th>

<th>Open</th>

<th>Close</th>

<th>Latest Result</th>

<th>Result Date</th>

{/* <th>Display</th> */}

<th>Sort</th>

<th>Status</th>

<th>Featured</th>

<th>Favorite</th>

<th>Viewers</th>

<th>Actions</th>

</tr>

</thead>

          <tbody>

        {markets.map((market, index) => (

<tr key={market.id}>

<td>

<strong>{index + 1}</strong>

</td>

<td>

<strong>{market.name}</strong>

</td>

<td>

{market.slug}

</td>

<td>

{market.openTime}

</td>

<td>

{market.closeTime}

</td>

<td>

<span className="result-pill">

{market.latestResult
? `${market.latestResult.openPanna} - ${market.latestResult.jodi} - ${market.latestResult.closePanna}`
: "--"}

</span>

</td>

<td>

{market.latestResult?.resultDate || "--"}

</td>

{/* <td>

{market.displayOrder}

</td> */}

<td>

{market.sortOrder}

</td>

<td>

<span
className={
market.isActive
? "status active"
: "status inactive"
}
>

{market.isActive
? "Active"
: "Inactive"}

</span>

</td>

<td>

{market.isFeatured ? (

<span className="featured-badge">

⭐

</span>

) : (

"-"

)}

</td>

<td>

{market.favorite ? (

<span className="favorite-badge">

❤️

</span>

) : (

"-"

)}

</td>

<td>

<span className="viewer-pill">

👁 {market.viewers?.toLocaleString() || 0}

</span>

</td>

<td>

<div className="action-buttons">

<Link
    to={`/admin/markets/edit/${market.id}`}
    className="edit-btn"
>
    Edit
</Link>

<button className="delete-btn">

🗑

</button>

</div>

</td>

</tr>

))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default MarketsPage;