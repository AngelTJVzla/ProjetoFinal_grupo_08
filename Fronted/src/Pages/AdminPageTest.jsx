import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function AdminPageTest() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
            <Header />
            
            <main className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <div className="bg-gray-800/90 rounded-3xl p-8 border border-blue-400/40 shadow-2xl">
                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            ✅ Página de Admin - TESTE
                        </h1>
                        <p className="text-xl text-blue-100 mt-4">
                            Esta é uma página de teste para verificar o roteamento
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default AdminPageTest;
