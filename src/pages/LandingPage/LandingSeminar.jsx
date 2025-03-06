import Carousel from "../../components/ui/carousel/Carousel";
import seminar_image from "../../assets/images/seminar.jpg";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";
import profile from "../../assets/images/house_4.jpg";
import GuestForm from "./GuestForm";
import { createParticipant } from "../../API/participantAPI";

const SeminarPage = () => {
  const { id } = useParams();
  const [seminar, setSeminar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joinLoading, setJoinLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchSeminar = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/seminar/${id}`);
        const data = await res.json();
        setSeminar(data.seminar);
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeminar();

    // Retrieve user properly
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      // Ensure it's not undefined
      setUser(JSON.parse(storedUser));
    }
  }, [id]);
  const handleJoin = async () => {
    setJoinLoading(true);
    try {
      if (user) {
        await createParticipant(id);
        alert("Successfully joined the seminar!");
      } else {
        setShowForm(true);
      }
    } catch (error) {
      console.error("Error joining seminar:", error);
      alert("Error joining seminar.");
    } finally {
      setJoinLoading(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500">Loading seminar details...</p>
    );
  }

  if (!seminar) {
    return <p className="text-center text-red-500">Error loading seminar.</p>;
  }

  return (
    <>
      <div className="relative pt-20">
        <div className="my-5 mx-7">
          <Carousel className="w-full" images={[seminar_image]} />
        </div>

        <div className="flex flex-row gap-6 mx-7">
          <div className="w-2/3 p-6">
            <h1 className="text-5xl font-bold text-gray-800">
              {seminar.name_of_seminar}
            </h1>
            <p className="text-gray-600 mt-2">{seminar.description}</p>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Topics Covered:
              </h3>
              <ul className="list-disc list-inside text-gray-600 mt-1">
                {seminar.topics}
              </ul>
            </div>

            <div className="mt-4 text-gray-700">
              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-800" />
                <strong>Date:</strong> {seminar.date}
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-800" />
                <strong>Location:</strong> {seminar.location}
              </p>
              <p className="flex items-center gap-2">
                <FaBuilding className="text-gray-800" />
                <strong>Organizer:</strong> {seminar.organization_name}
              </p>
            </div>
          </div>

          <div className="w-1/3 bg-white p-6">
            <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center text-center mb-4">
              <img
                src={profile}
                className="w-32 h-32 object-cover rounded-full border-4 border-gray-300 shadow-md"
              />
              <h3 className="text-xl font-bold text-gray-800 mt-4">
                {seminar.speaker_name}
              </h3>
              <p className="text-gray-600 mt-2">{seminar.about_the_speaker}</p>
            </div>
            <div className="rounded-lg shadow-lg flex flex-col items-center text-center border border-gray-300 pb-5">
              <p className="text-green-700 font-semibold text-xl pt-3">Free</p>

              <button
                className="mt-4 bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                onClick={handleJoin}
              >
                {joinLoading ? "Joining..." : "Join"}
              </button>

              {showForm && <GuestForm isFormOpen={showForm} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeminarPage;
