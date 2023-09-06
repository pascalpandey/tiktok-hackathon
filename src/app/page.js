
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

