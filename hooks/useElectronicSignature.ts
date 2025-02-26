import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  findGuestByReservation,
  findTravellersByGuestId,
  findTravellersByGuestIdWithSignature,
  updateTravellerSignature,
} from "@/utils/helpers";

interface Traveller {
  traveller_id: number;
  names: string;
  lastnames: string;
}

export const useElectronicSignature = () => {
  const [travellersWithSignature, setTravellersWithSignature] = useState<
    Traveller[]
  >([]);
  const [travellersByGuest, setTravellersByGuest] = useState<Traveller[]>([]);
  const [selectedTraveller, setSelectedTraveller] = useState<Traveller | null>(
    null
  );
  const [modalState, setModalState] = useState({
    showSignatureModal: false,
    qrCodeUrl: "",
  });
  const [copied, setCopied] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("reservationCode")) {
      const fetchGuestByReservation = async () => {
        try {
          const getGuestByReservation = await findGuestByReservation(
            searchParams.get("reservationCode") as string
          );

          const travellers = await findTravellersByGuestId(
            getGuestByReservation.guest_id
          );

          setTravellersByGuest(travellers);

          const travellerWithSignatureRes =
            await findTravellersByGuestIdWithSignature(
              getGuestByReservation.guest_id
            );

          setTravellersWithSignature(travellerWithSignatureRes || []);
        } catch (error) {
          console.log("Error fetching guest by reservation:", error);
        }
      };

      fetchGuestByReservation();
    }
  }, [searchParams]);

  const handleSaveSignature = async (dataURL: string) => {
    if (selectedTraveller) {
      await updateTravellerSignature(selectedTraveller.traveller_id, dataURL);

      setTravellersWithSignature((prev) => {
        const exists = prev.some(
          (traveller) =>
            traveller.traveller_id === selectedTraveller.traveller_id
        );

        if (!exists) {
          return [...prev, selectedTraveller];
        }

        return prev.map((traveller) =>
          traveller.traveller_id === selectedTraveller.traveller_id
            ? { ...traveller, signature: dataURL }
            : traveller
        );
      });

      setSelectedTraveller(null);
    }
  };

  const generateUrl = (travellerId: number) => {
    return `http://localhost:3000/checkin/signature?travelerId=${travellerId}`;
  };

  const handleButtonClick = (type: string) => {
    if (!selectedTraveller) {
      setShowAlert(true);
      return;
    }

    const url = generateUrl(selectedTraveller.traveller_id);

    if (type === "signature") {
      setModalState({ ...modalState, showSignatureModal: true });
    } else if (type === "qrCode") {
      setModalState({ ...modalState, qrCodeUrl: url });
    } else if (type === "shareLink") {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 4000);
      });
    }
  };

  const handleTravellerClick = (traveller: Traveller) => {
    if (
      !travellersWithSignature.some(
        (t) => t.traveller_id === traveller.traveller_id
      )
    ) {
      setSelectedTraveller(traveller);
    }
  };

  const handleCloseSignaturePad = () => {
    setModalState({ ...modalState, showSignatureModal: false });
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return {
    travellersWithSignature,
    travellersByGuest,
    selectedTraveller,
    modalState,
    copied,
    showAlert,
    setSelectedTraveller,
    handleSaveSignature,
    handleButtonClick,
    handleTravellerClick,
    handleCloseSignaturePad,
    handleCloseAlert,
  };
};
