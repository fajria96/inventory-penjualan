import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router";
import CustomerList from "./components/customers/CustList.vue";
import AddCustomer from "./components/customers/AddCust.vue";
import EditCustomer from "./components/customers/EditCust.vue";
import ItemList from "./components/items/ItemList.vue";
import AddItem from "./components/items/AddItem.vue";
import EditItem from "./components/items/EditItem.vue";
import AddSales from "./components/sales/AddSales.vue";
import SalesList from "./components/sales/SalesList.vue";

const routes = [
  {
    path: "/customers",
    name: "CustomerList",
    component: CustomerList,
  },
  {
    path: "/customers/add",
    name: "AddCustomer",
    component: AddCustomer,
  },
  {
    path: "/customers/:id",
    name: "EditCustomer",
    component: EditCustomer,
  },
  {
    path: "/items",
    name: "ItemList",
    component: ItemList,
  },
  {
    path: "/items/add",
    name: "AddItem",
    component: AddItem,
  },
  {
    path: "/items/:id",
    name: "EditItem",
    component: EditItem,
  },
  {
    path: "/sales/add",
    name: "AddSales",
    component: AddSales,
  },
  {
    path: "/sales",
    name: "SalesList",
    component: SalesList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
createApp(App).use(router).mount("#app");
