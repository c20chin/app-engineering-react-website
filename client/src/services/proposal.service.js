import http from "../http-common";

class ProposalDataService {
  getAll() {
    return http.get("/proposals");
  }

  // get(id) {
  //   return http.get(`/proposals/${id}`);
  // }
 
  create(data) {
    return http.post("/proposals", data);
  }

  send() {
    return http.post("/sendMail");
  }


  
  update(id, data) {
    return http.put(`/proposals/${id}`, data);
  }



  delete(id) {
    return http.delete(`/proposals/${id}`);
  }

  /* deleteAll() {
    return http.delete(`/proposals`);
  }

  findByTitle(title) {
    return http.get(`/proposals?title=${title}`);
  } */
}

export default new ProposalDataService();
