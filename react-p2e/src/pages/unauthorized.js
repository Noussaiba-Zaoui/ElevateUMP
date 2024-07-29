import { useNavigate } from "react-router-dom";
import Logo from "../assets/website/logo.svg"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <a
            target="_blank"
            href="/"
            className="flex items-center gap-3"
          >
            <img src={Logo} alt="logo" />
          </a>
            <h1 className="text-3xl font-bold mb-4">Non autorisé</h1>
            <p className="text-lg text-center mb-8">Vous n'avez pas l'autorisation d'accéder à cette page.</p>
            <div>
        
                <button onClick={goBack} className="px-4 py-2  text-white rounded bg-[#7654a7] text-white hover:bg-[#9f71df] focus:outline-none focus:bg-bg-[#9f71df]">Retourner</button>
       
            </div>
        </div>
    );
};

export default Unauthorized;
