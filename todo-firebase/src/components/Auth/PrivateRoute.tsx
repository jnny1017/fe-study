import { Route, RouteProps, redirect } from "react-router-dom";
import useUser from "../../hooks/auth/useUser";

//인증, 데이터를 따로 관리한다
// 3개의 작업을 해야한다 ... .> 데이터 베이스에 넣어준다
export default function PrivateRoute(props: RouteProps) {
  const user = useUser();

  if (user === null) {
    redirect("/signin");

    return null;
  }

  return <Route {...props} />;
}
