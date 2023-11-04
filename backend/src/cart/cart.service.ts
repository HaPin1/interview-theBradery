import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { Products } from 'src/products/products.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async getCartByClientId(clientId: number): Promise<Cart> {
    return this.cartRepository.findOne({
      where: { clientId },
      relations: ['products'],
    });
  }

  async addToCart(clientId: number, productId: number): Promise<Cart> {
    let cart = await this.cartRepository.findOne({
      where: { clientId },
      relations: ['products'],
    });

    if (!cart) {
      cart = await this.cartRepository.save(
        this.cartRepository.create({ clientId, products: [] }),
      );
    }

    const product = await this.productsRepository
      .createQueryBuilder('products')
      .where('products.id = :id', { id: productId })
      .getOne();

    if (!product) {
      throw new NotFoundException('Produit non trouvé');
    }

    if (product.inventory > 0) {
      cart.products.push(product);
      await this.cartRepository.save(cart);
    } else {
      throw new Error('Produit en rupture de stock');
    }

    return cart;
  }

  async buyItems(clientId: number): Promise<string> {
    const cart = await this.cartRepository.findOne({
      where: { clientId },
      relations: ['products'],
    });

    if (!cart || cart.products.length === 0) {
      return 'CartEmpty';
    }

    const productsToBuy = cart.products;

    for (const product of productsToBuy) {
      if (product.inventory < 1) {
        return 'NotEnoughStock';
      }
    }

    // Mise à jour des stocks et retrait des produits du panier
    for (const product of productsToBuy) {
      product.inventory -= 1;
      await this.productsRepository.save(product);
    }

    cart.products = [];
    await this.cartRepository.save(cart);

    return 'PurchaseSuccessful';
  }
}
