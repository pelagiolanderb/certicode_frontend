import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { fetchSeminars } from "../../api/seminarAPI";
import BeatLoader from "../../components/loading/loading";
import LandingHeader from "./LandingHeader";
import seminarlist_model from "../../assets/images/seminarlist_model.png";
// import apiService from "../../api/apiService";
import useApiService from "../../api/useApiService";

const SeminarListPage = () => {
  const [seminars, setSeminars] = useState([]);
  const [filteredSeminars, setFilteredSeminars] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("All");
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const { loading, error, get, post } = useApiService();

  const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

  useEffect(() => {
    const handleFetchSeminars = async () => {
      // setLoading(true);
      // setError(null);
      try {
        // const data = await fetchSeminars();
        // const data = await apiService.get('/seminars');
        const data = await get("/seminars");
        setSeminars(data);

        // Extract unique topics
        const uniqueTopics = [
          "All",
          ...new Set(data.map((seminar) => seminar.topics)),
        ];
        setTopics(uniqueTopics);

        // Default display all seminars
        setFilteredSeminars(data);
      } catch (error) {
        console.log(error.message);
        // setError(error.message || "Failed to fetch seminars.");
      }
      // finally {
      //   setLoading(false);
      // }
    };

    handleFetchSeminars();
  }, []);

  useEffect(() => {
    if (selectedTopic === "All") {
      setFilteredSeminars(seminars);
    } else {
      setFilteredSeminars(
        seminars.filter((seminar) => seminar.topics === selectedTopic)
      );
    }
  }, [selectedTopic, seminars]);

  if (error) return <p>{error}</p>;

  return (
    <>
      <LandingHeader />

      <div className=" text-gray-900 pt-16">
        {/* Page Header Section */}
        <div className="flex flex-col-1 bg-[#B0C4DE]">
          <div className="flex flex-col  flex-2 justify-center px-3">
            <h1 className="text-5xl font-bold text-[#37547C]">
              Explore Our Seminars
            </h1>

            <h2 className="text-xl text-[#37547C] mt-2 max-w-2xl">
              Discover expert-led seminars designed to expand your knowledge and
              skills.
            </h2>
          </div>
          <div className="overflow-x-auto">
            <img src={seminarlist_model} alt="" className="h-90 px-3 pr-10" />
          </div>
        </div>

        <h1 className="text-5xl font-bold text-[#37547C] text-center mt-4">
          Browse Topics
        </h1>

        {/* Filter Section */}
        <div className="flex justify-center gap-3 py-6">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-4 py-2 rounded-full border ${
                selectedTopic === topic
                  ? "bg-[#B0C4DE] text-[#37547C]"
                  : "bg-white text-[#37547C] hover:bg-[#B0C4DE]"
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        <div className="max-w-6xl mx-auto py-20 rounded-xl">
          {/* Loading & Empty State Handling */}
          {loading ? (
            <BeatLoader />
          ) : filteredSeminars.length === 0 ? (
            <p className="text-center text-gray-600">
              No seminars available at the moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredSeminars.map((seminar) => (
                <div
                  key={seminar.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Link to={`/seminar/${seminar.id}`}>
                    <img
                      src={`${BACKEND_URL}/storage/${seminar.seminar_image}`}
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
                      <p className="text-sm bg-[#B0C4DE] text-[#37547C] px-1 inline rounded-lg">
                        {seminar.topics}
                      </p>
                      <p className="text-xs text-gray-500 pt-3 pb-3">
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
