import React from "react";
import Review from '../user/components/Review'

export default function ReviewPage() {
    return (
        <main className="mx-auto px-40">
            <Review
                username="Kevin JK"
                shop="BigBallBrand"
                desc="Good quality, definitely buy again!"
                audio="Industry Baby"

                shared={100}
                comments={123}
                like={5232}
                bm={13}
            />
          
        </main>
    )
}