import BaseRepository from "@/api/BaseRepository";
import { BorrowRequest, BorrowRequestCreation } from "@/types/entities";

class BorrowRequestRepository extends BaseRepository {
  async createBorrowRequest(
    requestCreationDTO: BorrowRequestCreation,
  ): Promise<void> {
    return await this.post("borrow/request/", requestCreationDTO);
  }

  async getPendingRequestsForOwner(): Promise<BorrowRequest[]> {
    return await this.get(`borrow/request/pending/owner`);
  }

  async getPendingRequestsForRequester(): Promise<BorrowRequest[]> {
    return await this.get(`borrow/request/pending/requester`);
  }

  async getCanceledRequestsForOwner(): Promise<BorrowRequest[]> {
    return await this.get(`borrow/request/canceled/owner`);
  }

  async getCanceledRequestsForRequester(): Promise<BorrowRequest[]> {
    return await this.get(`borrow/request/canceled/requester`);
  }

  async getDeclinedRequestsForOwner(): Promise<BorrowRequest[]> {
    return await this.get(`borrow/request/declined/owner`);
  }

  async getDeclinedRequestsForRequester(): Promise<BorrowRequest[]> {
    return await this.get(`borrow/request/declined/requester`);
  }

  async acceptRequest(requestID: string): Promise<void> {
    return await this.post(`borrow/request/${requestID}/accept`);
  }

  async declineRequest(requestID: string): Promise<void> {
    return await this.put(`borrow/request/${requestID}/decline`);
  }
}

export default BorrowRequestRepository;
