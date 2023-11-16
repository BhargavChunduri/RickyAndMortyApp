import { useEffect, useState } from "react";
import { useParams } from "react-router";
import pMap from 'p-map';
import "./MoreInfo.css";

export default function MoreInfo() {
  const params = useParams();
  const [detailedData, setDetailedData] = useState([]);
  const [episodeData , setEpisodeData] = useState([]);
  let finalJson;
  const mergeJson = (finJson, resJson, type) => {
    Object.keys(resJson)?.forEach((key) => {
      // eslint-disable-next-line no-prototype-builtins
      if (finJson.hasOwnProperty(key)) {
        const newKey = `${key}_${type}`;
        finJson[newKey] = resJson[key];
      } else {
        finJson[key] = resJson[key];
      }
    });
    finalJson = JSON.parse(JSON.stringify(finJson));

    setDetailedData(finalJson);
  };
  
  const episodeJson = async (episode)=>{
    const episodeResponse = await fetch(`${episode}`);
    const episodeReponseJson = await episodeResponse.json();
    return episodeReponseJson;
  }
  const fetchDetails = async () => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${params.charId}`
    );
    const responseJson = await response.json();
    finalJson = JSON.parse(JSON.stringify(responseJson));
    if (responseJson?.origin?.url) {
      const originResponse = await fetch(`${responseJson?.origin?.url}`);
      const originResponseJson = await originResponse.json();
      mergeJson(finalJson, originResponseJson, "origin");
    }
    if (responseJson?.location?.url) {
      const locationResponse = await fetch(`${responseJson?.location?.url}`);
      const locationResponseJson = await locationResponse.json();
      mergeJson(finalJson, locationResponseJson, "location");
    }
    const pMapResult = await pMap(responseJson?.episode,episodeJson,{concurrency:2})
    console.log(pMapResult,'pMapResult');
    setEpisodeData(pMapResult)
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <>
      <div className="avatarContainer">
        <div
          className={`avatar ${
            detailedData?.status === "Alive" ? "online" : "offline"
          }`}
        >
          <div className="w-48 rounded-full">
            <img src={`${detailedData?.image}`} />
          </div>
        </div>
        <div className="info">
          <p className="text-orange-800 text-xl">Name: {detailedData?.name}</p>
          <p className="text-yellow-600 text-lg">
            Species: {detailedData?.species}
          </p>
          <p className="text-yellow-600 text-lg">
            Gender: {detailedData?.gender}
          </p>
        </div>
      </div>
      <div className="cardsDisplay">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Origin</h2>
            <p>Name : {detailedData?.name_origin ? `${detailedData?.name_origin}`:'not specified'}</p>
            <p>Type : {detailedData?.type_origin ? `${detailedData?.type_origin}`:'not specified'}</p>
            <p>Dimension: {detailedData?.dimension_origin ? `${detailedData?.dimension_origin}`:'not specified'}</p>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Location</h2>  
            <p>Name : {detailedData?.name_location ? `${detailedData?.name_location}`:'not specified'}</p>
            <p>Type : {detailedData?.type_location ? `${detailedData?.type_location}`:'not specified'}</p>
            <p>Dimension: {detailedData?.dimension_location ? `${detailedData?.dimension_location}`:'not specified'}</p>
          </div>
        </div>
        <div className="card w-100 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Episodes List</h2>
            {episodeData?.map((episode,key)=>{
              if(key <= 5 ){
                return <p key={key}>{episode?.name}-{episode?.air_date}-{episode?.episode}</p>
              }
            })}
            <div className="card-actions justify-end">
              <button className="btn btn-primary">View All</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
