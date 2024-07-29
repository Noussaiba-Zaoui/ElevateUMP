import { useNavigate, Link } from "react-router-dom";
import useAuth from "./hooks/useAuth";


const Home = () => {
   
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/linkpage');
    }
    
    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in as an user!</p>
            <Link to="/homeAdmin">the home admin</Link>
            <Link to="/userPage">user page</Link>
            <Link to="/linkpage">Go to the link page</Link>
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home