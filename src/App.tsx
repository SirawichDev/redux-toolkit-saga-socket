import {
  Routes,
  BrowserRouter as Router,
  Route,
  Navigate,
} from "react-router-dom";
import NonAuthLayout from "./app/components/layout/NonAuthLayout";
import { AllRoutes } from "./app/routes/allRoutes";

const App = () => {
  return (
    <>
      {AllRoutes.map((route, idx) => {
        return (
          !route.needAuth && (
            <NonAuthLayout key={idx}>
              <Route path={route.path} element={<route.component />}></Route>
              <Route
                path="*"
                element={<Navigate to="/market/BTC_THB" replace />}
              />
            </NonAuthLayout>
          )
        );
      })}
    </>
  );
};

export default App;
