import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserAddressCard from "../components/UserProfile/UserAddressCard";
import PageMeta from "../components/common/PageMeta";

export default function UserProfiles() {
  let current_user = JSON.parse(localStorage.getItem("current_user"));
  let role = localStorage.getItem("role");

  return (
    <div className="p-4">
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Profile" to="/" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard fullname={current_user.users.name} city_state={current_user.address}/>
          <UserInfoCard
            first_name={current_user.first_name}
            last_name={current_user.last_name}
            email={current_user.users.email}
            phone={current_user.phone}
            bio={null}
          />
          <UserAddressCard
            country={null}
            city_state={current_user.address}
            postal_code={null}
          />
        </div>
      </div>
    </div>
  );
}
