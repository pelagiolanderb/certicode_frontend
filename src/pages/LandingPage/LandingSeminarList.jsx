import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchSeminars } from "../../api/seminarAPI";
import BeatLoader from "../../components/loading/loading";
import LandingHeader from "./LandingHeader";
import About from "../../assets/images/about_us.jpg";

const SeminarListPage = () => {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

  useEffect(() => {
    const handleFetchSeminars = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSeminars();
        setSeminars(data);
      } catch (error) {
        setError(error.message || "Failed to fetch seminars.");
      } finally {
        setLoading(false);
      }
    };

    handleFetchSeminars();
  }, []);

  return (
    <>
      <LandingHeader />
      <div className=" text-gray-900 pt-10 px-4">
        <div className="relative my-10 h-[400px] rounded-xl overflow-hidden shadow-md">
          {/* Background Image */}
          <img
            className="w-full h-full object-cover"
            src={About}
            alt="Seminars Hero"
          />

          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-opacity-50"></div>

          {/* Hero Text (Centered) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-4xl font-bold text-white mb-4">
              Explore Our Seminars
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl">
              Discover expert-led seminars designed to expand your knowledge and
              skills.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto py-20 rounded-xl">
          {/* Loading & Empty State Handling */}
          {loading ? (
            <BeatLoader />
          ) : // <div className="flex justify-center">
          // </div>
          seminars.length === 0 ? (
            <p className="text-center text-gray-600">
              No seminars available at the moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {seminars.map((seminar) => (
                <div
                  key={seminar.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Link to={`/seminar/${seminar.id}`}>
                    <img
                      src={`${BACKEND_URL}/storage/${
                        seminar.seminar_image
                      }`}
                      alt={seminar.name_of_seminar}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-[#37547C] pb-3">
                        {seminar.name_of_seminar}
                      </h3>
                      <p className="text-sm text-gray-600 pb-3">
                        Organized by {seminar.organization_name}
                      </p>
                      <p className="text-md text-[#37547C] pb-3">
                        Topic Covered
                      </p>
                      <p className="text-sm text-gray-600 pb-3">
                        {seminar.topics}
                      </p>
                      <p className="text-xs text-gray-500 pb-3">
                        📅 {new Date(seminar.date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        📍 {seminar.location}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Back to Homepage */}
          <div className="text-center mt-12">
            <Link
              to="/"
              className="text-[#37547C] font-bold text-lg border-2 border-[#37547C] px-6 py-3 rounded-lg hover:bg-[#37547C] hover:text-white transition"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeminarListPage;
