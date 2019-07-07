
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export enum ORDER {
    ASC = "ASC",
    DESC = "DESC"
}

export enum ORDER_BY {
    id = "id",
    name = "name"
}

export class CartInput {
    attribute: string;
    cartKey: string;
    productId: number;
    quantity?: number;
}

export class OrderInput {
    cartKey: string;
    taxId: number;
    shippingId: number;
}

export class PaginationInput {
    offset?: string;
    limit?: string;
    order?: ORDER;
    orderBy?: ORDER_BY;
}

export class ProductSearchInput {
    search: string;
    descLength?: number;
}

export class ReviewInput {
    review: string;
    rating: number;
}

export class SigninInput {
    email: string;
    password: string;
}

export class SignupInput {
    email: string;
    password: string;
    name: string;
}

export class UserAddressInput {
    address1: string;
    address2: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    RegionId: number;
}

export class UserUpdateInput {
    name: string;
    password: string;
    dayPhone: string;
    evePhone: string;
    mobPhone: string;
    creditCard: string;
}

export class Attribute {
    id: string;
    name: string;
    values?: AttributeValue[];
}

export class AttributeProduct {
    id: string;
    name: string;
    value: string;
}

export class AttributeValue {
    id: string;
    name: string;
}

export class AuthUser {
    token: string;
    user: User;
}

export class Cart {
    id: string;
    cartKey: string;
    attribute: string;
    quantity: number;
    buyNow: boolean;
    createdAt: DateTime;
}

export class CartProduct {
    cartId: number;
    attribute: string;
    quantity: number;
    name: string;
    image: string;
    subtotal: number;
    price: number;
    productId: number;
}

export class Category {
    id: string;
    name: string;
    description: string;
}

export class CategoryPagination {
    total: number;
    currentPage: number;
    perPage: number;
    row: Category[];
}

export class Department {
    id: string;
    name: string;
    description?: string;
}

export abstract class IMutation {
    abstract signin(signinInput: SigninInput): AuthUser | Promise<AuthUser>;

    abstract signup(signupInput: SignupInput): AuthUser | Promise<AuthUser>;

    abstract addCart(cartDto: CartInput): CartProduct[] | Promise<CartProduct[]>;

    abstract addQuantity(id: number, quantity: number): CartProduct[] | Promise<CartProduct[]>;

    abstract removeCart(cartKey: string): string | Promise<string>;

    abstract removeProductCart(productId: number): string | Promise<string>;

    abstract addOrder(orderInput: OrderInput): Order | Promise<Order>;

    abstract addProductReview(reviewInput: ReviewInput, id: number, userId: number): ProductReview[] | Promise<ProductReview[]>;

    abstract updateAddress(addressInput: UserAddressInput): User | Promise<User>;

    abstract updateUser(updateInput: UserUpdateInput): User | Promise<User>;
}

export class Order {
    id?: string;
    totalAmount?: number;
    shippedOn?: DateTime;
    status?: number;
    comments?: string;
    authCode?: string;
    reference?: string;
    createdAt?: DateTime;
}

export class OrderDetail {
    id: string;
    attribute: string;
    productName: string;
    quantity: number;
    unitCost: number;
    currency: string;
}

export class Product {
    id: string;
    name: string;
    price: number;
    description?: string;
    discountedPrice?: number;
    image1?: string;
    image2?: string;
    thumbnail?: string;
    display?: boolean;
}

export class ProductLocation {
    categoryId: number;
    categoryName: string;
    departmentId: number;
    departmentName: string;
}

export class ProductPagination {
    total: number;
    currentPage: number;
    perPage: number;
    row?: Product[];
}

export class ProductReview {
    review: string;
    rating: number;
    userName: string;
    createdOn: DateTime;
}

export abstract class IQuery {
    abstract getAttributes(): Attribute[] | Promise<Attribute[]>;

    abstract getAttribute(id: number): Attribute | Promise<Attribute>;

    abstract generateCartKey(): string | Promise<string>;

    abstract getCartProduct(cartKey: string): CartProduct[] | Promise<CartProduct[]>;

    abstract getCategories(query?: PaginationInput): CategoryPagination | Promise<CategoryPagination>;

    abstract getCategory(id: number): Category | Promise<Category>;

    abstract getCategoryByProduct(productId: number): Category[] | Promise<Category[]>;

    abstract getCategoryByDepartment(departmentId: number): Category[] | Promise<Category[]>;

    abstract getDepartments(): Department[] | Promise<Department[]>;

    abstract getDepartment(id: number): Department | Promise<Department>;

    abstract findOrder(id: number): Order | Promise<Order>;

    abstract currentOrder(): Order[] | Promise<Order[]>;

    abstract getProducts(paginationInput?: PaginationInput): ProductPagination | Promise<ProductPagination>;

    abstract getProduct(id: number): Product | Promise<Product>;

    abstract searchProduct(searchInput: ProductSearchInput, paginationInput?: PaginationInput): ProductPagination | Promise<ProductPagination>;

    abstract getShippings(): Shipping[] | Promise<Shipping[]>;

    abstract getRegion(id: number): Shipping | Promise<Shipping>;

    abstract getTaxs(): Tax[] | Promise<Tax[]>;

    abstract getTax(id: number): Tax | Promise<Tax>;

    abstract getUser(): User | Promise<User>;
}

export class Review {
    id: string;
    review: string;
    rating: number;
    createdAt: DateTime;
}

export class Shipping {
    id: string;
    type: string;
    cost: number;
}

export class ShippingRegion {
    id: string;
    name: string;
}

export class Tax {
    id: string;
    type: string;
    percentage: number;
}

export class User {
    id?: string;
    name?: string;
    email?: string;
    address1?: string;
    address2?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    country?: string;
    dayPhone?: string;
    evePhone?: string;
    mobPhone?: string;
    creditCard?: string;
}

export type DateTime = any;
