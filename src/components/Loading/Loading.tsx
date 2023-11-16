import ClipLoader from "react-spinners/ClipLoader";
import './loading.css' 
export default function Loading({color , loading , size}){
    return(
        <>
        <ClipLoader
        className="loading"
        color={color}
        loading={loading}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        </>
    )
}