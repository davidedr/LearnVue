var app = new Vue({
    el: '#root',
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
    filters: {
        capitalize(value) {
            return value.toUpperCase()
        }
    }
  }) 
  