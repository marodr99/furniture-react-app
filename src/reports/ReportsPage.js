import Header from "../Header/Header";
import {useState} from "react";
import axios from "axios";

const ReportsPage = () => {
    let [startDate, setStartDate] = useState("");
    let [endDate, setEndDate] = useState("");
    let [reports, setReports] = useState([]);

    const handleOnStartDateChange = (value) => {
        if (endDate) {
            let ed = Date.parse(endDate);
            let sd = Date.parse(value);
            if (sd <= ed)
                setStartDate(value)
        } else
            setStartDate(value);
    }

    const handleOnEndDateChange = (value) => {
        if (startDate) {
            let sd = Date.parse(startDate);
            let ed = Date.parse(value);
            if (ed >= sd)
                setEndDate(value)
        } else
            setEndDate(value);
    }

    const handleOnSubmit = async () => {
        console.log({startDate: startDate, endDate: endDate})
        await axios.post("http://localhost:8080/reports", {
            startDate: startDate.toString(),
            endDate: endDate.toString()
        })
            .then(res => {
                console.log("Got reports successfully")
                setReports(res.data)
            })
            .catch(err => console.log("Error getting reports"));
    }

    let displayReports
    if (reports.length > 0)
        displayReports = reports.map(rep =>
            <tr key={Math.random()}>
                <td>{rep.description}</td>
                <td>{rep.furnitureType}</td>
                <td>{rep.name}</td>
                <td>{rep.totalSold}</td>
                <td>{rep.profit}</td>
            </tr>
        )

    return (
        <div>
            <Header/>
            <div className="d-flex justify-content-center">
                <label style={{margin: "1em 3em 1em 3em"}}>
                    Start date <input type="date" onChange={(e) => handleOnStartDateChange(e.target.value)}
                                      value={startDate}/>
                </label>
                <label style={{margin: "1em 3em 1em 3em"}}>
                    End date <input type="date" onChange={(e) => handleOnEndDateChange(e.target.value)}
                                    value={endDate}/>
                </label>
                <button className="btn btn-info" onClick={handleOnSubmit}>Submit
                </button>
            </div>
            <div className="m-3">
                <table className="table table-bordered table-dark">
                    <thead>
                    <tr>
                        <th>Description</th>
                        <th>Furniture type</th>
                        <th>Name</th>
                        <th>Total sold</th>
                        <th>Profit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayReports}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ReportsPage;