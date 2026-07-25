import CustomerDetail from "@/components/customer/customer-detail";

interface EditCustomerPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCustomerPage({
  params,
}: EditCustomerPageProps) {
  const { id } = await params;



  return (
    <>


      <main className="mx-auto flex flex-col items-center w-full max-w-full mt-50">
        <CustomerDetail id={parseInt(id)} />

      </main>
    </>
  );
}