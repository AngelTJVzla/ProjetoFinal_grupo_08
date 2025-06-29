import React from "react";
import { Link } from "react-router-dom";
import FormCompany from "../Components/FormCompany";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function CadastroEmpresas({ addEmpresa, empresas }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#78b3ff]/10 via-white to-[#4480ff]/10">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white text-3xl">
              💼
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#002eff] mb-4">
              Cadastro de <span className="text-amber-600">Empresas</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto">
              Encontre talentos excepcionais e diversos para fortalecer sua equipe e promover a inclusão
            </p>
          </div>

          {/* Benefits Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-amber-100">
              <div className="text-2xl mb-3">🎯</div>
              <h3 className="text-lg font-bold text-[#002eff] mb-2">Talentos Qualificados</h3>
              <p className="text-gray-600">Acesso a profissionais experientes de mais de 30 países</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-amber-100">
              <div className="text-2xl mb-3">🌍</div>
              <h3 className="text-lg font-bold text-[#002eff] mb-2">Diversidade Cultural</h3>
              <p className="text-gray-600">Enriqueça sua empresa com perspectivas globais únicas</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-amber-100">
              <div className="text-2xl mb-3">⚡</div>
              <h3 className="text-lg font-bold text-[#002eff] mb-2">Conexão Rápida</h3>
              <p className="text-gray-600">Sistema inteligente que conecta você aos melhores candidatos</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-amber-100">
              <div className="text-2xl mb-3">🏆</div>
              <h3 className="text-lg font-bold text-[#002eff] mb-2">Impacto Social</h3>
              <p className="text-gray-600">Contribua para um Brasil mais inclusivo e diverso</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-amber-200">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#002eff] mb-2">
                Registre sua empresa
              </h2>
              <p className="text-gray-600">
                Preencha os dados da sua empresa para começar a encontrar talentos excepcionais
              </p>
            </div>
            
            <FormCompany addEmpresa={addEmpresa} empresas={empresas} />
          </div>

          {/* Additional Info */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 mt-8 border border-amber-200">
            <h3 className="text-lg font-bold text-[#002eff] mb-3 flex items-center">
              <span className="text-2xl mr-2">📋</span>
              Próximos passos após o cadastro:
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">1.</span>
                Verificação do CNPJ e validação dos dados da empresa
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">2.</span>
                Acesso ao banco de talentos e perfis de candidatos
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">3.</span>
                Sistema de matching inteligente para encontrar candidatos ideais
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">4.</span>
                Contato direto com migrantes interessados em suas oportunidades
              </li>
            </ul>
          </div>

          {/* Footer Info */}
          <div className="text-center mt-12 text-gray-500">
            <p className="mb-4">
              🔒 Dados da empresa protegidos conforme LGPD • ✅ Verificação de CNPJ automática
            </p>
            <p>
              Dúvidas sobre o processo? Entre em contato: 
              <a href="mailto:empresas@esboco-aloctone.com.br" className="text-amber-600 hover:text-amber-700 ml-1">
                empresas@esboco-aloctone.com.br
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

export default CadastroEmpresas;
