'use server';

import { prisma } from '@lib/prisma';
import { revalidatePath } from 'next/cache';

export async function salvar({ id, ...dados }) {
    try {
        const data = {
            ...dados,
            clientes_id: Number(dados.clientes_id),
            disponivel: Boolean(dados.disponivel),
        };

        if (id) {
            await prisma.imoveis.update({ where: { id: Number(id) }, data });
        } else {
            await prisma.imoveis.create({ data });
        }
    } catch {
        return { erro: 'Erro ao salvar o imóvel' };
    }

    revalidatePath('/imoveis');
    revalidatePath('/entidade2');
}

export async function excluir(id) {
    try {
        await prisma.imoveis.delete({ where: { id: Number(id) } });
    } catch (e) {
        if (e.code === 'P2003') return { erro: 'Imóvel possui aluguéis cadastrados' };
        return { erro: 'Erro ao excluir o imóvel' };
    }

    revalidatePath('/imoveis');
    revalidatePath('/entidade2');
}
