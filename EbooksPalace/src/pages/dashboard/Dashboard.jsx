import { userAdmin, userBan, userCustomer } from "../../redux/actions";
import From from "../Form/Form"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const dashboardAdmin = ()=>{
  const user = useSelector((state) => state.user);

  if (user.role === "Administrador") {
    return <Outlet />;
  } else {
    
  }
    return (
      <div>
        <h1>Panel de Administración</h1>
        <Link to="/form"><button>Create Book</button></Link>
        <Link to="/checkusers"><button>Check Users</button></Link>
        <Link to="/checkbooks"><button>Check Books</button></Link>
        <Link to="/checkcarts"><button>Check Carts</button></Link> 
      </div>
    );
}
export default dashboardAdmin;