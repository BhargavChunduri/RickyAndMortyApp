import { useEffect, useState } from "react";
import "./body.css";
import ReactPaginate from "react-paginate";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

export default function Body() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const color = "#36d7b7";
  const [pageNo, setPageNo] = useState(1);
  const fetchApi = () => {
    setIsLoading(true);
    fetch(`https://rickandmortyapi.com/api/character/?page=${pageNo}`)
      .then(async (res) => await res.json())
      .then((data) => {
        setData(data.results);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchApi();
  }, [pageNo]);

  console.log("data", data);

  return (
    <>
      <Loading color={color} loading={isLoading} size={50} />
      <div className="paginationDiv">
      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel="next >"
        onPageChange={(event) => {
          setPageNo(event.selected + 1);
        }}
        pageCount={20}
        previousLabel="< previous"
      />
      </div>
      <div className="bodyContainer ">
        {data?.map((item, key: number) => {
          return (
            <div
              className="card card-side shadow-xl bg-black h-64 w-96 glass"
              key={key}
            >
              <figure>
                <img
                  className="h-64 w-56"
                  src={`${item?.image}`}
                  alt={`${item?.name}`}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-white text-lg">{item?.name}</h2>
                <p
                  className={` ${
                    item?.status === "Alive" ? "text-lime-600" : "text-red-500"
                  } text-lg`}
                >
                  {item?.status}-{item?.species}
                </p>
                <p className="text-yellow-200">
                  Last Known Location:{item?.location?.name}
                </p>
                <div className="card-actions justify-end">
                  <Link to={`/detailed-view/${item?.id}`}>
                    <button className="btn btn-primary"> More Info
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
