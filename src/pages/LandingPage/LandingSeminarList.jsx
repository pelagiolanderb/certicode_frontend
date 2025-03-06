import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchSeminars } from "../../api/seminarAPI";
import BeatLoader from "../../components/loading/loading";
import LandingHeader from "./LandingHeader";

const SeminarListPage = () => {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div className="relative">
        <LandingHeader />
        <div className="max-w-6xl mx-auto py-20 px-6">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#37547C] mb-4">
              Explore Our Seminars
            </h1>
            <p className="text-lg text-gray-600">
              Discover expert-led seminars designed to expand your knowledge and
              skills.
            </p>
          </div>

          {/* Loading & Empty State Handling */}
          {loading ? (
            <BeatLoader />
          ) : seminars.length === 0 ? (
            <p className="text-center text-gray-600">
              No seminars available at the moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {seminars.map((seminar) => (
                <div
                  key={seminar.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Link to={`/seminar/${seminar.id}`}>
                    <img
                      src={`http://localhost:8000/storage/${seminar.seminar_image}`}
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
                        Topic Corvered
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
