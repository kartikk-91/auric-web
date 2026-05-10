export default function FormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full">
      <div className="mx-auto flex w-full flex-col">
        {children}
      </div>
    </div>
  )
}