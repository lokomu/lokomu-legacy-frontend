import { getRepository } from "@/api/Repositories";
import {
  BorrowAgreement,
  RatingStatus,
  TimeframeDates,
} from "@/types/entities";

const getBorrowAgreementRepository = getRepository("borrowAgreement");

export async function getBorrowAgreementTimesForItem(
  itemID: string,
): Promise<TimeframeDates[]> {
  return await getBorrowAgreementRepository().getBorrowAgreementTimesForItem(
    itemID,
  );
}

export async function changeAgreementStatusToOngoing(
  agreementID: string,
): Promise<void> {
  return await getBorrowAgreementRepository().changeAgreementStatusToOngoing(
    agreementID,
  );
}

export async function changeAgreementStatusToReturned(
  agreementID: string,
): Promise<void> {
  return await getBorrowAgreementRepository().changeAgreementStatusToReturned(
    agreementID,
  );
}

export async function changeAgreementStatusToCompleted(
  agreementID: string,
  ratingStatus: RatingStatus,
): Promise<void> {
  return await getBorrowAgreementRepository().changeAgreementStatusToCompleted(
    agreementID,
    ratingStatus,
  );
}

export async function getIncompleteAgreementsForOwner(): Promise<
  BorrowAgreement[]
> {
  return await getBorrowAgreementRepository().getIncompleteAgreementsForOwner();
}

export async function getIncompleteAgreementsForBorrower(): Promise<
  BorrowAgreement[]
> {
  return await getBorrowAgreementRepository().getIncompleteAgreementsForBorrower();
}

export async function getCompletedAgreementsForOwner(): Promise<
  BorrowAgreement[]
> {
  return await getBorrowAgreementRepository().getCompletedAgreementsForOwner();
}

export async function getCompletedAgreementsForBorrower(): Promise<
  BorrowAgreement[]
> {
  return await getBorrowAgreementRepository().getCompletedAgreementsForBorrower();
}
