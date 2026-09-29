export default function VideoPlayer({ movie, onProgress }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
      <video
        key={movie.id}
        controls
        className="aspect-video w-full bg-black"
        preload="metadata"
        onTimeUpdate={(event) => {
          const video = event.currentTarget
          const ratio = (video.currentTime / video.duration) * 100
          onProgress?.(Math.min(Math.max(ratio, 0), 100), video.duration)
        }}
      >
        <source src={movie.trailer} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
