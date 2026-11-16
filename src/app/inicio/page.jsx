import { prisma } from '@lib/prisma';

export default async function InicioPage() {
    const [totalClientes, totalImoveis, totalAlugueis] = await Promise.all([
        prisma.clientes.count(),
        prisma.imoveis.count(),
        prisma.alugueis.count(),
    ]);

    return (
        <div style={{ padding: 24 }}>
            <h1>Dashboard</h1>
            <p>Resumo geral do sistema.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginTop: 24 }}>
                <div style={{ background: '#f5f5f5', padding: 20, borderRadius: 8 }}>
                    <h3>Clientes</h3>
                    <strong>{totalClientes}</strong>
                </div>
                <div style={{ background: '#f5f5f5', padding: 20, borderRadius: 8 }}>
                    <h3>Imóveis</h3>
                    <strong>{totalImoveis}</strong>
                </div>
                <div style={{ background: '#f5f5f5', padding: 20, borderRadius: 8 }}>
                    <h3>Aluguéis</h3>
                    <strong>{totalAlugueis}</strong>
                </div>
            </div>
        </div>
    );
}
