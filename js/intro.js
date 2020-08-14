var app=new Vue({
    el: '#app',
    data: {
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
        }  
    }
    })