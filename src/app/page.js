
import "@uploadthing/react/styles.css";
import PageFeed from './components/PageFeed'

export default async function Home() {
  return (
    <main className="w-full">
      <PageFeed username="bestUser" 
                name="best test name" 
                desc="lorem  lorem lorem loremlorem lorem loremlorem lorem loremlorem lorem loremlorem lorem"
                audio="original sound - best name"
                shared={100}
                comments={123}
                like={5232}
                bm={13}/>
      <PageFeed username="bestUser" 
                name="best test name" 
                desc="lorem lorem loremlorem lorem loremlorem loreem lorem loremlorem lorem loremlorem lorem lorem"
                audio="original sound - best name"
                shared={100}
                comments={123}
                like={5232}
                bm={13}/>
      <PageFeed username="bestUser" 
                name="best test name" 
                desc="lorem lorem lorem loremlorem lorem loremlorem lorem lorem"
                audio="original sound - best name"
                shared={100}
                comments={123}
                like={5232}
                bm={13}/>
    </main>
  );
}
