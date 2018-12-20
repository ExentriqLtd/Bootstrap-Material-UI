(function ($) {
  $(document).ready(function() {
    if (_doc_route.path === "dropdown") {
      // Vue Dropdown
      var vue_dropdown = new Vue({
        el: '#vue-dropdown',
        data: {
          posts: null,
          loading: true,
          errored: false
        },
        methods: {
          update: _.debounce(function (e) {
            var self = this;
            axios
              .get('https://stage.exentriq.com/rest-mockup/posts?_page=1&_limit=10')
              .then(response => { self.posts = response.data; })
              .catch(error => {
                  console.log(error)
                  self.errored = true
                })
              .finally(() => { self.loading = false })
          }, 3000)
        },
        filters: {
          currencydecimal (value) {
            return value.toFixed(2)
          }
        },
        mounted () {
          var self = this;
          self.update();
        }
      })
      
    }
  });
}( jQuery ));
