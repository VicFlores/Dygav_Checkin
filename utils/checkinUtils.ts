// utils/checkinUtils.ts

import { CheckinStepper } from '@/interfaces/CheckinStepper';
import { findGuestByReservation } from '@/utils/helpers/guests/findGuestByReservation';
import checkinAPI from '@/utils/config/axiosConfig';

export const fetchGuest = async (
  reservationCode: string | null,
  setGuestId: React.Dispatch<React.SetStateAction<string | null>>
) => {
  if (reservationCode) {
    try {
      const guest = await findGuestByReservation(reservationCode);
      if (guest) {
        setGuestId(guest.guest_id);
      } else {
        console.error('Guest not found');
      }
    } catch (error) {
      console.error('Error fetching guest:', error);
    }
  }
};

export const fetchSteps = async (
  guestId: string | null,
  setLoadedSteps: React.Dispatch<React.SetStateAction<CheckinStepper[]>>,
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
  steps: CheckinStepper[]
) => {
  if (guestId !== null) {
    try {
      const response = await checkinAPI.get(`/tracking?guest_id=${guestId}`);
      const fetchedSteps = response.data;
      if (Array.isArray(fetchedSteps) && fetchedSteps.length > 0) {
        const updatedSteps = steps.map((step, index) => {
          const fetchedStep = fetchedSteps.find(
            (s) => s.step_number === index + 1
          );
          return fetchedStep
            ? { ...step, completed: fetchedStep.completed }
            : step;
        });
        setLoadedSteps(updatedSteps);

        // Set the current step to the first incomplete step
        const firstIncompleteStep = updatedSteps.findIndex(
          (step) => !step.completed
        );
        setCurrentStep(
          firstIncompleteStep !== -1 ? firstIncompleteStep : steps.length - 1
        );
      } else {
        // Initialize steps for the first-time user
        await initializeSteps(guestId, steps);
        setLoadedSteps(steps);
      }
    } catch (error) {
      console.error('Error fetching steps:', error);
    }
  }
};

export const initializeSteps = async (
  guestId: string,
  steps: CheckinStepper[]
) => {
  await Promise.all(
    steps.map((step, index) =>
      checkinAPI.post('/tracking', {
        completed: false,
        guest_id: guestId,
        is_repeated: index + 1 !== 2,
        step_number: index + 1,
      })
    )
  );
};

export const validateStep = async (
  isValid: boolean,
  guestId: string | null,
  currentStep: number,
  setLoadedSteps: React.Dispatch<React.SetStateAction<CheckinStepper[]>>,
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
  loadedSteps: CheckinStepper[],
  steps: CheckinStepper[]
) => {
  if (isValid && guestId !== null) {
    const stepNumber = currentStep + 1;
    const isRepeated = stepNumber !== 2;

    try {
      await checkinAPI.put(
        `/tracking?guest_id=${guestId}&step_number=${stepNumber}`,
        {
          completed: true,
          is_repeated: isRepeated,
        }
      );

      const updatedSteps = loadedSteps.map((step, index) =>
        index === currentStep ? { ...step, completed: true } : step
      );
      setLoadedSteps(updatedSteps);

      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1); // Move to the next step
      }
    } catch (error) {
      console.error('Error updating step:', error);
    }
  }
};
