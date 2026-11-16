import { excluir, salvar } from '@actions/entidade1';
import Crud from '@components/Crud';
import { descriptografar } from '@lib/cripto';
import { prisma } from '@lib/prisma';

const colunas = [
    { title: 'Nome', dataIndex: 'nome' },
    { title: 'CPF', dataIndex: 'cpf' },
    { title: 'Celular', dataIndex: 'celular' },
];

const campos = [
    { name: 'nome', label: 'Nome' },
    { name: 'cpf', label: 'CPF' },
    { name: 'celular', label: 'Celular', opcional: true },
];

export default async function ClientesPage({ searchParams = {} }) {
    const busca = (searchParams.busca ?? '').toString().trim().toLowerCase();

    const clientes = await prisma.clientes.findMany({ orderBy: { nome: 'asc' } });

    const registros = clientes
        .map((cliente) => ({
            ...cliente,
            cpf: descriptografar(cliente.cpf),
            celular: cliente.celular ?? '',
        }))
        .filter((cliente) => {
            if (!busca) return true;
            const nome = cliente.nome.toLowerCase();
            const cpf = cliente.cpf.toLowerCase();
            return nome.includes(busca) || cpf.includes(busca);
        });

    return <Crud titulo="Clientes" colunas={colunas} campos={campos} registros={registros} salvar={salvar} excluir={excluir} busca={busca} />;
}
