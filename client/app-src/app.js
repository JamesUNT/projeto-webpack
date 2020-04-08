import { NegociacaoController } from './controllers/NegociacaoController.js';
import { Negociacao } from './domain/index.js';

//Quando não referenciamos a pasta de origem do arquivo, o webpack admite que esse arquivo vem de node_modules
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'
import 'jquery/dist/jquery.js';
import 'bootstrap/js/modal.js';
//importando css normal
import '../css/teste.css'

const controller = new NegociacaoController();
const negociacao = new Negociacao(new Date(), 1, 200);
const headers = new Headers();
headers.set('Content-Type', 'application/json');
const body = JSON.stringify(negociacao);
const method = 'POST';

const config = {
    method,
    headers,
    body
};

fetch('http://localhost:3000//negociacoes', config)
    .then(() => console.log('Dado enviado com sucesso'));