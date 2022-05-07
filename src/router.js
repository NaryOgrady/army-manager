// eslint-disable-next-line no-undef
const VueRouter = require('vue-router');

import ArmyList from './components/pages/army-list.vue';
import Welcome from './components/pages/welcome.vue';
import ViewArmy from './components/pages/view-army.vue';
import ViewUnit from './components/pages/view-unit.vue';

const routes = [
  {
    path: '/', component: Welcome, name: 'Home', beforeEnter: checkArmyData,
  },
  {
    path: '/army-list', component: ArmyList, name: 'Armies', beforeEnter: checkArmyData,
  },
  {
    path: '/army-list/:id', component: ViewArmy, name: 'ViewArmy', beforeEnter: checkArmyData,
  },
  {
    path: '/army-list/:id/unit/:unitId', component: ViewUnit, name: 'ViewUnit', beforeEnter: checkArmyData,
  },
];

export default VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

function checkArmyData(to) {
  const armyData = localStorage.getItem('army-list');
  if (to.name === 'Home' && armyData) {
    return { name: 'Armies'};
  }
  if (to.name === 'Armies' && !armyData) {
    return { name: 'Home' };
  }
  return;
}

