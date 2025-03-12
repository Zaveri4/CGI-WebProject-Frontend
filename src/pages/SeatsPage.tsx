import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import seatService, { Seat } from "../services/seat-service";
import { CanceledError } from "../services/api-client";

function SeatsPage() {
    const { flightId } = useParams<{ flightId: string }>();
    const [seats, setSeats] = useState<Seat[]>([]);
    const [recommendedSeats, setRecommendedSeats] = useState<Seat[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [numSeats, setNumSeats] = useState(1);
    const [prefersWindow, setPrefersWindow] = useState(false);
    const [prefersLegroom, setPrefersLegroom] = useState(false);
    const [isNearExit, setIsNearExit] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        const loadSeats = async () => {
            try {
                const flightIdNum = Number(flightId);
                if (isNaN(flightIdNum)) {
                    setError("Invalid flight ID");
                    return;
                }

                const seatsData = await seatService.getSeatsByFlightId(flightIdNum, controller.signal);
                console.log("Seats data:", seatsData);
                setSeats(seatsData);

                const recommended = await seatService.suggestSeats(
                    flightIdNum,
                    numSeats,
                    prefersWindow,
                    prefersLegroom,
                    isNearExit,
                    controller.signal
                );
                setRecommendedSeats(recommended);
            } catch (err) {
                if (err instanceof CanceledError) return;
                setError("Failed to load seats.");
            }
        };

        loadSeats();

        return () => controller.abort();
    }, [flightId, numSeats, prefersWindow, prefersLegroom, isNearExit]);

    const handleRecommend = () => {
        const loadRecommended = async () => {
            try {
                const flightIdNum = Number(flightId);
                if (isNaN(flightIdNum)) {
                    setError("Invalid flight ID");
                    return;
                }
                const recommended = await seatService.suggestSeats(
                    flightIdNum,
                    numSeats,
                    prefersWindow,
                    prefersLegroom,
                    isNearExit
                );
                setRecommendedSeats(recommended);
            } catch (err) {
                setError("Failed to recommend seats.");
            }
        };
        loadRecommended();
    };

    const seatsByRow = seats.reduce((acc, seat) => {
        const row = seat.seatNumber.match(/\d+/);
        const rowNumber = row ? parseInt(row[0]) : 0;
        if (!acc[rowNumber]) acc[rowNumber] = [];
        acc[rowNumber].push(seat);
        return acc;
    }, {} as Record<number, Seat[]>);

    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="flex-grow-1 py-4">
                <div className="container">
                    <h1 className="text-primary fw-bold display-5 mb-3">Select Your Seats</h1>
                    <p className="lead text-muted mb-4">
                        Choose your preferences and book your seats for flight {flightId}!
                    </p>

                    {error && <div className="alert alert-danger" role="alert">{error}</div>}

                    <div className="card p-4 shadow-sm mb-4">
                        <h4 className="text-primary mb-3">Seat Preferences</h4>
                        <div className="row g-3">
                            <div className="col-md-3">
                                <label className="form-label">Number of Seats</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={numSeats}
                                    min="1"
                                    onChange={(e) => setNumSeats(Math.max(1, Number(e.target.value)))}
                                />
                            </div>
                            <div className="col-md-3">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="windowSeat"
                                        checked={prefersWindow}
                                        onChange={(e) => setPrefersWindow(e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="windowSeat">Prefer Window</label>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="legroom"
                                        checked={prefersLegroom}
                                        onChange={(e) => setPrefersLegroom(e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="legroom">Prefer Legroom</label>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="nearExit"
                                        checked={isNearExit}
                                        onChange={(e) => setIsNearExit(e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="nearExit">Near Exit</label>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary mt-3" onClick={handleRecommend}>Get Recommendations</button>
                    </div>

                    <div className="row">
                        <div className="col-md-8">
                            <div className="card p-4 shadow-sm">
                                <h4 className="text-primary mb-3">Available Seats</h4>
                                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                                <div className="plane-layout">
                                    {Object.keys(seatsByRow).map((rowNumber) => (
                                        <div key={rowNumber} className="plane-row">
                                            <div className="row-label">Row {rowNumber}</div>
                                            <div className="seat-grid">
                                                {seatsByRow[parseInt(rowNumber)].map((seat) => (
                                                    <div
                                                        key={seat.seatNumber}
                                                        className={`seat ${seat.occupied ? "occupied" : "available"}`}
                                                        title={getSeatDetails(seat)}
                                                    >
                                                        <div className="seat-info">
                                                            <span className="seat-number">{seat.seatNumber}</span>
                                                            <div className="seat-details">
                                                                <span className="status">{seat.occupied ? "Occupied" : "Available"}</span>
                                                                {(seat.windowSeat || seat.hasExtraLegroom || seat.nearExit) && (
                                                                    <span className="features">
                                                                        {seat.windowSeat && <span className="feature">W</span>}
                                                                        {seat.hasExtraLegroom && <span className="feature">L</span>}
                                                                        {seat.nearExit && <span className="feature">N</span>}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {recommendedSeats.length > 0 && (
                            <div className="col-md-4">
                                <div className="card p-4 shadow-sm">
                                    <h4 className="text-primary mb-3">Recommended Seats</h4>
                                    <div className="recommended-seats">
                                        {recommendedSeats.map((seat) => (
                                            <div
                                                key={seat.seatNumber}
                                                className="recommended-seat"
                                                title={getSeatDetails(seat)}
                                            >
                                                <h5 className="seat-number">{seat.seatNumber}</h5>
                                                <div className="seat-details">
                                                    {(seat.windowSeat || seat.hasExtraLegroom || seat.nearExit) && (
                                                        <span className="features">
                                                            {seat.windowSeat && <span className="feature">W</span>}
                                                            {seat.hasExtraLegroom && <span className="feature">L</span>}
                                                            {seat.nearExit && <span className="feature">N</span>}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

const getSeatDetails = (seat: Seat) => {
    const features = [];
    if (seat.windowSeat) features.push("Window");
    if (seat.hasExtraLegroom) features.push("Legroom");
    if (seat.nearExit) features.push("Near Exit");
    return `${seat.occupied ? "Occupied" : "Available"}${features.length > 0 ? ` | ${features.join(" | ")}` : ""}`;
};

export default SeatsPage;