import { useEffect } from "react";

import Loading1 from "./loading1";

export default function Loading() {
  useEffect(() => scrollTo({ top: 0 }), []);
  return (
    <div className="flex relative top-[-64px] min-h-screen flex-col justify-center items-center gap-1">
      <span>Loading ...</span>
      <Loading1 />
    </div>
  );
}
