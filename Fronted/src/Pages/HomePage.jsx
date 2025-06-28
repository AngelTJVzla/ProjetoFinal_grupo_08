import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#78b3ff]/10 via-white to-[#4480ff]/10">
      {/* Hero Section - Modern Blue Design */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#78b3ff] via-[#4480ff] to-[#1a4fff]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform rotate-12 translate-x-1/2"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#002eff]/30 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-[#0031ff]/25 rounded-full opacity-35 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-white/20 rounded-full opacity-45"></div>

        <div className="relative container mx-auto px-6 py-24 text-center text-white">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-black mb-8 text-white drop-shadow-2xl">
              ESBOÇO ALÓCTONE
            </h1>
            <p className="text-xl md:text-3xl mb-8 font-light text-blue-100 max-w-4xl mx-auto leading-relaxed">
              A primeira plataforma brasileira que conecta{" "}
              <span className="font-bold text-white">migrantes talentosos</span>{" "}
              com
              <span className="font-bold text-white"> empresas inclusivas</span>
            </p>

            {/* What we do explanation */}
            <div className="bg-white backdrop-blur-lg border-2 border-white rounded-2xl p-2 mb-12 max-w-4xl mx-auto shadow-xl">
              <p className="text-lg text-[#7691e8] leading-relaxed font-medium">
                📋 <strong>Cadastre seu perfil</strong> → 🤝{" "}
                <strong>Encontre conexões</strong> → 💼{" "}
                <strong>Realize entrevistas</strong> → 🎯{" "}
                <strong>Consegua oportunidades</strong>
              </p>
            </div>

            {/* Modern Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div
                className="flex flex-col items-center cursor-pointer group"
                onClick={() =>
                  document
                    .getElementById("what-is-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center items-start p-1 mb-2 group-hover:border-blue-600 transition-colors duration-300">
                  <div className="w-1 h-3 bg-blue-400 rounded-full animate-pulse group-hover:bg-blue-600 transition-colors duration-300"></div>
                </div>
                <div className="flex flex-col items-center">
                 
                  <span className="text-sm text-blue-400 font-medium mt-1 group-hover:text-blue-600 transition-colors duration-300">
                    Explorar
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What is Esboço Alóctone - Clear Explanation */}
      <div className="container mx-auto px-6 py-1">
        <h2 className="text-5xl md:text-6xl font-black text-center text-white mb-12 italic">
          O <span className="text-[#78b3ff] italic">Que é ?</span>
        </h2>
         <p className="text-xl md:text-2xl text-blue-100 mb-12 text-center max-w-4xl mx-auto leading-relaxed font-medium">
          Recepção e integração de pessoas migrantes.
        </p>
      </div>

      <div id="what-is-section" className="container mx-auto px-6 py-1">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#78b3ff]/30">
            <p className="text-xl text-gray-800 leading-relaxed mb-6 font-cice font-medium">
              <strong className="font-circe-contrast font-bold italic">
               ESBOÇO ALÓCTONE
              </strong>{" "}
              é uma plataforma digital que facilita uma "ponte" entre duas
              necessidades reais:
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-[#78b3ff]/10 p-6 rounded-xl border-2 border-[#78b3ff]/30">
                <h3 className="font-bold text-[#002eff] mb-3 font-circe italic">
                  👥 Migrantes precisam de:
                </h3>
                <ul className="text-[#1a4fff] space-y-2 font-cice font-medium">
                  <li>• Oportunidades de trabalho no Brasil.</li>
                  <li>• Empresas que valorizem sua experiência.</li>
                  <li>• Processos justos de contratação.</li>
                  <li>• Reconhecimento de suas habilidades.</li>
                </ul>
              </div>
              <div className="bg-[#78b3ff]/10 p-6 rounded-xl border-2 border-[#4480ff]/30">
                <h3 className="font-bold text-[#002eff] mb-3 font-circe italic">
                  🏢 Empresas precisam de:
                </h3>
                <ul className="text-[#1a4fff] space-y-2 font-cice font-medium">
                  <li>• Talentos qualificados e diversos.</li>
                  <li>• Profissionais com perspectivas globais.</li>
                  <li>• Equipes multiculturais.</li>
                  <li>• Responsabilidade social empresarial.</li>
                </ul>
              </div>
            </div>
          </div>
      </div>

      {/* Detailed How it Works */}
      <div className="bg-gradient-to-br from-[#78b3ff] via-[#4480ff] to-[#1a4fff] pt-16 pb-24 relative overflow-hidden">
        <div className="container mx-auto px-12 relative">
          <h2 className="text-5xl md:text-6xl font-black text-center text-white mb-12 italic">
            Como <span className="text-[#78b3ff] italic">Funciona ?</span>
          </h2>
           <p className="text-xl md:text-2xl text-blue-100 mb-12 text-center max-w-4xl mx-auto leading-relaxed font-medium">
            Processo simples e transparente em 3 passos para cada tipo de
            usuário:
          </p>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Para Migrantes - Detailed Steps */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-[#002eff] to-[#0031ff] rounded-2xl mx-auto  flex items-center justify-center text-3xl"></div>
                <h3 className="text-3xl font-bold text-[#8ceb3e] mb-4">
                  Para Migrantes
                </h3>
                <p className="text-blue-100 text-lg italic">
                  Seu caminho para uma nova carreira no Brasil
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-[#002eff] rounded-xl flex items-center justify-center text-blue-100 font-bold text-lg mr-6 group-hover:scale-110 transition-transform">
                    1
                  </div>
                  <div>
                    <h4 className="text-neutral-700 font-bold text-lg mb-2">
                      📝 Cadastro Completo
                    </h4>
                    <p className="text-neutral-700 mb-2">
                      Preencha informações pessoais, profissionais e habilidades
                    </p>
                    <ul className="text-sm text-neutral-700 list-disc list-inside">
                      <li>Dados pessoais e de contato</li>
                      <li>Experiência profissional anterior</li>
                      <li>Formação acadêmica</li>
                      <li>Idiomas e habilidades técnicas</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-[#002eff] rounded-xl flex items-center justify-center text-white font-bold text-lg mr-6 group-hover:scale-110 transition-transform">
                    2
                  </div>
                  <div>
                    <h4 className="text-neutral-700 font-bold text-lg mb-2">
                      🔍 Busca e Match
                    </h4>
                    <p className="text-neutral-700 mb-2">
                      Nossa plataforma encontra empresas compatíveis com seu
                      perfil
                    </p>
                    <ul className="text-sm  text-neutral-700 list-disc list-inside">
                      <li>Empresas do seu setor de atuação</li>
                      <li>Vagas compatíveis com sua experiência</li>
                      <li>Organizações inclusivas e diversas</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-[#002eff] rounded-xl flex items-center justify-center text-blue-100 font-bold text-lg mr-6 group-hover:scale-110 transition-transform">
                    3
                  </div>
                  <div>
                    <h4 className="text-neutral-700 font-bold text-lg mb-2">
                      🤝 Conexão e Contratação
                    </h4>
                    <p className="text-neutral-700 mb-2">
                      Conecte-se diretamente com empresas interessadas
                    </p>
                    <ul className="text-sm text-neutral-700 list-disc list-inside">
                      <li>Contato direto com recrutadores</li>
                      <li>Entrevistas personalizadas</li>
                      <li>Suporte durante o processo</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Link
                to="/migrantes"
               className="block w-full bg-gradient-to-r from-[#002eff] to-[#0031ff] text-[#8ceb3e] font-bold text-lg py-4 px-8 rounded-2xl mt-8 text-center hover:from-[#7192f3] hover:to-[#274bea] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Começar Cadastro Migrante 🚀
              </Link>
            </div>

            {/* Para Empresas - Detailed Steps */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-[#002eff] to-[#0031ff] rounded-2xl mx-auto  flex items-center justify-center text-3xl"></div>
                <h3 className="text-3xl font-bold text-[#8ceb3e] mb-4">
                  Para Empresas
                </h3>
                <p className="text-blue-100 text-lg italic">
                  Encontre talentos excepcionais e diversos
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-[#002eff] rounded-xl flex items-center justify-center text-white font-bold text-lg mr-6 group-hover:scale-110 transition-transform">
                    1
                  </div>
                  <div>
                    <h4 className="text-neutral-700 font-bold text-lg mb-2">
                      🏢 Registro da Empresa
                    </h4>
                    <p className="text-neutral-700 mb-2">
                      Cadastre sua empresa e defina o que podem oferecer
                    </p>
                    <ul className="text-sm text-neutral-700 list-disc list-inside">
                      <li>CNPJ e dados da empresa</li>
                      <li>Setor de atuação</li>
                      <li>Tipos de ajuda oferecida</li>
                      <li>Perfil de candidatos procurados</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-[#002eff] rounded-xl flex items-center justify-center text-white font-bold text-lg mr-6 group-hover:scale-110 transition-transform">
                    2
                  </div>
                  <div>
                    <h4 className="text-neutral-700 font-bold text-lg mb-2">
                      🎯 Acesso ao Banco de Talentos
                    </h4>
                    <p className="text-neutral-700 mb-2">
                      Visualize perfis de migrantes qualificados
                    </p>
                    <ul className="text-sm text-neutral-700 list-disc list-inside">
                      <li>Filtros por experiência e setor</li>
                      <li>Perfis detalhados dos candidatos</li>
                      <li>Histórico profissional completo</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-[#002eff] rounded-xl flex items-center justify-center text-white font-bold text-lg mr-6 group-hover:scale-110 transition-transform">
                    3
                  </div>
                  <div>
                    <h4 className="text-neutral-700 font-bold text-lg mb-2">
                      📞 Contato e Contratação
                    </h4>
                    <p className="text-neutral-700 mb-2">
                      Entre em contato com candidatos interessantes
                    </p>
                    <ul className="text-sm text-neutral-700 list-disc list-inside">
                      <li>Sistema de mensagens integrado</li>
                      <li>Agendamento de entrevistas</li>
                      <li>Acompanhamento do processo</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Link
                to="/empresas"
                className="block w-full bg-gradient-to-r from-[#002eff] to-[#0031ff] text-[#8ceb3e] font-bold text-lg py-4 px-8 rounded-2xl mt-8 text-center hover:from-[#7192f3] hover:to-[#274bea] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Cadastrar Empresa 💎
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-br from-[#78b3ff]/5 to-white py-12">
        <div className="container mx-auto px-6">
           <h2 className="text-5xl md:text-6xl font-black text-center text-white mb-12 italic">
            Porque Escolher <span className="text-[#78b3ff] italic">o Esboço Alóctone?</span>
          </h2>
           <p className="text-xl md:text-2xl text-blue-100 mb-12 text-center max-w-4xl mx-auto leading-relaxed font-medium">
            Para construir sociedades mais justas, equitativas e resilientes
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#78b3ff]/30 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#78b3ff] to-[#4480ff] rounded-2xl flex items-center justify-center text-white text-2xl mb-6">
                ✅
              </div>
              <h3 className="text-2xl font-bold text-[#0c71f5] mb-4">
                100% Gratuito
              </h3>
              <p className="text-[#78b3ff] text-lg font-medium">
                Plataforma completamente gratuita para migrantes e empresas. Sem
                taxas ocultas ou pagamentos.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#78b3ff]/30 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-6">
                🛡️
              </div>
              <h3 className="text-2xl font-bold text-[#0c71f5] mb-4">
                Seguro e Confiável
              </h3>
              <p className="text-[#78b3ff] text-lg font-medium">
                Verificação de empresas por CNPJ e proteção de dados dos
                usuários conforme LGPD.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#78b3ff]/30 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-6">
                ⚡
              </div>
              <h3 className="text-2xl font-bold text-[#0c71f5] mb-4">
                Conexão Rápida
              </h3>
              <p className="text-[#78b3ff] text-lg font-medium">
                Sistema de matching inteligente que conecta perfis compatíveis
                em minutos.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#78b3ff]/30 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-6">
                🌟
              </div>
              <h3 className="text-2xl font-bold text-[#0c71f5] mb-4">
                Suporte Especializado
              </h3>
              <p className="text-[#78b3ff] text-lg font-medium">
                Equipe dedicada para auxiliar migrantes e empresas durante todo
                o processo.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#78b3ff]/30 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-6">
                📊
              </div>
              <h3 className="text-2xl font-bold text-[#0c71f5] mb-4">
                Transparência Total
              </h3>
              <p className="text-[#78b3ff] text-lg font-medium">
                Processo transparente com feedback em todas as etapas de
                seleção.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#78b3ff]/30 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-6">
                🤝
              </div>
              <h3 className="text-2xl font-bold text-[#0c71f5] mb-4">
                Impacto Social
              </h3>
              <p className="text-[#78b3ff] text-lg font-medium">
                Contribua para um Brasil mais inclusivo e diverso no mercado de
                trabalho.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats with real context */}
      <div className="bg-gradient-to-br from-[#002eff] to-[#0031ff] py-8">
        <div className="container mx-auto px-6">
           <h2 className="text-5xl md:text-6xl font-black text-center text-white mb-12 italic">
                      Nossos{" "} <span className="text-[#78b3ff] italic">resultados</span>
          </h2>
           <p className="text-xl md:text-2xl text-blue-100 mb-12 text-center max-w-4xl mx-auto leading-relaxed font-medium">
            Alguns dos nossos KPIs resumidos
          </p>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/25 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/40 hover:bg-white/30 transition-all duration-300">
              <div className="text-5xl font-black text-[#e8f141] mb-4">500+</div>
              <h3 className="text-2xl font-bold text-[#0c71f5] mb-4">
                Migrantes Cadastrados
              </h3>
              <p className="text-neutral-700 font-medium">
                Profissionais qualificados de 30+ países
              </p>
            </div>

            <div className="bg-white/25 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/40 hover:bg-white/30 transition-all duration-300">
              <div className="text-5xl font-black text-[#e8f141] mb-4">150+</div>
              <h3 className="text-2xl font-bold text-[#0c71f5] mb-4">
                Empresas Parceiras
              </h3>
             <p className="text-neutral-700 font-medium">
                De startups a multinacionais
              </p>
            </div>

            <div className="bg-white/25 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/40 hover:bg-white/30 transition-all duration-300">
              <div className="text-5xl font-black text-[#e8f141] mb-4">80%</div>
              <h3 className="text-2xl font-bold text-[#0c71f5] mb-4">
                Taxa de Sucesso
              </h3>
            <p className="text-neutral-700 font-medium">
                Migrantes contratados em 60 dias
              </p>
            </div>

            <div className="bg-white/25 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/40 hover:bg-white/30 transition-all duration-300">
              <div className="text-5xl font-black text-[#e8f141] mb-4">30+</div>
              <h3 className="text-2xl font-bold text-[#0c71f5] mb-4">
                Países Representados
              </h3>
            <p className="text-neutral-700 font-medium">
                Diversidade cultural genuína
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gradient-to-br from-[#78b3ff]/5 to-white py-24">
        <div className="container mx-auto px-6">
           <h2 className="text-5xl md:text-6xl font-black text-center text-white mb-12 italic">
                      Preguntas{" "} <span className="text-[#78b3ff] italic">frequentes</span>
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 text-center max-w-4xl mx-auto leading-relaxed font-medium">
           Temos mais respostas que perguntas.
          </p>


          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-[#78b3ff]/30 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#0c71f5] mb-4">
                ❓ A plataforma é realmente gratuita?
              </h3>
              <p className="text-[#78b3ff] font-medium">
                Sim! O Esboço Alóctone é 100% gratuito tanto para migrantes
                quanto para empresas. Nosso objetivo é facilitar a inclusão, não
                lucrar com ela.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-[#78b3ff]/30 hover:shadow-2xl transition-all duration-300">
               <h3 className="text-2xl font-bold text-[#0c71f5] mb-4">
                🔒 Meus dados estão seguros?
              </h3>
              <p className="text-[#78b3ff] font-medium">
                Absolutamente. Seguimos rigorosamente a LGPD e utilizamos
                criptografia de dados. Suas informações só são compartilhadas
                com seu consentimento explícito.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-[#78b3ff]/30 hover:shadow-2xl transition-all duration-300">
               <h3 className="text-2xl font-bold text-[#0c71f5] mb-4">
                ⏱️ Quanto tempo leva para encontrar oportunidades?
              </h3>
              <p className="text-[#78b3ff] font-medium">
                Em média, migrantes recebem os primeiros contatos em 1-2
                semanas. 80% conseguem entrevistas em até 30 dias após completar
                o cadastro.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-[#78b3ff]/30 hover:shadow-2xl transition-all duration-300">
             <h3 className="text-2xl font-bold text-[#0c71f5] mb-4">
                🏢 Que tipos de empresas participam?
              </h3>
              <p className="text-[#78b3ff] font-medium">
                Temos desde startups inovadoras até multinacionais, em diversos
                setores: tecnologia, saúde, educação, consultoria, varejo e
                muito mais.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA with clear next steps */}
      <div className="bg-gradient-to-br from-[#002eff] via-[#0031ff] to-[#1a4fff] py-6 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative">
          <h2 className="text-5xl md:text-6xl font-black text-center text-white mb-12 italic">
                     Pronto{" "} <span className="text-[#78b3ff] italic">para começar ?</span>
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            Seu próximo passo para transformar vidas e construir um futuro mais
            inclusivo está a um clique de distância.
          </p>

          <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 mb-12 max-w-3xl mx-auto border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              🎯 Próximos Passos:
            </h3>
            <div className="text-blue-100 space-y-2 font-medium">
              <p>1️⃣ Escolha seu perfil (Migrante ou Empresa)</p>
              <p>2️⃣ Preencha o cadastro completo (5-10 minutos)</p>
              <p>3️⃣ Aguarde as primeiras conexões (1-7 dias)</p>
              <p>4️⃣ Inicie conversas e realize entrevistas</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
            <Link
              to="/migrantes"
              className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-6 px-12 rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-300"
            >
              <span className="relative z-10 text-xl">
                🌟 Cadastrar como Migrante
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="text-sm opacity-75 mt-1">
                Encontre sua próxima oportunidade
              </div>
            </Link>
            <Link
              to="/empresas"
              className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-6 px-12 rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-300"
            >
              <span className="relative z-10 text-xl">
                💼 Registrar Empresa
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="text-sm opacity-75 mt-1">
                Encontre talentos excepcionais
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-[#0031ff] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h3 className="text-4xl font-black mb-6 bg-gradient-to-r from-[#78b3ff] to-white bg-clip-text text-transparent">
              Esboço Alóctone
            </h3>
            <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto font-medium">
              🌍 Conectando culturas • 💼 Criando oportunidades • 🚀 Construindo
              o futuro
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-8 max-w-4xl mx-auto">
              <div>
                <h4 className="font-bold text-[#78b3ff] mb-2">📧 Contato</h4>
                <p className="text-blue-100">contato@esboco-aloctone.com.br</p>
              </div>
              <div>
                <h4 className="font-bold text-[#78b3ff] mb-2">📱 Suporte</h4>
                <p className="text-blue-100">+55 (11) 9999-9999</p>
              </div>
              <div>
                <h4 className="font-bold text-[#78b3ff] mb-2">
                  🌐 Redes Sociais
                </h4>
                <p className="text-blue-100">@esboco_aloctone</p>
              </div>
            </div>
            <div className="text-sm text-blue-200 border-t border-[#4480ff] pt-8 font-medium">
              © 2025 Esboço Alóctone. Transformando vidas através da tecnologia
              e diversidade cultural. 🇧🇷
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
