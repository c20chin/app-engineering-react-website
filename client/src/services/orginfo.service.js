import http from "../http-common";

class OrgInfoDataService {
  getAll() {
    return http.get("/orginfo");
  }

  get(id) {
    return http.get(`/orginfo/user/${id}`, {
      params: {
        userID: id
      }
    });
  }
  
  
 
  create(data) {
    return http.post("/orginfo", data);
  }

  update(id, data) {
    return http.put(`/orginfo/${id}`, data);
  }

 /*  
  delete(id) {
    return http.delete(`/proposals/${id}`);
  }

  deleteAll() {
    return http.delete(`/proposals`);
  }

  findByTitle(title) {
    return http.get(`/proposals?title=${title}`);
  } */
}

export default new OrgInfoDataService();
