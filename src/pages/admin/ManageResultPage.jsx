import { useEffect, useState } from "react";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

import "./manageResultPage.css";

function ManageResultPage() {

    const { marketId } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [market, setMarket] = useState(null);

    const [todayResult, setTodayResult] = useState(null);

    const [selectedTab, setSelectedTab] =
        useState("open");
        const [resultData, setResultData] = useState({

    openPanna: "",

    openAnk: "",

    closePanna: "",

    closeAnk: "",

    jodi: "",

});
        /* ==========================================
    TODAY
========================================== */

const today = new Date().toLocaleDateString(
    "en-CA",
    {
        timeZone: "Asia/Kolkata",
    }
);

const resultDocId =
    `${marketId}_${today}`;

/* ==========================================
    LOAD DATA
========================================== */

useEffect(() => {

    loadData();

}, []);
async function loadData() {

    try {

        /* -------------------------
            MARKET
        -------------------------- */

        const marketSnap =
            await getDoc(
                doc(
                    db,
                    "markets",
                    marketId
                )
            );

        if (!marketSnap.exists()) {

            alert("Market not found");

            navigate("/admin/results");

            return;

        }

        setMarket({

            id: marketSnap.id,

            ...marketSnap.data(),

        });

        /* -------------------------
            TODAY RESULT
        -------------------------- */

        const resultSnap =
            await getDoc(
                doc(
                    db,
                    "results",
                    resultDocId
                )
            );

        if (resultSnap.exists()) {

            const result =
                resultSnap.data();

            setTodayResult(result);

setResultData({

    openPanna:
        result.openPanna || "",

    openAnk:
        result.openAnk || "",

    closePanna:
        result.closePanna || "",

    closeAnk:
        result.closeAnk || "",

    jodi:
        result.jodi || "",

});

            /* -------------------------
                AUTO TAB
            -------------------------- */

            if (
                result.openPanna &&
                !result.closePanna
            ) {

                setSelectedTab("close");

            }

            else if (

                result.openPanna &&
                result.closePanna

            ) {

                setSelectedTab("close");

            }

        }

    }

    catch(error){

        console.log(error);

    }

    finally{

        setLoading(false);

    }

}
/* ==========================================
    SAVE OPEN RESULT
========================================== */
/* ==========================================
    UPDATE MARKET LATEST RESULT
========================================== */

async function updateMarketLatestResult(data){

    await updateDoc(

        doc(
            db,
            "markets",
            market.id
        ),

        {

            latestResult:data,

            updatedAt:serverTimestamp(),

        }

    );

}
/* ==========================================
    UPDATE ANNOUNCEMENT
========================================== */

async function updateAnnouncement() {

    await setDoc(

        doc(
            db,
            "announcements",
            "latest"
        ),

        {

            marketId: market.id,

            marketName: market.name,

            openPanna: resultData.openPanna,

            jodi: resultData.jodi,

            closePanna: resultData.closePanna,

            resultDate: today,

            createdAt: serverTimestamp(),

        }

    );

}
/* ==========================================
    UPDATE BREAKING NEWS
========================================== */

async function updateBreakingNews() {

    const text = `🎉 ${market.name} Result Declared ${resultData.openPanna}-${resultData.jodi}-${resultData.closePanna}`;

    await setDoc(

        doc(
            db,
            "breakingNews",
            "latest"
        ),

        {

            marketId: market.id,

            resultDate: today,

            text,

            createdAt: serverTimestamp(),

        }

    );

}
/* ==========================================
    UPDATE PANEL CHART
========================================== */

async function updatePanelChart() {

    const year = Number(today.substring(0,4));

    const date = new Date(today);

    const start = new Date(date);

    start.setDate(date.getDate() - date.getDay());

    const week = Math.ceil(

        ((date - new Date(year,0,1))/86400000 + 1) / 7

    );

    const weekId =
        `week_${year}_${String(week).padStart(3,"0")}`;

    const chartRef = doc(

        db,

        "markets",

        market.id,

        "panelCharts",

        weekId

    );

    const chartSnap = await getDoc(chartRef);

    if(!chartSnap.exists()) return;

    const data = chartSnap.data();

    const updatedDays = data.days.map((day)=>{

        if(day.date !== today) return day;

        return{

            ...day,

            open:resultData.openPanna,

            jodi:resultData.jodi,

            close:resultData.closePanna,

        };

    });

    await updateDoc(

        chartRef,

        {

            days:updatedDays,

            updatedAt:serverTimestamp(),

        }

    );

}
async function saveOpenResult() {

    if (resultData.openPanna.length !== 3) {

        alert("Enter a valid Open Panna");

        return;

    }

    try {

        await setDoc(

            doc(
                db,
                "results",
                resultDocId
            ),

            {

                marketId: market.id,

                marketName: market.name,

                resultDate: today,

                year: Number(today.substring(0,4)),

                month: Number(today.substring(5,7)),

                day: Number(today.substring(8,10)),

                openPanna: resultData.openPanna,

                openAnk: resultData.openAnk,

                closePanna: "",

                closeAnk: "",

                jodi: "",

                createdAt: serverTimestamp(),

                updatedAt: serverTimestamp(),

            },

            {

                merge:true,

            }

        );

        await updateMarketLatestResult({

    openPanna: resultData.openPanna,

    openAnk: resultData.openAnk,

    closePanna: "",

    closeAnk: "",

    jodi: "",

    resultDate: today,

});
await updateAnnouncement();
await updateBreakingNews();
        alert("Open Result Saved");
        await updatePanelChart();

        await loadData();

    }

    catch(error){

        console.error(error);

        alert("Unable to save result.");

    }

}
/* ==========================================
    SAVE CLOSE RESULT
========================================== */

async function saveCloseResult() {

    if (resultData.closePanna.length !== 3) {

        alert("Enter a valid Close Panna");

        return;

    }

    try {

        await setDoc(

            doc(
                db,
                "results",
                resultDocId
            ),

            {

                closePanna: resultData.closePanna,

                closeAnk: resultData.closeAnk,

                jodi: resultData.jodi,

                updatedAt: serverTimestamp(),

            },

            {

                merge: true,

            }

        );
await updateMarketLatestResult({

    openPanna: resultData.openPanna,

    openAnk: resultData.openAnk,

    closePanna: resultData.closePanna,

    closeAnk: resultData.closeAnk,

    jodi: resultData.jodi,

    resultDate: today,

});
await updateAnnouncement();
await updateBreakingNews();
        alert("Close Result Saved");
        await updatePanelChart();

        await loadData();

    }

    catch (error) {

        console.error(error);

        alert("Unable to save close result.");

    }

}
/* ==========================================
    CALCULATE SINGLE ANK
========================================== */

function calculateAnk(panna) {

    if (panna.length !== 3)
        return "";

    const total =
        panna
            .split("")
            .reduce(
                (sum, num) =>
                    sum + Number(num),
                0
            );

    return String(total % 10);

}
/* ==========================================
    CALCULATE JODI
========================================== */

function calculateJodi(
    openAnk,
    closeAnk
) {

    if (!openAnk || !closeAnk)
        return "";

    return `${openAnk}${closeAnk}`;

}
if (loading) {

    return (

        <div className="manage-result-page">

            <div className="manage-result-container">

                <h2>

                    Loading...

                </h2>

            </div>

        </div>

    );

}

return (

    <div className="manage-result-page">

        <div className="manage-result-container">
            {/*==========================================================
    HEADER
==========================================================*/}

<div className="manage-result-header">

    {/* <Link
        to="/admin/results"
        className="back-btn"
    >

        ← Back

    </Link> */}

    <div>

        <h1>

            {market.name}

        </h1>

        <p>

            Manage today's market result

        </p>

    </div>

</div>

{/*==========================================================
    MARKET INFO
==========================================================*/}

<div className="market-info-card">

    <div className="market-info-item">

        <small>

            OPEN TIME

        </small>

        <strong>

            {market.openTime}

        </strong>

    </div>

    <div className="market-info-item">

        <small>

            CLOSE TIME

        </small>

        <strong>

            {market.closeTime}

        </strong>

    </div>

    <div className="market-info-item">

        <small>

            STATUS

        </small>

        <strong
            className={
                todayResult
                    ? "status-completed"
                    : "status-pending"
            }
        >

            {todayResult
                ? "Result Started"
                : "Waiting For Open"}

        </strong>

    </div>

</div>
{/*==========================================================
    RESULT TOGGLE
==========================================================*/}

<div className="result-toggle">

    <button

        className={
            selectedTab === "open"

                ? "toggle-btn active"

                : "toggle-btn"
        }

        onClick={() =>
            setSelectedTab("open")
        }

    >

        🟢 Open Result

    </button>

    <button

        className={
            selectedTab === "close"

                ? "toggle-btn active"

                : "toggle-btn"
        }

        disabled={!todayResult?.openPanna}

        onClick={() =>
            setSelectedTab("close")
        }

    >

        {todayResult?.openPanna

            ? "🔴 Close Result"

            : "🔒 Close Result"}

    </button>

</div>
{/*==========================================================
    RESULT FORM
==========================================================*/}

<div className="result-form-card">

    {

        selectedTab === "open"

        ?

        (

            <>

                <h2>

                    🟢 Open Result

                </h2>

                <div className="form-group">

                    <label>

                        Open Panna

                    </label>

                    <input

                        type="text"

                        maxLength={3}

                        placeholder="Enter Open Panna"

                        value={resultData.openPanna}

                        onChange={(e)=>{

                            const value =
                                e.target.value
                                    .replace(/\D/g,"")
                                    .slice(0,3);

                            const ank =
                                calculateAnk(value);

                            setResultData(prev=>({

                                ...prev,

                                openPanna:value,

                                openAnk:ank,

                                jodi:calculateJodi(
                                    ank,
                                    prev.closeAnk
                                )

                            }));

                        }}

                    />

                </div>

                <div className="form-group">

                    <label>

                        Open Ank

                    </label>

                    <input

                        value={resultData.openAnk}

                        readOnly

                    />

                </div>

                <button

    className="save-result-btn"

    onClick={saveOpenResult}

>

    Save Open Result

</button>

            </>

        )

        :

        (

            <>

                <h2>

                    🔴 Close Result

                </h2>

                <div className="form-group">

                    <label>

                        Open Panna

                    </label>

                    <input

                        value={resultData.openPanna}

                        readOnly

                    />

                </div>

                <div className="form-group">

                    <label>

                        Close Panna

                    </label>

                    <input

                        type="text"

                        maxLength={3}

                        placeholder="Enter Close Panna"

                        value={resultData.closePanna}

                        onChange={(e)=>{

                            const value =
                                e.target.value
                                    .replace(/\D/g,"")
                                    .slice(0,3);

                            const ank =
                                calculateAnk(value);

                            setResultData(prev=>({

                                ...prev,

                                closePanna:value,

                                closeAnk:ank,

                                jodi:calculateJodi(
                                    prev.openAnk,
                                    ank
                                )

                            }));

                        }}

                    />

                </div>

                <div className="form-row">

                    <div className="form-group">

                        <label>

                            Close Ank

                        </label>

                        <input

                            value={resultData.closeAnk}

                            readOnly

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Jodi

                        </label>

                        <input

                            value={resultData.jodi}

                            readOnly

                        />

                    </div>

                </div>

                <button

    className="save-result-btn"

    onClick={saveCloseResult}

>

    Save Close Result

</button>
            </>

        )

    }

</div>

        </div>

    </div>

);

}

export default ManageResultPage;
