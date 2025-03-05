import BeatLoader from "react-spinners/BeatLoader";

const loading = ({ size=10, color="#7592ff" }) => {
  return (
    <div className="text-center">
      <BeatLoader size={size} color={color} />
    </div>
  );
};

export default loading;
