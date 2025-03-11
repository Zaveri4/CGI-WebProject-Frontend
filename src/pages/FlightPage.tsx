import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import flightService, { Flight } from "../services/flight-service.ts";
import FlightFilters from "../components/FlightFilters.tsx";
import { CanceledError } from "../services/api-client.ts";

function FlightPage() {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<FlightFilters>({});
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();

        flightService
            .getFlights(filters, controller.signal)
            .then((flights) => setFlights(flights))
            .catch((error) => {
                if (error instanceof CanceledError) return;
                setError("Failed to load the flights.");
            });

        return () => controller.abort();
    }, [filters]);

    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="flex-grow-1 py-4">
                <div className="container">
                    <h1 className="text-primary fw-bold mb-4">Available Flights</h1>
                    <p className="text-muted mb-4">
                        Find the best flights and book your seats now!
                    </p>

                    <div className="flight-filters mb-4">
                        <FlightFilters onFilterChange={setFilters} />
                    </div>

                    {error ? (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="flight-table table table-striped table-hover">
                                <thead className="table-primary">
                                <tr>
                                    <th>Flight nr</th>
                                    <th>Destination</th>
                                    <th>Departure Date</th>
                                    <th>Duration (min)</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {flights.map((flight, index) => (
                                    <tr key={flight.id}>
                                        <td>{index + 1}</td>
                                        <td>{flight.destination}</td>
                                        <td>{flight.date}</td>
                                        <td>{flight.duration}</td>
                                        <td>{flight.price.toFixed(2)}€</td>
                                        <td>
                                            <button
                                                onClick={() => navigate(`/seats/${flight.id}`)}
                                                className="btn btn-primary btn-sm flight-button"
                                            >
                                                Select Seats
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default FlightPage;