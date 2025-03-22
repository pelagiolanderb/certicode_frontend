import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const SuccessToast = ({ message, duration = 2000 }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!show) return null;

  return (
    <>
      <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-[1000] bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
        {message}
      </div>
    </>

  );
};

export default SuccessToast;
