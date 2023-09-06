
import "@uploadthing/react/styles.css";
import PageFeed from './components/PageFeed'
import Shop from './components/Shop'

export default async function Home() {
  return (
    <div className='w-full'>
       <Shop />
    </div>
  );
}

// <main className="mx-auto">
//    <PageFeed username="bestUser" 
//              name="best test name" 
//              desc="lorem lorem lorem lorem dolores sit es celupin kontol lolollol #iseptititd #plsplspls"
//              audio="original sound - best name"
//              shared={100}
//              comments={123}
//              like={5232}
//              bm={13}/>
//   <PageFeed username="bestUser" 
//             name="best test name" 
//             desc="lorem lorem lorem lorem dolores sit es celupin kontol lolollol #iseptititd #plsplspls"
//             audio="original sound - best name"
//             shared={100}
//             comments={123}
//             like={5232}
//             bm={13}/>
//   <PageFeed username="bestUser" 
//             name="best test name" 
//             desc="lorem lorem lorem lorem dolores sit es celupin kontol lolollol #iseptititd #plsplspls"
//             audio="original sound - best name"
//             shared={100}
//             comments={123}
//             like={5232}
//             bm={13}/>
//</main>