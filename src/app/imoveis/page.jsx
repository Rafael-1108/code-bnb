import { excluir, salvar } from '@actions/entidade2';
import Crud from '@components/Crud';
import { prisma } from '@lib/prisma';

const colunas = [
    { title: 'Nome', dataIndex: 'nome' },
    { title: 'Endereço', dataIndex: 'endereco' },
    { title: 'Disponibilidade', dataIndex: 'disponivel' },
    { title: 'Cliente', dataIndex: 'cliente_nome' },
];

export default async function ImoveisPage() {
    const [imoveis, clientes] = await Promise.all([
        prisma.imoveis.findMany({
            orderBy: { nome: 'asc' },
            include: { clientes: true },
        }),
        prisma.clientes.findMany({ orderBy: { nome: 'asc' } }),
    ]);

    const registros = imoveis.map((item) => ({
        id: item.id,
        nome: item.nome,
        endereco: item.endereco,
        descricao: item.descricao ?? '',
        clientes_id: item.clientes_id,
        disponivel: item.disponivel ? 'Disponível' : 'Indisponível',
        cliente_nome: item.clientes.nome,
    }));

    const campos = [
        { name: 'nome', label: 'Nome' },
        { name: 'endereco', label: 'Endereço' },
        { name: 'descricao', label: 'Descrição', opcional: true },
        {
            name: 'clientes_id',
            label: 'Cliente',
            opcoes: clientes.map((cliente) => ({ value: cliente.id, label: cliente.nome })),
        },
        {
            name: 'disponivel',
            label: 'Disponibilidade',
            opcoes: [
                { value: true, label: 'Disponível' },
                { value: false, label: 'Indisponível' },
            ],
        },
    ];

    return (
        <Crud
            titulo="Imóveis"
            colunas={colunas}
            campos={campos}
            registros={registros}
            salvar={salvar}
            excluir={excluir}
        />
    );
}
