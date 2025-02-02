import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import checkinAPI from '@/utils/config/axiosConfig';
import { findGuestByReservation } from '@/utils/helpers/guests/findGuestByReservation';
import { CheckinStepper } from '@/interfaces/CheckinStepper';

interface TrackingStep {
  completed: boolean;
  guest_id: number;
  is_repeated: boolean;
  step_number: number;
}

export const useGuestAndTracking = (steps: CheckinStepper[]) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [guestId, setGuestId] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const reservationCode = searchParams.get('reservationCode') as string;

  useEffect(() => {
    const fetchGuestAndSteps = async () => {
      try {
        const guest = await findGuestByReservation(reservationCode);
        if (guest) {
          setGuestId(guest.guest_id);
          const trackingResponse = await checkinAPI.get(
            `/tracking?guest_id=${guest.guest_id}`
          );
          const trackingData = trackingResponse.data;

          // Find the first incomplete step
          const firstIncompleteStep = trackingData.findIndex(
            (step: TrackingStep) => !step.completed
          );
          setCurrentStep(
            firstIncompleteStep !== -1 ? firstIncompleteStep : steps.length - 1
          );

          // Update steps completion status
          trackingData.forEach((step: TrackingStep) => {
            steps[step.step_number - 1].completed = step.completed;
          });
        }
      } catch (error) {
        console.error('Error fetching guest or tracking information:', error);
      }
    };

    fetchGuestAndSteps();
  }, [reservationCode, steps]);

  return { currentStep, setCurrentStep, guestId, setGuestId };
};
