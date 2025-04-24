import { getResources } from "@/services/strapi.service"
import HomeContent from "@/components/HomeContent"

export default async function HomePage() {
  const resources = await getResources()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Learning Resources</h1>
      <HomeContent initialResources={resources.data} />
    </div>
  )
}
