import React from "react";
import { Link } from "react-router-dom";
import FormMigrante from "../Components/FormMigrante";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function CadastroMigrantes({ addMigrante, migrantes }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#78b3ff]/10 via-white to-[#4480ff]/10">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white text-3xl">
              🌟
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#002eff] mb-4">
              Cadastro de <span className="text-emerald-600">Migrantes</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto">
              Conecte-se com empresas inclusivas e encontre sua próxima oportunidade profissional no Brasil
            </p>
          </div>

          {/* Benefits Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-emerald-100">
              <div className="text-2xl mb-3">🚀</div>
              <h3 className="text-lg font-bold text-[#002eff] mb-2">Processo Rápido</h3>
              <p className="text-gray-600">Cadastro simples e conexão com empresas em poucos dias</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-emerald-100">
              <div className="text-2xl mb-3">🤝</div>
              <h3 className="text-lg font-bold text-[#002eff] mb-2">Empresas Inclusivas</h3>
              <p className="text-gray-600">Conectamos você apenas com empresas que valorizam a diversidade</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-emerald-100">
              <div className="text-2xl mb-3">💼</div>
              <h3 className="text-lg font-bold text-[#002eff] mb-2">100% Gratuito</h3>
              <p className="text-gray-600">Plataforma completamente gratuita, sem taxas ocultas</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-emerald-100">
              <div className="text-2xl mb-3">🎯</div>
              <h3 className="text-lg font-bold text-[#002eff] mb-2">Suporte Dedicado</h3>
              <p className="text-gray-600">Equipe especializada para te ajudar durante todo o processo</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-emerald-200">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#002eff] mb-2">
                Preencha seus dados
              </h2>
              <p className="text-gray-600">
                Todos os campos são obrigatórios e suas informações estão protegidas pela LGPD
              </p>
            </div>
            
            <FormMigrante addMigrante={addMigrante} migrantes={migrantes} />
          </div>

          {/* Footer Info */}
          <div className="text-center mt-12 text-gray-500">
            <p className="mb-4">
              🔒 Seus dados estão seguros e protegidos pela Lei Geral de Proteção de Dados (LGPD)
            </p>
            <p>
              Precisa de ajuda? Entre em contato: 
              <a href="mailto:contato@esboco-aloctone.com.br" className="text-emerald-600 hover:text-emerald-700 ml-1">
                contato@esboco-aloctone.com.br
              </a>
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default CadastroMigrantes;
