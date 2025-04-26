import styles from "./dots.module.css"

type Props = {
  zoom?: number
  color?: string
}

const LoaderDots = ({
  zoom = 1,
  color
} : Props) => {

  return (
    <span
      className={styles.loading}
      style={{
        zoom
      }}
    >
      <span className={color ? `bg-${color}` : "bg-primary-500"}
        style={{ backgroundColor: color ?? color }}
      />
      <span className={color ? `bg-${color}` : "bg-primary-500"}
        style={{ backgroundColor: color ?? color }}
      />
      <span className={color ? `bg-${color}` : "bg-primary-500"}
        style={{ backgroundColor: color ?? color }}
      />
    </span>
  )
}

export default LoaderDots