import { Outlet, useNavigation } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import Loading from "./loading";
import { useEffect } from "react";
// import withScrollToTop from "./withScrollToTop";

export default function AppLayout() {
  const navigation = useNavigation();

  useEffect(function () {
    scrollTo({ top: 0 });
  }, []);
  return (
    <div className="flex flex-col  gap-y-4 sm:gap-y8">
      <Header />
      <div className="bg-gray-50">
        <div className="px-2 md:mx-4  lg:mx-8 sm:px-4 md:px-6 ">
          {navigation.state === "loading" ? <Loading /> : <Outlet />}
        </div>
      </div>
      <Footer />
    </div>
  );
}
