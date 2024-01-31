import BaseRepository from "@/api/BaseRepository";
import {
  BorrowAgreement,
  RatingStatus,
  TimeframeDates,
} from "@/types/entities";

class BorrowAgreementRepository extends BaseRepository {
  async getBorrowAgreementTimesForItem(
    itemID: string,
  ): Promise<TimeframeDates[]> {
    return await this.get(`borrow/agreement/times/item/${itemID}`);
  }

  async changeAgreementStatusToOngoing(agreementID: string): Promise<void> {
    return await this.put(`borrow/agreement/${agreementID}/status/ongoing`);
  }

  async changeAgreementStatusToReturned(agreementID: string): Promise<void> {
    return await this.put(`borrow/agreement/${agreementID}/status/returned`);
  }

  async changeAgreementStatusToCompleted(
    agreementID: string,
    ratingStatus: RatingStatus,
  ): Promise<void> {
    return await this.put(
      `borrow/agreement/${agreementID}/status/completed`,
      {ratingStatus},
    );
  }

  async getIncompleteAgreementsForOwner(): Promise<BorrowAgreement[]> {
    return await this.get(`borrow/agreement/incomplete/owner`);
  }

  async getIncompleteAgreementsForBorrower(): Promise<BorrowAgreement[]> {
    return await this.get(`borrow/agreement/incomplete/borrower`);
  }

  async getCompletedAgreementsForOwner(): Promise<BorrowAgreement[]> {
    return await this.get(`borrow/agreement/completed/owner`);
  }

  async getCompletedAgreementsForBorrower(): Promise<BorrowAgreement[]> {
    return await this.get(`borrow/agreement/completed/borrower`);
  }
}

export default BorrowAgreementRepository;
