import Image from 'next/image'
import React from 'react'

const FeedbackFooter = () => {
    return (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-gray-500 text-sm">
            <span>Powered by</span>
            <div className="flex items-center gap-2">
                <div>
                    <Image
                        src={'/logo.png'}
                        width={70}
                        height={70}
                        alt={'Auric'}
                    />
                </div>
            </div>
        </div>
    )
}

export default FeedbackFooter