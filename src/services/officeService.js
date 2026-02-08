import auth from "./Auth";

//  save data transaksi
export const storeOffice = (data) => auth.post("/offices", data);
//  delette data transaksi
export const deleteOffice = (id) => auth.delete(`/offices/${id}`);

//  update data transaksi
export const updateOffice = (id, data) => {
    return auth.put(`/offices/${id}`, data);
}

// list data transaksi
export const getOffice = (page = 1, perPage = 20, search = "") => {
    return auth.get("/office", {
        params: {
            page,
            per_page: perPage,
            search
        }
    });
};
// } auth.get("/offices");
