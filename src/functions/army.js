import useArmyListStore from '@/store/armyList';
import { useRoute } from "vue-router";

export function useArmy() {
  const route = useRoute();
  const store = useArmyListStore();
  return store.armyList[route.params.id];
}

export function useUnit() {
  const route = useRoute();
  const army = useArmy();
  return army.units[route.params.unitId];
}