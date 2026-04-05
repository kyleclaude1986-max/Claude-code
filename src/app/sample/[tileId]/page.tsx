import { getTileById, getClientByPhone } from "@/lib/airtable";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SampleRequestForm from "@/components/SampleRequestForm";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ tileId: string }>;
  searchParams: Promise<{ phone?: string }>;
}

export default async function SamplePage({ params, searchParams }: PageProps) {
  const { tileId } = await params;
  const { phone } = await searchParams;

  const tile = await getTileById(tileId);
  if (!tile) notFound();

  const imageUrl = tile.fields.Image?.[0]?.url;
  let clientName = "";
  let clientAddress = "";

  if (phone) {
    const client = await getClientByPhone(phone);
    if (client) {
      clientName = `${client.fields["First Name"]} ${client.fields["Last Name"]}`;
      clientAddress = client.fields.Address || "";
    }
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-24 px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Tile Preview */}
            <div className="md:sticky md:top-20">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt={tile.fields["Tile Name"]}
                  className="w-full aspect-square object-cover rounded-2xl mb-6"
                />
              ) : (
                <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 mb-6" />
              )}
              <h2 className="text-2xl font-bold tracking-tight mb-2">
                {tile.fields["Tile Name"]}
              </h2>
              <p className="text-[15px] text-gray-600 leading-relaxed">
                {tile.fields.Description}
              </p>
            </div>

            {/* Sample Request Form */}
            <div>
              <h2 className="text-[28px] font-bold tracking-tight mb-2">
                Request Your Free Sample
              </h2>
              <p className="text-[15px] text-gray-600 mb-8">
                Confirm your shipping details and we&apos;ll send this tile
                sample to your door — completely free.
              </p>
              <SampleRequestForm
                tileId={tileId}
                phone={phone}
                clientName={clientName}
                clientAddress={clientAddress}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
