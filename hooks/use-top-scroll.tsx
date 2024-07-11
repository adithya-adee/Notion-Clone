import { useEffect, useState } from "react";

export const useTopScroll = (threshold = 10) => {
  const [scroll, setScroll] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > threshold) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold]); // Only 'threshold' is necessary here

  return scroll;
};
