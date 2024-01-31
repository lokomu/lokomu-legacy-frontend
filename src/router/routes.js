import NotFound from "@/views/BaseViews/NotFound";
import { useUserStore } from "@/stores/UserStore";
import { pinia } from "@/main.ts";
import { useCommunityStore } from "@/stores/CommunityStore";

function authGuard(to, from, next) {
  const userStore = useUserStore(pinia);
  userStore.isLoggedIn ? next() : next("/");
}

function adminGuard(to, from, next) {
  const userStore = useUserStore(pinia);
  const communityStore = useCommunityStore(pinia);
  userStore.adminList.includes(communityStore.community.ID)
    ? next()
    : next("/");
}

function communityGuard(to, from, next) {
  const communityStore = useCommunityStore(pinia);
  communityStore.community.ID ? next() : next("/");
}

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { title: "Del - a green community" },
    component: () => import("@/views/BaseViews/HomeView.vue"),
  },
  {
    path: "/about",
    name: "About",
    meta: { title: "About • Del" },
    component: () => import("@/views/HelpViews/AboutView.vue"),
  },
  {
    path: "/help",
    name: "Help",
    meta: { title: "Help • Del" },
    component: () => import("@/views/HelpViews/HelpView.vue"),
  },
  {
    path: "/terms",
    name: "Terms",
    meta: { title: "Terms of Use • Del" },
    component: () => import("@/views/HelpViews/TermsView.vue"),
  },
  {
    path: "/privacy",
    name: "Privacy Policy",
    meta: { title: "Privacy Policy • Del" },
    component: () => import("@/views/HelpViews/PrivacyView.vue"),
  },
  {
    path: "/b/agreements",
    name: "Borrow Agreements",
    meta: { title: "Borrow Agreements • Del" },
    component: () => import("@/views/BorrowViews/IncompleteAgreementsView.vue"),
  },
  {
    path: "/b/borrowed",
    name: "Borrowed Items",
    meta: { title: "Borrowed Items • Del" },
    component: () =>
      import("@/views/BorrowViews/BorrowedBorrowAgreementsView.vue"),
  },
  {
    path: "/b/completed",
    name: "Completed Agreements",
    meta: { title: "Completed Agreements • Del" },
    component: () => import("@/views/BorrowViews/CompletedAgreementsView.vue"),
  },
  {
    path: "/b/loans",
    name: "Loaned Out Items",
    meta: { title: "Loaned Out Items • Del" },
    component: () => import("@/views/BorrowViews/LoanedOutAgreementsView.vue"),
  },
  {
    path: "/b/requests",
    name: "Borrow Requests",
    meta: { title: "Borrow Requests • Del" },
    component: () => import("@/views/BorrowViews/PendingRequestsView.vue"),
  },
  {
    path: "/b/requests/canceled",
    name: "Canceled Requests",
    meta: { title: "Canceled Requests • Del" },
    component: () => import("@/views/BorrowViews/CanceledRequestsView.vue"),
  },
  {
    path: "/b/requests/declined",
    name: "Declined Requests",
    meta: { title: "Declined Requests • Del" },
    component: () => import("@/views/BorrowViews/DeclinedRequestsView.vue"),
  },
  {
    path: "/c",
    name: "Community",
    meta: { title: "Community • Del" },
    component: () => import("@/views/CommunityViews/CHomeView.vue"),
    beforeEnter: [authGuard, communityGuard],
  },
  {
    path: "/c/admin",
    name: "Community Admin Page",
    meta: { title: "Admin • Del" },
    component: () => import("@/views/CommunityViews/CAdminView.vue"),
    beforeEnter: [authGuard, communityGuard, adminGuard],
  },
  {
    path: "/c/members",
    name: "Community Members",
    meta: { title: "Community Members • Del" },
    component: () => import("@/views/CommunityViews/CMemberlistView.vue"),
    beforeEnter: [authGuard, communityGuard],
  },
  {
    path: "/c/items",
    name: "Available Items",
    meta: { title: "Available Items • Del" },
    component: () => import("@/views/CommunityViews/CItemsView.vue"),
    beforeEnter: authGuard,
  },
  {
    path: "/c/find",
    name: "Find Communities",
    meta: { title: "Find communities • Del" },
    component: () => import("@/views/CommunityViews/CPublicView"),
    beforeEnter: authGuard,
  },
  {
    path: "/invite/:inviteID",
    name: "Invite",
    meta: { title: "Invite • Del" },
    component: () => import("@/views/BaseViews/InviteView.vue"),
  },
  {
    path: "/messages",
    name: "Messages",
    meta: { title: "Messages • Del" },
    component: () => import("@/views/BaseViews/ChatView.vue"),
    beforeEnter: authGuard,
  },
  {
    path: "/u/communities",
    name: "My Communities",
    meta: { title: "My communities • Del" },
    component: () => import("@/views/CommunityViews/MyCommunitiesView"),
    beforeEnter: authGuard,
  },
  {
    path: "/u/profile",
    name: "My Profile",
    meta: { title: "My Profile • Del" },
    component: () => import("@/views/UserProfileViews/ProfileView.vue"),
    beforeEnter: authGuard,
  },
  {
    path: "/u/items",
    name: "My Items",
    meta: { title: "My items • Del" },
    component: () => import("@/views/UserProfileViews/UserItemsView.vue"),
    beforeEnter: authGuard,
  },
  {
    path: "/test",
    name: "Test",
    meta: { title: "Test • Del" },
    component: () => import("@/views/BaseViews/TestView.vue"),
    beforeEnter: authGuard,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    meta: { title: "404 • Del" },
    component: NotFound,
  },
];

export default routes;
