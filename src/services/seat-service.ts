import apiClient from "./api-client.ts";

export interface Seat {
    seatNumber: string;
    occupied: boolean;
    windowSeat: boolean;
    hasExtraLegroom: boolean;
    nearExit: boolean;
}

class SeatService {
    public async getSeatsByFlightId(flightId: number, signal?: AbortSignal): Promise<Seat[]> {
        const response = await apiClient.get<Seat[]>(`/seat/${flightId}`, {
            signal,
        });
        return response.data;
    }

    public async suggestSeats(
        flightId: number,
        numSeats: number = 1,
        prefersWindow: boolean = false,
        prefersLegroom: boolean = false,
        isNearExit: boolean = false,
        signal?: AbortSignal
    ): Promise<Seat[]> {
        const response = await apiClient.get<Seat[]>(`/seat/recommended/${flightId}`, {
            params: {
                numSeats,
                prefersWindow,
                prefersLegroom,
                isNearExit,
            },
            signal,
        });
        return response.data;
    }
}

export default new SeatService();