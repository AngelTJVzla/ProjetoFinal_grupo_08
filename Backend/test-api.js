// Script para testar todas as funcionalidades relacionais da API
const API_BASE = 'http://localhost:3000';

// Función helper para realizar requests
async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        const data = await response.json();
        console.log(`${options.method || 'GET'} ${endpoint}:`, response.status, data);
        return { response, data };
    } catch (error) {
        console.error(`Error en ${endpoint}:`, error);
        return { error };
    }
}

async function testAPI() {
    console.log('🚀 Iniciando testes da API Relacional...\n');

    // 1. Testar endpoint principal
    console.log('1. Testando endpoint principal:');
    await apiRequest('/');

    // 2. Testar dados de apoio
    console.log('\n2. Testando dados de apoio:');
    await apiRequest('/setores');
    await apiRequest('/paises');
    await apiRequest('/habilidades');
    await apiRequest('/idiomas');
    await apiRequest('/tipos-ajuda');

    // 3. Testar entidades existentes
    console.log('\n3. Testando entidades existentes:');
    const { data: migrantes } = await apiRequest('/migrantes');
    const { data: empresas } = await apiRequest('/empresas');

    if (empresas && empresas.length > 0) {
        // 4. Criar uma vaga de teste
        console.log('\n4. Criando vaga de teste:');
        const vagaData = {
            empresa_id: empresas[0].id,
            titulo: 'Desenvolvedor React - Teste',
            descripcion: 'Vaga de teste para sistema relacional',
            salario: 5000.00,
            tipo_contrato: 'CLT',
            nivel_experiencia: 'Júnior',
            modalidade: 'Remoto',
            requisitos: 'React, JavaScript, CSS',
            beneficios: 'Vale alimentação, plano de saúde'
        };

        const { data: vagaCriada } = await apiRequest('/vagas', {
            method: 'POST',
            body: JSON.stringify(vagaData)
        });

        // 5. Listar vagas
        console.log('\n5. Listando vagas:');
        await apiRequest('/vagas');

        // 6. Listar vagas da empresa
        console.log('\n6. Listando vagas da empresa:');
        await apiRequest(`/empresas/${empresas[0].id}/vagas`);

        if (migrantes && migrantes.length > 0 && vagaCriada && !vagaCriada.error) {
            // 7. Criar candidatura de teste
            console.log('\n7. Criando candidatura de teste:');
            const candidaturaData = {
                migrante_id: migrantes[0].id,
                vaga_id: vagaCriada.id,
                mensagem: 'Gostaria de me candidatar para esta vaga'
            };

            const { data: candidaturaCriada } = await apiRequest('/candidaturas', {
                method: 'POST',
                body: JSON.stringify(candidaturaData)
            });

            // 8. Listar candidaturas do migrante
            console.log('\n8. Listando candidaturas do migrante:');
            await apiRequest(`/migrantes/${migrantes[0].id}/candidaturas`);

            // 9. Listar candidatos da vaga
            console.log('\n9. Listando candidatos da vaga:');
            await apiRequest(`/vagas/${vagaCriada.id}/candidatos`);

            if (candidaturaCriada && !candidaturaCriada.error) {
                // 10. Atualizar status da candidatura
                console.log('\n10. Atualizando status da candidatura:');
                await apiRequest(`/candidaturas/${candidaturaCriada.id}/status`, {
                    method: 'PUT',
                    body: JSON.stringify({ status: 'analisando' })
                });
            }

            // 11. Sistema de matching
            console.log('\n11. Testando sistema de matching:');
            await apiRequest(`/migrantes/${migrantes[0].id}/vagas-compatibles`);

            // 12. Adicionar habilidade ao migrante
            console.log('\n12. Adicionando habilidade ao migrante:');
            const { data: habilidades } = await apiRequest('/habilidades');
            if (habilidades && habilidades.length > 0) {
                await apiRequest(`/migrantes/${migrantes[0].id}/habilidades`, {
                    method: 'POST',
                    body: JSON.stringify({
                        habilidade_id: habilidades[0].id,
                        nivel: 'Intermediário'
                    })
                });

                // 13. Listar habilidades do migrante
                console.log('\n13. Listando habilidades do migrante:');
                await apiRequest(`/migrantes/${migrantes[0].id}/habilidades`);
            }
        }
    }

    console.log('\n✅ Testes concluídos!');
}

// Executar testes
testAPI();
