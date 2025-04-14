import { useState } from "react";

export default function useFetchRegistration() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCarDetails = async (registrationNumber) => {
    console.log("Fetching car details for:", registrationNumber);
    try {
      const res = await fetch("/api/vehicle-enquiry/v1/vehicles", {
        method: "POST",
        body: JSON.stringify({
          registrationNumber,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setData(data);
        setLoading(false);
        setError(null);
        return data;
      }
      else{
        setError(data.errors);
        setLoading(false);
        setData(null);
        return null;
      }
    } catch (err) {
      console.error("Error fetching car details:", err);
      setError(err.message);
      setLoading(false);
      setData(null);
      return null;
    }
  };

  return {
    data,
    loading,
    error,
    fetchCarDetails,
  };
}
