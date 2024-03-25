"use client"

interface IQualityProps {
  quality: string
  setQuality: (quality: string) => void
  disabled?: boolean
}

export const Quality: React.FC<IQualityProps> = ({ quality, setQuality, disabled }) => {
  return (
    <select
      value={quality}
      disabled={disabled}
      className="p-4 bg-gray-700 rounded-md outline-none  md:w-48 ring-indigo-800 focus:ring-2 focus:ring-indigo-600"
      onChange={(ChangeEvent) => setQuality(ChangeEvent.target.value)}
    >
      <option value={"1080"}>1080p</option>
      <option value={"720"}>720p</option>
      <option value={"480"}>480p</option>
      <option value={"360"}>360p</option>
    </select>
  )
}
