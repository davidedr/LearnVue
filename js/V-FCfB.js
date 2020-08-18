var app = new Vue({
    el: '#root',
    data: {
      greeting: "Hello, vue world!",
      count: 2,
      email: '',
      password: 'default',
      
      test_array: [1, 2, 3, 4],
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
            return this.test_array.push(this.new_element)
        }
    }
  }) 
  