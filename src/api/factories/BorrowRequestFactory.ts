import { getRepository } from "@/api/Repositories";
import { BorrowRequest, BorrowRequestCreation } from "@/types/entities";

const getBorrowRequestRepository = getRepository("borrowRequest");

export async function createBorrowRequest(
  requestCreationDTO: BorrowRequestCreation,
): Promise<void> {
  return await getBorrowRequestRepository().createBorrowRequest(
    requestCreationDTO,
  );
}

export async function getPendingRequestsForOwner(): Promise<BorrowRequest[]> {
  return await getBorrowRequestRepository().getPendingRequestsForOwner();
}

export async function getPendingRequestsForRequester(): Promise<
  BorrowRequest[]
> {
  return await getBorrowRequestRepository().getPendingRequestsForRequester();
}

export async function getCanceledRequestsForOwner(): Promise<BorrowRequest[]> {
  return await getBorrowRequestRepository().getCanceledRequestsForOwner();
}

export async function getCanceledRequestsForRequester(): Promise<
  BorrowRequest[]
> {
  return await getBorrowRequestRepository().getCanceledRequestsForRequester();
}

export async function getDeclinedRequestsForOwner(): Promise<BorrowRequest[]> {
  return await getBorrowRequestRepository().getDeclinedRequestsForOwner();
}

export async function getDeclinedRequestsForRequester(): Promise<
  BorrowRequest[]
> {
  return await getBorrowRequestRepository().getDeclinedRequestsForRequester();
}

export async function acceptRequest(requestID: string): Promise<void> {
  return await getBorrowRequestRepository().acceptRequest(requestID);
}

export async function declineRequest(requestID: string): Promise<void> {
  return await getBorrowRequestRepository().declineRequest(requestID);
}
