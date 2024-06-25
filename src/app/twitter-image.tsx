import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const alt = 'farp'
export const size = {
  width: 128,
  height: 128,
}
 
export const contentType = 'image/png'
 
// Image generation
export default async function Image() {
 
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 100,
          background: 'red',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          color: 'black',
          borderRadius: '100%',
        }}
      >
        <span
          style={{
            position:'absolute'
          }} 
        >{'🧢'}</span>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      emoji: 'twemoji'
    //   fonts: [
    //     {
    //       name: 'Inter',
    //       data: await interSemiBold,
    //       style: 'normal',
    //       weight: 400,
    //     },
    //   ],
    }
  )
}