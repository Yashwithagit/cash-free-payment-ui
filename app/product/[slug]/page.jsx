import Images from "@/components/Images";
import Description from "@/components/Description";

export default function Page({params}) {
    return (
      <section className="flex items-center gap-16 px-36 py-20 max-lg:flex-col max-sm:py-0 max-sm:px-0 mb-10">
      <Images/>
      <Description id={params.slug}/>
    </section>
    )
  }