Vue.config.devtools = true

Vue.component('product-sizes-list', {
    props: {
        sizes: {
            type: Array,
            required: true

        }
    },
    template: `
        <ul>
            <li v-for="size in sizes">{{size}}</li>
        </ul>
    `
})

Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
            <li v-for="detail in details">{{detail}}</li>
        </ul>
    `
})

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

            <button v-on:click="addToCart"
            :disabled="!in_stock"
            :class="{disabledButton: !in_stock}">Add to cart</button>

            <button @click="removeFromCart"
            :disabled="!in_stock"
            :class="{disabledButton: !in_stock}">Remove from cart</button>

            <div class="sizes-list">
                <product-sizes-list :sizes="sizes"></product-sizes-list>
            </idv>

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

            <product-details :details="details"></product-details>

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
            on_sale: true,
            details: ["80% cotton", "20% polyester", "Gender neutral"],
            variants: [
                {variant_id: 2234, variant_color: "green", variant_image: "assets/vm-socks-green.png", variant_quantity: 100},
                {variant_id: 2235, variant_color: "blue", variant_image: "assets/vm-socks-blue.png", variant_quantity: 0}
            ],
            sizes: ["M", "S", "XL", "XXL" ]
        }
    },
    methods: {
        addToCart() {
            this.$emit('event-add-to-cart', this.variants[this.selected_variant].variant_id)
        },
        removeFromCart() {
            this.$emit('event-remove-from-cart', this.variants[this.selected_variant].variant_id)
        },
        updateProduct(index) {
            this.selected_variant = index
            console.log(index)
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
        premium: true,
        cart: []
    },
    methods: {
        add_to_cart(id) {
            this.cart.push(id)
        },
        remove_from_cart(id) {
            for(var i=0; i < this.cart.length; i++)
                if (this.cart[i] == id) {
                    this.cart.splice(i, 1)
                    break
                }
        }
    }
})