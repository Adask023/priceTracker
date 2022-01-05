import React from 'react'
import './Item.css';

const Item = ({data}) => {

  function chooseColor(time_value){
    if (time_value > 0 ){
      return "green";
    } else if (time_value < 0 ){
      return "red";
    } else {
      return "";
    }
  }

  function checkIfExists(value){
    return value == null ? "N/A" : value;
  }

  return (
    <tr>
      <td>{checkIfExists(data.Name)}</td>

      
      <td>{checkIfExists(data.AvgCurrentPrice) === "N/A" ? "N/A": data.AvgCurrentPrice + "sol"}</td>
      <td>{checkIfExists(data["LiveFloorPrice_DigitalEyes"]) === "N/A" ? "N/A": data["LiveFloorPrice_DigitalEyes"] + "sol"}</td>
      <td>{checkIfExists(data["LiveFloorPrice_Solanart"]) === "N/A" ? "N/A": data["LiveFloorPrice_Solanart"] + "sol"}</td>
      <td>Coming soon</td>
      <td>{checkIfExists(data["LiveFloorPrice_Magiceden"]) === "N/A" ? "N/A": data["LiveFloorPrice_Magiceden"] + "sol"}</td>

      <td className={chooseColor(data["5m"])}>{checkIfExists(data["5m"]) === "N/A" ? "N/A": data["5m"] + "%"}</td>
      <td className={chooseColor(data["15m"])}>{checkIfExists(data["15m"]) === "N/A" ? "N/A": data["15m"] + "%"}</td>
      <td className={chooseColor(data["30m"])}>{checkIfExists(data["30m"]) === "N/A" ? "N/A": data["30m"] + "%"}</td>
      <td className={chooseColor(data["60m"])}>{checkIfExists(data["60m"]) === "N/A" ? "N/A": data["60m"] + "%"}</td>
      <td className={chooseColor(data["240m"])}>{checkIfExists(data["240m"]) === "N/A" ? "N/A": data["240m"] + "%"}</td>
      <td className={chooseColor(data["1440m"])}>{checkIfExists(data["1440m"]) === "N/A" ? "N/A": data["1440m"] + "%"}</td>
      <td className={chooseColor(data["10080m"])}>{checkIfExists(data["10080m"]) === "N/A" ? "N/A": data["10080m"] +"%"}</td>
      <td className={chooseColor(data["43200m"])}>{checkIfExists(data["43200m"]) === "N/A" ? "N/A": data["43200m"] +"%"}</td>

      <td>{checkIfExists(data["TotalItemListed_DigitalEyes"])}</td>
      <td>{checkIfExists(data["TotalItemListed_Solanart"])}</td>
      <td>{checkIfExists(data["TotalItemListed_Magiceden"])}</td>
 
      <td>Coming soon</td>
    </tr>
   );
}
 
export default Item;