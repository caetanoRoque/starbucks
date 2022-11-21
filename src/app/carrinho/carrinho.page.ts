import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage{
  constructor(private router: Router) { }

  //QUANTIDADE SELECIONADA DE CADA PRODUTO
  quantidadesSelecionadas: number[] = [];

  //PRODUTOS QUE ESTÃO NO CARRINHO
  produtosSelecionados:any=[]
  
  //TODOS OS PRODUTOS
  produtos:any=[]
  
  //SOMA DO PREÇO DA QUANTIDADE DE TODOS OS PRODUTOS
  precoTotal=0

  
  //ADICIONAR AO produtosSelecionados APENAS OS PRODUTOS QUE 
  //TIVERAM UMA QUANTIDADE SELECIONADA MAIOR DO QUE 0
  ionViewDidEnter(){
    this.produtos = JSON.parse(localStorage.getItem('produtos'))
    this.quantidadesSelecionadas = JSON.parse(localStorage.getItem('carrinho'))
    
    for(let produto of this.produtos){
      if(this.quantidadesSelecionadas[produto.id]>0){
        let oClone = Object.assign({},produto)
        oClone.quantidade = this.quantidadesSelecionadas[produto.id]
        this.produtosSelecionados.push(oClone)
      }
    }
    
    this.precoTotal=0
    this.total()
  }

  //VOLTAR PARA A TAB1
  voltar(){
    this.router.navigate(['/tabs/tab1'])
    this.produtosSelecionados=[]
  }

  //CALCULAR PREÇO TOTAL
  total(){
    for(let i of this.produtosSelecionados){
      this.precoTotal+= i.preco * i.quantidade
    }
  }

  //REDUZIR O ESTOQUE DOS PRODUTOS PELA QUANTIDADE DOS produtosSelecionados 
  comprar(){
    for(let produto of this.produtosSelecionados){
      this.produtos[produto.id].quantidade -= produto.quantidade
    }
    localStorage.setItem('produtos',JSON.stringify(this.produtos))
    this.router.navigate(['/tabs/tab1']) 
    this.router.navigate(['/tabs/tab1'])
    .then(() => {
    window.location.reload();
    });
  }
  
}
