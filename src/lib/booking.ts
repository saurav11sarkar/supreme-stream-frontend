export interface BookingRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  zipCode: string;
  services: string;
  price: number;
  startTime: string;
  endTime: string;
  paymentStatus: 'payment-pending' | 'pay-on-service-day' | 'quote-requested';
}

export const bookingApiUrl =
  import.meta.env.VITE_BOOKING_API_URL?.trim() ||
  '/api/bookings';

// Availability must still load on static/Readdy hosting where the private
// Node email service is not running on the visitor's machine.
export const bookingTimeslotsApiUrl =
  import.meta.env.VITE_TIMESLOTS_API_URL?.trim() || '/api/timeslots';

export async function createBooking(payload: BookingRequest): Promise<void> {
  let response: Response;
  try {
    response = await fetch(bookingApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Booking server is not running. Start the project with: npm run dev');
  }

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      result.error ||
        result.message ||
        result.errorSources?.[0]?.message ||
        'Unable to create the booking.',
    );
  }
}
