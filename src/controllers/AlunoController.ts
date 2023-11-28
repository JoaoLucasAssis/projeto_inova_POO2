import express from 'express';
import AlunoService from '../services/AlunoService';
import { Prisma } from '@prisma/client';

class AlunoController {

    public async insert(req: express.Request, res: express.Response) {

        try {
            const aluno: Prisma.AlunoCreateInput = req.body;

            const newAluno = await AlunoService.insert(aluno);

            if (newAluno == null) {
                return res.status(400).json({
                    status: 'aviso',
                    message: 'Usuário já inserido no banco de dados'
                });
            } else {
                return res.status(200).json({
                    status: 'ok',
                    aluno: newAluno
                });
            }
        } catch (error) {
            return res.status(500).json({
                error: error,
                message: 'Erro interno do servidor'
            })
        }
    }

    public async update(req: express.Request, res: express.Response) {

        try {
            const matricula = req.params.matricula;
            const aluno: Prisma.AlunoCreateInput = req.body;

            const newAluno = await AlunoService.update(matricula, aluno);

            if (newAluno == null) {
                return res.status(400).json({
                    status: 'aviso',
                    message: 'Usuário não existe na base de dados'
                });
            } else {
                return res.status(200).json({
                    status: 'ok',
                    aluno: newAluno
                });
            }
        } catch (error) {
            return res.status(500).json({
                error: error,
                message: 'Erro interno do servidor'
            })
        }
    }

    public async delete(req: express.Request, res: express.Response) {

        try {
            const matricula = req.params.matricula;

            const aluno = await AlunoService.delete(matricula);

            if (aluno == null) {
                return res.status(400).json({
                    status: 'aviso',
                    message: 'Usuário não existe na base de dados'
                });
            } else {
                return res.status(200).json({
                    status: 'ok',
                    aluno: aluno
                });
            }
        } catch (error) {
            return res.status(500).json({
                error: error,
                message: 'Erro interno do servidor'
            })
        }
    }

    public async getAll(req: express.Request, res: express.Response) {

        try {
            const alunos = await AlunoService.getAll();

            return res.status(200).json({
                status: 'ok',
                alunos: alunos
            });
        } catch (error) {
            return res.status(500).json({
                error: error,
                message: 'Inserir os dados no corpo da requisição'
            })
        }
    }
}

export default new AlunoController();