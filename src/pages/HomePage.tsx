import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="col-md-8 text-center bg-white p-5 rounded shadow">
                <h1 className="text-primary fw-bold mb-3">Welcome to the WebProject!</h1>
                <p className="fs-5 text-muted">
                    You can easily manage your flights. Find the flight and we would like to offer
                    the best seats based on your preferences!
                </p>
                <Link to="/flight" className="btn btn-primary px-4 py-2 mt-3">
                    View Flights
                </Link>
            </div>
        </div>
    );
}

export default HomePage;