import { API_CONFIG } from './../../config/api.config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[] = []; // tem que começar vazia, por que quando for buscar a pagina, vai concatenar essa nova lista com a que ja existia
  page: number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

    loadData(){
      //conseguir o parametro passado pela navegação
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
      .subscribe(res => {
        let start = this.items.length;
        this.items = this.items.concat(res['content']); // concatena
        let end = this.items.length - 1;
        loader.dismiss();
        this.loadImageUrls(start, end);
      },
      error => {
        loader.dismiss();
      });
    }

    loadImageUrls(start: number, end: number){
      for (var i= start; i<end; i++){
        let item = this.items[i];
        this.produtoService.getSmallImageFromBucket(item.id)
          .subscribe(res => {
            item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
          },
          error => {});
      }
    }

    showDetail(produto_id : string){
      this.navCtrl.push('ProdutoDetailPage', {produto_id : produto_id});
    }

    presentLoading(){
      let loader = this.loadingCtrl.create({
        content: "Aguarde.."
      });
      loader.present();
      return loader;
    }

    //chamada assincrona
    doRefresh(refresher){
      this.page = 0;
      this.items = [];
      this.loadData();
      setTimeout(() => {
        refresher.complete();
      }, 1000);
    }

    doInfinite(infiniteScroll) {
      this.page++;
      this.loadData();
      setTimeout(() => {     
        infiniteScroll.complete();
      }, 1000);
    }

}
