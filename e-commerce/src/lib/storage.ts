import localforage from "localforage"

localforage.config({
  name: "e-commerce",
  storeName: "app_store",
})

export const storage = localforage