import auth from "./Auth";

// list data transaksi
export const getOffice = () => auth.get("/offices");

//  save data transaksi
export const storeOffice = (data) => auth.post("/offices", data);
//  delette data transaksi
export const deleteOffice = (id) => auth.delete(`/offices/${id}`);

//  update data transaksi
export const updateOffice = (id, data) => {
    return auth.put(`/offices/${id}`, data);
}