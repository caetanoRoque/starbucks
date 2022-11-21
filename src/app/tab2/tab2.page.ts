import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomAlertService } from '../alert_service/custom-alert.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor(
    private router: Router,
    private customAlert: CustomAlertService
    ){}
  
  produto:any = {
    nome:"",
    foto:"",
    descricao:"",
    preco:null,
    quantidade:null,
    id:0
  }
  produtos:any=[]

  //ATUALIZAR A LISTA DE PRODUTOS COM O LOCAL STORAGE AO ABRIR A TAB
  ngOnInit(){this.atualizarListaProdutos()}
  ionViewDidEnter(){this.atualizarListaProdutos()}
  
  atualizarListaProdutos(){
    this.produtos = JSON.parse(localStorage.getItem('produtos'));
    if(this.produtos == null){
      this.produtos =[];
    }
  }

  //ADICIONAR produto AO produtos E ABRIR TAB1
  adicionarProduto(){
    this.produtos.push(Object.assign({}, this.produto))
    localStorage.setItem('produtos',JSON.stringify(this.produtos))
    if(this.produtos==null){
      this.produtos=[]
    }
    this.produto.id++
    this.router.navigate(['/tabs/tab1'])
  }

  //VERIFICAR SE TODOS OS INPUTS FORAM PREEENCHIDOS
  verificarInputs(){
    if(this.produto.nome!="" && this.produto.foto!="" && this.produto.descricao!="" && this.produto.preco!=null &&this.produto.quantidade!=null){
      this.adicionarProduto()
    }else{
      this.customAlert.presentAlert('Os campos não podem estar em branco','OK')
    }
  }

}
