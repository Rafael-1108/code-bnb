import bcrypt from 'bcryptjs';

try {
    process.loadEnvFile();
} catch {
    console.error('   ❌ parceria ... arquivo .env não encontrado');
    process.exit(1);
}

const { criptografar } = await import('../src/lib/cripto.js');
const { prisma } = await import('../src/lib/prisma.js');

const dados = {
    usuarios: [
        { nome: 'admin', senha: bcrypt.hashSync('admin123', 10) },
        { nome: 'usuario', senha: bcrypt.hashSync('usuario123', 10) },
        { nome: 'rafinha', senha: bcrypt.hashSync('rafinha123', 10) },
        { nome: 'teste', senha: bcrypt.hashSync('teste123', 10) },
    ],
    clientes: [
        { nome: 'fernando', cpf: criptografar('123.456.789-01'), celular: '(11) 91111-1111' },
        { nome: 'jao', cpf: criptografar('987.654.321-00'), celular: '(11) 92222-2222' },
        { nome: 'rafinha', cpf: criptografar('111.222.333-44'), celular: '(11) 93333-3333' },
        { nome: 'teste', cpf: criptografar('555.666.777-88'), celular: '(11) 94444-4444' }
    ],
    imoveis: [
        { nome: 'Casa de praia', endereco: 'Rua da Praia, 100', descricao: 'Casa de praia com vista para o mar', disponivel: false, clientes_id: 1 },
        { nome: 'Apartamento super top', endereco: 'Av. do Meio, 2000', descricao: 'Apartamento moderno super top', disponivel: false, clientes_id: 1 },
        { nome: 'Apartamento no centro', endereco: 'Av. Central, 200', descricao: 'Apartamento moderno no centro da cidade', disponivel: false, clientes_id: 2 },
        { nome: 'Chácara', endereco: 'Estrada Rural, 300', descricao: 'Chácara com piscina e área de lazer', disponivel: true, clientes_id: 3 },
        { nome: 'Cobertura', endereco: 'Rua das Flores, 400', descricao: 'Cobertura com terraço e churrasqueira', disponivel: true, clientes_id: 4 }
    ],
    alugueis: [
        { data: new Date('2026-11-10'), imoveis_id: 1 },
        { data: new Date('2026-11-15'), imoveis_id: 2 },
        { data: new Date('2026-11-20'), imoveis_id: 3 }
    ],
};

const tabelas = Object.keys(dados).reverse().join(', ');
await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tabelas} RESTART IDENTITY CASCADE`);
console.log('   🧹 registros anteriores apagados (ids reiniciados)');

for (const [tabela, data] of Object.entries(dados)) {
    const { count } = await prisma[tabela].createMany({ data });
    console.log(`   ✅ ${tabela}: ${count} registros`);
}

await prisma.$disconnect();
