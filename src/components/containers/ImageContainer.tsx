interface ImageContainerProps{ 
  alt: string,
  src: string,
  style?: React.CSSProperties
}
export default function ImageContainer(props: ImageContainerProps) {
  return (
    <img
      alt={props.alt}
      src={props.src}
      style={props.style}
    />
  )
}
