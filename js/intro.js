Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <img v-bind:src="image" v-bind:alt="alt_text"/>
        </div>

        <div class="product-info">
            <h1>Product goes here</h1>

            <div class="cart">
                <p>Cart({{cart}})</p>
                <button v-on:click="addToCart"
                    :disabled="!in_stock"
                    :class="{disabledButton: !in_stock}">Add to cart</button>

                <button @click="removeFromCart"
                :disabled="!in_stock"
                :class="{disabledButton: !in_stock}">Remove from cart</button>
            </div>

            <div class="sizes-list">
                <ul>
                    <li v-for="size in sizes">{{ size}}</li>
                </ul>
            </div>

            Mouse over the color box to change the image accordingly
            <div v-for="(variant, index) in variants"
                :key="variant.variant_id"
                class="color-box"
                :style="{backgroundColor: variant.variant_color}"
                @mouseover="updateProduct(index)">
            </div>

            Mouse over the color name to change the image accordingly
            <div v-for="(variant, index) in variants"
                :key="variant.variant_id">
                <p @mouseover="updateProduct(index)">{{variant.variant_id}} - {{variant.variant_color}}</p>
            </div>

            <ul>
                <li v-for="detail in details">{{detail}}</li>
            </ul>

            <span v-show="on_sale">On sale!</span>
            <p>{{sale}}</p>

            <p :class="{outOfStock: !in_stock}">In stock line-through</p>

            <p v-if="in_stock">In stock</p>
            <p v-else="in_stock">Out of stock</p>

            <p v-if="inventory>10">In stock</p>
            <p v-else-if="inventory>0 && inventory<=10">Almost sold out!</p>
            <p v-else>Out of stock!</p>

            <p>Shipping: {{shipping}}</p>

            <a v-bind:href="link">More products like this</a>

            <h1> {{brand}} {{product}}</h1>
            <h1> {{title}}</h1>
            <p> {{description }}</p>
        </div>
    </div>
    `,
    data() {
        return {
            brand: "Vue Mastery",
            product: 'Socks',
            selected_variant: 0,
            alt_text: 'A pair of socks',
            description: 'A pair of warm, fuzzy socks',
            link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
            inventory: 100,
            on_sale: true,
            details: ["80% cotton", "20% polyester", "Gender neutral"],
            variants: [
                {variant_id: 2234, variant_color: "green", variant_image: "assets/vm-socks-green.png", variant_quantity: 100},
                {variant_id: 2235, variant_color: "blue", variant_image: "assets/vm-socks-blue.png", variant_quantity: 0}
            ],
            sizes: ["M", "S", "XL", "XXL" ],
            cart: 0
        }
    },
    methods: {
        addToCart() {
            this.cart +=1
        },
        updateProduct(index) {
            this.selected_variant = index
            console.log(index)
        },
        removeFromCart() {
            this.cart -= 1
        }
    },
    computed: {
        title() {
            return this.brand + " " + this.product
        },
        image() {
            return this.variants[this.selected_variant].variant_image
        },
        in_stock() {
            return this.variants[this.selected_variant].variant_quantity > 0
        },
        inventory() {
            return this.variants[this.selected_variant].variant_quantity
        },
        sale() {
            if (this.on_sale) {
                return `${this.brand} ${this.product} is on sale!`

            }
            else {
                return `${this.brand} ${this.product} is not on sale!`
            }
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }
    }      
})

var app=new Vue({
    el: '#app',
    data: {
        premium: true
    }
})