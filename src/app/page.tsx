import DisplayCards from "@/components/cardComponents/displayCards";
import Hero from "@/components/heroComponent/hero";
import HeroContents from "@/components/heroComponent/heroContents";
import SomeHotelsRated from "@/components/someHotelsRated";


export default function Home() {
  return (
    <div className="">
       <Hero>
        <HeroContents/>
        </Hero> 
        <DisplayCards/>
        <SomeHotelsRated/>
    </div>
  );
}
