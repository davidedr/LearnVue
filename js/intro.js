Vue.config.devtools = true

Vue.component('shipping-details-tabs', {
    props: {
        shipping: {
            type: String,
            required: true
        },
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <span class="tab"
                :class="{ activeTab: selected_tab === tab }"
                v-for="(tab, index) in tabs"
                :key="tab"
                @click="selected_tab = tab">
                {{tab}}
            </span>
            <div v-show="selected_tab==='Shipping'">
                <p>Shipping: {{shipping}} </p>
            </div>
            <div v-show="selected_tab==='Info'">
                <product-details :details="details"></product-details>
            </div>
        </div>
    `,
    data() {
        return {
            tabs: ['Shipping', 'Info'],
            selected_tab: 'Shipping'
        }
    }
})

var event_bus = new Vue()

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
         <div>
            <span class="tab"
                :class="{ activeTab: selected_tab === tab }"
                v-for="(tab, index) in tabs"
                :key="tab"
                @click="selected_tab = tab">
                {{ tab }}
            </span>
            <div v-show="selected_tab==='Reviews'">
                <h2>Product reviews</h2>
                <p v-if="!reviews.length">There are no reviews, yet</p>
                <ul v-else>
                    <li v-for="review in reviews">
                        <p>Name: {{ review.name }}</p>
                        <p>Rating: {{ review.rating }}</p>
                        <p>Review: {{ review.review }}</p>
                        <p>Recommend: {{ review.recommend }}</p>
                    </li> 
                </ul>
            </div>
            <div v-show="selected_tab==='Write a review'">	
                <product-review @product-review-submitted="addReview"></product-review>        
            </div>
        </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Write a review'],
            selected_tab: 'Reviews'
        }
    },
    methods: {
        addReview() {
        }
    }
})
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

            <a v-bind:href="link">More products like this</a>

            <h1> {{brand}} {{product}}</h1>
            <h1> {{title}}</h1>
            <p> {{description }}</p>
        </div>
    </div>
    <product-tabs :reviews="reviews"></product-tabs>
    <shipping-details-tabs :shipping="shipping" :details="details"></shipping-details-tabs>
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
            sizes: ["M", "S", "XL", "XXL" ],
            reviews: []
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
    },
    mounted() {
        event_bus.$on('product-review-submitted', product_review => {
            this.reviews.push(product_review)
        })
    }

})

Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="review_form_submit">

            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{error}}</li>
                </ul>
            </p>
            <p>
                <label for="name">Your name:</label>
                <input id="name" v-model="name">
            </p>

            <p>
                <label for="review">Enter a review:</label>
                <textarea id="review" v-model="review"/></textarea>
            </p>

            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>

            <p>
                <label for="recommend">Would you recommend this product?</label>
                <input type="checkbox" id="recommend"  v-model="recommend">
            </p>

            <p>
                <input type="submit" value="Submit">
            </p>
        </form>
    `,
    data() {
        return {
            name:null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        review_form_submit() {
            if (this.name && this.review && this.rating) {

                let product_review={
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                event_bus.$emit("product-review-submitted", product_review)
                this.name=null
                this.review=null
                this.rating=null
                this.recommend=false
    
            }
            else {

                if (!this.name) this.errors.push("Name required.")
                if (!this.review) this.errors.push("Review required.")
                if (!this.rating) this.errors.push("Rating required.")

            }
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