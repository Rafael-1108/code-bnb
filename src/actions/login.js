'use server';

import { prisma } from '@lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const TEMPO_VIDA = 60 * 60;

export async function entrar({ nome, senha }) {
    try {
        const usuario = await prisma.usuarios.findUnique({ where: { nome } });

        if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
            return { erro: 'Usuário ou senha incorretos' };
        }

        const token = jwt.sign({ nome: usuario.nome }, process.env.JWT_SECRET, {
            expiresIn: TEMPO_VIDA,
        });

        const cookieStore = await cookies();
        cookieStore.set('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: TEMPO_VIDA,
            path: '/',
        });

        redirect('/inicio');
    } catch {
        return { erro: 'Erro ao conectar com o banco' };
    }
}

export async function sair() {
    const cookieStore = await cookies();
    cookieStore.delete('token');
    redirect('/');
}
