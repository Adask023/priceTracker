import React, { useState, useEffect } from "react";
import "./CollectionList.css";
import ColItem from "./ColItem";
import { DATA_PATH } from "../../constants/constants";
import { useSortableData } from "../../hooks/useSortableData";
import { testData } from "../../testData";
import SearchInput from "./SearchInput";

const CollectionList = () => {
  const [collections, setCollections] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [updateTime, setUpdateTime] = useState("");

  useEffect(() => {
    getTestData();
    requestSort("Name");

    const interval = setInterval(() => {
      getTestData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const getTestData = () => {
    setCollections(testData["Data"]);
    setUpdateTime(testData["LastScrape"]);
    console.log("Data updated with testData");
  };

  const getData = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    // https://8rlv3dejhg.execute-api.us-east-2.amazonaws.com/default/FloorPriceTrackerLambdaDataCollector
    // /getData
    fetch(DATA_PATH, requestOptions)
      .then(async (response) => {
        try {
          const data = await response.json();
          setCollections(data["Data"]);
          setUpdateTime(data["LastScrape"]);
          console.log("Data updated with response");
        } catch (error) {
          console.log("Request error");
          console.error(error);
        }
      })
      .catch((e) => console.log(e));
  };

  const { items, requestSort, sortConfig } = useSortableData(collections);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div className="list-wrapper max-width">
      <h2>Last update: {updateTime}</h2>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="collection-list-wrapper">
        <table className="collections-table data-table">
          <thead>
            <tr className="table-head-first-row">
              <td></td>
              <td colSpan="5">Live Floor Price</td>
              <td colSpan="8">Price Change %</td>
              <td colSpan="3">Total Items Listed</td>
              <td></td>
            </tr>
            <tr>
              <th>
                <button
                  style={{ color: "white" }}
                  type="button"
                  onClick={() => requestSort("Name")}
                  className={getClassNamesFor("Name")}
                >
                  Collections
                </button>
              </th>

              <th className="force-color">
                <button
                  type="button"
                  onClick={() => requestSort("AvgCurrentPrice")}
                  className={getClassNamesFor("AvgCurrentPrice")}
                >
                  Avg.Floor Price
                </button>
              </th>

              <th className="force-color">
                <button
                  type="button"
                  onClick={() => requestSort("LiveFloorPrice_DigitalEyes")}
                  className={getClassNamesFor("LiveFloorPrice_DigitalEyes")}
                >
                  DigitalEyes
                </button>
              </th>

              <th className="force-color">
                <button
                  type="button"
                  onClick={() => requestSort("LiveFloorPrice_Solanart")}
                  className={getClassNamesFor("LiveFloorPrice_Solanart")}
                >
                  Solanart
                </button>
              </th>

              <th className="force-color">
                <button
                // type="button"
                // onClick={() => requestSort("LiveFloorPrice_Solanart")}
                // className={getClassNamesFor("LiveFloorPrice_Solanart")}
                >
                  SMB
                </button>
              </th>

              <th className="force-color">
                <button
                  type="button"
                  onClick={() => requestSort("LiveFloorPrice_Magiceden")}
                  className={getClassNamesFor("LiveFloorPrice_Magiceden")}
                >
                  Magiceden
                </button>
              </th>

              {/* price */}
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("5m")}
                  className={getClassNamesFor("5m")}
                >
                  5min
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("15m")}
                  className={getClassNamesFor("15m")}
                >
                  15min
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("30m")}
                  className={getClassNamesFor("30m")}
                >
                  30min
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("60m")}
                  className={getClassNamesFor("60m")}
                >
                  1h
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("240m")}
                  className={getClassNamesFor("240m")}
                >
                  4h
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("1440m")}
                  className={getClassNamesFor("1440m")}
                >
                  24h
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("10080m")}
                  className={getClassNamesFor("10080m")}
                >
                  7d
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("43200m")}
                  className={getClassNamesFor("43200m")}
                >
                  30d
                </button>
              </th>

              {/* total items listed */}
              <th className="force-color">
                <button
                  type="button"
                  onClick={() => requestSort("TotalItemListed_DigitalEyes")}
                  className={getClassNamesFor("TotalItemListed_DigitalEyes")}
                >
                  DigitalEyes
                </button>
              </th>
              <th className="force-color">
                <button
                  type="button"
                  onClick={() => requestSort("TotalItemListed_Solanart")}
                  className={getClassNamesFor("TotalItemListed_Solanart")}
                >
                  Solanart
                </button>
              </th>
              <th className="force-color">
                <button
                  type="button"
                  onClick={() => requestSort("TotalItemListed_Magiceden")}
                  className={getClassNamesFor("TotalItemListed_Magiceden")}
                >
                  Magiceden
                </button>
              </th>

              <th>Alerts</th>
            </tr>
          </thead>

          <tbody>
            {items
              .filter((val) => {
                if (searchQuery == "") {
                  return val;
                } else if (
                  val.Name.toLowerCase().includes(searchQuery.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((item, index) => {
                console.log();
                return <ColItem key={index} data={item} />;
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollectionList;
