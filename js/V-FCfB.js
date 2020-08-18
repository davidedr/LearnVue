Vue.config.devtools = true

Vue.component('elements-list', {
    props: [
        'elements'
    ],
    template: `
    <ul>
        <li v-for="elem in elements"> {{ elem }}</li>
    </ul>
    `
})

var app = new Vue({
    el: '#root',
    component: [
        'elements-list'
    ],
    data: {
      greeting: "Hello, vue world!",
      count: 2,
      email: '',
      password: 'default',
      
      test_array: ['a', 'b', 'c', 'd'],
      new_element: '',
      
      test_array_of_objects: [
        {name: "one", age: 10},
        {name: "two", age: 11},
        {name: "three", age: 12},
      ],
      new_object_name: '',
      new_object_age: 0
    },
    methods: {
        add_element_to_array() {
            var ele = this.test_array.push(this.new_element)
            this.new_element = ''
            return ele
        },

        add_element_to_array_of_objects() {
            var ele = this.test_array_of_objects.push({name: this.new_object_name, age:this.new_object_age})
            this.new_object_name=''
            this.new_object_age = 0
            return ele
        }
    },
    created() {
        console.log("created")
    },

    mounted() {
        console.log("mounted")
    },

    updated() {
        console.log("updated")
    },

    destroyed() {
        console.log("destroyed")
    },
    filters: {
        capitalize(value) {
            return value.toUpperCase()
        },
        yfy(value) {
            if (value.length > 1)
               return value + "y"
        }
    },
    computed: {
        dasher() {
            if (this.new_element.length > 1)
                return "-" + this.new_element + "-"
        }

    }
  }) 
  