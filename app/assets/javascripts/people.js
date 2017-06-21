document.addEventListener("DOMContentLoaded", function(event) {
  var app = new Vue({
    el: '#app',
    data: {
      people: [{
              name: "Karol",
              bio: "Awesome Bio Bro",
              bioVisible: false
              },
              {
                name: "Mike",
                bio: "Awesome Bio Bro pt.2",
                bioVisible: false
              }],
      newPersonName: '',
      newPersonBio: '', 
      errors: []
    },
    mounted: function () {
      $.get('/api/v1/people.json', function(peopleResponse){
        this.people = peopleResponse;
      }.bind(this));
    },
    methods: {
      addPerson: function() {
        this.errors = [];
        var params = {
                        name: this.newPersonName,
                        bio: this.newPersonBio
                        };  
        $.post('/api/v1/people.json', params,function(newPerson){
          this.people.push(newPerson);  
          this.newPersonName = "";
          this.newPersonBio = "";
        }.bind(this)).fail(function(response) {
          this.errors = (response.responseJSON.errors);
        }.bind(this));
      },
      toggleBio: function(person) {
        person.bioVisible = !person.bioVisible;
      },
      deletePerson: function(person) {
        var index = this.people.indexOf(person);
        this.people.splice(index, 1);
      }
    }
  });
});