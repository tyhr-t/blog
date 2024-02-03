import clsx from "clsx"
import { useField } from "formik"

const PostField = ({ name, label, className, ...otherProps }) => {
  const [field, { error, touched }] = useField(name)
  const hasError = Boolean(error && touched)

  return (
    <label className={clsx("flex flex-col  gap-2", className)}>
      <span className="font-semibold text-lg">{label}</span>
      <textarea className="border-2 p-2 h-72" {...field} {...otherProps} />
      {hasError && <span className="text-red-500 text-sm">{error}</span>}
    </label>
  )
}
export default PostField
