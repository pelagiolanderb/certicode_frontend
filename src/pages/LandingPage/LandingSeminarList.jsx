import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchSeminars } from "../../api/seminarAPI";
import BeatLoader from "../../components/loading/loading";
import LandingHeader from "./LandingHeader";

const SeminarListPage = () => {
  const [seminars, setSeminars] = useState([]);
  const [filteredSeminars, setFilteredSeminars] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleFetchSeminars = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSeminars();
        setSeminars(data);

        // Extract unique topics
        const uniqueTopics = ["All", ...new Set(data.map((seminar) => seminar.topics))];
        setTopics(uniqueTopics);

        // Default display all seminars
        setFilteredSeminars(data);
      } catch (error) {
        setError(error.message || "Failed to fetch seminars.");
      } finally {
        setLoading(false);
      }
    };

    handleFetchSeminars();
  }, []);

  // Filter seminars based on selected topic
  useEffect(() => {
    if (selectedTopic === "All") {
      setFilteredSeminars(seminars);
    } else {
      setFilteredSeminars(seminars.filter((seminar) => seminar.topics === selectedTopic));
    }
  }, [selectedTopic, seminars]);

  return (
    <>
      <LandingHeader />

      {/* Page Header Section */}
      <div className="pt-30 text-center px-6">
        <h1 className="text-5xl font-bold text-[#37547C] mb-4">Explore Our Seminars</h1>
        <p className="text-lg text-[#37547C] max-w-2xl mx-auto">
          Discover expert-led seminars designed to expand your knowledge and skills.
        </p>
      </div>

      {/* Filter Section */}
      <div className="flex justify-center gap-3 py-6">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => setSelectedTopic(topic)}
            className={`px-4 py-2 rounded-full border ${
              selectedTopic === topic
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-300 hover:bg-gray-200"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Seminar List Section */}
      <div className="max-w-6xl mx-auto py-10 px-4">
        {loading ? (
          <div className="flex justify-center">
            <BeatLoader />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredSeminars.length === 0 ? (
          <p className="text-center text-gray-600">No seminars available for this topic.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredSeminars.map((seminar) => (
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
                    <h3 className="text-lg font-bold text-[#37547C] pb-3">{seminar.name_of_seminar}</h3>
                    <p className="text-sm text-gray-600 pb-3">Organized by {seminar.organization_name}</p>
                    <p className="text-md text-[#37547C] pb-3">Topic Covered</p>
                    <p className="text-sm text-gray-600 pb-3">{seminar.topics}</p>
                    <p className="text-xs text-gray-500 pb-3">📅 {new Date(seminar.date).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500">📍 {seminar.location}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Back to Homepage Button */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="text-[#37547C] font-bold text-lg border-2 border-[#37547C] px-6 py-3 rounded-lg hover:bg-[#37547C] hover:text-white transition"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </>
  );
};

export default SeminarListPage;
