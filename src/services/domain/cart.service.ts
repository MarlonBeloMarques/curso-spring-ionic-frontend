import { ProdutoDTO } from './../../models/produto.dto';
import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";

@Injectable()
export class CartService{

    constructor(public storage: StorageService){

    }

    createOrClearCart() : Cart {
        let cart : Cart = { items: [] };
        this.storage.settCart(cart);
        return cart;
    }

    getCart() : Cart {
        let cart : Cart = this.storage.getCart();
        if(cart == null){
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        // -1 é não encontrado
        if(position == -1){
            cart.items.push({quantidade: 1, produto: produto});
        }
        this.storage.settCart(cart);
        return cart;
    }

    removeProduto(produto: ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        // -1 é não encontrado
        if(position != -1){
            cart.items.splice(position, 1); // 1 = indica remoção
        }
        this.storage.settCart(cart);
        return cart;
    }

    increaseQuantity(produto: ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        // -1 é não encontrado
        if(position != -1){
            cart.items[position].quantidade++;
        }
        this.storage.settCart(cart);
        return cart;
    }

    decreaseQuantity(produto: ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        // -1 é não encontrado
        if(position != -1){
            cart.items[position].quantidade--;
            if(cart.items[position].quantidade < 1){
                cart = this.removeProduto(produto);
            }
        }
        this.storage.settCart(cart);
        return cart;
    }

    total() : number {
        let cart = this.getCart();
        let sum = 0;
        for (var i = 0; i<cart.items.length; i++){
            sum += cart.items[i].produto.preco * cart.items[i].quantidade;
        }
        return sum;
    }

}