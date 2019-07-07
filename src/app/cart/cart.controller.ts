import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

import { CartService } from './cart.service';
import { CartDto } from './dto/cart-create.dto';
import { CartProductDto } from './dto/cart-product.dto';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post()
  public async addCart(@Body() cart: CartDto): Promise<CartProductDto[]> {
    return this.cartService.createCart(cart);
  }

  @Post(':id')
  public updateQuantity(@Param('id', new ParseIntPipe()) id: number, @Body('quantity', new ParseIntPipe()) quantity: number): Promise<any> {
    return this.cartService.addQuantity(id, quantity);
  }

  @Get('generate')
  public generate(): string {
    return this.cartService.generateCartkey();
  }

  @Get(':cartKey')
  public findProduct(@Param('cartKey') cartKey: string): Promise<CartProductDto[]> {
    return this.cartService.cartProducts(cartKey, true);
  }

  @Get(':id/buynow')
  public buyNow(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    return this.cartService.buyNow(id);
  }

  @Get(':id/buylater')
  public buyLater(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    return this.cartService.buyLater(id);
  }

  @Get(':cartKey/saved')
  public savedProduct(@Param('cartKey') cartKey: string): Promise<CartProductDto[]> {
    return this.cartService.cartProducts(cartKey, false);
  }

  @Get(':id/total')
  public total(@Param('id', new ParseIntPipe()) id: number): Promise<number> {
    return this.cartService.productTotal(id);
  }

  @Delete('empty/:cartKey')
  public removeCart(@Param('cartKey') cartKey: string): Promise<void> {
    return this.cartService.removeCart(cartKey);
  }

  @Delete('product/:id')
  public removeProduct(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    return this.cartService.removeProduct(id);
  }

}
