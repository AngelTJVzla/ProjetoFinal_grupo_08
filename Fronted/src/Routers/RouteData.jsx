import React from "react";
import FormData from "../Components/FormData";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function RouteData({ resultado, setResultado, fetchProdutos }) {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div>
        <FormData resultado={resultado} setResultado={setResultado} fetchProdutos={fetchProdutos} />
        <button onClick={() => navigate("/")}>Voltar</button>
      </div>
      <Footer />
    </>
  );
}

export default RouteData;