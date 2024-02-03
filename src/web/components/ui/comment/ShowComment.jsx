import WriteCommentSection from "@/web/components/ui/comment/WriteCommentSection"
export default function CommentSection({ initialValues, handleSubmiting }) {
  return (
    <>
      <WriteCommentSection
        initialValues={initialValues}
        handleSubmiting={handleSubmiting}
      />
    </>
  )
}
