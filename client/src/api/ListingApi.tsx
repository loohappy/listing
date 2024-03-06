import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

type Listing = {
  _id: string;
  name: string;
  about: string;
  imgUrl: string;
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyListings = () => {
  const getMyLiingstRequest = async (): Promise<Listing> => {
    const response = await fetch(`${API_BASE_URL}/listings`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to get Listings");
    }
    return response.json();
  };

  const { data: listing, isLoading } = useQuery(
    "fetchMyListing",
    getMyLiingstRequest
  );

  return { listing, isLoading };
};

export const useCreatelisting = () => {
  const createListingRequest = async (
    restaurantFormData: FormData
  ): Promise<Listing> => {
    const response = await fetch(`${API_BASE_URL}/create`, {
      method: "POST",
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create listing");
    }

    return response.json();
  };

  const {
    mutate: createListing,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createListingRequest);

  if (isSuccess) {
    toast.success("Listing created!");
  }

  if (error) {
    toast.error("Unable to update Listing");
  }

  return { createListing, isLoading };
};

export const useUpdateMyListing = () => {
  const updateListingRequest = async (
    listingFormData: FormData
  ): Promise<Listing> => {
    const response = await fetch(`${API_BASE_URL}/update`, {
      method: "PUT",
      body: listingFormData,
    });

    if (!response) {
      throw new Error("Failed to update listing");
    }

    return response.json();
  };

  const {
    mutate: updatelistting,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateListingRequest);

  if (isSuccess) {
    toast.success("Listing Updated");
  }

  if (error) {
    toast.error("Unable to update Listing");
  }

  return { updatelistting, isLoading };
};
