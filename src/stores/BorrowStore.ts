import { ref } from "vue";
import { defineStore } from "pinia";
import {
  acceptRequest,
  declineRequest,
  getPendingRequestsForOwner,
  getPendingRequestsForRequester,
  getCanceledRequestsForOwner,
  getCanceledRequestsForRequester,
  getDeclinedRequestsForOwner,
  getDeclinedRequestsForRequester,
} from "@/api/factories/BorrowRequestFactory";
import {
  getIncompleteAgreementsForBorrower,
  getIncompleteAgreementsForOwner,
  getCompletedAgreementsForOwner,
  getCompletedAgreementsForBorrower,
  changeAgreementStatusToCompleted,
  changeAgreementStatusToOngoing,
  changeAgreementStatusToReturned,
} from "@/api/factories/BorrowAgreementFactory";
import { BorrowAgreement, BorrowRequest, RatingStatus } from "@/types/entities";
import { useDebounce } from "@/composables/useDebounce";

export type BorrowStore = Omit<
  ReturnType<typeof useBorrowStore>,
  keyof ReturnType<typeof defineStore>
>;

export const useBorrowStore = defineStore("Borrow", () => {
  const TIMEOUT_LIMIT: number = 300000; // 5 Minutes

  const pendingRequestsForOwner = ref<BorrowRequest[]>([]);
  const pendingRequestsForRequester = ref<BorrowRequest[]>([]);
  const declinedRequestsForOwner = ref<BorrowRequest[]>([]);
  const declinedRequestsForRequester = ref<BorrowRequest[]>([]);
  const canceledRequestsForOwner = ref<BorrowRequest[]>([]);
  const canceledRequestsForRequester = ref<BorrowRequest[]>([]);
  const incompleteAgreementsForOwner = ref<BorrowAgreement[]>([]);
  const incompleteAgreementsForBorrower = ref<BorrowAgreement[]>([]);
  const completedAgreementsForOwner = ref<BorrowAgreement[]>([]);
  const completedAgreementsForBorrower = ref<BorrowAgreement[]>([]);

  const isPendingRequestsOwnerInitialized = ref<boolean>(false);
  const isPendingRequestsRequesterInitialized = ref<boolean>(false);
  const isDeclinedRequestsOwnerInitialized = ref<boolean>(false);
  const isDeclinedRequestsRequesterInitialized = ref<boolean>(false);
  const isCanceledRequestsOwnerInitialized = ref<boolean>(false);
  const isCanceledRequestsRequesterInitialized = ref<boolean>(false);
  const isIncompleteAgreementsOwnerInitialized = ref<boolean>(false);
  const isIncompleteAgreementsBorrowerInitialized = ref<boolean>(false);
  const isCompletedAgreementsOwnerInitialized = ref<boolean>(false);
  const isCompletedAgreementsBorrowerInitialized = ref<boolean>(false);

  //SET REQUEST STATUS

  async function acceptBorrowRequest(requestID: string): Promise<void> {
    await acceptRequest(requestID);
    updateRequestStatusForOwner(requestID, 1);
    debouncedFetchRequests();
  }

  async function declineBorrowRequest(requestID: string): Promise<void> {
    await declineRequest(requestID);
    updateRequestStatusForOwner(requestID, 2);
    debouncedFetchRequests();
  }

  function updateRequestStatusForOwner(
    requestID: string,
    status: number,
  ): void {
    const request = pendingRequestsForOwner.value.find(
      (req) => req.borrowRequestID === requestID,
    );
    if (request) {
      request.status = status;
    }
  }

  function refetchOwnerRequests() {
    setTimeout(async () => {
      await fetchPendingRequestsForOwner();
    }, TIMEOUT_LIMIT);
  }

  const debouncedFetchRequests = useDebounce(
    refetchOwnerRequests,
    TIMEOUT_LIMIT,
  );

  //SET AGREEMENT STATUS

  async function setOngoingAgreement(agreementID: string) {
    await changeAgreementStatusToOngoing(agreementID);
    updateAgreementStatusForOwner(agreementID, 1);
    debouncedFetchAgreements();
  }

  async function setReturnedAgreement(agreementID: string) {
    await changeAgreementStatusToReturned(agreementID);
    updateAgreementStatusForOwner(agreementID, 2);
    debouncedFetchAgreements();
  }

  async function setCompletedAgreement(agreementID: string, rate: RatingStatus) {
    await changeAgreementStatusToCompleted(agreementID, rate);
    updateAgreementStatusForOwner(agreementID, 3);
    debouncedFetchAgreements();
  }

  function updateAgreementStatusForOwner(
    agreementID: string,
    status: number,
  ): void {
    const agreement = incompleteAgreementsForOwner.value.find(
      (agr) => agr.borrowID === agreementID,
    );
    if (agreement) {
      agreement.status = status;
    }
  }

  function refetchOwnerAgreements() {
    setTimeout(async () => {
      await fetchIncompleteAgreementsForOwner();
    }, TIMEOUT_LIMIT);
  }

  const debouncedFetchAgreements = useDebounce(
    refetchOwnerAgreements,
    TIMEOUT_LIMIT,
  );

  //FETCHING AGREEMENTS

  async function fetchIncompleteAgreementsForOwner(): Promise<void> {
    incompleteAgreementsForOwner.value =
      (await getIncompleteAgreementsForOwner()) || [];
    isIncompleteAgreementsOwnerInitialized.value = true;
  }

  async function fetchIncompleteAgreementsForBorrower(): Promise<void> {
    incompleteAgreementsForBorrower.value =
      (await getIncompleteAgreementsForBorrower()) || [];
    isIncompleteAgreementsBorrowerInitialized.value = true;
  }

  async function fetchCompletedAgreementsForOwner(): Promise<void> {
    completedAgreementsForOwner.value =
      (await getCompletedAgreementsForOwner()) || [];
    isCompletedAgreementsOwnerInitialized.value = true;
  }

  async function fetchCompletedAgreementsForBorrower(): Promise<void> {
    completedAgreementsForBorrower.value =
      (await getCompletedAgreementsForBorrower()) || [];
    isCompletedAgreementsBorrowerInitialized.value = true;
  }

  //FETCHING REQUESTS

  async function fetchPendingRequestsForOwner(): Promise<void> {
    pendingRequestsForOwner.value = (await getPendingRequestsForOwner()) || [];
    isPendingRequestsOwnerInitialized.value = true;
  }

  async function fetchPendingRequestsForRequester(): Promise<void> {
    pendingRequestsForRequester.value =
      (await getPendingRequestsForRequester()) || [];
    isPendingRequestsRequesterInitialized.value = true;
  }

  async function fetchCanceledRequestsForOwner(): Promise<void> {
    canceledRequestsForOwner.value =
      (await getCanceledRequestsForOwner()) || [];
    isCanceledRequestsOwnerInitialized.value = true;
  }

  async function fetchCanceledRequestsForRequester(): Promise<void> {
    canceledRequestsForRequester.value =
      (await getCanceledRequestsForRequester()) || [];
    isCanceledRequestsRequesterInitialized.value = true;
  }

  async function fetchDeclinedRequestsForOwner(): Promise<void> {
    declinedRequestsForOwner.value =
      (await getDeclinedRequestsForOwner()) || [];
    isDeclinedRequestsOwnerInitialized.value = true;
  }

  async function fetchDeclinedRequestsForRequester(): Promise<void> {
    declinedRequestsForRequester.value =
      (await getDeclinedRequestsForRequester()) || [];
    isDeclinedRequestsRequesterInitialized.value = true;
  }

  //UPDATING AGREEMENTS

  async function updateIncompleteAgreementsForOwner(): Promise<void> {
    if (!isIncompleteAgreementsOwnerInitialized.value)
      await fetchIncompleteAgreementsForOwner();
  }

  async function updateIncompleteAgreementsForBorrower(): Promise<void> {
    if (!isIncompleteAgreementsBorrowerInitialized.value)
      await fetchIncompleteAgreementsForBorrower();
  }

  async function updateCompletedAgreementsForOwner(): Promise<void> {
    if (!isCompletedAgreementsOwnerInitialized.value)
      await fetchCompletedAgreementsForOwner();
  }

  async function updateCompletedAgreementsForBorrower(): Promise<void> {
    if (!isCompletedAgreementsBorrowerInitialized.value)
      await fetchCompletedAgreementsForBorrower();
  }

  //UPDATING REQUESTS

  async function updatePendingRequestsForOwner(): Promise<void> {
    if (!isPendingRequestsOwnerInitialized.value)
      await fetchPendingRequestsForOwner();
  }

  async function updatePendingRequestsForRequester(): Promise<void> {
    if (!isPendingRequestsRequesterInitialized.value)
      await fetchPendingRequestsForRequester();
  }

  async function updateCanceledRequestsForOwner(): Promise<void> {
    if (!isCanceledRequestsOwnerInitialized.value)
      await fetchCanceledRequestsForOwner();
  }

  async function updateCanceledRequestsForRequester(): Promise<void> {
    if (!isCanceledRequestsRequesterInitialized.value)
      await fetchCanceledRequestsForRequester();
  }

  async function updateDeclinedRequestsForOwner(): Promise<void> {
    if (!isDeclinedRequestsOwnerInitialized.value)
      await fetchDeclinedRequestsForOwner();
  }

  async function updateDeclinedRequestsForRequester(): Promise<void> {
    if (!isDeclinedRequestsRequesterInitialized.value)
      await fetchDeclinedRequestsForRequester();
  }

  //RESET

  function reset() {
    pendingRequestsForOwner.value = [];
    pendingRequestsForRequester.value = [];
    declinedRequestsForOwner.value = [];
    declinedRequestsForRequester.value = [];
    canceledRequestsForOwner.value = [];
    canceledRequestsForRequester.value = [];
    incompleteAgreementsForOwner.value = [];
    incompleteAgreementsForBorrower.value = [];
    completedAgreementsForOwner.value = [];
    completedAgreementsForBorrower.value = [];

    isPendingRequestsOwnerInitialized.value = false;
    isPendingRequestsRequesterInitialized.value = false;
    isDeclinedRequestsOwnerInitialized.value = false;
    isDeclinedRequestsRequesterInitialized.value = false;
    isCanceledRequestsOwnerInitialized.value = false;
    isCanceledRequestsRequesterInitialized.value = false;
    isIncompleteAgreementsOwnerInitialized.value = false;
    isIncompleteAgreementsBorrowerInitialized.value = false;
    isCompletedAgreementsOwnerInitialized.value = false;
    isCompletedAgreementsBorrowerInitialized.value = false;
  }

  //RETURN

  return {
    pendingRequestsForOwner,
    pendingRequestsForRequester,
    declinedRequestsForOwner,
    declinedRequestsForRequester,
    canceledRequestsForOwner,
    canceledRequestsForRequester,
    incompleteAgreementsForOwner,
    incompleteAgreementsForBorrower,
    completedAgreementsForOwner,
    completedAgreementsForBorrower,

    reset,
    acceptBorrowRequest,
    declineBorrowRequest,
    updateRequestStatusForOwner,
    setOngoingAgreement,
    setReturnedAgreement,
    setCompletedAgreement,

    fetchPendingRequestsForOwner,
    updatePendingRequestsForOwner,
    fetchPendingRequestsForRequester,
    updatePendingRequestsForRequester,

    fetchDeclinedRequestsForOwner,
    updateDeclinedRequestsForOwner,
    fetchDeclinedRequestsForRequester,
    updateDeclinedRequestsForRequester,

    fetchCanceledRequestsForOwner,
    updateCanceledRequestsForOwner,
    fetchCanceledRequestsForRequester,
    updateCanceledRequestsForRequester,

    fetchIncompleteAgreementsForOwner,
    updateIncompleteAgreementsForOwner,
    fetchIncompleteAgreementsForBorrower,
    updateIncompleteAgreementsForBorrower,

    fetchCompletedAgreementsForOwner,
    updateCompletedAgreementsForOwner,
    fetchCompletedAgreementsForBorrower,
    updateCompletedAgreementsForBorrower,
  };
});
