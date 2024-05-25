import {
	BrowserRouter,
	Routes,
	Route,
	Outlet,
	Navigate,
} from "react-router-dom";
import Login from "./Pages/Login";
import Index from "./Pages/Index";
import { OperatorHome } from "./Pages/operator/home/Index";
import { OperatorLog } from "./Pages/operator/log/Index";
import { AdminLayout } from "./Components/layout/AdminLayout";
import { OperatorLayout } from "./Components/layout/OperatorLayout";
import { OperatorTurret } from "./Pages/operator/turret/Index";
import { OperatorTurretCreate } from "./Pages/operator/turret/Create";
import { OperatorTurretEdit } from "./Pages/operator/turret/Edit";
import { OperatorTurretControl } from "./Pages/operator/turret/Control";
import { AdminHome } from "./Pages/admin/home/Index";
import { AdminLog } from "./Pages/admin/log/Index";
import { AdminAccount } from "./Pages/admin/account/Index";
import { AdminAccountCreate } from "./Pages/admin/account/Create";
import { AdminAccountEdit } from "./Pages/admin/account/Edit";
import { AdminAccountChangePassword } from "./Pages/admin/account/change-password/Index";
import { SpecificationHome } from "./Pages/admin/specification/SpecificationHome";
import PrivateRoute from "./Components/PrivateRoute";

const App = () => {
  return (
		<BrowserRouter>
			<Routes>
				{/* Route Public */}
				<Route path="/" element={<Navigate to="/login" />} />
				<Route index={true} path="/login" element={<Login />} />

				{/* Route Admin */}
				<Route
					path="admin"
					element={
						<PrivateRoute element={() => <AdminLayout />}>
							<Outlet />
						</PrivateRoute>
					}
				>
					<Route path="home" element={<AdminHome />} />
					<Route path="log" element={<AdminLog />} />
					<Route path="account" element={<AdminAccount />} />
					<Route
						path="specification"
						element={<SpecificationHome />}
					/>
					<Route
						path="account/create"
						element={<AdminAccountCreate />}
					/>
					<Route
						path="account/:id/edit"
						element={<AdminAccountEdit />}
					/>
					<Route
						path="account/:id/change-password"
						element={<AdminAccountChangePassword />}
					/>
				</Route>

				{/* Route Operator */}
				<Route
					path="operator"
					element={
						<PrivateRoute element={() => <OperatorLayout />}>
							<Outlet />
						</PrivateRoute>
					}
				>
					<Route path="home" element={<OperatorHome />} />
					<Route path="log" element={<OperatorLog />} />
					<Route path="turret" element={<OperatorTurret />} />
					<Route
						path="turret/create"
						element={<OperatorTurretCreate />}
					/>
					<Route
						path="turret/:id/edit"
						element={<OperatorTurretEdit />}
					/>
					<Route
						path="turret/:id/control"
						element={<OperatorTurretControl />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
  );
};

export default App;
