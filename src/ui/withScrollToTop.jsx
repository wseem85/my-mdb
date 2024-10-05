import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function withScrollToTop(Component) {
  return function WithScrollToTop(props) {
    const location = useLocation();
    

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    return <Component {...props} />;
  };
}
