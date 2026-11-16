import { excluir, salvar } from '@actions/entidade3';
import Crud from '@components/Crud';
import { prisma } from '@lib/prisma';

const colunas = [
    { title: 'Data', dataIndex: 'data' },
    { title: 'Imóvel', dataIndex: 'imovel_nome' },
    { title: 'Cliente', dataIndex: 'cliente_nome' },
];

export default async function AlugueisPage() {
    const [alugueis, imoveis] = await Promise.all([
        prisma.alugueis.findMany({
            orderBy: { data: 'asc' },
            include: { imoveis: { include: { clientes: true } } },
        }),
        prisma.imoveis.findMany({
            orderBy: { nome: 'asc' },
            include: { clientes: true },
        }),
    ]);

    const registros = alugueis.map((item) => ({
        id: item.id,
        data: item.data.toISOString().slice(0, 10),
        imoveis_id: item.imoveis_id,
        imovel_nome: item.imoveis.nome,
        cliente_nome: item.imoveis.clientes.nome,
    }));

    const campos = [
        { name: 'data', label: 'Data', tipo: 'date' },
        {
            name: 'imoveis_id',
            label: 'Imóvel',
            opcoes: imoveis.map((imovel) => ({ value: imovel.id, label: `${imovel.nome} (${imovel.clientes.nome})` })),
        },
    ];

    return (
        <Crud
            titulo="Aluguéis"
            colunas={colunas}
            campos={campos}
            registros={registros}
            salvar={salvar}
            excluir={excluir}
        />
    );
}
