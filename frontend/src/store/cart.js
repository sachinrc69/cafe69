import { createSlice, configureStore } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add(state, actions) {
      const items = JSON.parse(JSON.stringify(state));
      console.log(actions.payload);

      if (items.length === 0) items.push(actions.payload);
      else {
        const existingElementIndex = items.findIndex((e) => {
          return e.id === actions.payload.id;
        });
        if (existingElementIndex === -1) {
          items.push(actions.payload);
        } else {
          if (items[existingElementIndex].size === actions.payload.size) {
            items[existingElementIndex].quantity =
              Number(items[existingElementIndex].quantity) +
              Number(actions.payload.quantity);
          } else {
            items.push(actions.payload);
          }
        }
      }

      return items;
    },
    remove(state, actions) {
      const items = JSON.parse(JSON.stringify(state));

      const existingElementIndex = items.findIndex((e) => {
        return e.id === actions.payload;
      });
      state.splice(existingElementIndex, 1);
    },
    update() {},
    incQuantity(state, actions) {
      const items = JSON.parse(JSON.stringify(state));
      console.log(items);
      const itemsWithSameId = items.filter((item) => {
        return item.id === actions.payload.id;
      });

      if (itemsWithSameId.length === 1) {
        const existingElementIndex = items.indexOf(itemsWithSameId[0]);

        const actualPrice =
          Number(items[existingElementIndex].price) /
          Number(items[existingElementIndex].quantity);
        items[existingElementIndex].quantity =
          Number(items[existingElementIndex].quantity) + 1;
        items[existingElementIndex].price =
          Number(items[existingElementIndex].quantity) * actualPrice;
      } else if (itemsWithSameId.length > 1) {
        const requiredItem = itemsWithSameId.filter((item) => {
          return item.size === actions.payload.size;
        });
        const existingElementIndex = items.indexOf(requiredItem[0]);
        const actualPrice =
          Number(items[existingElementIndex].price) /
          Number(items[existingElementIndex].quantity);
        items[existingElementIndex].quantity =
          Number(items[existingElementIndex].quantity) + 1;
        items[existingElementIndex].price =
          Number(items[existingElementIndex].quantity) * actualPrice;
      }

      return items;
    },
    decQuantity(state, actions) {
      const items = JSON.parse(JSON.stringify(state));
      console.log(items);
      const itemsWithSameId = items.filter((item) => {
        return item.id === actions.payload.id;
      });

      if (itemsWithSameId.length === 1) {
        const existingElementIndex = items.indexOf(itemsWithSameId[0]);
        if (Number(items[existingElementIndex].quantity) > 1) {
          const actualPrice =
            Number(items[existingElementIndex].price) /
            Number(items[existingElementIndex].quantity);
          items[existingElementIndex].quantity =
            Number(items[existingElementIndex].quantity) - 1;
          items[existingElementIndex].price =
            Number(items[existingElementIndex].quantity) * actualPrice;
        }
      } else if (itemsWithSameId.length > 1) {
        const requiredItem = itemsWithSameId.filter((item) => {
          return item.size === actions.payload.size;
        });
        const existingElementIndex = items.indexOf(requiredItem[0]);
        if (Number(items[existingElementIndex].quantity) > 1) {
          const actualPrice =
            Number(items[existingElementIndex].price) /
            Number(items[existingElementIndex].quantity);
          items[existingElementIndex].quantity =
            Number(items[existingElementIndex].quantity) - 1;
          items[existingElementIndex].price =
            Number(items[existingElementIndex].quantity) * actualPrice;
        }
      }

      return items;
    },
    removeALL(state) {
      const items = JSON.parse(JSON.stringify(state));
      items.splice(0, items.length);
      return items;
    },
  },
});

const store = configureStore({
  reducer: { cart: cartSlice.reducer },
});

export const cartActions = cartSlice.actions;
export default store;
