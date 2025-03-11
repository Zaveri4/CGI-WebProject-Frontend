import { useEffect, useState } from "react";

interface FlightFilters {
    destination?: string;
    departureDate?: string;
    minPrice?: number;
    maxPrice?: number;
}

interface FlightFiltersProps {
    onFilterChange: (filters: FlightFilters) => void;
}

function FlightFilters({ onFilterChange }: Readonly<FlightFiltersProps>) {
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(500);

    useEffect(() => {
        const filters: FlightFilters = {};
        if (destination) filters.destination = destination;
        if (departureDate) filters.departureDate = departureDate;
        if (minPrice > 0) filters.minPrice = minPrice;
        if (maxPrice < 500) filters.maxPrice = maxPrice;

        onFilterChange(filters);
    }, [destination, departureDate, minPrice, maxPrice, onFilterChange]);

    return (
        <div className="filter-bar card p-3 shadow-sm">
            <div className="row g-3">
                <div className="col-md-4">
                    <input
                        type="text"
                        placeholder="Destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="form-control filter-input"
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="departureDate" className="form-label text-muted">Departure Date</label>
                    <div className="input-group">
                        <input
                            type="date"
                            id="departureDate"
                            className="form-control filter-input"
                            value={departureDate || ""}
                            onChange={(e) => setDepartureDate(e.target.value)}
                        />
                        {departureDate && (
                            <button
                                onClick={() => setDepartureDate("")}
                                className="btn btn-outline-secondary filter-button"
                                type="button"
                                aria-label="Clear"
                            >
                                <span className="btn-close" aria-hidden="true"></span>
                            </button>
                        )}
                    </div>
                </div>
                <div className="col-md-4">
                    <label className="form-label text-muted">
                        Price (€): {minPrice} - {maxPrice}
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="500"
                        value={minPrice}
                        className="form-range"
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                    />
                    <input
                        type="range"
                        min="0"
                        max="500"
                        value={maxPrice}
                        className="form-range"
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                    />
                </div>
            </div>
        </div>
    );
}

export default FlightFilters;