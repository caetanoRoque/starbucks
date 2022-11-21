import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomAlertService } from '../alert_service/custom-alert.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(
    private router: Router,
    private customAlert: CustomAlertService
    ){}

  //VARIAVEL RECEBIDA PELO ION-RANGE DE QUANTOS PRODUTOS FORAM SELECIONADOS
  quantidadesSelecionadas: number[] = []

  produtos:any=[];


  //ATUALIZAR A LISTA DE PRODUTOS COM O LOCAL STORAGE AO ABRIR A TAB
  ionViewDidEnter(){
    this.atualizarListaProdutos()    
  }
  atualizarListaProdutos(){
    this.produtos = JSON.parse(localStorage.getItem('produtos'))
    if(this.produtos==null){ this.produtos=[] }
    
    this.reiniciarQuantidadesSelecionadas()
  }

  //VERIFICAR SE ALGUM PRODUTO FOI SELECIONADO ANTES DE ABRIR O CARRINHO
  verificar(){
    for( let quantidade of this.quantidadesSelecionadas){
      if(quantidade>0){
        this.carrinho()
        return;
      }
    }
    this.customAlert.presentAlert('Selecione um produto antes','OK')
  }
  
  //ABRIR CARRINHO E SALVAR quantidadesSelecionadas NO LOCAL STORAGE carrinho
  carrinho(){
    localStorage.setItem('produtos',JSON.stringify(this.produtos))
    localStorage.setItem('carrinho',JSON.stringify(this.quantidadesSelecionadas))
    this.router.navigate(['/carrinho']) 
    
    this.reiniciarQuantidadesSelecionadas()
  }

  //DEFINIR TODAS AS POSIÇÕES DA VARIÁVEL quantidadesSelecionadas PARA 0
  reiniciarQuantidadesSelecionadas(){ 
    this.quantidadesSelecionadas.length = this.produtos.length
    this.quantidadesSelecionadas.fill(0) 
  }
  
  //VERIFICAR SE A URL USADA NA IMAGEM EXISTE
  //CASO NÃO EXISTA, SUBSTITUIR PELA FOTO DE UM CAFÉ
  imagemInvalida(imagemErro){
    for(let produto of this.produtos){
      if(produto.foto == imagemErro){
        produto.foto = '../../assets/img/cafe.png'
      }
    }
    localStorage.setItem('produtos',JSON.stringify(this.produtos))
  }
}