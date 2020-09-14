Vue.filter('currency', function (value) {
    return '$' + value.toFixed(2);
});

Vue.component("nav-bar", {
    template:
    `
        <div>
            <nav v-on:click.prevent>
                <a href="#" class="home" v-on:click="makeActive('home')">Home</a>
                <a href="#" class="projects" v-on:click="makeActive('projects')">Projects</a>
                <a href="#" class="services" v-on:click="makeActive('services')">Services</a>
                <a href="#" class="contact" v-on:click="makeActive('contact')">Contact</a>
            </nav>
            <p>You chose <b>{{active}}</b></p>
            <services v-if="active == 'services'">
            </services>
        </div>
    `,
    data: function() {
        return {
            active: "home"
        }
    },

    methods: {
        makeActive: function(item){
            this.active = item;
        }
    }
});

Vue.component("services", {
    template:
    `   
    <div>
        <h1>Services</h1>
        <ul>
            <li v-for="service in services" v-on:click="toggleActive(service)">
                {{service.name}} <span>{{service.price | currency}}</span>
            </li>
        </ul>
        <div class="total">
            Total: <span>{{total() | currency}}</span>
        </div>
    </div>
    `,
    data: function() {
        return {
            services: [
                {
                    name: 'Web Development',
                    price: 300,
                    active:true
                },{
                    name: 'Design',
                    price: 400,
                    active:false
                },{
                    name: 'Integration',
                    price: 250,
                    active:false
                },{
                    name: 'Training',
                    price: 220,
                    active:false
                }
            ]
        }
    },
    methods: {
        toggleActive: function(s){
            s.active = !s.active;
        },
        total: function(){

            var total = 0;

            this.services.forEach(function(s){
                if (s.active){
                    total+= s.price;
                }
            });

           return total;
        }
    }
});

var vm = new Vue({
    el: '#main',
});