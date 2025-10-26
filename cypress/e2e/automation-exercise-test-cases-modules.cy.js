/// <reference types="cypress" />

import userData from '../fixtures/example.json'
//import { faker } from '@faker-js/faker';

import { navegarParaLogin } from '../modules/menu'
import { preencherFormularioDePreCadastro, logarNaAplicacao, logarSenhaIncorreta, usuarioExistente } from '../modules/login'
import { confirmarUsuarioInscrito, excluirRegistroConta, preencherCadastro } from '../modules/register';
import { preencherFormularioDeContato, anexarArquivo } from '../modules/form';
import { acessarProdutos, visualizarDetalhesPrimeiroProduto, buscarProduto } from '../modules/product';
import { inserirProdutoCarrinho, confirmarCompra } from '../modules/cart';
import { inserirDadosCartão } from '../modules/payment';

describe('Test cases da Automation Exercises', () => {
    
    beforeEach(() => {
        cy.visit('https://automationexercise.com/')
        
    });
    
    it('Registrar um novo usuário com sucesso', () => {
        
        navegarParaLogin()
        preencherFormularioDePreCadastro()
        preencherCadastro()

        cy.url().should('includes', 'account_created')
        cy.get('b').should('contain', 'Account Created!')
    });

    it('Logar na aplicação com sucesso', () => {
        
        navegarParaLogin()
        logarNaAplicacao ()

        cy.get('b').should('contain', 'Ana QA')
        cy.get(':nth-child(10) > a').should('contain', 'Logged in as Ana QA')
    });

    it('Logar na aplicação com senha incorreta', () => {
       
        navegarParaLogin()
        logarSenhaIncorreta ()

        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')
    });

    it('Deslogar da aplicação com sucesso', () => {
        
        navegarParaLogin()
        logarNaAplicacao ()

        cy.get('a[href="/logout"]').click()

        cy.url().should('includes', 'login')
        cy.get('.login-form > h2').should('contain', 'Login to your account')
    });

    it('Tentar registrar com email de usuário já existente', () => {
       
        navegarParaLogin()
        usuarioExistente ()

        cy.url().should('includes', 'signup')
        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
    });

    it('Enviar formulário de contato com upload de arquivo', () => {
        cy.visit('https://automationexercise.com/contact_us')
        cy.get('a[href="/contact_us"]').click()
        
        preencherFormularioDeContato ()
        anexarArquivo ()

        cy.get('.status').should('be.visible')
        cy.contains('Success! Your details have been submitted successfully.').should('be.visible')
    });

    it('Acessar pagina dos produtos e verificar detalhes', () => {

        acessarProdutos ()
        visualizarDetalhesPrimeiroProduto ()

        cy.url().should('include', 'product_details/1')
        cy.get('.product-information > h2').should('contain', 'Blue Top')
        cy.get('.product-information > :nth-child(3)').should('contain', 'Category: Women > Tops')
        cy.get(':nth-child(5) > span').should('contain', 'Rs. 500')
        cy.get('.product-information > :nth-child(6)').should('contain', 'In Stock')
        cy.get('.product-information > :nth-child(7)').should('contain', 'New')
        cy.get('.product-information > :nth-child(8)').should('contain', 'Polo')
    });

    it('Buscar um produto', () => {
        
        acessarProdutos ()
        buscarProduto ()
        
        cy.url().should('include', 'products?search=top')
        cy.get('.productinfo.text-center p').should('exist').each(($el) => {
            cy.wrap($el).invoke('text').then((text) => {
                const normalized = text.trim().toLowerCase();
                expect(normalized.includes('top') || normalized.includes('shirt'),`O item "${text}" deve conter as palavras 'top' ou 'shirt'`).to.be.true;
            });
        });
    });
    
    it('Verificar inscrição na página', () => {
        
        confirmarUsuarioInscrito()

        cy.get('.alert-success').should('be.visible')
    })

    it('Cadastrar usuário, realizar compra e excluir conta', () => {

        navegarParaLogin()
        preencherFormularioDePreCadastro()
        preencherCadastro()
        acessarProdutos()
        visualizarDetalhesPrimeiroProduto()
        inserirProdutoCarrinho()
        confirmarCompra()
        cy.url().should('include', 'payment')
        inserirDadosCartão()
        cy.url().should('include', 'payment_done')
        cy.get('[data-qa="order-placed"] > b').should('contain', 'Order Placed!')
        excluirRegistroConta()
        cy.url().should('include', 'delete_account')
    })
})