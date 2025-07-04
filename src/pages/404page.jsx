import { useNavigate } from "react-router-dom"

export default function Errorpage(){
    const returnhome = useNavigate()
    return(
        <div className="error-container">
        <h1>404 error</h1>
        <p className="error-desc">Page you are looking for not found</p>
        <p className="error-desc"><b>Go to Home page</b></p>
        <button className="error-button" onClick={() => returnhome("/")}>
            Home
        </button>
        </div>
    )
}