
    <template>
      <v-container>
      <v-row>
        <template>
            <div id="container">
              <v-row align="center" justify="center">
                <div id="mapContainer"></div>
              </v-row>
            </div>
          </template>
      </v-row>



        <h1 class="text-center"> Nos meilleurs produits encore en stock</h1>
            <v-row>
              <v-col cols="12" sm="6" md="4" v-for="product in products[0]" :key="product.id">
                <v-card>
                  <v-img
                      height="140"
                      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                  ></v-img>

                  <v-card-text>

                      $ •  {{product.price}} €
                      {{product.description}}

                    <CartButton :cartIcon="true" @click.native="addProductToCart(product)"/>
                  </v-card-text>


                </v-card>
              </v-col>
            </v-row>
            </v-container>
    </template>


    <style >
    #mapContainer {
      width: 60vw;
      height: 60vh;
      z-index: 3;
    }
    </style>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import CartButton from "./components/CartButton";
import {mapActions} from "vuex";

export default {
  components: {
    CartButton
  },
  computed:{
    products() {
      return this.$store.state.products
    }
  },

  methods: {
    ...mapActions([
      'addProduct',
      'currentProduct',
    ]),
    addProductToCart(product) {
      this.addProduct(product);
    },
    addCurrentProduct(product) {
      this.currentProduct(product);
    },
    setupLeafletMap: function () {
      const myIcon = L.icon({
        iconUrl: '../marker-icon.png',

        iconSize:     [30, 40], // size of the icon
        shadowSize:   [40, 40], // size of the shadow
        iconAnchor:   [0, 40], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] //
      });

      const mymap = L.map('mapContainer').setView([-21.107883,55.504303], 10);

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 10,
        minZoom: 10,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
      }).addTo(mymap);

      L.marker([-20.897185, 55.551510], {icon : myIcon}).addTo(mymap);

    },

  },
  mounted() {
    this.$store.dispatch("getProduct");
    this.setupLeafletMap();

  },
}
</script>