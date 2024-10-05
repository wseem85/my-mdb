import { MdHome } from "react-icons/md";
import IconButton from "../ui/iconButton";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

export default function Errorpage() {
  const navigate = useNavigate();
  const error = useRouteError();
  const isRouteErrror = isRouteErrorResponse(error);
  return (
    <div className="grid content-center h-[calc(100vh-64px)] gap-3 items-center ">
      <h3 className="text-center text-xl font-bold">Opps!</h3>
      <p className="text-center text-lg font-semibold">
        Sorry , Something Went Wrong 🤔
      </p>
      {isRouteErrror && <span>{error.data?.message}</span>}
      <div className="w-fit m-auto">
        <IconButton
          handler={() => navigate("/")}
          icon={<MdHome />}
          text="Try Again"
        />
      </div>
    </div>
  );
}
